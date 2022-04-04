const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://New-User_01:mongopassword@cluster0.yk2o2.mongodb.net/App?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
  console.log("Database connected");
};

module.exports = connectDB;
