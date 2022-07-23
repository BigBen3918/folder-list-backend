const express = require("express");
const {
  postFolder,
  getAllFolders,
  getFolder,
  updateFolder,
  deleteFolder,
} = require("./../controller/folder");
const { protect } = require("./../controller/auth");

const router = express.Router();

router.route("/").post(protect, postFolder).get(protect, getAllFolders);

// get single folder
router
  .route("/:id")
  .get(protect, getFolder)
  .patch(protect, updateFolder)
  .delete(protect, deleteFolder);

module.exports = router;
