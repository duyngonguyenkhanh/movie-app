import React, { useRef, useState } from "react"; //hook để xử lý các state cục bộ
import { useEffect } from "react"; // hook thực hiện các side effect trong component
import { useData } from "../../../custom/GlobalData"; // Import GlobalData từ useContext
import InformationMove from "./InformationMove"; // Import component InformationMove để hiển thị thông tin phim
import { useDispatch, useSelector } from "react-redux"; // 'useDispatch' cho phép bạn dispatch actions tới Redux store. 'useSelector' cho phép bạn trích xuất data từ Redux store.
// 'fetchTrailerKey' là một async thunk dùng để lấy trailer key từ API.
// 'resetState' là một action dùng để reset state về giá trị ban đầu.
import { fetchTrailerKey, resetState } from "../../../reducer/movieSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
const MovieList = () => {
  // Sử dụng useContext để lấy dữ liệu phim từ Global State.
  const { movies } = useData();

  // Lưu 10 phim ngẫu nhiên của Trending vào mảng
  const [randomMovies, setRandomMovies] = useState([]);
  // Sử dụng useDispatch để có thể dispatch các actions đến Redux store.
  const dispatch = useDispatch();
  // Sử dụng useSelector để lấy 'Trailerkey' và 'status' từ state của Redux store.
  const Trailerkey = useSelector((state) => state.movies.key);
  const status = useSelector((state) => state.movies.status);
  // Khởi tạo state cục bộ để theo dõi trạng thái hiển thị của các danh sách phim.
  const [movieStates, setMovieStates] = useState({
    // Mỗi danh sách phim có một object với các thuộc tính: mounted, data, và key.
    fetchTrending: { mounted: false, data: null, key: null },
    randomTrendingMovies: { mounted: false, data: null, key: null },
    fetchTopRated: { mounted: false, data: null, key: null },
    fetchActionMovies: { mounted: true, data: null, key: null },
    fetchComedyMovies: { mounted: false, data: null, key: null },
    fetchHorrorMovies: { mounted: false, data: null, key: null },
    fetchRomanceMovies: { mounted: false, data: null, key: null },
    fetchDocumentaries: { mounted: false, data: null, key: null },
  });

  // Hàm để trộn và lấy 10 phim ngẫu nhiên
  const getRandomMovies = (moviesArray, count) => {
    const shuffled = [...moviesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // useEffect để gọi hàm trộn phim một lần khi component được mount
  useEffect(() => {
    if (movies.fetchTrending.results.length > 0) {
      setRandomMovies(getRandomMovies(movies.fetchTrending.results, 10));
    }
  }, [movies.fetchTrending.results]); // Mảng dependencies rỗng đảm bảo rằng effect này chỉ chạy một lần

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

  // Component MovieList để hiển thị danh sách các bộ phim
  const MovieList = ({ movies, onMovieClick, type, name }) => {
    // useRef để tạo một tham chiếu đến phần tử DOM mà bạn muốn cuộn
    const sliderRef = useRef();
    const totalWidth = movies.length * 200; // Tổng chiều rộng của danh sách phim
    // Khi cuộn sang trái và muốn ẩn nút cuộn sang trái
    const slideLeft = () => {
      if (sliderRef.current) {
        if (sliderRef.current.scrollLeft === 0) {
          sliderRef.current.scrollLeft = totalWidth;
        } else {
          sliderRef.current.scrollLeft -= 500; // Cuộn một phim mỗi lần
        }
      }
    };

    // Tương tự cho hàm slideRight nếu bạn muốn thay đổi opacity cho nút cuộn sang phải
    const slideRight = () => {
      if (sliderRef.current) {
        if (sliderRef.current.scrollLeft >= totalWidth) {
          sliderRef.current.scrollLeft = 0;
        } else {
          sliderRef.current.scrollLeft += 500; // Cuộn một phim mỗi lầncung
        }
      }
    };

    // JSX để render UI của component
    return (
      <>
        <h1 className="mx-6 mt-[100px] text-xl font-bold text-white pb-3 px-3 ">
          {name}
        </h1>
        <div className="relative flex items-center ">
          {/* Nút cuộn sang trái */}
          <div
            style={{ opacity: 0.5 }}
            className="cursor-pointer transform hover:scale-125"
          >
            {/* Khi click vào icon này, hàm slideLeft sẽ được gọi */}
            <MdChevronLeft onClick={slideLeft} size={40} color="#ffff" />
          </div>
          {/* Container chứa danh sách các poster phim */}
          <div
            id="slider"
            ref={sliderRef}
            className="hidden-scrollbar overflow-x-scroll scrollbar-hide overflow-y-hidden whitespace-nowrap scroll-smooth space-x-2 py-2"
          >
            {/* Map qua mảng movies để hiển thị từng bộ phim */}
            {movies.map((movie) => (
              <img
                key={movie.id}
                className="w-[15%] h-auto inline-block cursor-pointer transform hover:scale-125 hover:z-20 relative"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                onClick={() => onMovieClick(type, movie)} //Khi click vào poster, hàm onMovieClick sẽ được gọi với tham số type và movie
              />
            ))}
          </div>
          {/* Nút cuộn sang phải */}
          <div
            style={{ opacity: 0.5 }}
            className="cursor-pointer transform hover:scale-125"
          >
            {/* Khi click vào icon này, hàm slideRight sẽ được gọi */}
            <MdChevronRight onClick={slideRight} size={40} color="#ffff" />
          </div>
        </div>
      </>
    );
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
    <div className="pb-[150px]">
      <>
        {/* Danh sách các phim Netflix Originals */}
        <div className="flex justify-center hidden-scrollbar custom-scrollbar overflow-y-hidden space-x-3 py-6 mx-8 my-9 ">
          {randomMovies.map((index) => (
            <img
              key={index.id}
              className="w-[9.3%] h-[auto] transform hover:scale-125 hover:z-20 relative z-10"
              src={`https://image.tmdb.org/t/p/original${index.poster_path}`}
              alt=""
              onClick={() => handleMovieClick("randomTrendingMovies", index)}
            />
          ))}
        </div>

        <div>
          {/* 
          Đây là nơi sẽ hiển thị thông tin chi tiết của phim khi người dùng click vào.
          */}
          {movieStates.randomTrendingMovies.mounted && (
            <InformationMove
              movie={movieStates.randomTrendingMovies.data}
              keymovie={movieStates.randomTrendingMovies.key}
            />
          )}
        </div>
        {/* Danh sách phim xếp hạng xu hướng */}
        <MovieList
          movies={movies.fetchTrending.results}
          onMovieClick={handleMovieClick}
          type={"fetchTrending"}
          name={"Xu hướng"}
        />

        {/* Hiển thị thông tin phim xu hướng khi người dùng click vào.*/}
        {movieStates.fetchTrending.mounted && (
          <InformationMove
            movie={movieStates.fetchTrending.data}
            keymovie={movieStates.fetchTrending.key}
          />
        )}

        {/* Danh sách phim xếp hạng cao */}
        <MovieList
          name={"Xếp hạng cao"}
          movies={movies.fetchTopRated.results}
          type={"fetchTopRated"}
          onMovieClick={handleMovieClick}
        />

        {/* Hiển thị thông tin phim xếp hạng cao khi người dùng click vào.*/}
        {movieStates.fetchTopRated.mounted && (
          <InformationMove
            movie={movieStates.fetchTopRated.data}
            keymovie={movieStates.fetchTopRated.key}
          />
        )}

        {/* Danh sách phim hành động */}
        <MovieList
          name={"Hành động"}
          movies={movies.fetchActionMovies.results}
          type={"fetchActionMovies"}
          onMovieClick={handleMovieClick}
        />
        {/* 
        Hiển thị thông tin phim hành động khi người dùng click vào.
        */}
        {movieStates.fetchActionMovies.mounted && (
          <InformationMove
            movie={movieStates.fetchActionMovies.data}
            keymovie={movieStates.fetchActionMovies.key}
          />
        )}

        {/* Danh sách phim hài */}
        <MovieList
          name={"Hài"}
          movies={movies.fetchComedyMovies.results}
          type={"fetchComedyMovies"}
          onMovieClick={handleMovieClick}
        />
        {/* 
        Hiển thị thông tin phim hài khi người dùng click vào.
        */}
        {movieStates.fetchComedyMovies.mounted && (
          <InformationMove
            movie={movieStates.fetchComedyMovies.data}
            keymovie={movieStates.fetchComedyMovies.key}
          />
        )}

        {/* Danh sách phim kinh dị */}
        <MovieList
          name={"Kinh dị"}
          movies={movies.fetchHorrorMovies.results}
          type={"fetchHorrorMovies"}
          onMovieClick={handleMovieClick}
        />
        {/* 
        Hiển thị thông tin phim kinh dị khi người dùng click vào.
        */}
        {movieStates.fetchHorrorMovies.mounted && (
          <InformationMove
            movie={movieStates.fetchHorrorMovies.data}
            keymovie={movieStates.fetchHorrorMovies.key}
          />
        )}

        {/* Danh sách phim tình cảm */}
        <MovieList
          name={"Lãng mạng"}
          movies={movies.fetchRomanceMovies.results}
          type={"fetchRomanceMovies"}
          onMovieClick={handleMovieClick}
        />
        {/* 
        Hiển thị thông tin phim tình cảm khi người dùng click vào.
        */}
        {movieStates.fetchRomanceMovies.mounted && (
          <InformationMove
            movie={movieStates.fetchRomanceMovies.data}
            keymovie={movieStates.fetchRomanceMovies.key}
          />
        )}

        {/* Danh sách phim tài liệu */}
        <MovieList
          name={"Tài liệu"}
          movies={movies.fetchDocumentaries.results}
          type={"fetchDocumentaries"}
          onMovieClick={handleMovieClick}
        />
        {/* 
        Hiển thị thông tin phim tài liệu khi người dùng click vào.
        */}
        {movieStates.fetchDocumentaries.mounted && (
          <InformationMove
            movie={movieStates.fetchDocumentaries.data}
            keymovie={movieStates.fetchDocumentaries.key}
          />
        )}
      </>
    </div>
  );
};

export default MovieList;
