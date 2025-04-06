import React, { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import comesticApi from "../../api/comestic.api";
import CartApi from "../../api/cart.api";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";
import ReviewApi from "../../api/review.api";

interface Review {
  _id: string;
  customer_id: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface Comestic {
  _id: string;
  name: string;
  category: string;
  price: number;
  isHidden: boolean;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  quantity: number;
  image: string;
}

interface ReviewToAdd {
  comment: string;
  rating: number;
}

const DetailComestic: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [comestic, setComestic] = useState<Comestic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<ReviewToAdd>({
    comment: "",
    rating: 0,
  });

  const fetchComestic = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await comesticApi.getComesticById(id as string);

      setComestic(response.data);
    } catch (error) {
      console.error("Error fetching comestic:", error);
      setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComestic();
    }
  }, [id]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!comestic) return;

    const response = await CartApi.add(id as string, quantity);
    if (response.status === 201) {
      showSuccessToast(response.data.message);
    } else {
      showErrorToast(response.data.message);
    }
  };

  const handleSubmitReview = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await ReviewApi.add({
        comestic_id: id,
        comment: review.comment,
        rating: review.rating,
      });
      showSuccessToast(response.data.message);
      setReview({
        comment: "",
        rating: 0,
      });
      fetchComestic();
    } catch (error) {
      showErrorToast("Không thể gửi đánh giá. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!comestic) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy sản phẩm
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        {/* Phần hình ảnh sản phẩm */}
        <div className="col-md-6">
          <div className="product-gallery">
            <div className="main-image mb-3">
              <img
                style={{ height: "310px", width: "100%", objectFit: "cover" }}
                src={comestic.image}
                alt={comestic.name}
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>

        {/* Phần thông tin sản phẩm */}
        <div className="col-md-6">
          <h2 className="mb-3">{comestic.name}</h2>
          <p className="text-muted mb-3">Danh mục: {comestic.category}</p>

          <div className="d-flex align-items-center mb-3">
            <div className="rating me-3">
              <span className="text-warning">★</span>{" "}
              <span>{comestic.averageRating.toFixed(1)}</span>
            </div>
            <div className="reviews-count">
              <span className="text-muted">
                {comestic.reviews.length} đánh giá
              </span>
            </div>
          </div>

          <div className="price mb-4">
            <h3 className="text-danger">{comestic.price.toLocaleString()} đ</h3>
          </div>

          <div className="quantity mb-4">
            <label className="form-label">Số lượng:</label>
            <div className="input-group" style={{ width: "150px" }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange("decrease")}
              >
                -
              </button>
              <input
                style={{ width: "2px" }}
                type="number"
                className="form-control text-center"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleQuantityChange("increase")}
              >
                +
              </button>
            </div>
            <small className="text-muted">
              Còn lại: {comestic.quantity} sản phẩm
            </small>
          </div>

          <div className="d-grid gap-2 d-flex justify-content-start">
            <button className="btn btn-success">MUA NGAY</button>

            <button className="btn btn-primary" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Phần đánh giá */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">ĐÁNH GIÁ SẢN PHẨM</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`btn btn-outline-warning me-1 ${
                    review.rating >= star ? "active" : ""
                  }`}
                  onClick={() => setReview({ ...review, rating: star })}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="mb-3">
              <label className="form-label">Đánh giá</label>
              <textarea
                className="form-control"
                placeholder="Nhập đánh giá của bạn"
                rows={3}
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
              ></textarea>
            </div>
            <button className="btn btn-primary">Gửi đánh giá</button>
          </form>
          {comestic.reviews.map((review, index) => (
            <div key={review._id} className="card mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <div>
                    <h6 className="mb-0">
                      Người dùng {review.customer_id.slice(-6)}
                    </h6>
                    <div className="rating">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className="text-warning">
                          {index < review.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                    </small>
                  </div>
                </div>
                <p className="card-text">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailComestic;
