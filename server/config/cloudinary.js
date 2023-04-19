const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.create_upload_preset({
  name: "petScan",
  folder: "petScan",
});

const uploadImage = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "petScan",
      width: 500,
      height: 500,
      crop: "fill",
      format: "jpg",
      fetch_format: "auto",
    });
    console.log(uploadedResponse);
    res.json({ msg: "yay" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

const deleteImage = async (req, res) => {
  try {
    const publicId = req.body.publicId;
    const deletedResponse = await cloudinary.uploader.destroy(publicId);
    console.log(deletedResponse);
    res.json({ msg: "yay" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

module.exports = { uploadImage, deleteImage };
