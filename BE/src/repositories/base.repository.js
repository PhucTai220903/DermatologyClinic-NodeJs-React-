const models = require("../models"); 

class BaseRepository {
    constructor(modelName) {
        this.model = models[modelName]; 

        if (!this.model) {
            throw new Error(`Model '${modelName}' không tồn tại.`);
        }
    }

    async getAll() {
        return await this.model.find();
    }

    async getById(id) {
        return await this.model.findById(id);
    }

    async getByName(entityName) {
        return await this.model.findOne({ name: entityName });
    }
    
    async find(entity_ids)
    {
        return await this.model.find({_id: { $in: entity_ids}}); // use $in for faster query
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
