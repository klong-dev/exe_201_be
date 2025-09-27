// User model - chỉ chứa properties/schema definition
class User {
    constructor(userData = {}) {
        this.id = userData.id || null;
        this.username = userData.username || '';
        this.email = userData.email || '';
        this.password = userData.password || '';
        this.role = userData.role || 'user';
        this.created_at = userData.created_at || null;
        this.updated_at = userData.updated_at || null;
    }

    // Utility method to convert to plain object (remove sensitive data)
    toJSON() {
        const { password, ...userObject } = this;
        return userObject;
    }

    // Utility method to check if user is admin
    isAdmin() {
        return this.role === 'admin';
    }

    // Utility method to check if user is regular user
    isUser() {
        return this.role === 'user';
    }
}

module.exports = User;