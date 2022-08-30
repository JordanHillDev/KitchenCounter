// Imports
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Static Files
app.use(express.static('public'))

// Set Templating Engine
app.set('view engine', 'ejs')

// Routes
app.use('/', require('./routes/index'))

// Ports
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
