const db = require('../database/database');

class Support {
    static async create(data) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO support_requests (user_name, user_email, support_type, description, status)
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    data.user_name,
                    data.user_email,
                    data.support_type,
                    data.description,
                    data.status || 'open'  // O status padrão é 'open'
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

    static async list() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM support_requests`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE support_requests SET status = ? WHERE id = ?`,
                [status, id],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ success: true });
                }
            );
        });
    }
}

module.exports = Support;
