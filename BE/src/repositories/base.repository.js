const models = require("../models"); 

class BaseRepository {
    constructor(modelName) {
        this.model = models[modelName]; 
    }

    async getAll() {
        return await this.model.find();
    }

    async getById(id) {
        return await this.model.findById(id);
    }

    async add(data) {
        const item = new this.model(data);
        return await item.save();
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;
