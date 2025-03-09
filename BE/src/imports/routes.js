const comesticRoutes = require("../routes/comestic.route");
const authRoutes = require("../routes/auth.route");
const userRoutes = require("../routes/user.route");
const appointmentRoutes = require("../routes/appointment.route");
const medicineRoutes = require("../routes/medicine.route");
const medical_recordRoutes = require("../routes/medical_record.route");
const cart = require("../routes/cart.route");
const order = require("../routes/order.route");
const treatment = require("../routes/treatment.route");
const transaction = require("../routes/transaction.route");
const statistic = require("../routes/statistic.route");
const schedule = require("../routes/schedule.route");
const otp = require("../routes/otp.route");

module.exports = {
    comesticRoutes,
    authRoutes,
    userRoutes,
    appointmentRoutes,
    medicineRoutes,
    medical_recordRoutes,
    cart,
    order,
    treatment,
    transaction,
    statistic,
    schedule,
    otp
};
