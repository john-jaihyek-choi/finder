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
