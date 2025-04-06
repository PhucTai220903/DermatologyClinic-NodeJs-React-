import React, { useEffect, useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import CartApi from "../../api/cart.api";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toast.util";

interface CartItem {
  _id: string;
  comestic_id: string;
  quantity: number;
  type: string;
  comestic_name: string;
  comestic_image: string;
  price: number;
}

interface Cart {
  _id: string;
  customer_id: string;
  items: CartItem[];
  comestic_image: string;
}

const Cart: React.FC = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = async () => {
    try {
      const response = await CartApi.get();
      response.items.forEach((item: any) => {
        item.type = "comestic";
      });
      setCart(response);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Không thể tải thông tin giỏ hàng. Vui lòng thử lại sau.");
    } finally {
    }
  };

  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, []);

  const handleQuantityChange = (
    itemId: string,
    type: "increase" | "decrease"
  ) => {
    if (!cart) return;

    setCart((prevCart) => {
      if (!prevCart) return null;
      return {
        ...prevCart,
        items: prevCart.items.map((item) => {
          if (item._id === itemId) {
            return {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            };
          }
          return item;
        }),
      };
    });
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!cart) return;

    const response = await CartApi.delete(itemId);
    if (response.status === 200) {
      showSuccessToast(response.data.message);
      fetchCartItems(); // reload to display the updated cart
    } else {
      showErrorToast(response.data.message);
    }
  };

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {token ? (
        <div className="container py-4">
          <div className="d-flex align-items-center mb-4">
            <div className="flex-grow-1">
              <h2 className="mb-0">Giỏ Hàng</h2>
            </div>
            <div className="text-end d-flex align-items-center gap-3">
              <Link
                to="/payment"
                state={{ cartData: cart }}
                className="btn btn-primary"
              >
                Thanh toán
              </Link>
              <h4 className="text-danger mb-0">
                Tổng số sản phẩm: {calculateTotal()}
              </h4>
            </div>
          </div>

          {cart?.items.map((item) => (
            <div key={item._id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      alt={item.comestic_name}
                      src={item.comestic_image}
                      className="img-fluid rounded"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <h5 className="card-title mb-1">{item.comestic_name}</h5>
                    <p className="text-muted mb-0">
                      {item.price.toLocaleString()} đ
                    </p>
                  </div>
                  <div className="col-md-2">
                    <div className="text-center">
                      <p className="mb-1">Số lượng:</p>
                      <div
                        className="input-group input-group-sm"
                        style={{ width: "120px", margin: "0 auto" }}
                      >
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleQuantityChange(item._id, "decrease")
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            handleQuantityChange(item._id, "increase")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="text-center">
                      <p className="mb-1">Thành tiền:</p>
                      <p className="text-danger mb-0 fw-bold">
                        {(item.quantity * item.price).toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemoveItem(item.comestic_id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {(!cart || cart.items.length === 0) && (
            <div className="text-center py-5">
              <ShoppingCart size={64} className="text-muted mb-3" />
              <h4>Giỏ hàng trống</h4>
              <p className="text-muted">
                Hãy thêm sản phẩm vào giỏ hàng của bạn
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center text-center p-4 rounded shadow-sm mb-5">
          <h1 className="text-primary fw-bold">
            Bạn cần{" "}
            <Link to="/login" className="text-danger">
              ĐĂNG NHẬP
            </Link>{" "}
            để xem giỏ hàng
          </h1>
        </div>
      )}
    </>
  );
};

export default Cart;
