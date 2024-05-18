const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.C_NAME,
	api_key: process.env.C_KEY,
	api_secret: process.env.C_SECRET,
	secure: true,
});

exports.cloudinaryUpload = async (path) => {
	try {
		const res = await cloudinary.uploader.upload(path, {
			folder: 'expense_manager',
			use_filename: true
		});
		return res;
	} catch (err) {console.log(err)};
};

exports.cloudinaryDestroy = async (path) => {
	try {
		await cloudinary.uploader.destroy(path);
	} catch (err) {console.log(err)};
};