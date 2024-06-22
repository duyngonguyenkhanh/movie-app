import React from "react";
import { useState, useEffect } from "react";
import InformationMove from "../../browse/componentBrowse/InformationMove";
import { useSelector, useDispatch } from "react-redux";
import { resetState, fetchTrailerKey } from "../../../reducer/movieSlice";
const SearchList = () => {
  //nhận data từ reduxtoolkit
  const Search = useSelector((state) => state.searchs.res);
  // Sử dụng useDispatch để có thể dispatch các actions đến Redux store.
  const dispatch = useDispatch();
  // Sử dụng useSelector để lấy 'Trailerkey' và 'status' từ state của Redux store.
  const Trailerkey = useSelector((state) => state.movies.key); 
  const status = useSelector((state) => state.movies.status); 
  // Khởi tạo state cục bộ để theo dõi trạng thái hiển thị của các danh sách phim.
  const [movieStates, setMovieStates] = useState({
    // Mỗi danh sách phim có một object với các thuộc tính: mounted, data, và key.
    fetchSearch: { mounted: false, data: null, key: null },
  });

  // Hàm xử lý khi một phim được click.
  const handleMovieClick = (type, movie) => {
    // Lấy trạng thái hiện tại của danh sách phim được click.
    const typeState = movieStates[type];

    // Kiểm tra nếu phim đã được mount (hiển thị) và có cùng ID với phim được click.
    if (typeState.mounted && typeState.data?.id === movie.id) {
      // Nếu đúng, dispatch action resetState để đặt lại state trong Redux store.
      dispatch(resetState());
      // Đặt lại state cục bộ, đóng component hiển thị thông tin phim.
      setMovieStates((prevState) => ({
        ...prevState,
        [type]: { mounted: false, data: null, key: null },
      }));
    } else {
      // Nếu phim khác được click, cập nhật state cục bộ và dispatch action để lấy 'Trailerkey'.
      setMovieStates((prevState) => ({
        ...prevState,
        [type]: { mounted: true, data: movie, key: null },
      }));
      dispatch(fetchTrailerKey(movie.id));
    }
  };

  // Sử dụng useEffect để cập nhật 'Trailerkey' trong state cục bộ khi nó thay đổi.
  useEffect(() => {
    // Hàm cập nhật 'Trailerkey' cho danh sách phim tương ứng.
    const updateMovieState = (type, key) => {
      setMovieStates((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          key,
        },
      }));
    };

    // Khi 'Trailerkey' và 'status' thay đổi, kiểm tra và cập nhật 'Trailerkey' cho phim đã mount.
    if (Trailerkey && status === "succeeded") {
      Object.keys(movieStates).forEach((type) => {
        if (movieStates[type].mounted && !movieStates[type].key) {
          updateMovieState(type, Trailerkey);
        }
      });
    }
  }, [Trailerkey, movieStates, status]);
  return (
    //thông tin phim sử dụng lại component ở phần trước
    <div className="pb-10 ">
      <div className="py-4">
       
        {movieStates.fetchSearch.mounted && (
          <InformationMove
            movie={movieStates.fetchSearch.data}
            keymovie={movieStates.fetchSearch.key}
          />
        )}
      </div>
      <h1 className="text-2xl font-bold text-white pb-5 px-[5%]">
          Search Result
        </h1>
      {Search && (
        <div className="grid grid-cols-9 gap-4 px-[7%]">
          {Search.results.map((movie) => (
            <img
              key={movie.id}
              className="w-[full] h-[300px] transform hover:scale-125 hover:z-20 relative z-10"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt=""
              onClick={() => handleMovieClick("fetchSearch", movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchList;
