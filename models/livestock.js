const mongoose = require("mongoose");

const livestockSchema = new mongoose.Schema({
  user_id: String,
  liveno: String,
  name: String,
  type: String,
  breed: String,
  status: String,
  gender: String,
  color: String,
  description: String,
  tagno: String,
  tagcolor: String,
  birthdate: String,
  birthweigth: String,
  istheanimalpurchased: String,
  purchasedate: String,
  purchaseprice: String,
  code: String,
  weight: String,
  damnno: String,
  sireno: String,
  deceaseddate: String,
  dryperiodstarting: String,
  dryperiod: String,
  lactatingperiodstarting: String,
  lactatingperiod: String,
  sickdate: String,
  disease: String,
  solddate: String,
  sellingprice: String,
});

const model = mongoose.model("livestock", livestockSchema);
module.exports = model;
