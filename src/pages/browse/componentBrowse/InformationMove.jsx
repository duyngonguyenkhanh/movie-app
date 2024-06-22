import React from "react";
import YouTube from "react-youtube";

const InformationMove = ({ movie, keymovie }) => {
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
      loop: 1, // Lặp lại video
      // Tùy chọn để ẩn thanh điều khiển của video
      controls: 0,
      // Tùy chọn để ẩn tiêu đề và thời lượng của video
      showinfo: 0,
      // Tùy chọn để ẩn logo YouTube trên thanh điều khiển
      modestbranding: 1,
      // Tùy chọn để ẩn các video liên quan sau khi video kết thúc
      rel: 0,
      // Tùy chọn để ẩn tiêu đề của video
      title: 0,
      // Tùy chọn để ẩn các nút "Xem sau", "Chia sẻ" và "Thông tin" (tiêu đề và thời lượng) của video
      iv_load_policy: 3,
    },
  };

  const onEnd = (event) => {
    // Lấy tham chiếu đến player khi video kết thúc
    const player = event.target;
    // Tua lại video về thời điểm 0
    player.seekTo(0);
  };

  if (!movie) {
    //|| !keymovie
    return null; // Hoặc thực hiện một hành động khác tùy thuộc vào trường hợp
  }

  return (
    <div className="bg-[#111] flex px-6 justify-between mt-2">
      <div className="w-[48%] ml-7 mr-4">
        <h1 className="text-white font-bold text-3xl border-b-2 border-white py-10 ">
          {movie.title || movie.original_name}
        </h1>
        <div className=" font-bold text-white text-xl py-5">
          <p className="text-white">
            Release Date: {movie.first_air_date || movie.release_date}{" "}
          </p>
          <p className="text-white">Vote: {movie.vote_average}/10</p>
        </div>
        <p className="text-white">{movie.overview}</p>
      </div>
      <div className="w-[50%]">
        {keymovie ? (
          <div
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <YouTube
              className="absolute top-0 left-0 w-full h-full"
              videoId={keymovie}
              opts={opts}
              onEnd={onEnd}
            />
          </div>
        ) : (
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt="Backdrop"
          />
        )}
      </div>
    </div>
  );
};

export default InformationMove;
