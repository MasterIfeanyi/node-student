const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const verifyJWT = require("./middleware/verifyJWT");

// custom files
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const connectDB = require("./config/dbConn");

//initialize express app
const app = express();


// Connect to MongoDB
connectDB();


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);


// Cross Origin Resource Sharing
app.use(cors(corsOptions));


//middleware for cookies
app.use(cookieParser());


// port 
const PORT = process.env.PORT || 3500;


// MONGO_URI=mongodb+srv://mongotut:testing123@cluster0.kogqa.mongodb.net/PokemonDB?retryWrites=true&w=majority

// routes
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use(verifyJWT);
app.use("/student", require("./routes/api/student"));
app.use("/users", require("./routes/api/user"));


// initialize server
mongoose.connection.once("open", () => {
    console.log(`Connected to MongoDB`.cyan.underline)
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
})