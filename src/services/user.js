const User = require('../models/users.model');
const { query } = require('../config/database');
const { env } = require('../config/env');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
    static async getAllUsers(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const users = await this.findAll(limit, offset);

            return {
                users: users.map(user => user.toJSON()),
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    offset
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
