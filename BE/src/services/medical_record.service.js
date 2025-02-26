const _repository = require("../repositories/sub.repository");

class Medical_RecordService {
    async getAll() {
        return await _repository.medical_RecordRepository.getAll();
    }

    async getById(id) {
        return await _repository.medical_RecordRepository.getById(id);
    }

    async add(currentUserId, entity) {
        entity.doctor_id = currentUserId;
        await _repository.medical_RecordRepository.add(entity);
        return "Thêm thành công";
    }

    async update(id, status) {
        const medical_recordSelected = await this.getById(id);
        if (!medical_recordSelected)
            throw Object.assign(new Error("Không tìm thấy hồ sơ bệnh án này"), { status: 404 });

        medical_recordSelected.isHdden = status;
        await _repository.medical_RecordRepository.update(id, medical_recordSelected);

        return "Cập nhật thành công";
    }
}

module.exports = new Medical_RecordService();