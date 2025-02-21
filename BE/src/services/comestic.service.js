const _comesticRepository = require("../repositories/comestic.repository");

class ComesticService {
    async getAll() {
        return await _comesticRepository.getAll();
    }

    async getById(id) {
        return await _comesticRepository.getById(id);
    }

    async add(entity) {
        await _comesticRepository.add(entity);
        return "Thêm sản phảm thành công";
    }

    async update(id, entity) {
        await _comesticRepository.update(id, entity);
        return "Đã cập nhật thành công";
    }

    async delete(id) {
        await _comesticRepository.delete(id);
        return "Đã xóa thành công";
    }
}

module.exports = new ComesticService();
