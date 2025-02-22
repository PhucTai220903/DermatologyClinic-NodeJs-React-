const _repository = require("../repositories/sub.repository");

class ReviewService {
    async add(entity) {
        await _repository.comesticRepository.add(entity);
        return "Thêm thành công";
    }

    async update(id, entity) {
        await _repository.comesticRepository.update(id, entity);
        return "Đã cập nhật thành công";
    }

    async delete(id) {
        await _repository.comesticRepository.delete(id);
        return "Đã xóa thành công";
    }
}

module.exports = new ReviewService();
