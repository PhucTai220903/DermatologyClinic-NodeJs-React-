const _repository = require("../repositories/sub.repository");

class ReviewService {
    async add(currentUserId, review) {
        const existingComestic = await _repository.comesticRepository.getById(review.comestic_id);
        if (!existingComestic) {
            throw Object.assign(new Error("Không tìm thấy mỹ phẩm này"), { status: 404 });
        }
    
        review.customer_id = currentUserId;
        existingComestic.reviews.push(review);
    
        this.calculateAverageRating(existingComestic);
        
        await _repository.comesticRepository.update(existingComestic.id, existingComestic);
        return "Thêm thành công";
    }
    
    async update(currentUserId, updatedReview) {
        const existingComestic = await _repository.comesticRepository.getById(updatedReview.comestic_id);
        
        if (!existingComestic) 
            throw Object.assign(new Error("Không tìm thấy mỹ phẩm này"), { status: 404 });

        const existingReview = existingComestic.reviews.id(updatedReview.review_id);
        if (!existingReview) 
            throw Object.assign(new Error("Không tìm thấy bình luận này"), { status: 404 });

        const checkIfCurrentUserReview = existingReview.customer_id.equals(currentUserId);
        if (!checkIfCurrentUserReview)
            throw Object.assign(new Error("Bạn không có quyền chỉnh sửa review này"), { status: 403 });
    
        existingReview.comment = updatedReview.comment || existingReview.comment;
        existingReview.rating = updatedReview.rating ?? existingReview.rating;
        existingReview.createdAt = Date.now();
    
        this.calculateAverageRating(existingComestic);
    
        await _repository.comesticRepository.update(existingComestic.id, existingComestic);
        return "Đã cập nhật thành công";
    }
    
    async delete(currentUserId, reviewToDelete) {
        const existingComestic = await _repository.comesticRepository.getById(reviewToDelete.comestic_id);
        if (!existingComestic) 
            throw Object.assign(new Error("Không tìm thấy mỹ phẩm này"), { status: 404 });

        const existingReview = existingComestic.reviews.id(reviewToDelete.review_id);
        if (!existingReview) 
            throw Object.assign(new Error("Không tìm thấy bình luận này"), { status: 404 });

        const checkIfCurrentUserReview = existingReview.customer_id.equals(currentUserId);
        if (!checkIfCurrentUserReview)
            throw Object.assign(new Error("Bạn không có quyền chỉnh sửa review này"), { status: 403 });

        existingComestic.reviews.splice(existingReview,1); 
        // array.splice(start, deleteCount, item1, item2, ...); delete, item is optional

        this.calculateAverageRating(existingComestic);

        await _repository.comesticRepository.update(existingComestic.id, existingComestic);
        return "Đã cập nhật thành công";
    }

    calculateAverageRating(comestic) {
        if (comestic.reviews.length === 0) {
            comestic.rating = 0;
        } else {
            comestic.averageRating = Math.floor((comestic.reviews.reduce((sum, r) => sum + r.rating, 0) / comestic.reviews.length) * 10) / 10;
            // array.reduce((accumulator, currentValue) => { ... }, initialValue);
        }
    }
}

module.exports = new ReviewService();
