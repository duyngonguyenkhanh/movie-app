import React, { createContext, useContext, useState, useEffect } from "react";
import useHttp from "./Http";
import { requests } from "./apiEndpots"; //import apikey và endpioint API vào

// Tạo Context
const DataContext = createContext();

// Context Provider
export const DataProvider = ({ children }) => {
  const { sendRequest } = useHttp();
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [movies, setMovies] = useState({
    fetchTrending: null,
    fetchNetflixOriginals: null,
    fetchTopRated: null,
    fetchActionMovies: null,
    fetchComedyMovies: null,
    fetchHorrorMovies: null,
    fetchRomanceMovies: null,
    fetchDocumentaries: null,
    fetchSearch: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gửi tất cả các yêu cầu API song song
        const [
          resfetchTrending,
          resfetchNetflixOriginals,
          resfetchTopRated,
          resfetchActionMovies,
          resfetchComedyMovies,
          resfetchHorrorMovies,
          resfetchRomanceMovies,
          resfetchDocumentaries,
          resfetchSearch,
        ] = await Promise.all([
          sendRequest(`${requests.fetchTrending}`),
          sendRequest(`${requests.fetchNetflixOriginals}`),
          sendRequest(`${requests.fetchTopRated}`),
          sendRequest(`${requests.fetchActionMovies}`),
          sendRequest(`${requests.fetchComedyMovies}`),
          sendRequest(`${requests.fetchHorrorMovies}`),
          sendRequest(`${requests.fetchRomanceMovies}`),
          sendRequest(`${requests.fetchDocumentaries}`),
          sendRequest(`${requests.fetchSearch}`),
        ]);

        // Lưu tất cả các kết quả vào state duy nhất
        setMovies({
          fetchTrending: resfetchTrending,
          fetchNetflixOriginals: resfetchNetflixOriginals,
          fetchTopRated: resfetchTopRated,
          fetchActionMovies: resfetchActionMovies,
          fetchComedyMovies: resfetchComedyMovies,
          fetchHorrorMovies: resfetchHorrorMovies,
          fetchRomanceMovies: resfetchRomanceMovies,
          fetchDocumentaries: resfetchDocumentaries,
          fetchSearch: resfetchSearch,
        });

        // Kiểm tra xem tất cả dữ liệu đã được tải hay chưa
        if (
          resfetchTrending &&
          resfetchNetflixOriginals &&
          resfetchTopRated &&
          resfetchActionMovies &&
          resfetchComedyMovies &&
          resfetchHorrorMovies &&
          resfetchRomanceMovies &&
          resfetchDocumentaries &&
          resfetchSearch
        ) {
          setAllDataLoaded(true);
        }
      } catch (err) {
        console.error('Error fetching data:', err); // Log lỗi nếu có
      }
    };

    fetchData();
  }, [sendRequest]);


  useEffect(() => {
    if (allDataLoaded) {
      //console.log('All API data loaded successfully:', movies);
    }
  }, [allDataLoaded, movies]);



  return (
    <DataContext.Provider
      value={{
        movies
      }}
    >
      {allDataLoaded ? children : null}
    </DataContext.Provider>
  );
};

// Custom Hook để sử dụng Context
export const useData = () => useContext(DataContext);
