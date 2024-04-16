const connection = require('../../config/db.config');

let findUserByEmail = (email) => {
    email = decodeURIComponent(email);

    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * FROM nguoidung WHERE email = ?", email, function(error, rows) {
                if (error) {
                    reject(error);
                } else {
                    if (rows.length > 0) {
                        let user = rows[0];
                        resolve(user);
                    } else {
                        reject({ message: "User not found" });
                    }
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let compareUserPassword = (user, password) => {
    // So sánh mật khẩu người dùng với mật khẩu không mã hóa trong cơ sở dữ liệu
    return user.password === password;
};

let findUserById = (MaNguoiDung) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * FROM nguoidung WHERE MaNguoiDung = ?", MaNguoiDung, function(error, rows) {
                if (error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    compareUserPassword: compareUserPassword,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById
};
