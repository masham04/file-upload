const express = require("express");
const app = express()
const port = 5000 || process.env.NODE_ENV
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./backend/config/db-cofig")

// database connection
db.sequelize.sync({ force: true }).then((Sequelize) => {
  console.log(Sequelize.options.host,"Database connected");
});

//  middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
require("./backend/routes")(app)


app.listen(port, () => console.log(`server listening on ${port}`))