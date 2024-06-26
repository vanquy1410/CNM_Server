'use strict';
const dbConn = require('../../config/db.config');

console.log(dbConn.pool);

var DangKySuKien = function DangKySuKien(dangkysukien) {
    this.MaDangKy = dangkysukien.MaDangKy;
    this.MaSuKien = dangkysukien.MaSuKien;
    this.MaNguoidung = dangkysukien.MaNguoidung;
    this.TenNguoiDung = dangkysukien.TenNguoiDung;
    this.NgayDangKy = dangkysukien.NgayDangKy || new Date(); // Sử dụng ngày hiện tại nếu không có dữ liệu được truyền vào
    this.TrangThaiDangKy = dangkysukien.TrangThaiDangKy || 'Chưa xác định'; // Mặc định là 'Chưa xác định' nếu không có dữ liệu được truyền vào
    this.trangThai = dangkysukien.trangThai;
}

DangKySuKien.registerUserForEvent = function(MaSuKien, MaNguoiDung, TenNguoiDung, NgayDangKy, TrangThaiDangKy) {
    return new Promise((resolve, reject) => {
        const registration = {
            MaSuKien: MaSuKien,
            MaNguoiDung: MaNguoiDung,
            TenNguoiDung: TenNguoiDung,
            NgayDangKy: NgayDangKy || new Date(), // Sử dụng ngày hiện tại nếu không có dữ liệu được truyền vào
            TrangThaiDangKy: TrangThaiDangKy || 'Chưa xác định' // Mặc định là 'Chưa xác định' nếu không có dữ liệu được truyền vào
        };
        
        dbConn.query("INSERT INTO dangky_sukien SET ?", registration, function(err, res) {
            if (err) {
                console.log("error: ", err);
                reject(err);
            } else {
                console.log("Registration successful");
                resolve("Registration successful");
            }
        });
    });
};

module.exports = DangKySuKien;
