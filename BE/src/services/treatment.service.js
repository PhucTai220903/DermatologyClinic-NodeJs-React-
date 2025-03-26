const _repository = require("../repositories/sub.repository");

class TreartmentService {
  async getAll() {
    return await _repository.treatmentRepository.getAll();
  }

  async getById(id) {
    return await _repository.treatmentRepository.getById(id);
  }

  async searchByName(treatmentName) {
    const treatment = await _repository.treatmentRepository.searchByName(
      treatmentName
    );

    if (treatment.length === 0) {
      throw Object.assign(new Error("Không tìm thấy sản phẩm"), {
        status: 404,
      });
    }

    return treatment;
  }

  async add(entity) {
    await _repository.treatmentRepository.add(entity);
    return "Thêm thành công";
  }

  async update(entity) {
    await _repository.treatmentRepository.update(entity.id, entity);
    return "Cập nhật thành công";
  }

  async delete(id) {
    await _repository.treatmentRepository.delete(id);
    return "Xóa thành công";
  }
}

module.exports = new TreartmentService();
