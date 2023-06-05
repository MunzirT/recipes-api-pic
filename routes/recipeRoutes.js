const express = require("express");
const multer = require("multer");
const recipeController = require("../controllers/recipeController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post("/", upload.single("image"), recipeController.addRecipe);

module.exports = router;
