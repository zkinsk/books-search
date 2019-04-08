const router = require("express").Router();
const bookRoutes = require("./books");
const googleBooks = require("./googlebooks");

// Book routes
router.use("/books", bookRoutes);
router.use("/googlebooks", googleBooks);

module.exports = router;
