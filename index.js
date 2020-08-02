const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const error = require("./services/error");
const app = express();
const genre = require("./routes/genres");
const movie = require("./routes/movies");
const cors = require("cors");
const register = require("./routes/register");
const auth = require("./routes/auth");

app.use(express.json());
app.use(cors());
app.use("/api/genres", genre);
app.use("/api/movies", movie);
app.use("/api/register", register);
app.use("/api/login", auth);
app.use(error);

mongoose
    .connect("mongodb://localhost/movie", {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to movieTrack"))
    .catch(() => console.log("failed to connect"));

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`listening on port ${port}`));