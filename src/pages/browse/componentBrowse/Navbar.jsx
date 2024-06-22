// Import các hooks và components từ React và react-router-dom
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component Navbar để hiển thị thanh điều hướng
const Navbar = () => {
  // State để theo dõi trạng thái cuộn của trang
  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect để thiết lập và dọn dẹp event listener cho sự kiện cuộn trang
  useEffect(() => {
    // Hàm xử lý sự kiện cuộn trang
    const handleScroll = () => {
      // Nếu vị trí cuộn lớn hơn 100px, đặt isScrolled thành true
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        // Ngược lại, đặt isScrolled thành false
        setIsScrolled(false);
      }
    };

    // Thêm event listener cho sự kiện cuộn trang
    window.addEventListener("scroll", handleScroll);

    // Dọn dẹp event listener khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Mảng dependencies rỗng đảm bảo rằng effect này chỉ chạy một lần

  // Hàm xử lý sự kiện khi nhấn vào tiêu đề "Movies app"
  const handleScrollToTop = () => {
    // Cuộn lên đầu trang với hiệu ứng smooth
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // JSX để render UI của Navbar
  return (
    <div
      // Sử dụng template literals và conditional rendering để thay đổi class của div
      className={`flex justify-between px-6 py-6 text-red-500 fixed top-0 left-0 w-full z-40 ${
        isScrolled ? "bg-black" : ""
      } transition-colors duration-500`}
    >
      {/* Link đến trang chủ */}
      <Link to="/">
        {/* Tiêu đề "Movies app" có sự kiện onClick để cuộn lên đầu trang */}
        <h1 className="font-bold text-2xl" onClick={handleScrollToTop}>Movies app</h1>
      </Link>
      {/* Link đến trang tìm kiếm */}
      <Link to="/search">
        {/* Icon tìm kiếm với sự kiện onClick để cuộn lên đầu trang */}
        <svg
          className="svg-inline--fa fa-search fa-w-16 h-6 transform transition-transform duration-300 hover:scale-125 "
          onClick={handleScrollToTop}
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          {/* Đường dẫn SVG cho icon tìm kiếm */}
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </Link>
    </div>
  );
};

// Xuất khẩu component Navbar để sử dụng ở nơi khác
export default Navbar;
