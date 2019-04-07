const router = require("express").Router();
const bookRoutes = require("./books");
const googlebooks = require("./googlebooks")

// Book routes
router.use("/books", bookRoutes);
router.use("/googlebooks", googlebooks)

module.exports = router;
