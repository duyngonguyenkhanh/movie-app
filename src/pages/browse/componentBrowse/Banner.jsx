import React, { useEffect, useState } from "react";
import { useData } from "../../../custom/GlobalData"; // Import GlobalData từ useContext

const Banner = () => {
  // State để lưu trữ một phim ngẫu nhiên
  const [randomMovie, setRandomMovie] = useState(null); 
  // Lấy dữ liệu phim từ useContext
  const { movies } = useData();

  // In ra danh sách phim hành động để kiểm tra dữ liệu
  //console.log(movies.fetchActionMovies.results);

  // Sử dụng useEffect để lấy một phim ngẫu nhiên từ mảng movies khi movies thay đổi
  useEffect(() => {
    if (movies.fetchTrending.results.length > 0) {
      // Lấy một chỉ số ngẫu nhiên trong mảng fetchTrending
      const randomIndex = Math.floor(Math.random() * movies.fetchTrending.results.length);
      // Lấy phim ngẫu nhiên từ mảng fetchTrending và lưu vào state
      setRandomMovie(movies.fetchTrending.results[randomIndex]);
    }
  }, [movies]);

  // In ra phim ngẫu nhiên để kiểm tra
  
  return (
    <div className="relative h-[1000px]">
      {randomMovie && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            
          }}
        >
          {/* Các phần tử khác nằm trên background */}
          <div className="relative z-10 top-[25%] left-[2%] w-[350px]">
            <h1 className="text-5xl text-white font-bold">
              {randomMovie.original_title || randomMovie.original_name}
            </h1>
            <div className="flex">
              <button className="bg-[#52525b] opacity-70 mt-8 px-4 py-1 text-white text-xl mr-3">
                Play
              </button>
              <button className="bg-[#52525b] opacity-70 mt-8 px-4 py-1 text-white text-xl mr-3">
                My List
              </button>
            </div>
            <p className="text-white mt-2">{randomMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
