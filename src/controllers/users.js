const UserService = require('../services/user');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await UserService.getAllUsers(page, limit);

            res.status(200).json({
                message: 'Users retrieved successfully',
                data: result.users,
                pagination: result.pagination
            });
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}

module.exports = UserController;
