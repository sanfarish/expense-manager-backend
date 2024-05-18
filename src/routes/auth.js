const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const { validator, validEmail } = require('../middlewares');

router.post('/register', validator, validEmail, auth.register);
router.post('/login', validator, validEmail, auth.login);

module.exports = router;