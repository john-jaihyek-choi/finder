require('dotenv').config();
const express = require('express');
const {searchAllRestaurants} = require('./yelp')
const {getReviews} = require('./yelp')
const {getRestaurantDetails} = require('./yelp')

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.post('/api/users', (req, res, next) => {
  const guestUser = `
    insert into "users" ("distanceRadius")
    values ($1)
    returning *
  `
  const guestUsersValue = [10]

  db.query(guestUser, guestUsersValue)
    .then(result => {
      const [guestUserInfo] = result.rows
      req.session.userInfo = guestUserInfo
      return res.status(201).json(guestUserInfo)
    })
    .catch(err => next(err))
})

// stretch feature for when we have username. ** note: once we have the username, delete the other post api/users
app.post('/api/users', (req, res, next) => {
  const user = `
  insert into "users" ("userName", "distanceRadius")
  values ($1, $2)
  on conflict ("userName")
  do nothing
  returning *;
  `

  const userName = req.body.userName;

  if (userName.length === 0) {
    return res.status(400).json({ err: 'Please enter a userId' });
  }

  const userValue = [userName, 0]
  db.query(user, userValue)
    .then(user => {
      if (user.rows.length === 0) {
        return res.status(400).json({ err: 'User already exists' })
      }
      const [addedUser] = user.rows
      return res.status(201).json(addedUser)
    })
    .catch(err => next(err));
})

app.get('/api/likedRestaurants', (req, res, next) => {
  if(!req.session.userInfo) return res.json([])
  const likedRestaurants = `
    select "r".*
    from "restaurants" as "r"
    join "likedRestaurants" as "lr" using ("yelpId")
    where "lr"."userId" = $1
  `

  const currentUserId = [req.session.userInfo.userId]

  db.query(likedRestaurants, currentUserId)
    .then(result => res.json(result.rows))
    .catch(err => next(err))
});

app.post('/api/likedRestaurants', (req, res, next) => {
  const { yelpId } = req.body;
  if (!req.session.userInfo) return res.status(400).json({ error: 'missing userInfo' });
  if (!yelpId) return res.status(400).json({ error: 'missing yelpId' });

  const text = `
    insert into "likedRestaurants" ("userId", "yelpId")
    values      ($1, $2)
    on conflict ("userId", "yelpId")
    do nothing
    returning   *;
  `;
  const values = [req.session.userInfo.userId, yelpId];

  db.query(text, values)
    .then(data => res.status(201).json(data.rows[0]))
    .catch(err => next(err));
});

app.delete('/api/likedRestaurants', (req, res, next) => {
  const likedRestaurant = `
    delete from "likedRestaurants"
    where "userId"=$1 AND "yelpId"=$2
    returning *
  `
  const values = [req.session.userInfo.userId, req.body.yelpId]

  db.query(likedRestaurant, values)
    .then(result => {
      const [deletedObj] = result.rows
      return res.status(200).json(deletedObj)
    })
    .catch(err => next(err));
})

// another stretch feature for users
app.get('/api/users', (req, res, next) => {
  const sql = `
  select *
  from "users"
  `;
  db.query(sql)
    .then(result => {
      const users = result.rows;
      if (!result) {
        res.status(404).json({ error: 'Cannot be found' })
      }
      res.status(200).json(users)
    })
    .catch(err => next(err));
})

//yet another stretch feature for user (to sign up)
app.get('/api/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  if (!parseInt(userId, 10)) {
    return res.status(400).json({ error: '"userId" must be a positive integer' })
  }
  const sql = `
  select *
  from "users"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const user = result.rows[0]
      if (!user) {
        res.status(404).json({ error: `Cannot find user with "userId" ${userId}` })
      }
      else {
        res.status(200).json(user)
      }
    })
    .catch(err => next(err))
})

app.get('/api/reviewedRestaurants', (req, res, next) => {
  const reviewedRestaurants = `
    select "r".* as "details"
    from "restaurants" as "r"
    join "reviewedRestaurants" as "rR" using ("yelpId")
    where "rR"."userId" = $1
  `
  const currentUser = [req.session.userInfo.userId]

  db.query(reviewedRestaurants, currentUser)
    .then(result => res.json(result.rows))
    .catch(err => next(err))
})

app.get('/api/reviews/:yelpId', (req, res, next) => {
  const reviews = `
    select "thumbsRate",
      "note" 
    from "reviewedRestaurants"
    where "yelpId" = $1 AND "userId" = $2
  `
  const userInfo = [req.params.yelpId, req.session.userInfo.userId]
  
  db.query(reviews, userInfo)
    .then(result => {
      const [reviews] = result.rows
      return res.json(result.rows)
    })
    .catch(err => next(err))
})

app.get('/api/search', (req, res, next) => {
  const latitude = req.body.latitude
  const longitude = req.body.longitude
  const term = req.body.term

  searchAllRestaurants(latitude, longitude, term)
  .then(allRestaurants => {
    const insertPromises =[];
    for(let i = 0; i < allRestaurants.length ; i++){

      const restaurant = allRestaurants[i]
      const yelpId = restaurant.id
      const restaurantName = (restaurant.name || "")
      const yelpUrl = restaurant.url
      const storeImageUrl = restaurant.image_url
      const distance = restaurant.distance
      const photosUrl = []
      const hours = []
      const location = restaurant.location
      const categories = restaurant.categories
      const coordinates = restaurant.coordinates
      const reviews = []
      const price = (restaurant.price || "")

      const sql=`
      insert into  "restaurants" ("yelpId", "restaurantName", "yelpUrl", "storeImageUrl", "distance", "photosUrl", "hours", "location", "categories", "coordinates", "reviews", "price" )
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )
      on conflict("yelpId")
      do nothing
      `
      const val = [yelpId, restaurantName, yelpUrl, storeImageUrl, distance, JSON.stringify(photosUrl), JSON.stringify(hours), JSON.stringify(location),
        JSON.stringify(categories), JSON.stringify(coordinates), JSON.stringify(reviews), price]

      const restaurantPromise = db.query(sql, val)
      .then( () => {
        return {yelpId, restaurantName, yelpUrl, storeImageUrl, distance, photosUrl, hours, location, categories, coordinates, reviews, price}
      })
      insertPromises.push(restaurantPromise)
    }

    return Promise.all(insertPromises)
  })
  .then(restaurants => res.status(200).json(restaurants))
  .catch( err => next(err))
})

app.get('/api/view', (req, res, next) => {
  const yelpId = req.body.yelpId;

  getRestaurantDetails(yelpId)
    .then(newObj => {
      const yelpId = newObj.id
      const photosUrl = JSON.stringify(newObj.photos)
      const hours = JSON.stringify(newObj.hours || [])
      const reviews = JSON.stringify(newObj.reviews)

      const sql = `
      update "restaurants"
      set
      "photosUrl" = $2,
      "hours" = $3,
      "reviews" = $4
      where "yelpId" = $1;
      `
      const restaurantRow = [yelpId, photosUrl, hours, reviews]

      db.query(sql, restaurantRow)
      .then( result => {
        const sql =`
        select *
        from "restaurants"
        where "yelpId" = $1;
        `
        const value = [yelpId]
        return db.query(sql, value)
          .then(wholeRow => {
            const row = wholeRow.rows[0]
            res.status(200).json(row)
          })
      })
      .catch( err => next(err))
    })
});



app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
