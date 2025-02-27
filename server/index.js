import express from "express";
import { getRestaurantDetails, searchAllRestaurants } from "./yelp.js";
import db from "./database.js";
import ClientError from "./client-error.js";
import staticMiddleware from "./static-middleware.js";
import sessionMiddleware from "./session-middleware.js";

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get("/api/login/:userId", (req, res, next) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: "missing userId" });

  const text = `
    select *
    from   "users"
    where  "userId" = $1;
  `;
  const values = [userId];

  db.query(text, values)
    .then((data) => {
      if (!data.rows.length)
        return res
          .status(404)
          .json({ error: `userId ${userId} does not exist` });
      req.session.userInfo = data.rows[0];
      res.json(data.rows[0]);
    })
    .catch((err) => next(err));
});

app.post("/api/users", (req, res, next) => {
  const guestUser = `
    insert into "users" ("distanceRadius")
    values ($1)
    returning *
  `;
  const guestUsersValue = [1];

  db.query(guestUser, guestUsersValue)
    .then((result) => {
      const [guestUserInfo] = result.rows;
      req.session.userInfo = guestUserInfo;
      return res.status(201).json(guestUserInfo);
    })
    .catch((err) => next(err));
});

app.get("/api/users", (req, res, next) => {
  const sql = `
  select *
  from "users"
  where not "userName" = 'Guest';
  `;
  db.query(sql)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Cannot be found" });
      }
      res.status(200).json(result.rows);
    })
    .catch((err) => next(err));
});

app.get("/api/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  if (!parseInt(userId, 10)) {
    return res
      .status(400)
      .json({ error: '"userId" must be a positive integer' });
  }
  const sql = `
  select *
  from "users"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then((result) => {
      const user = result.rows[0];
      if (!user) {
        res
          .status(404)
          .json({ error: `Cannot find user with "userId" ${userId}` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => next(err));
});

app.patch("/api/guest/", (req, res, next) => {
  const sqlUpdate = `
    update "users"
    set "distanceRadius" = 15
    where "userName" = 'Guest'
    returning *;
  `;
  db.query(sqlUpdate)
    .then((data) => {
      if (!data.rows.length)
        return res
          .status(404)
          .json({ error: "userName 'Guest' does not exist" });
    })
    .catch((err) => next(err));

  const sqlGet = `
    select *
    from "users"
    where "userName" = 'Guest';
  `;
  db.query(sqlGet)
    .then((data) => {
      if (!data.rows.length)
        return res
          .status(404)
          .json({ error: "userName 'Guest' does not exist" });
      req.session.userInfo = data.rows[0];

      const deleteValues = [req.session.userInfo.userId];

      const sqlDeleteLiked = `
        delete from "likedRestaurants"
        where "userId" = $1
      `;
      db.query(sqlDeleteLiked, deleteValues).catch((err) => next(err));

      const sqlDeleteReviewed = `
        delete from "reviewedRestaurants"
        where "userId" = $1
        returning *;
      `;
      db.query(sqlDeleteReviewed, deleteValues)
        .then((data) => res.json(req.session.userInfo))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

app.post("/api/signUp", (req, res, next) => {
  const newUser = `
  insert into "users" ("userName", "distanceRadius")
  values ($1, $2)
  on conflict ("userName")
  do nothing
  returning *;
  `;
  const userName = req.body.userName;
  const userValue = [userName, 5];

  if (userName.length === 0) {
    return res.status(400).json({ err: "Please enter a username" });
  }

  db.query(newUser, userValue)
    .then((user) => {
      if (user.rows.length === 0) {
        return res.status(400).json({ err: "User already exists" });
      }
      const [addedUser] = user.rows;
      req.session.userInfo = addedUser;
      return res.status(201).json(addedUser);
    })
    .catch((err) => next(err));
});

app.get("/api/likedRestaurants", (req, res, next) => {
  if (!req.session.userInfo) return res.json([]);
  const likedRestaurants = `
    select "r".*
    from "restaurants" as "r"
    join "likedRestaurants" as "lr" using ("yelpId")
    where "lr"."userId" = $1
  `;

  const currentUserId = [req.session.userInfo.userId];

  db.query(likedRestaurants, currentUserId)
    .then((result) => res.json(result.rows))
    .catch((err) => next(err));
});

app.post("/api/likedRestaurants", (req, res, next) => {
  const { yelpId } = req.body;
  if (!req.session.userInfo)
    return res.status(400).json({ error: "missing userInfo" });
  if (!yelpId) return res.status(400).json({ error: "missing yelpId" });

  const text = `
    insert into "likedRestaurants" ("userId", "yelpId")
    values      ($1, $2)
    on conflict ("userId", "yelpId")
    do nothing
    returning   *;
  `;
  const values = [req.session.userInfo.userId, yelpId];
  db.query(text, values)
    .then((data) => {
      return res.status(201).json(data.rows[0]);
    })
    .catch((err) => next(err));
});

app.delete("/api/likedReviewedRestaurants", (req, res, next) => {
  const likedReviewedRestaurants = `
    delete from "${req.body.tableName}"
    where "userId"=$1 AND "yelpId"=$2
    returning *
  `;
  const values = [req.session.userInfo.userId, req.body.yelpId];

  db.query(likedReviewedRestaurants, values)
    .then((result) => {
      const [deletedObj] = result.rows;
      return res.status(200).json(deletedObj);
    })
    .catch((err) => next(err));
});

app.get("/api/reviews", (req, res, next) => {
  const reviews = `
    select "rR".*,
      "r"."yelpId",
      "r"."restaurantName"
    from "reviewedRestaurants" as "rR"
    join "restaurants" as "r" using ("yelpId")
    where "r"."yelpId" = $1 AND "rR"."userId"=$2
  `;

  const values = [req.query.yelpId, req.session.userInfo.userId];

  db.query(reviews, values)
    .then((result) => {
      const [review] = result.rows;
      if (!review) {
        return res.json({
          note: null,
          restaurantName: req.query.restaurantName,
          thumbsRate: null,
          yelpId: req.query.yelpId,
        });
      }
      res.json(review);
    })
    .catch((err) => next(err));
});

app.get("/api/reviewedRestaurants", (req, res, next) => {
  const reviewedRestaurants = `
    select "r".* as "details",
      "rR".* as "reviews"
    from "restaurants" as "r"
    join "reviewedRestaurants" as "rR" using ("yelpId")
    where "rR"."userId" = $1
  `;
  const currentUser = [req.session.userInfo.userId];

  db.query(reviewedRestaurants, currentUser)
    .then((result) => res.json(result.rows))
    .catch((err) => next(err));
});

app.get("/api/reviews/:yelpId", (req, res, next) => {
  const reviews = `
    select "thumbsRate",
      "note"
    from "reviewedRestaurants"
    where "yelpId"=$1 AND "userId"=$2
  `;

  const userInfo = [req.params.yelpId, req.session.userInfo.userId];

  db.query(reviews, userInfo)
    .then((result) => {
      const [reviews] = result.rows;
      if (!reviews) {
        return res.json({
          notes: null,
          thumbsRate: null,
          yelpId: req.params.yelpId,
          restaurantName: req.params.restaurantName,
        });
      }
      return res.json(reviews);
    })
    .catch((err) => next(err));
});

app.post("/api/reviews", (req, res, next) => {
  const reviews = `
    insert into "reviewedRestaurants" ("userId", "yelpId","thumbsRate", "note", "timeCreated")
    values ($1, $2, $3, $4, NOW())
    returning *
  `;
  const params = [
    req.session.userInfo.userId,
    req.body.yelpId,
    req.body.thumbsRate,
    req.body.note,
  ];

  db.query(reviews, params)
    .then((result) => {
      const [newReview] = result.rows;
      return res.status(200).json(newReview);
    })
    .catch((err) => next(err));
});

app.patch("/api/reviews", (req, res, next) => {
  const sql = `
  update "reviewedRestaurants"
  set "thumbsRate" = $2,
      "note" = $3
  where "userId"=$1 AND "yelpId"=$4
  returning *
  `;
  const thumbsRate = req.body.thumbsRate;
  const note = req.body.note;
  const yelpId = req.body.yelpId;
  const userId = req.session.userInfo.userId;

  const params = [userId, thumbsRate, note, yelpId];

  db.query(sql, params)
    .then((result) => {
      const reviewedRestaurantRow = result.rows[0];
      return res.status(200).json(reviewedRestaurantRow);
    })
    .catch((err) => next(err));
});

app.get("/api/view/:yelpId", (req, res, next) => {
  const { yelpId } = req.params;
  getRestaurantDetails(yelpId).then((newObj) => {
    const yelpId = newObj.id;
    const photosUrl = JSON.stringify(newObj.photos || []);
    const hours = JSON.stringify(newObj.hours || [{ open: [] }]);
    const reviews = JSON.stringify(newObj.reviews || []);
    const rating = newObj.rating;

    const sql = `
      update "restaurants"
      set
      "photosUrl" = $2,
      "hours" = $3,
      "reviews" = $4,
      "rating" = $5
      where "yelpId" = $1;
      `;
    const restaurantRow = [yelpId, photosUrl, hours, reviews, rating];

    db.query(sql, restaurantRow)
      .then((result) => {
        const sql = `
        select *
        from "restaurants"
        where "yelpId" = $1;
        `;
        const value = [yelpId];
        return db.query(sql, value).then((wholeRow) => {
          const row = wholeRow.rows[0];
          res.status(200).json(row);
        });
      })
      .catch((err) => next(err));
  });
});

app.post("/api/search/", (req, res, next) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const location = req.body.location || null;
  const term = req.body.term;
  const radius = req.body.radius * 1609;

  searchAllRestaurants(latitude, longitude, term, location, radius)
    .then((allRestaurants) => {
      const insertPromises = [];
      for (let i = 0; i < allRestaurants.length; i++) {
        const restaurant = allRestaurants[i];
        const yelpId = restaurant.id;
        const restaurantName = restaurant.name || "";
        const yelpUrl = restaurant.url;
        const storeImageUrl = restaurant.image_url;
        const distance = restaurant.distance;
        const photosUrl = [];
        const hours = [];
        const location = restaurant.location;
        const categories = restaurant.categories;
        const coordinates = restaurant.coordinates;
        const reviews = [];
        const price = restaurant.price || "";
        const rating = restaurant.rating;

        const sql = `
      insert into  "restaurants" ("yelpId", "restaurantName", "yelpUrl", "storeImageUrl", "distance", "photosUrl", "hours", "location", "categories", "coordinates", "reviews", "price", "rating")
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      on conflict("yelpId")
      do nothing
      `;
        const val = [
          yelpId,
          restaurantName,
          yelpUrl,
          storeImageUrl,
          distance,
          JSON.stringify(photosUrl),
          JSON.stringify(hours),
          JSON.stringify(location),
          JSON.stringify(categories),
          JSON.stringify(coordinates),
          JSON.stringify(reviews),
          price,
          rating,
        ];

        const restaurantPromise = db.query(sql, val).then(() => {
          return {
            yelpId,
            restaurantName,
            yelpUrl,
            storeImageUrl,
            distance,
            photosUrl,
            hours,
            location,
            categories,
            coordinates,
            reviews,
            price,
            rating,
          };
        });
        insertPromises.push(restaurantPromise);
      }

      return Promise.all(insertPromises);
    })
    .then((restaurants) => res.status(200).json(restaurants))
    .catch((err) => next(err));
});

app.use("/api", (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: "an unexpected error occurred",
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Listening on port", process.env.PORT);
});
