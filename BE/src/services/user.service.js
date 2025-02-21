const _userRepository = require("../repositories/user.repository");

class UserService {
    async getAll() {
        return await _userRepository.getAll();
    }

    async getById(id) {
        return await _userRepository.getById(id);
    }

    async create(entity) {
        return await _userRepository.create(entity);
    }

    async update(id, entity) {
        return await _userRepository.update(id, entity);
    }

    async delete(id) {
        return await _userRepository.delete(id);
    }
}

module.exports = new UserService();
