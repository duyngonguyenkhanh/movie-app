import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

import { DataProvider } from "./custom/GlobalData";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
