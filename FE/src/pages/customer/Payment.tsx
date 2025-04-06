import styles from "../../assets/customer/payment/style.module.css";
import CityAPI from "../../api/city.api";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserAPI from "../../api/user.api";
import OrderApi from "../../api/oder.api";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
}

interface CartItem {
  _id: string;
  comestic_id: string;
  comestic_image: string;
  price: number;
  quantity: number;
  comestic_name: string;
}

interface CartData {
  _id: string;
  customer_id: string;
  items: CartItem[];
  type: string;
}

interface FormData {
  customer_id: string;
  items: any[];
  total_amount: Number;
  final_amount: Number;
  address: string;
  order_id: string;
  points_used: Number;
  payment_method: string;
}

const ProductItem = ({ product }: { product: CartItem }) => {
  return (
    <div className={styles.frame23}>
      <div className="row">
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <img
            className="rounded-4"
            width={150}
            height={200}
            src={product.comestic_image}
            alt={product.comestic_name}
          />
        </div>
        <div className="col-md-7">
          <div className={styles.productInfo}>
            <div className={styles.productName}>
              <span className={styles.productNameMain}>
                {product.comestic_name}
              </span>
            </div>
            <div className={styles.price}>
              Giá bán: {product.price.toLocaleString()} đ
            </div>
            <div className={styles.quantity}>Số lượng: {product.quantity}</div>
            <div className={styles.totalPrice}>
              Số tiền: {(product.price * product.quantity).toLocaleString()} đ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  const { user } = useAuth();
  const location = useLocation();
  const cartData = location.state?.cartData as CartData;
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<number>();
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<number>();
  const [specificAddress, setSpecificAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [pointToUse, setPointToUse] = useState<number>(0);
  const [pointError, setPointError] = useState<string>("");
  let [shippingFee, setShippingFee] = useState<number>(0);
  let [totalAmount, setTotalAmount] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [isSuccessfullyPayment, setIsSuccessfullyPayment] =
    useState<boolean>(false);

  const handlePaymentMethod = (method: string) => {
    setPaymentMethod(method);

    let newShippingFee = 0;
    if (method === "delivery") {
      newShippingFee = 30000;
      setShippingFee(30000);

      const fetchProvinces = async () => {
        const provinces = await CityAPI.getAllCity();
        setProvinces(provinces);
      };
      fetchProvinces();
      inputAddress();
    } else {
      setAddress("");
      setShippingFee(0);
    }

    setTotalAmount(
      (cartData?.items.reduce((sum, p) => sum + p.price * p.quantity, 0) || 0) +
        newShippingFee
    );
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvinceCode) {
        const districts = await CityAPI.getDistricts(
          selectedProvinceCode.toString()
        );
        setDistricts(districts);
      }
    };

    const fetchUser = async () => {
      const userToFetch = await UserAPI.getById(user?.id);
      setUserInfo(userToFetch.data);
    };
    fetchDistricts();
    fetchUser();
  }, [selectedProvinceCode]);

  useEffect(() => {
    inputAddress();
  }, [selectedDistrictCode]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrictCode(Number(e.target.value));
  };

  const handleSpecificAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpecificAddress(e.target.value);
  };

  useEffect(() => {
    if (selectedProvinceCode && selectedDistrictCode && specificAddress) {
      const provinceName = provinces.find(
        (p) => Number(p.code) === selectedProvinceCode
      )?.name;
      const districtName = districts.find(
        (d) => Number(d.code) === selectedDistrictCode
      )?.name;
      setAddress(`${specificAddress}, ${districtName}, ${provinceName}`);
    }
  }, [
    selectedProvinceCode,
    selectedDistrictCode,
    specificAddress,
    provinces,
    districts,
  ]);

  const inputAddress = () => {
    return (
      <div className="py-3">
        <h4>Chọn địa chỉ giao hàng</h4>
        <div className="d-flex gap-3">
          <div>
            <label className="form-label">
              Tỉnh/Thành phố:
              <select
                className="form-control"
                onChange={(e) =>
                  setSelectedProvinceCode(Number(e.target.value))
                }
                value={selectedProvinceCode}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {selectedProvinceCode && (
            <div className="d-flex gap-3">
              <div>
                <label className="form-label">
                  Quận/Huyện:
                  <select
                    className="form-control"
                    onChange={handleDistrictChange}
                    value={selectedDistrictCode}
                  >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label className="form-label">
                  Địa chỉ cụ thể:
                  <input
                    type="text"
                    className="form-control"
                    value={specificAddress}
                    onChange={handleSpecificAddressChange}
                    placeholder="Nhập địa chỉ chi tiết"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="py-3">
          <span className="fw-bold fs-5">Phí vận chuyển:</span>{" "}
          <span className="fw-bold text-danger fs-5">
            {shippingFee.toLocaleString()} đ
          </span>{" "}
        </div>
      </div>
    );
  };

  const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      setPointToUse(0);
      setPointError("");
      return;
    }

    if (!userInfo?.membership?.points) {
      setPointError("Không có điểm tích lũy");
      return;
    }

    if (value > userInfo.membership.points) {
      setPointError("Điểm tích lũy không được vượt quá số điểm hiện có");
      return;
    }

    if (value > totalAmount) {
      setPointError("Điểm tích lũy không được vượt quá tổng tiền");
      return;
    }

    setPointToUse(value);
    setPointError("");
  };

  const handleSubmit = async () => {
    const orderFormData = {
      customer_id: user?.id, // ok
      items: cartData?.items, // ok
      total_amount: totalAmount, // ok
      final_amount: finalAmount,
      address: address ? address : "",
      points_used: pointToUse,
      payment_method: paymentMethod,
    };

    const orderToAdd = await OrderApi.add(orderFormData);

    if (orderToAdd.status === 201) {
      showSuccessToast(orderToAdd.data.message);
      setIsSuccessfullyPayment(true);
    } else {
      showErrorToast(orderToAdd.data.message);
    }
  };

  // Tính tổng tiền
  let finalAmount = 0;
  switch (userInfo?.membership?.level) {
    case "gold":
      finalAmount = totalAmount - totalAmount * 0.1 - pointToUse;
      break;
    case "silver":
      finalAmount = totalAmount - totalAmount * 0.08 - pointToUse;
      break;
    case "bronze":
      finalAmount = totalAmount - totalAmount * 0.06 - pointToUse;
      break;
    default:
      finalAmount = totalAmount - pointToUse;
      break;
  }

  const displaySuccessfullyPayment = () => {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm p-5 text-center">
          <div className="mb-4">
            <i
              className="bi bi-check-circle-fill text-success"
              style={{ fontSize: "5rem" }}
            ></i>
          </div>
          <h2 className="fw-bold text-success mb-3">Thanh toán thành công!</h2>
          <p className="fs-5 mb-4">
            Cảm ơn quý khách đã mua sản phẩm của OSKIN.
          </p>
          <div className="bg-light p-4 rounded mb-4">
            <p className="mb-1 fs-6">
              Tổng thanh toán:{" "}
              <span className="fw-bold text-danger">
                {finalAmount.toLocaleString()} đ
              </span>
            </p>
            <p className="mb-0 fs-6">
              Phương thức thanh toán:{" "}
              <span className="fw-bold">
                {paymentMethod === "at_store"
                  ? "Nhận tại cửa hàng"
                  : "Vận chuyển"}
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-outline-primary px-4">
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return !isSuccessfullyPayment ? (
    <div className={styles.thanhtoan}>
      <div className={styles.frame22}>
        <div className={styles.sanpham}>Sản phẩm:</div>
        {cartData?.items.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}

        <div className={styles.frame25}>
          <div className="d-flex align-items-center">
            <div className="fw-bold">Phương thức thanh toán:</div>
            <div>
              <div className="d-flex gap-2 px-2">
                <button
                  className={`btn ${
                    paymentMethod === "at_store"
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => handlePaymentMethod("at_store")}
                >
                  Nhận tại cửa hàng
                </button>
                <button
                  className={`btn ${
                    paymentMethod === "delivery"
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => handlePaymentMethod("delivery")}
                >
                  Vận chuyển
                </button>
              </div>
            </div>
          </div>
          {paymentMethod === "delivery" && inputAddress()}
          <div className="d-flex gap-3">
            <div className="flex-grow-1">
              <label className="form-label">
                Điểm tích lũy:
                <input
                  type="number"
                  className={`form-control ${pointError ? "is-invalid" : ""}`}
                  value={pointToUse}
                  onChange={handlePointChange}
                  min="0"
                />
                {pointError && (
                  <div className="invalid-feedback">{pointError}</div>
                )}
              </label>
            </div>
            <div>
              <label className="form-label">Điểm hiện tại:</label>
              <h3 className="fw-bold text-success">
                {userInfo?.membership?.points?.toLocaleString() || "0"}
              </h3>
            </div>
            <div>
              <label className="form-label">Level:</label>
              <h3 className="fw-bold text-success">
                {userInfo?.membership?.level}
              </h3>
            </div>
          </div>

          <div className="py-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Tổng tiền sản phẩm:</span>
              <span>
                {cartData?.items
                  .reduce((sum, p) => sum + p.price * p.quantity, 0)
                  .toLocaleString()}{" "}
                đ
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Phí vận chuyển:</span>
              <span>{shippingFee.toLocaleString()} đ</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Giảm giá theo level:</span>
              <span className="text-success">
                {userInfo?.membership?.level === "gold"
                  ? " - " + (totalAmount * 0.1).toLocaleString() + " đ"
                  : userInfo?.membership?.level === "silver"
                  ? " - " + (totalAmount * 0.08).toLocaleString() + " đ"
                  : userInfo?.membership?.level === "bronze"
                  ? " - " + (totalAmount * 0.06).toLocaleString() + " đ"
                  : "0%"}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Điểm tích lũy sử dụng:</span>
              <span className="text-success">
                -{pointToUse.toLocaleString()} đ
              </span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold fs-5">Tổng tiền phải thanh toán:</span>
              <span className="text-danger fs-5">
                {finalAmount.toLocaleString()} đ
              </span>
            </div>
          </div>

          <div>
            <button
              className="btn btn-danger d-flex justify-content-end"
              onClick={handleSubmit}
            >
              Hoàn tất thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    displaySuccessfullyPayment()
  );
};

export default Payment;
