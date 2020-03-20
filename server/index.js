require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');

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
  const guesUsersValue = [10]

  db.query(guestUser, guesUsersValue)
    .then(result => {
      const [guestUserInfo] = result.rows
      req.session.userInfo = guestUserInfo
      return res.status(201).json(guestUserInfo)
    })
})

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
  const likedRestaurants = `
    select *
    from "likedRestaurants"
    where "userId" = $1
  `

  const currentUserId = [req.session.userInfo.userId] //on each login ("continue as a guest" for now), req.session should store the session info.

  db.query(likedRestaurants, currentUserId)
    .then(yelpId => {
      const restaurantsValue = []

      if (yelpId.rows.length === 0) {
        return res.status(200).json(restaurantsValue)
      }

      yelpId.rows.map(liked => {
        restaurantsValue.push(liked.yelpId)
      })

      const likedRestaurantsArr = []

      restaurantsValue.map((yelpId, index) => {
        const restaurants = `
          select *
          from "restaurants"
          where "yelpId"= $1
        `

        db.query(restaurants, [yelpId])
          .then(restaurant => {
            likedRestaurantsArr.push(restaurant.rows[0])
            if (index === restaurantsValue.length - 1) {
              req.session.userInfo.likedRestaurants = likedRestaurantsArr
              return res.status(200).json(likedRestaurantsArr)
            }
          })
      })
    })
});

app.post('/api/likedRestaurants', (req, res, next) => {
  const { restaurant } = req.body;
  if (!req.session.userInfo) return res.status(400).json({ error: 'missing userInfo' });
  if (!restaurant) return res.status(400).json({ error: 'missing restaurant' });

  const text = `
    insert into "likedRestaurants" ("userId", "yelpId")
    values      ($1, $2)
    on conflict ("userId", "yelpId")
    do nothing
    returning   *;
  `;
  const values = [req.session.userInfo.userId, restaurant.yelpId];

  db.query(text, values)
    .then(data => res.status(201).json(data.rows[0]))
    .catch(err => next(err));
});

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
    .catch(err => {
      // the query failed for some reason
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
  // ------------------------
})

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
      console.log(result)
      const user = result.rows[0]
      if (!user) {
        res.status(404).json({ error: `Cannot find user with "userId" ${userId}` })
      }
      else {
        res.status(200).json(user)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'An unexpected error occured' })
    })
})

app.get('/api/search', (req, res, next) => {
  console.log(req.body)
  console.log('hey work already')
  const latitude = req.body.latitude
  const longitude = req.body.longitude
  const term = req.body.term

  fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=${term}`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer TljklZD_vCJIAGuMk_wgWfXyabofiHuFIO2LE1DKCATtNuYKSHnj26z8i8Q448jAOoLNAZvT2X0ocNI7ReTfM9bIQpAGf4F7HyGfdwDGK3lBYGEXcuScqMfYu_lzXnYx'
      }
    })

    .then(response => response.json())
    .then(result => {
      console.log(req.body)
      const restaurants = result

      if (!req.body) { return res.status(400).json({ error: 'missing longitude, latitude, and or term' }) }
      res.status(200).json(restaurants)

      const sql = `
          insert into "restaurants" ("yelpId", "restaurantName", "yelpUrl", "storeImageUrl", "distance", "photosUrl", "hours", "location", "categories", "coordinates", "reviews", "price" )
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          returning *
          `
      const val = [restaurants.id, restaurants.restaurantName, restaurants.url, restaurants.storeImageUrl, restaurants.distance, restaurants.photosUrl, restaurants.hours, restaurants.location, restaurants.categories, restaurants.coordinates, restaurants.reviews, restaurants.price]
      db.query(sql, val)
      .then(data => res.status(201).json(data.rows[0]))
      console.log("hello:",restaurants.id)
      console.log(result.id)

      .catch(err => next(err))
      // ---------------------
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'An unexpected error occured' })
    })
})

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

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
