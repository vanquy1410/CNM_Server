const express = require('express');
const router = express.Router();
const { registerController } = require('../controllers/dangkysukien.controller');

// Đăng ký người dùng vào sự kiện
router.post('/registerEvent', registerController);

module.exports = router;
