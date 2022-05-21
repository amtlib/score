const express = require('express');
const bodyParser = require('body-parser')

const gamesRouter = require("./routes/games");
const genresRouter = require("./routes/genres");

const registerRouter = require("./routes/auth/register");
const loginRouter = require("./routes/auth/login");

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('nothing to see here');
});

app.use("/games", gamesRouter);
app.use("/genres", genresRouter);

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})