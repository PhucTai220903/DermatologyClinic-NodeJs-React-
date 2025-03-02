const _repository = require("../repositories/sub.repository");

class transactionService {
    async getAll() {
        return await _repository.transactionRepository.getAll();
    }

    async getById(id) {
        return await _repository.transactionRepository.getById(id);
    }

    async add(entity){
        await _repository.transactionRepository.add(entity);
        return "Thêm thành công";
    }

    async update(entity)
    {
        await _repository.transactionRepository.update(entity.id,entity);
        return "Cập nhật thành công";
    }

    async delete(id){
        await _repository.transactionRepository.delete(id);
        return "Xóa thành công";
    }
}

module.exports = new transactionService();