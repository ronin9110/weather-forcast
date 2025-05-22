import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "../App";
import { fetchCity } from "../Services/Globals";
import { WeatherCard } from "../Components/WeatherCard";
import { ThreeDots } from "react-loader-spinner";

function DashBoard() {
  const { Theme } = useContext(ThemeProvider);
  const [Results, setResults] = useState([]);
  const [Error, setError] = useState(null);
  const [FirstVis, setFirstVis] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);


  useEffect(() => {
        if (Error === "") setFirstVis(false);
        else setFirstVis(true);
      }, [Error]);

  const fetchDashboard = async () => {
    setFirstVis(false);
    setResults([]);
    await fetch(`http://localhost:5000/data`)
      .then((res) =>
        res
          .json()
          .then((data) => {
            let arr = [];
            for (let i = 1; i <= 12; i++) {
              let i = Math.floor(Math.random() * data.length);
              arr.push(data[i].name);
            }
            onLoad(arr);
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => setError(err.message)).finally(()=>{
        setFirstVis(true);
      })
  };

  const onLoad = (res) => {
    console.log("it runs");
    try {
      res.map((City) => {
        fetchCity(City, Results).then(({ error, result }) => {
          setResults((Results) => [...Results, result]);
          setError((Error) => (Error = error));
        });
      });
    } catch (error) {
      setError((Error) => (Error = error.message));
    }

    console.log(Results);
  };

  const handleRemove = (id) => {
    setResults(Results.filter((val) => val.id !== id));
  };

  return (
    <div data-bs-theme={Theme}>
      <button
        onClick={fetchDashboard}
        class={` d-flex justify-content btn ${
          Theme == "dark" ? "btn-outline-light" : "btn-outline-dark"
        }  m-auto`}
      >
        ↺ Refresh
      </button>
      {Error ? (
        <div
          class=" mt-2 m-auto alert alert-danger fs-6 text-capitalize fw-bold w-50 d-flex justify-content-center"
          role="alert"
        >
          {Error}
        </div>
      ) : null}
      {Results.length !== 0 ? (
        <div className="row row-cols-2 row-cols-md-5 g-1 m-auto justify-content-center">
          {Results.map((val) => (
            <WeatherCard
              key={val.id}
              val={val}
              Theme={Theme}
              handleRemove={null}
            />
          ))}
        </div>
      ) : (!FirstVis &&
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#00000"
          radius="10"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ position: "absolute", left: "48%", top: "50%" }}
          wrapperClass=""
        />
      )}
    </div>
  );
}

export default DashBoard;
