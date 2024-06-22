import { useState, useCallback } from "react";
//Hook được custom lại
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, method = "GET", body = null) => {
    setIsLoading(true);
    setError(null);

    try {
      const requestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Kiểm tra nếu là GET hoặc HEAD thì không thêm body vào yêu cầu
      if (method !== "GET" && method !== "HEAD") {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const responseData = await response.json();
      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message || "Something went wrong!");
      setIsLoading(false);
      throw err;
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
