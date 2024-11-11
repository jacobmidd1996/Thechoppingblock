// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import path from "path";
// import routes from "./routes/index.js";
// import { sequelize } from "./models/index.js";

// const app = express();
// const PORT = process.env.PORT || 3001;
// const forceDatabaseRefresh = false;

// // Serve the frontend's static files in production
// app.use(express.static(path.join(__dirname, "../client/dist")));

// // Middleware to parse JSON
// app.use(express.json());

// // Use API routes
// app.use(routes);

// // Catch-all route to serve index.html for client-side routing in React
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

// // Sync Sequelize models and start server
// sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// });

const forceDatabaseRefresh = false;

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
