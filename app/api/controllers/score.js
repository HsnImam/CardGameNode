const request = require("request-promise");
const fs = require("fs-extra").promises;

module.exports = {
  getScore: async (req, res) => {
    try {
      const fileName = process.env.SCORE_FILE_NAME;
      let scores = await fs.readFile(fileName, "utf8");
      scores = JSON.parse(scores)
        .sort((a, b) => a.score - b.score)
        .slice(0, 10);

      return res.json({ scores });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  addScore: async (req, res) => {
    try {
      const fileName = process.env.SCORE_FILE_NAME;
      const { name, score } = req.body;
      const scores = JSON.parse(await fs.readFile(fileName, "utf8")) || [];
      scores.push({ name, score });
      await fs.writeFile(fileName, JSON.stringify(scores));
      return res.json({
        status: "success"
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  resetScore: async (req, res) => {
    try {
      const fileName = process.env.SCORE_FILE_NAME;
      await fs.writeFile(fileName, "[]", "utf8");
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
};
