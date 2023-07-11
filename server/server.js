const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

const User = require("./mongodb.js")
const path = require("path");

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(compression());


app.use('/',authRoutes);

app.use("/",postRoutes);
app.use('/',userRoutes);


const PORT = process.env.PORT || 5000;

// Add your routes and middleware here
const staticFilesPath = path.join(__dirname, "uploads"); // Adjust the path as per your project structure


app.use("/uploads",express.static(staticFilesPath))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
