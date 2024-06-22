import React from "react";
import Navbar from "./componentBrowse/Navbar";
import Banner from "./componentBrowse/Banner";
import MovieList from "./componentBrowse/MovieList";


function Browse() {
  return (
    <div className="app bg-[#111]">
      <div>
         <Navbar />
        <Banner />
        <MovieList />
      </div>
    </div>
  );
}

export default Browse;
