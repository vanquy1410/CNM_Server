const DangKySuKien = require('../models/dangkysukien.model');

const registerController = async (req, res) => {
    const { MaSuKien, MaNguoiDung, TenNguoiDung, NgayDangKy, TrangThaiDangKy } = req.body;

    // Kiểm tra xem tất cả các trường cần thiết có được truyền vào không
    if (!MaSuKien || !MaNguoiDung || !TenNguoiDung || !NgayDangKy || !TrangThaiDangKy) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const result = await DangKySuKien.registerUserForEvent(MaSuKien, MaNguoiDung, TenNguoiDung, NgayDangKy, TrangThaiDangKy);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerController };
