import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import AllLauches from "../routes/AllLaunches";
import LaunchDetails from "../routes/LaunchDetails";

const AppRouter = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div>
      <Router>
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <Routes>
          <Route path="/" element={<AllLauches searchValue={searchValue} />} />
          <Route path="/launchdetails/:name" element={<LaunchDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
