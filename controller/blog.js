const blogSchema = require("../models/blog");

const getBlog = async (req, res) => {
  try {
    const data = await blogSchema.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  getBlog,
};
