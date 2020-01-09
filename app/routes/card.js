const express = require("express");
const router = express.Router();
const CardController = require("../api/controllers/card");

router.get("/", CardController.getCards);

module.exports = router;
