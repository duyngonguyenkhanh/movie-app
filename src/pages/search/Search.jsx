import React from "react";
import Navbar from "../browse/componentBrowse/Navbar";
import SearchBox from "./componentSearch/SearchBox";
import SearchList from "./componentSearch/SearchList";

const Search = () => {
  
  return (
    <div className="app h-full bg-[#111] pb-[50%]">
       <Navbar />
      <SearchBox />
     <SearchList /> 
    </div>
  );
};

export default Search;
