const livestockSchema = require("../models/livestock");

exports.generate = async (liveData) => {
  const { id } = liveData;

  let strData = `https://antibilious-bag.000webhostapp.com/openApp/details/${id}`;

  liveData.code = strData;
  return liveData;
};

const update = async (id, livestock) => {
  try {
    const updatedlivestock = await livestockSchema.findByIdAndUpdate(
      id,
      livestock,
      { new: true }
    );
    return updatedlivestock;
  } catch (error) {
    console.log(error);
    return null;
  }
};
