const express = require("express");
const path = require("path");
//const { clog } = require("./middleware/clog");
const api = require("./routes/index");
const dbData = require("./db/db.json");

const PORT = process.env.PORT || 3001;
//find any other locahost
const app = express();

// Import custom middleware, "cLog"
//app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/pages/notes.html"))
);
// GET Route for notes page
app.get("/notes/:id", (req, res) => {
  // TODO: Add a comment describing the content of req.params in this instance
  //the value of the params key term in lowercase
  const requestedID = req.params.id;

  for (let i = 0; i < dbData.length; i++) {
    if (requestedID === dbData[i].id) {
      return res.json(dbData[i]);
    }
  }

  // Return a message if the term doesn't exist in our DB
  return res.json("No id found");
});

// DELETE NOTE FROM Route notes page
app.delete("/notes", (req, res) => {
  res.send("DELETE Request Called");
  //const requestedID = req.params.id;
  console.log(requestedID);
});

// GET Route for 404 page
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/public/pages/404.html"))
// );
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
