const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const gamesRouter = require("./routes/games");
const guestbookRouter = require("./routes/guestbookEntries");
const usersRouter = require("./routes/users")

const registerRouter = require("./routes/auth/register");
const loginRouter = require("./routes/auth/login");
const whoAmIRouter = require("./routes/auth/whoami");

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('nothing to see here');
});

app.use("/games", gamesRouter);
app.use("/guestbook", guestbookRouter);

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/whoami", whoAmIRouter);

app.use("/users", usersRouter)

app.listen(port, () => {
  console.log(`Score API listening on port ${port}`)
})