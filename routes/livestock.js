const express = require("express");
const {
  getLivestock,
  postLivestock,
  updateLivestock,
  deleteLivestock,
  getLivestockFromId,
} = require("../controller/livestock");
const { generate } = require("../middleware/generateQR");
const Router = express.Router();

Router.get("/:id", getLivestock);
Router.get("/livestock/:id", getLivestockFromId);
Router.post("/", postLivestock);
Router.put("/:id", updateLivestock);
Router.delete("/:id", deleteLivestock);

module.exports = Router;
