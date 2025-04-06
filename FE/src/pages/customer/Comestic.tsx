import React, { useEffect, useState } from "react";
import styles from "/src/assets/customer/comestic/css/style.module.css";
import "/src/assets/customer/comestic/css/vars.css";
import comesticApi from "../../api/comestic.api";
import { Link } from "react-router-dom";

const Comestic: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await comesticApi.getAllCometics();
        setData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    fetchData();
  }, []);

  // Hàm gọi API tìm kiếm (debounce để tránh spam API)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const delaySearch = setTimeout(async () => {
      try {
        const response = await comesticApi.searchByName(searchQuery);
        setSearchResults(response.data);
        setShowDropdown(response.data.length > 0);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300); // Delay 300ms để tránh spam API

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  return (
    <>
      <div className="container my-4 position-relative">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                name="search"
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật state khi nhập
                onFocus={() => setShowDropdown(true)}
              />
              <button className="btn btn-outline-primary w-50" type="submit">
                Tìm kiếm
              </button>
            </form>

            {/* Dropdown hiển thị kết quả tìm kiếm */}
            {showDropdown && searchResults.length > 0 && (
              <ul className="list-group position-absolute w-25 mt-2 shadow z-1">
                {searchResults.map((product, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between w-100"
                  >
                    <Link
                      to={`/comestic/${product._id}`}
                      className="text-decoration-none text-dark d-flex justify-content-between align-items-center"
                      style={{ width: "100%" }}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          className="rounded-circle me-3"
                          src={product.image}
                          alt="Add to cart"
                          style={{ width: "50px", height: "50px" }}
                        />
                        {product.name}
                      </div>
                      <span className="fw-bold text-danger">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className={styles.snpM}>
        <div className={styles.section2}>
          <div className={styles.knowYourSkin}>
            <div className={styles.line3}></div>
            <div className={styles.snp2}>
              SẢN PHẨM
              <br />
            </div>
            <div className={styles.line2}></div>
          </div>
          <div className={styles.skinType}>
            {data.map((comestic) => (
              <Link
                to={`/comestic/${comestic._id}`}
                className={styles.snp3}
                key={comestic._id}
              >
                <img
                  className={styles.frame6}
                  src={comestic.image}
                  alt={comestic.name}
                />
                <div className={styles.frame7}>
                  <div className={styles.kemDuongAm}>
                    <span>
                      <span className="d-flex justify-content-center fw-bold fs-4">
                        {comestic.name}
                        <br />
                      </span>
                    </span>
                  </div>
                  <img
                    className={styles.coin1}
                    src="/src/assets/customer/comestic/images/coin-1-10.png"
                    alt="Price"
                  />
                  <div className={styles.giaBan250000}>
                    Giá bán: {comestic.price}
                  </div>
                  <img
                    className={styles.carts1}
                    src="/src/assets/customer/comestic/images/carts-10.png"
                    alt="Add to cart"
                  />
                  <img
                    className={styles.star11}
                    src="/src/assets/customer/comestic/images/star-110.svg"
                    alt="Rating"
                  />
                  <div className={styles.rating}>{comestic.averageRating}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comestic;
