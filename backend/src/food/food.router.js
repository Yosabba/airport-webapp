const router = require("express").Router();
const controller = require("./food.controller");

router.route("/").post(controller.list);

router.route("/:id").get(controller.read);

module.exports = router;
