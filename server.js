const express = require('express');
const app = express();
const port  = 3000;
// const db = require('./db/connection');
const usersRouter = require('./routes/users');
const showsRouter = require('./routes/shows');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/shows', showsRouter);

app.listen(port, () => {
    // db.sync();
    console.log(`Listening at http://localhost:${port}`);
})
