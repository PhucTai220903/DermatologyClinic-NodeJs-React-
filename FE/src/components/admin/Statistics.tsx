import { useEffect, useState } from "react";
import staticticsApi from "../../api/statictics.api";
import transactionApi from "../../api/transaction.api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DailyData {
  date: string;
  amount: number;
}

export default function Statistics() {
  const [dataStatistics, setDataStatistics] = useState<DailyData[]>([]);
  const [dataStatisticsTransaction, setDataStatisticsTransaction] = useState<
    any[]
  >([]);

  useEffect(() => {
    const fetchDataStatisticsChart = async () => {
      const response = await staticticsApi.getByWeek();
      const formattedData = Object.entries(response.data).map(
        ([date, amount]) => ({
          date: date,
          amount: Number(amount),
        })
      );
      setDataStatistics(formattedData);
    };

    const fetchDataStatisticsTransaction = async () => {
      const response = await transactionApi.getAll();
      setDataStatisticsTransaction(response.data);
    };
    fetchDataStatisticsChart();
    fetchDataStatisticsTransaction();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">
            Thống kê doanh thu theo ngày
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataStatistics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value.toLocaleString()} đ`,
                  "Doanh thu",
                ]}
                labelFormatter={(label) => `Ngày: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                name="Doanh thu"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">
            Danh sách giao dịch
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Mã giao dịch</th>
                  <th className="px-4 py-2">Phương thức thanh toán</th>
                  <th className="px-4 py-2">Điểm sử dụng</th>
                  <th className="px-4 py-2">Tổng tiền</th>
                  <th className="px-4 py-2">Ngày tạo</th>
                  <th className="px-4 py-2">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {dataStatisticsTransaction.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">#{transaction._id}</td>
                    <td className="px-4 py-2">
                      {transaction.payment_method === "delivery"
                        ? "Vận chuyển"
                        : "Nhận tại cửa hàng"}
                    </td>
                    <td className="px-4 py-2">
                      {transaction.points_used.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{transaction.amount} đ</td>
                    <td className="px-4 py-2">
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {transaction.status === "completed"
                        ? "Hoàn tất"
                        : transaction.status === "cancelled"
                        ? "Đã hủy"
                        : transaction.status === "considering_refund"
                        ? "Đang xem xét hoàn tiền"
                        : transaction.status === "refund_successfully"
                        ? "Hoàn tiền thành công"
                        : "Đang xử lý"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
