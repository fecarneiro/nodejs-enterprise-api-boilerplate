import { BaseRepository } from './base.repository.js';

class PostRepository extends BaseRepository {

    constructor(db) {
        super('posts', db);
    }

    // Method to create a new post
    create(user_id, content) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.tableName} (user_id, content) VALUES (?, ?)`;
            this.db.run(query, [user_id, content], function (err) {
                if (err) {
                    console.error('Error creating post:', err);
                    return reject(new Error('Error creating post.'));
                }
                resolve({ id: this.lastID, user_id, content });
            });
        });
    }

    // Method to list all posts
    findAll() {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT posts.id, posts.content, posts.user_id, users.username
            FROM ${this.tableName}
            JOIN users ON posts.user_id = users.id
            `;
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error listing posts:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    // Method to update a post
    update(id, content) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${this.tableName} SET content = ? WHERE id = ?`;
            this.db.run(query, [content, id], function (err) {
                if (err) {
                    console.error('Error updating post:', err);
                    return reject(new Error('Error updating post.'));
                }
                resolve({ id, content });
            });
        });
    }

    // Method to delete a post
    delete(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
            this.db.run(query, [id], function (err) {
                if (err) {
                    console.error('Error deleting post:', err);
                    return reject(new Error('Error deleting post.'));
                }
                resolve({ id });
            });
        });
    }
}

export default PostRepository;
