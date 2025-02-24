const _repository = require("../repositories/sub.repository");

class ComesticService {
    async getAll() {
        return await _repository.comesticRepository.getAll();
    }

    async getById(id) {
        return await _repository.comesticRepository.getById(id);
    }

    async getByName(comesticName) {
        const cosmestic =  await _repository.comesticRepository.getByName(comesticName);

        if(!cosmestic) {
            const error = new Error("Không tìm thấy sản phẩm");
            error.status = 404;
            throw error;   
        }

        return cosmestic;
    }

    async sortByPrice(type) {
        const sortedList = await _repository.comesticRepository.sortByPrice(type);
        return sortedList;
    }

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

module.exports = new ComesticService();
