import React, { useContext } from "react";
import { ThemeProvider } from "../App";
import "../App.css";
import { Link, Outlet } from "react-router";

function NavBar() {
  const { Theme, setTheme } = useContext(ThemeProvider);

  return (
    <div>
      <nav
        class={`navbar bg-body-tertiary fixed-top rounded m-2 `}
        data-bs-theme={Theme}
      >
        <div class="container-fluid d-flex">
          <Link
            to={"/"}
            class="navbar-brand m-2 fs-3 fw-semibold justify-self-center"
            href="#"
          >
            Weather Forcast
          </Link>
          <Link
            to={"/searchlocation"}
            class={`btn ${
              Theme == "dark" ? "btn-outline-light" : "btn-outline-dark"
            } ms-2 `}
          >
            Search by Location
          </Link>
          <Link
            to={"/searchcountry"}
            class={`btn ${
              Theme == "dark" ? "btn-outline-light" : "btn-outline-dark"
            } ms-2`}
          >
            Fliter by Countries
          </Link>
          {Theme == "light" ? (
            <button
              className="btn ms-auto p-2 border-opacity-10"
              onClick={(e) => {
                setTheme("dark");
                document.body.className = "dark";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
              </svg>
            </button>
          ) : (
            <button
              className="btn ms-auto p-2 border-opacity-10"
              onClick={(e) => {
                setTheme("light");
                document.body.className = "light";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#EFEFEF"
              >
                <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z" />
              </svg>
            </button>
          )}
        </div>
      </nav>

      <div class="col" style={{ margin: "0.5rem", marginTop: "6.3rem" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default NavBar;
