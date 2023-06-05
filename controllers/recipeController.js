const Recipe = require("../models/recipe");

exports.getRecipes = (req, res) => {
  const { keyword } = req.query;

  // Jika ada keyword, cari resep berdasarkan keyword
  if (keyword) {
    Recipe.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } }, // Cari berdasarkan nama masakan
        { ingredients: { $regex: keyword, $options: "i" } }, // Cari berdasarkan nama bahan makanan
      ],
    })
      .then((recipes) => {
        res.status(200).json(recipes);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to fetch recipes" });
      });
  }
  // Jika tidak ada keyword, tampilkan semua resep
  else {
    Recipe.find()
      .then((recipes) => {
        res.status(200).json(recipes);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to fetch recipes" });
      });
  }
};

exports.getRecipeById = (req, res) => {
  const { id } = req.params;

  Recipe.findById(id)
    .then((recipe) => {
      if (!recipe) {
        res.status(404).json({ error: "Recipe not found" });
      } else {
        res.status(200).json(recipe);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch recipe" });
    });
};

exports.addRecipe = (req, res) => {
  const { title, ingredients, instructions } = req.body;

  const recipe = new Recipe({
    title,
    ingredients,
    instructions,
    image: req.file ? req.file.path : null,
  });

  recipe
    .save()
    .then((savedRecipe) => {
      res.status(201).json(savedRecipe);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to add recipe" });
    });
};
