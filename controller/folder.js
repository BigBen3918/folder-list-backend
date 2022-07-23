const Folders = require("./../model/Folders");
const OperationalError = require("./../utils/OperationalError");
const catchAsync = require("./../utils/catchAsync");

exports.postFolder = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  const folder = await Folders.create({
    userID: req.user.id,
    title,
    description,
    updatedAt: Date.now(),
    listData: [],
  });

  res.status(201).json({
    status: "success",
    folder,
  });
});

exports.getAllFolders = catchAsync(async (req, res, next) => {
  const folders = await Folders.find({ userID: req.user.id });

  res.status(200).json({
    status: "success",
    total: folders.length,
    folders,
  });
});

exports.getFolder = catchAsync(async (req, res, next) => {
  const folder = await Folders.findById(req.params.id);
  res.status(200).json({
    status: "success",
    folder,
  });
});

exports.updateFolder = catchAsync(async (req, res, next) => {
  const folder = await Folders.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    folder,
  });
});

exports.deleteFolder = catchAsync(async (req, res, next) => {
  await Folders.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: `folder deleted with id: ${req.params.id}`,
  });
});
