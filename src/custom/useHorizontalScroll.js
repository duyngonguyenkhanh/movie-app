// useHorizontalScroll.js
import { useRef } from 'react';

function useHorizontalScroll() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300; // Giả sử bạn muốn cuộn 300px
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300; // Giả sử bạn muốn cuộn 300px
    }
  };

  return { scrollRef, scrollLeft, scrollRight };
}

export default useHorizontalScroll;
