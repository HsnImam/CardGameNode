const request = require("request-promise");

module.exports = {
  getCards: async (req, res) => {
    try {
      const baseUrl = process.env.CARD_API_URL;
      const deck = await request({
        method: "GET",
        uri: baseUrl + `/api/deck/new/shuffle/?deck_count=1`,
        json: true
      });
      if (deck && deck.deck_id) {
        const cards = await request({
          method: "GET",
          uri: baseUrl + `/api/deck/${deck.deck_id}/draw/?count=10`,
          json: true
        });
        return res.json({
          cards: cards.cards
        });
      } else {
        return res.json({
          cards: []
        });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }
};
