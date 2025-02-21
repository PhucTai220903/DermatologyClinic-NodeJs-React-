const _comesticService = require("../services/comestic.service");

exports.getAll = async (req,res) =>{
    try{
        const comestics = await _comesticService.getAll();
        res.json(comestics);
    }catch{
        res.status(500).json({ message: err.message });
    }
}

exports.getById = async (req,res) =>{
    try{
        const {id} = req.params;
        if(!id)
            return res.status(400).json({message: "Thiếu ID mỹ phẩm"});
        const comestic = await _comesticService.getById(id);
        res.json(comestic);
    }catch(error)
    {
        res.status(500).json({message: "Lỗi server: ", error});
    }
};

exports.add = async (req,res) =>{
    try{
        const comesticToAdd = await _comesticService.add(req.body);
        res.status(200).json(comesticToAdd);
    }catch (error){
        res.status(400).json({ message: err.message });
    }
};

exports.update= async (req, res) =>{
    try{
        const updateComestic = await _comesticService.update(req.params.id, req.body);
        if(!updateComestic) return res.status(404).json({message: "Không tồn tại mỹ phẩm này"});
        res.json({ message: updateComestic });
    } catch(error)
    {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) =>{
    try{
        const deletedComestic = await _comesticService.delete(req.params.id);
        if(!deletedComestic) return res.status(404).json({messgae: "Không tồn tại mỹ phẩm này"});
        res.json(deletedComestic);
    }catch(error)
    {
        res.status(400).json({ message: err.message });
    }
}