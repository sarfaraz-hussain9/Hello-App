import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";

export const cloudinaryUpload = async (localpath) => {
  try {
    if (!localpath) {
      console.log("local path is not present.");
      return null;
    }
    const res = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
      folder: "Hello",
    });
    fs.unlinkSync(localpath);
    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error.message);
    return null;
  }
};

export const cloudinaryDelete = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, function (result) {
      return result;
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
