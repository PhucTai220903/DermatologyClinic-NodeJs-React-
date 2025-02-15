const userRepository = require("../repositories/user.repository");

class UserService {
    async getAllUsers() {
        return await userRepository.getAllUsers();
    }

    async getUserById(id) {
        return await userRepository.getUserById(id);
    }

    async createUser(userData) {
        return await userRepository.createUser(userData);
    }

    async updateUser(id, userData) {
        return await userRepository.updateUser(id, userData);
    }

    async deleteUser(id) {
        return await userRepository.deleteUser(id);
    }
}

module.exports = new UserService();
