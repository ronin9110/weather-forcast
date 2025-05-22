import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "../App";
import { fetchCity } from "../Services/Globals";
import { data } from "react-router";
import { WeatherCard } from "../Components/WeatherCard";
import { ThreeDots } from "react-loader-spinner";

function SearchLoc() {
  const { Theme } = useContext(ThemeProvider);
  const [Results, setResults] = useState([]);
  const [City, setCity] = useState("");
  const [Error, setError] = useState(null);
  const [FirstVis, setFirstVis] = useState(true);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (Error === "") setFirstVis(false);
    else setFirstVis(true);
  }, [Error]);

  const handleSubmit = async (e) => {
    setFirstVis(false);
    setError((Error) => (Error = ""));
    e.preventDefault();
    if (City.trim()) {
      fetchCity(City, Results).then(({ err, result }) => {
        if (!err) {
          setResults((Results) => [...Results, result]);
        }
        console.log(data);
        setCity((City) => (City = ""));
        setError((Error) => (Error = err));
      });
    } else {
      setError((Error) => (Error = "Please Enter a Location"));
    }
  };

  const handleRemove = (id) => {
    setResults(Results.filter((val) => val.id !== id));
  };

  return (
    <div data-bs-theme={Theme}>
      <div className="d-flex flex-column align-items-center">
        <div class=" card text-center w-50 ">
          <div class="card-body">
            <h4 class="card-title">Enter Location</h4>
            <form class="mt-4">
              <input
                type="text"
                class="form-control"
                value={City}
                onChange={handleChange}
              />
              <input
                type="submit"
                onClick={handleSubmit}
                class={`btn ${
                  Theme == "dark" ? "btn-outline-light" : "btn-outline-dark"
                } ms-2 mt-4 `}
                value="Get Weather Details"
              />
            </form>
          </div>
        </div>
        {Error ? (
          <div
            class=" mt-2 alert alert-danger fs-6 text-capitalize fw-bold w-50 d-flex justify-content-center"
            role="alert"
          >
            {Error}
          </div>
        ) : null}
      </div>
      {Results.length !== 0 ? (
        <div>
          <h3 class="d-flex justify-content-center m-2">Results</h3>
          <div className="row row-cols-2 row-cols-md-5 g-1 m-1 justify-content-center">
            {Results.map((val,ind) => (
              <WeatherCard
              key={ind}
                val={val}
                Theme={Theme}
                handleRemove={handleRemove}
              />
            ))}
          </div>
        </div>
      ) : (
        !FirstVis && (
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#00000"
            radius="10"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ position: "absolute", left: "48%", top: "50%" }}
          />
        )
      )}
    </div>
  );
}

export default SearchLoc;
