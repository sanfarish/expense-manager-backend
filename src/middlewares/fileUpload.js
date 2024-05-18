const multer = require('multer');

const fileUpload = (file) => {

	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'temp');
		},
		filename: function (req, file, cb) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
			if (file.mimetype == 'image/jpeg') {
				cb(null, uniqueSuffix + '.jpg');
			} else {
				cb(null, uniqueSuffix + '.png');
			};
		}
	});

	const fileFilter = (req, file, cb) => {
		if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
			cb(null, true);
		} else {
			req.fileTypeCheck = {
				message: 'only accept .jpeg / .png file'
			};
			return cb(new Error(req.fileTypeCheck.message), false);
		};
	};

	const maxSizeMb = 1;

	const upload = multer({
		storage,
		fileFilter,
		limits: { fileSize: maxSizeMb * 1000 * 1000 } 
	}).single(file);

	return (req, res, next) => {

		upload (req, res, (err) => {

			if (req.fileTypeCheck) {
				return res.status(400).json(req.fileTypeCheck);
			};

			if (err) {
				if (err.code === 'LIMIT_FILE_SIZE') {
					return res.status(400).json({
						message: `file size exceed maximum ${maxSizeMb}MB`
					});
				} else if(err.code === 'LIMIT_UNEXPECTED_FILE') {
					return res.status(400).json({
						message: err.code
					});
				} else {
					return res.status(500).json({
						message: err.code
					});
				};
			}

			else {
				next();
			};
		});
	};
};

module.exports = fileUpload;