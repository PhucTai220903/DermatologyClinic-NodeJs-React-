const _repository = require("../repositories/sub.repository");

class MedicineService {
  async getAll() {
    return await _repository.medicineRepository.getAll();
  }

  async getById(id) {
    return await _repository.medicineRepository.getById(id);
  }

  async searchByName(name) {
    const medicine = await _repository.medicineRepository.searchByName(name);
    if (medicine.length === 0)
      throw Object.assign(new Error("Không tìm thấy sản phẩm"), {
        status: 404,
      });
    return medicine;
  }

  async add(entity) {
    await _repository.medicineRepository.add(entity);
    return "Thêm thành công";
  }

  async update(entity) {
    await _repository.medicineRepository.update(entity.id, entity);
    return "Cập nhật thành công";
  }

  async delete(id) {
    await _repository.medicineRepository.delete(id);
    return "Xóa thành công";
  }
}

module.exports = new MedicineService();
