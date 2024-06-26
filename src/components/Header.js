import React from "react";

const Header = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h3 className="title">{props.title}</h3>
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <a className="nav-link" href="https://kumarabhijeett.blogspot.com" target="_">
                  About Developer
                </a>
              </li>
            </ul>
            {props.searchBar ? (
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
      {/* <div className="mt-3 p-2">
        <marquee>
          <p className="mb-0 headline">Welcome to react app development</p>
        </marquee>
      </div> */}
    </>
  );
};

export default Header;
