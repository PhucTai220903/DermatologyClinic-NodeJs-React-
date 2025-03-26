const _repository = require("../repositories/sub.repository");

class ComesticService {
  async getAll() {
    return await _repository.comesticRepository.getAll();
  }

  async getById(id) {
    return await _repository.comesticRepository.getById(id);
  }

  async searchByName(comesticName) {
    const cosmestic = await _repository.comesticRepository.searchByName(
      comesticName
    );

    if (cosmestic.length === 0) {
      throw Object.assign(new Error("Không tìm thấy sản phẩm"), {
        status: 404,
      });
    }

    return cosmestic;
  }

  async sortByPrice(type) {
    const sortedList = await _repository.comesticRepository.sortByPrice(type);
    return sortedList;
  }

  async add(entity) {
    const existingComestic = await _repository.comesticRepository.getByName(
      entity.name
    );
    if (existingComestic)
      throw Object.assign(new Error("Sản phẩm nãy đã tồn tại trước đó"), {
        status: 400,
      });

    entity.image = `/src/assets/general/${entity.image}`;
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
