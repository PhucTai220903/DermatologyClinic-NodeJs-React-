const _comesticService = require("../services/comestic.service");
const _reviewService = require("../services/review.service");

// Products
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

exports.addComestic = async (req,res) =>{
    try{
        const comesticToAdd = await _comesticService.add(req.body);
        res.status(200).json({ message: comesticToAdd });
    }catch (error){
        res.status(400).json({ message: error.message });
    }
};

exports.updateComestic = async (req, res) =>{
    try{
        const updateComestic = await _comesticService.update(req.params.id, req.body);
        if(!updateComestic) return res.status(404).json({message: "Không tồn tại mỹ phẩm này"});
        res.json({ message: updateComestic });
    } catch(error)
    {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteComestic = async (req, res) =>{
    try{
        const deletedComestic = await _comesticService.delete(req.body.id);
        if(!deletedComestic) return res.status(404).json({messgae: "Không tồn tại mỹ phẩm này"});
        res.json(deletedComestic);
    }catch(error)
    {
        res.status(400).json({ message: err.message });
    }
}

// Reviews
// exports.addReview() = async (req,res) => {
//     try{
//         const { customer_id, comment, rating } = req.body;
//         const addedReview = await _reviewService(req.body.id);
//         if(!addedReview) return res.status(404).json({messgae: "Không tồn tại review này"});

//     } catch (err)
//     {

//     }
// };

// exports.updateReview() = async (req,res) => {
//     try{

//     } catch (err)
//     {

//     }
// };

// exports.deleteReview() = async (req,res) => {
//     try{

//     } catch (err)
//     {

//     }
// };