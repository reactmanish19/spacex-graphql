import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({searchValue, setSearchValue}:any) => {
  const navigate = useNavigate();

  const handleSubmitSearch = (e: any) => {
  //   e.preventDefault();
  //   console.log(e.target["search-input"].value);
  //   navigate("/");
  };

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    navigate("/");
    setSearchValue(e.target.value)
  };

  return (
    <div>
      {" "}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Space-X Launch Records
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </a>
              </li>
            </ul>
            <form className="d-flex" onSubmit={(e) => handleSubmitSearch(e)}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Mission and Rocket"
                aria-label="Search"
                name="search-input"
                onChange={(e) => handleSearch(e)}
                // value={searchValue}
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
