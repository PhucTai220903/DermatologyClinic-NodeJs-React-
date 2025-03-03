const Status_Transaction_ENUM = require("../enums/status_transaction.enum");
const _repository = require("../repositories/sub.repository");

class transactionService {
    async getAll() {
        return await _repository.transactionRepository.getAll();
    }

    async getById(id) {
        return await _repository.transactionRepository.getById(id);
    }

    async add(entity) {
        await _repository.transactionRepository.add(entity);
        return "Thêm thành công";
    }

    async update(entity) {
        await _repository.transactionRepository.update(entity.id, entity);
        return "Cập nhật thành công";
    }

    async delete(id) {
        await _repository.transactionRepository.delete(id);
        return "Xóa thành công";
    }

    /*
    For customer
    {
    "transaction_id": "67c48b03d6e253837087d113",
    "status": "refund"
    }
    */
    async update(customer_id = null, transactionRequest) {
        let updateEntities = [];
        const existingTransaction = await _repository.transactionRepository.getById(transactionRequest.transaction_id);
        if (!existingTransaction)
            throw Object.assign(new Error("Không tìm thấy giao dịch này"), { status: 404 });

        if(existingTransaction.status === transactionRequest)
            throw Object.assign(new Error("Yêu cầu đã được thực hiện trước đó"), { status: 500 });

        switch (transactionRequest.status) {
            case Status_Transaction_ENUM.REFUND:
                existingTransaction.status = Status_Transaction_ENUM.CONSIDERING_REFUND;
                break;
            case Status_Transaction_ENUM.CANCELLED:
                existingTransaction.status = Status_Transaction_ENUM.CANCELLED;
                const updatedCustomer1 = await this.#UpdateCustomerEntity(customer_id, existingTransaction);
                updateEntities.push(_repository.userRepository.update(customer_id, updatedCustomer1));
                break;
            case Status_Transaction_ENUM.REFUND_SUCCESSFULLY:
                existingTransaction.status = Status_Transaction_ENUM.REFUND_SUCCESSFULLY;
                const updatedCustomer2 = await this.#UpdateCustomerEntity(existingTransaction.customer_id, existingTransaction);
                updateEntities.push(_repository.userRepository.update(existingTransaction.customer_id, updatedCustomer2));
                break;
        }
    
        updateEntities.push(_repository.transactionRepository.update(existingTransaction.id, existingTransaction));
    
        await Promise.all(updateEntities);
    
        return "Gửi yêu cầu thành công. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất";
    }
        
    // # is private
     async #UpdateCustomerEntity(customer_id, existingTransaction) { 
        const customer_refunded = await _repository.userRepository.getById(customer_id);
        if (!customer_refunded)
            throw Object.assign(new Error("Không tìm thấy khách hàng"), { status: 404 });
    
        customer_refunded.membership.points -= (existingTransaction.points_earned - existingTransaction.points_used);
        customer_refunded.membership.total_spent -= existingTransaction.amount;
    
        return customer_refunded; // Trả về object đã cập nhật
    }
}

module.exports = new transactionService();