const mongoose = require("mongoose");
const AppError = require("../utils/OperationalError");

const folderSchema = mongoose.Schema({
  userID: String,
  title: {
    type: String,
    required: [true, "Title is required !"],
    trim: true,
  },
  description: { type: String, trim: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  listData: [Object],
});

folderSchema.pre("save", async function (next) {
  const doc = await this.constructor.findOne({
    userID: this.userID,
    title: this.title,
  });

  if (doc) {
    return next(new AppError(400, "user with this folder name already exists"));
  }

  next();
});

folderSchema.pre("findByIdAndUpdate", async function (next) {
  const doc = await this.constructor.findOne({
    userID: this.userID,
    title: this.title,
  });

  if (doc) {
    return next(new AppError(400, "user with this folder name already exists"));
  }

  next();
});

const Folder = mongoose.model("folders", folderSchema);
module.exports = Folder;
