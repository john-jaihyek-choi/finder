require('dotenv/config');
const express = require('express');

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
  const user =  `
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

app.get('/api/health-check', (req, res, next) => {
  db.query(`select 'successfully connected' as "message"`)
    .then(result => res.json(result.rows[0]))
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

app.get('/api/users/:userId', (req, res, next) =>{
  const {userId} = req.params;
  if(!parseInt(userId,10)){
    return res.status(400).json({ error: '"userId" must be a positive integer'})
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
      if(!user){
        res.status(404).json({ error: `Cannot find user with "userId" ${userId}`})
      }
      else{
        res.status(200).json(user)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: 'An unexpected error occured'})
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
