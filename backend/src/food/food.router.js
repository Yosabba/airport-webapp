const router = require("express").Router();
const controller = require("./food.controller");

router.route("/").post(controller.read);

module.exports = router;
