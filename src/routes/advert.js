const express = require("express");
const router = express.Router();


const advertController = require("../controllers/advertController");

router.get("/advert", advertController.advert);

router.get("/advert/new", advertController.new);

router.post("/advert/create", advertController.create);

router.get("/advert/:id", advertController.show);

router.post("/advert/:id/destroy", advertController.destroy);

router.get("/advert/:id/edit", advertController.edit);

router.post("/advert/:id/update", advertController.update);


module.exports = router;
