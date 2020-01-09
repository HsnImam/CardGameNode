const express = require("express");
const router = express.Router();
const ScoreController = require("../api/controllers/score");

router.post("/", ScoreController.addScore);
router.get("/", ScoreController.getScore);
router.get("/reset", ScoreController.resetScore);

module.exports = router;
