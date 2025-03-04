const _repository = require("../repositories/sub.repository");
const dayjs = require('dayjs');

class StatisticService {
    async getByDate() {
        const today = "2025-03-04";   // dayjs().format('YYYY-MM-DD');     
        const transactions = await _repository.transactionRepository.getByDate(today);
        const totalRevenue = transactions
        .filter(transaction => transaction.status === "completed") 
        .reduce((sum, transaction) => sum + transaction.amount, 0); 
    
        return { amount: totalRevenue };
    }

    async getByWeek() {
        const today = dayjs();
        const startOfWeek = today.startOf('week').add(1, 'day').toDate(); // +1 do lấy chủ nhật là ngày đầu tuần
        const endOfWeek = today.endOf('week').toDate();
    
        const transactions = await _repository.transactionRepository.getByWeek(startOfWeek, endOfWeek);
    
        const revenueByDay = {};
    
        for (let i = 0; i < 7; i++) {
            const dateKey = dayjs(startOfWeek).add(i, 'day').format('YYYY-MM-DD');
            revenueByDay[dateKey] = 0;
        }
    
        transactions.forEach(transaction => {
            const dateKey = dayjs(transaction.createdAt).format('YYYY-MM-DD');
            if (revenueByDay[dateKey] !== undefined && transaction.status === "completed") {
                revenueByDay[dateKey] += transaction.amount;
            }
        });
    
        return revenueByDay;
    }
}

module.exports = new StatisticService();