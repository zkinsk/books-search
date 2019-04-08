const router = require("express").Router();
const googleController = require("../../controllers/googleController");

// Matches with "/api/googlebooks/:id/:id?"
router.route("/:title/:author?")
  .get(googleController.searchBook);

module.exports = router;