const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dcyogyeng",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(url: string) {
    const result = await cloudinary.uploader.upload(url, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    });

    console.log(result);

    return result;
}
