const _appointmentService = require("../services/appointment.service");

exports.getAll = async (req, res) => {
    try {
        const appointments = await _appointmentService.getAll();
        res.json(appointments);
    } catch {
        res.status(500).json({ message: err.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({ message: "Thiếu ID lịch hẹn" });
        const appointment = await _appointmentService.getById(id);
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server: ", error });
    }
};

exports.addByCustomer = async (req, res) => {
    try {
        var currentUserId = req.user.id;
        const appointmentToAdd = await _appointmentService.add(currentUserId, req.body);
        res.status(200).json({ message: appointmentToAdd });
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
};

exports.addByPharmacist = async (req, res) => {
    try {
        const appointmentToAdd = await _appointmentService.add(req.body.customer_id, req.body);
        res.status(200).json({ message: appointmentToAdd });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updateAppointment = await _appointmentService.update(req.params.id, req.body);
        if (!updateappointment) return res.status(404).json({ message: "Không tồn tại mỹ phẩm này" });
        res.json({ message: updateAppointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedAppointment = await _appointmentService.delete(req.params.id);
        if (!deletedAppointment) return res.status(404).json({ messgae: "Không tồn tại mỹ phẩm này" });
        res.json(deletedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}