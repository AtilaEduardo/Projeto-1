const db = require('../database/database');

class Product {
    static async create(data) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO products (name, description, price, amount, category, image, offers, coupons, user_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.name,
                    data.description,
                    data.price,
                    data.amount,
                    data.category,
                    data.image,
                    data.offers ? 1 : 0, 
                    data.coupons ? 1 : 0, 
                    data.user_id
                ],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ id: this.lastID });
                }
            );
        });
    }
    

    static async listByUser(userId) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM products WHERE user_id = ?`, [userId], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = Product;
