const Comestic = require("../models/comestic.model");

class ComesticRepository {
    async getAll() {
        return await Comestic.find();
    }

    async getById(id) {
        return await Comestic.findById(id);
    }

    async add(ComesticData) {
        const comestic = new Comestic(ComesticData);
        return await comestic.save();
    }

    async update(id, ComesticData) {
        return await Comestic.findByIdAndUpdate(id, ComesticData, { new: true });
    }

    async delete(id) {
        return await Comestic.findByIdAndDelete(id);
    }
}

module.exports = new ComesticRepository();
