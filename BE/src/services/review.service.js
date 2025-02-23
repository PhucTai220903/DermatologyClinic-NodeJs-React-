const _repository = require("../repositories/sub.repository");
// dang sua o day

class ReviewService {
    async add(currentUserId, review) {
        const existingComestic = await _repository.comesticRepository.getById(review.comestic_id);

        if(!existingComestic) {
            const error = new Error("Không tìm thấy mỹ phẩm này");
            error.status = 404; 
            throw error;
        }

        review.customer_id = currentUserId;
        existingComestic.reviews.push(review);
        await _repository.comesticRepository.add(existingComestic);
        return "Thêm thành công";
    }

    async update(updatedReview) {
        const existingComestic = await _repository.comesticRepository.getById(updatedReview.comestic_id);

        if(!existingComestic) {
            const error = new Error("Không tìm thấy mỹ phẩm này");
            error.status = 404; 
            throw error;
        }

        const existingReview = existingComestic.reviews.id(updatedReview.review_id);

        if(!existingReview) {
            const error = new Error("Không tìm thấy bình luậnluận này");
            error.status = 404; 
            throw error;
        }
        
        existingReview.comment = updatedReview.comment || existingReview.comment; // khác null, undefined,0, false
        existingReview.rating = updatedReview.rating ?? existingReview.rating // khác null và undefined
        existingReview.createdAt = Date.now();

        await _repository.comesticRepository.update(existingComestic.id, existingComestic);
        return "Đã cập nhật thành công";
    }

    async delete(reviewToDelete) {
        const existingComestic = await _repository.comesticRepository.getById(reviewToDelete.comestic_id);

        if(!existingComestic) {
            const error = new Error("Không tìm thấy mỹ phẩm này");
            error.status = 404; 
            throw error;
        }

        const existingReview = existingComestic.reviews.id(reviewToDelete.review_id);

        if(!existingReview) {
            const error = new Error("Không tìm thấy bình luận này");
            error.status = 404; 
            throw error;
        }
        
        existingComestic.reviews.splice(existingReview,1);

        await _repository.comesticRepository.update(existingComestic.id, existingComestic);
        return "Đã cập nhật thành công";
    }
}

module.exports = new ReviewService();
