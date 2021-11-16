const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const nunjucks = require("nunjucks");
const dotenv = require("dotenv").config();
const passport = require("passport");
const passportConfig = require("./passport");
const connectDB = require("./schemas");
// middlewares

const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
// routers

const app = express();
app.set("view engine", "html");
nunjucks.configure("public", {
  express: app,
  watch: true,
});

passportConfig();
connectDB();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

app.set("port", process.env.PORT || 5000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new RedisStore({ client: redisClient }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (err) {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.send(err);
  }
});

app.listen(app.get("port"), () => {
  console.log("app is listening port", app.get("port"));
});
