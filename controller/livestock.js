const livestockSchema = require("../models/livestock");
const mongoose = require("mongoose");
const { generate } = require("../middleware/generateQR");

const getLivestock = async (req, res) => {
  try {
    // // const user_id = req.params.id
    // // let allstocks = []
    // const alluser = await livestockSchema.find()
    // // alluser.map((user) => {
    // //     if(user.user_id == user_id){
    // //         allstocks.push(user)
    // //     }
    // // })
    const id = req.params.id;
    const liveStock = await livestockSchema.find();
    const liveData = liveStock
      .map((l) => {
        if (l.user_id === id) {
          return l;
        }
      })
      .filter((l) => l != null);
    res.status(200).json(liveData);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const postLivestock = async (req, res) => {
  const livestock = req.body;
  const newlivestock = new livestockSchema(livestock);
  try {
    const live = await generate(newlivestock);
    console.log(live);
    await live.save();
    res.status(200).json(live);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateLivestock = async (req, res) => {
  const id = req.params.id;
  const livestock = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("No Livestock with that id");
  }
  try {
    const updatedlivestock = await livestockSchema.findByIdAndUpdate(
      id,
      livestock,
      { new: true }
    );
    res.status(200).json(updatedlivestock);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
const deleteLivestock = async (req, res) => {
  const id = req.params.id;
  const livestock = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("No data with ID");
  }
  try {
    await livestockSchema.findByIdAndDelete(id);
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getLivestockFromId = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("No data with ID");
  } else {
    try {
      const livestock = await livestockSchema.findById(id);
      res.status(200).json(livestock);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
};

module.exports = {
  getLivestock,
  postLivestock,
  updateLivestock,
  deleteLivestock,
  getLivestockFromId,
};
