import React, { useRef, useState } from "react";
import { fetchSearch } from "../../../reducer/searchSlice";
import { useDispatch } from "react-redux";
import { resetState } from "../../../reducer/movieSlice";


const SearchBox = () => {

  //hàm dispatch 1 action
  const dispatch = useDispatch();
  //nhận state input
  const [searchValue, setSearchValue] = useState(null);

  const inputRef = useRef(null);

  //Hàm search
  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      dispatch(fetchSearch(searchValue))
    }
  };

  
  const handleReset = () => {
    setSearchValue("");
    inputRef.current.focus();
    dispatch(resetState());
    
  };

  return (
    <div className="py-[100px] flex justify-center">
      <div className="bg-[#fff] h-[170px] w-[40%] ">
        <div className=" flex justify-center border-b-[2px] border-blue-300 py-4  ">
          <input
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-[90%] pl-[10%] border-none outline-none"
            type="text"
            placeholder="Enter text"
          />
          <svg
            onClick={handleSearch}
            className="svg-inline--fa fa-search fa-w-16 h-6 w-[10%] transform transition-transform duration-300 hover:scale-125"
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </div>
        <div className="flex justify-end space-x-7 py-9 px-7 font-bold">
          <button onClick={handleReset} className="hover:text-[#ffff] hover:bg-blue-300 p-3 ">
            RESET
          </button>
          <button onClick={handleSearch} className="hover:text-[#ffff] hover:bg-blue-300 p-3">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
