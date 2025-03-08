const _repository = require("../repositories/sub.repository");
const PDFDocument = require("pdfkit-table");
const fs = require('fs');

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

    async export_record(medical_record_id, res) {
        const recordToExport = await _repository.medical_RecordRepository.getById(medical_record_id);
        if (!recordToExport)
            throw Object.assign(new Error("Không tìm thấy hồ sơ bệnh án này"), { status: 404 });

        const [customer_info, doctor_info] = await Promise.all([
            _repository.userRepository.getById(recordToExport.customer_id),
            _repository.userRepository.getById(recordToExport.doctor_id),
        ]);

        // Tạo tài liệu PDF mới
        const doc = new PDFDocument();
        const fileName = `record_${medical_record_id}.pdf`;

        // Thiết lập response header
        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.setHeader("Content-Type", "application/pdf");

        // Pipe dữ liệu PDF trực tiếp đến response
        doc.pipe(res);

        // Tiêu đề hồ sơ bệnh án
        doc.fontSize(18).text(`Medical Record: ${recordToExport.id}`, { align: "center" });

        doc.moveDown();
        doc.fontSize(12).text(`Customer Name: ${customer_info?.name || "Unknown"}`);
        doc.text(`Doctor: ${doctor_info?.name || "Unknown"}`);
        doc.text(`Diagnosis: ${recordToExport.diagnosis}`);
        doc.text(`Created At: ${recordToExport.createdAt}`);

        if (recordToExport.prescription && recordToExport.prescription.length > 0) {
            doc.moveDown();
            doc.fontSize(14).text("Prescription Details:", { underline: true });

            const comesticIds = recordToExport.prescription
                .filter(item => item.type === "comestic")
                .map(item => item.item_id);

            const medicineIds = recordToExport.prescription
                .filter(item => item.type === "medicine")
                .map(item => item.item_id);

            const treatmentIds = recordToExport.prescription
                .filter(item => item.type === "treatment")
                .map(item => item.item_id);

            const [comestics, medicines, treatments] = await Promise.all([
                comesticIds.length ? _repository.comesticRepository.find(comesticIds) : [],
                medicineIds.length ? _repository.medicineRepository.find(medicineIds) : [],
                treatmentIds.length ? _repository.treatmentRepository.find(treatmentIds) : []
            ]);

            const comesticMap = Object.fromEntries(comestics.map(c => [c._id.toString(), c.name]));
            const medicineMap = Object.fromEntries(medicines.map(m => [m._id.toString(), m.name]));
            const treatmentMap = Object.fromEntries(treatments.map(t => [t._id.toString(), t.name]));

            const table = {
                headers: ["#", "Item Name", "Type", "Dosage", "Frequency", "Duration"],
                rows: recordToExport.prescription.map((item, index) => [
                    index + 1,
                    comesticMap[item.item_id.toString()] ||
                    medicineMap[item.item_id.toString()] ||
                    treatmentMap[item.item_id.toString()] ||
                    "Unknown",
                    item.type,
                    item.dosage,
                    item.frequency,
                    item.duration
                ])
            };

            await doc.table(table, {
                prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
                prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
            });
        }

        if (recordToExport.notes) { 
            doc.moveDown();
            doc.fontSize(14).text("Notes:", { underline: true });
            doc.fontSize(12).text(recordToExport.notes);
        }

        // Đợi file PDF hoàn thành rồi mới kết thúc response
        doc.end();
        doc.on("finish", function () {
            res.end();
        });
    }

}

module.exports = new Medical_RecordService();