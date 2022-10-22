
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const data = require("./data");

app.get("/", (req, res) => {
  const { slides, movies, halls } = data;
  res.render("index", { slides: slides, movies: movies, halls : halls });
})

app.get("/:id", (req, res) => {
  const { movies } = data;
  const paramId = req.params.id;
  const singleMovie = movies.find(movie => movie.id === paramId);
  console.log(paramId);
  res.render("single-movie", { singleMovie: singleMovie });
})












let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`...Server avviato sulla porta ${port}...`);
});