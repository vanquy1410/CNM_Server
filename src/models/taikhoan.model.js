'use strict';
var dbConn = require('./../../config/db.config');

var TaiKhoan = function TaiKhoan(taikhoan) {
    this.MaTaiKhoan = taikhoan.MaTaiKhoan;
    this.TenTaiKhoan = taikhoan.TenTaiKhoan;
    this.MatKhau = taikhoan.MatKhau;
    this.SoDienThoai = taikhoan.SoDienThoai;
    this.Email = taikhoan.Email;
    this.DiaChi = taikhoan.DiaChi;
    this.trangThai = taikhoan.trangThai;
}

// Thay vì đặt tên là getAll, chúng ta sẽ đặt tên là findall
TaiKhoan.findall = function (result) {
    dbConn.query("SELECT * FROM taikhoan WHERE trangThai = 1", function (err, res) {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};


TaiKhoan.getOne = function (MaTaiKhoan, result) {
    dbConn.query("SELECT * FROM taikhoan WHERE MaTaiKhoan = ?", [MaTaiKhoan], function (err, res) {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

TaiKhoan.getIdBySDT = function (SoDienThoai, result) {
    dbConn.query("SELECT * FROM taikhoan WHERE SoDienThoai = ?", [SoDienThoai], function (err, res) {
        if (err) {
            console.log("Error:", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

TaiKhoan.findOne = function (conditions) {
    return new Promise((resolve, reject) => {
        let sqlQuery = "SELECT * FROM taikhoan WHERE ";
        let conditionClauses = [];
        for (let key in conditions) {
            if (conditions.hasOwnProperty(key)) {
                conditionClauses.push(`${key} = ${dbConn.escape(conditions[key])}`);
            }
        }
        if (conditionClauses.length === 0) {
            reject("No conditions provided");
            return;
        }
        sqlQuery += conditionClauses.join(' AND ');

        dbConn.query(sqlQuery, function (err, res) {
            if (err) {
                console.log("Error:", err);
                reject(err);
            } else {
                if (res.length > 0) {
                    resolve(res[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
};



TaiKhoan.create = function (taikhoan, result) {
    dbConn.query("INSERT INTO taikhoan SET ?", taikhoan, function (err, res) {
        if (err) {
            console.log("error: ", err);
            // Gửi lỗi thông qua hàm callback
            result(err, null);
        }
        else {
            console.log(res.insertId);
            // Gửi kết quả thành công thông qua hàm callback
            result(null, res.insertId);
        }
    });
};



TaiKhoan.update = function (MaTaiKhoan, taikhoan, result) { // Ensure result is a function
    dbConn.query("UPDATE taikhoan SET TenTaiKhoan=?, MatKhau=?, SoDienThoai=?, Email=?, DiaChi=? WHERE MaTaiKhoan = ?", 
    [taikhoan.TenTaiKhoan, taikhoan.MatKhau, taikhoan.SoDienThoai, taikhoan.Email, taikhoan.DiaChi, MaTaiKhoan], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


TaiKhoan.delete = function (MaTaiKhoan, result) { // Ensure result is a function
    dbConn.query("UPDATE taikhoan SET trangThai=0 WHERE MaTaiKhoan = ?", [MaTaiKhoan], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};



TaiKhoan.findByUsername = function (SoDienThoai) {
    return new Promise((resolve, reject) => {
        dbConn.query("SELECT * FROM taikhoan WHERE SoDienThoai = ?", [SoDienThoai], function (err, res) {

            if (err) {
                console.log("Error:", err);
                reject(err);
            } else {
                console.log(res);
                resolve(res);
            }
        });
    });
};
module.exports = TaiKhoan;