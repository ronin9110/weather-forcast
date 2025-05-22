import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "../App";
import { WeatherCard } from "../Components/WeatherCard";
import { fetchCity } from "../Services/Globals";
import { ThreeDots } from "react-loader-spinner";
import { useDebounce } from "use-debounce";
import { Country as Count, State, City } from "country-state-city";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function SearchCountry() {
  const { Theme } = useContext(ThemeProvider);
  const [Results, setResults] = useState([]);
  const [Cities, setCities] = useState([]);
  const [Country, setCountry] = useState("");
  const [Countries, setCountries] = useState([]);
  const [Error, setError] = useState(null);
  const [Page, setPage] = useState(null);
  const [Pages, setPages] = useState(null);
  const [PageRange, setPageRange] = useState([]);
  // const [Search, setSearch] = useState("");
  const [FirstVis, setFirstVis] = useState(true);
  // const [debouncedValue] = useDebounce(Search, 1000);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async (e) => {
    let arr = [];
    Count.getAllCountries().map((i, ind) => {
      arr.push({ value: i.isoCode, label: i.name });
    });
    setCountries(arr);
    // console.log(Count.getAllCountries().map((i) => i.name));
  };

  const fetchResults = async (arr) => {
    setResults([]);
    try {
      arr.map((City, i) => {
        fetchCity(City, Results).then(({ error, result }) => {
          if (JSON.stringify(result) !== "{}")
            setResults((Results) => [...Results, result]);
        });
      });
    } catch (error) {
      setError((Error) => (Error = error.message));
    }
  };

  useEffect(() => {
    if (Error === "") setFirstVis(false);
    else setFirstVis(true);
  }, [Error]);

  const handleChange = (e) => {
    setCountry(e.value);
  };

  const handleSubmit = async (e) => {
    // console.log(Country);
    setError("");
    setFirstVis(false);
    e.preventDefault();
    if (Country !== "") {
      try {
        let arr = [];
        await fetch("http://localhost:5000/data").then((data) =>
          data
            .json()
            .then((i) =>
              i.filter((j) => j.country == Country).map((k) => arr.push(k.name))
            )
        );
        // let arr = City.getCitiesOfCountry(Country).map((i) => i.name);
        // console.log(arr);
        setCities((Cities) => (Cities = arr));
      } catch (error) {
        setError((Error) => (Error = error.message));
      }
    } else {
      setError("Please Select a Country");
    }
  };

  useEffect(() => {
    if (Cities.length !== 0) {
      // console.log(Cities);
      setPageRange([]);
      setPage(1);
      setPages((Pages) => (Pages = Math.ceil(Cities.length / 20)));
    }
  }, [Cities]);

  useEffect(() => {
    if (Page != null) {
      // console.log(Page);
      setRange();
      fetchResults(Cities.slice(Page * 20 - 20, Page * 20));
    }
  }, [Page, Pages]);

  const setRange = () => {
    if ((Number(Page) - 1) % 15 == 0 && (Number(Page) + 14) % 15 == 0) {
      let arr = [];
      for (let i = Number(Page); i <= Number(Page) + 14 && i <= Pages; i++) {
        arr.push(i);
      }
      setPageRange((PageRange) => (PageRange = arr));
    }
  };

  const handlePage = (e) => {
    setPage(e.target.name);
  };
  // const handleSearch = (e) => {
  //   setSearch((Search) => (Search = e.target.value));
  //   console.log(Search);
  //   if (Search !== "") {
  //     setCities(
  //       (Cities) =>
  //         (Cities = Cities.filter((element) =>
  //           element.toLowerCase().includes(debouncedValue)
  //         ))
  //     );
  //   } else {
  //     handleSubmit(e);
  //   }
  //   console.log(Cities.lastIndexOf(Search));
  // };

  const handlePages = (next) => {
    if (next) {
      setPage((Page) => Page++);
    } else {
      setPage((Page) => Page--);
    }
  };
  return (
    <div data-bs-theme={Theme}>
      <div className="d-flex flex-column align-items-center">
        <div class=" card text-center w-50">
          <div class="card-body">
            <h4 class="card-title">Select Country</h4>
            <form class="mt-4">
              <Select
                components={makeAnimated()}
                styles={{
                  control: (baseStyles, state) => {
                    return {
                      ...baseStyles,
                      textAlign: "left",
                      position: "absoulte",
                      backgroundColor: Theme == "dark" ? "#212529" : "white",
                    };
                  },
                  singleValue: (baseStyles, state) => {
                    return {
                      ...baseStyles,
                      color: Theme != "dark" ? "#212529" : "white",
                    };
                  },
                  menuList: (base, state) => {
                    return {
                      ...base,
                      textAlign: "left",
                      backgroundColor: Theme == "dark" ? "#212529" : "white",
                      color: Theme == "dark" ? "#212529" : "white",
                    };
                  },
                  placeholder: (base, state) => {
                    return {
                      ...base,
                      textAlign: "left",
                      color: Theme != "dark" ? "#212529" : "white",
                    };
                  },
                  input: (base, state) => {
                    return {
                      ...base,
                      color: Theme != "dark" ? "#212529" : "white",
                    };
                  },
                  option: (base, state) => {
                    console.log(state.isFocused);
                    return {
                      ...base,
                      color: state.isFocused
                        ? Theme == "dark"
                          ? "#212529"
                          : "white"
                        : Theme != "dark"
                        ? "#212529"
                        : "white",
                      backgroundColor: state.isSelected
                        ? Theme != "dark"
                          ? "#212529"
                          : "white"
                        : Theme == "dark"
                        ? "#212529"
                        : "white",
                      backgroundColor: state.isFocused
                        ? Theme != "dark"
                          ? "#212529"
                          : "white"
                        : Theme == "dark"
                        ? "#212529"
                        : "white",
                    };
                  },
                  loadingIndicator: (base, state) => {
                    return {
                      ...base,
                      color: Theme != "dark" ? "#212529" : "white",
                    };
                  },
                }}
                theme={(theme) => {
                  return {
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: Theme == "dark" ? "#212529" : "white",
                      primary25: Theme != "dark" ? "#212529" : "white",
                      primary50: Theme == "dark" ? "#212529" : "white",
                      primary75: Theme == "dark" ? "#212529" : "white",
                    },
                  };
                }}
                placeholder="Select A Country"
                className="basic-single"
                onChange={handleChange}
                defaultValue={Countries[0]}
                isLoading={Countries.length == 0 ? true : false}
                clearValue={() => {
                  setCountry("");
                }}
                isSearchable
                options={Countries}
              />
              <button
                onClick={handleSubmit}
                class={`btn ${
                  Theme == "dark" ? "btn-outline-light" : "btn-outline-dark"
                } ms-2 mt-4 `}
                value=""
              >
                Fetch Cities
              </button>
            </form>
          </div>
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
      {Results.length !== 0 && Cities.length !== 0 ? (
        <div>
          <div class="d-flex justify-content-between align-items-center m-2 ms-5 me-5">
            <h2 class="card-title">Cities ({Cities.length})</h2>
            {/* <Select
                components={makeAnimated()}
                styles={{
                  control: (baseStyles, state) => {
                    return {
                      ...baseStyles,
                      textAlign: "left",
                      backgroundColor: Theme == "dark" ? "#212529" : "white",
                    };
                  },
                  singleValue: (baseStyles, state) => {
                    return {
                      ...baseStyles,
                      color:Theme != "dark" ? "#212529" : "white",
                    };
                  },
                  menuList: (base, state) => {
                    return {
                      ...base,
                      textAlign: "left",
                      backgroundColor: Theme == "dark" ? "#212529" : "white",
                      color: Theme == "dark" ? "#212529" : "white",
                    };
                  },
                  placeholder:(base, state) => {
                    return {
                      ...base,
                      textAlign: "left",
                      color: Theme != "dark" ? "#212529" : "white",
                    };
                  },
                  input:(base, state) => {
                    return {
                      ...base,
                      color: Theme != "dark" ? "#212529" : "white",
                    };
                  },
                  option:(base, state) => {
                    console.log(state.isFocused)
                    return {
                      ...base,
                      color:state.isFocused?Theme == "dark" ? "#212529" : "white":Theme != "dark" ? "#212529" : "white",
                      backgroundColor:state.isSelected?Theme != "dark" ? "#212529" : "white":Theme == "dark" ? "#212529" : "white",
                      backgroundColor:state.isFocused?Theme != "dark" ? "#212529" : "white":Theme == "dark" ? "#212529" : "white",
                    };
                  },
                  loadingIndicator:(base, state) => {
                    return {
                      ...base,
                      color: Theme != "dark" ? "#212529" : "white",
                    };
                  },
                }}
                theme={(theme) => {
                  return {
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: Theme == "dark" ? "#212529" : "white",
                      primary25: Theme != "dark" ? "#212529" : "white",
                      primary50: Theme == "dark" ? "#212529" : "white",
                      primary75: Theme == "dark" ? "#212529" : "white",
                    },
                  };
                }}
                placeholder="Search"
                className="basic-single w-50 "
                onChange={(data)=>console.log(data)}
                isLoading={Countries.length == 0 ? true : false}
                isSearchable
                options={Results.map((i)=>({value:i.city,label:i.city}))}
              /> */}
          </div>
          <div className="row row-cols-2 row-cols-md-5 g-1 m-1 justify-content-center">
            {Results.map((val, ind) => {
              return JSON.stringify(val) !== "{}" ? (
                <WeatherCard
                  key={ind}
                  val={val}
                  Theme={Theme}
                  handleRemove={null}
                />
              ) : null;
            })}
          </div>
          <div class="d-flex flex-column align-items-center">
            <div class="card text-center pt-3 ps-3 pe-3">
          <ul class=" pagination justify-content-center ">
            <li class="page-item me-2">
              <button
                class={` btn ${Page != 1
                        ? Theme == "dark"
                          ? "active btn-outline-light "
                          : "active btn-outline-dark "
                        : Theme == "dark"
                        ? " disabled btn-outline-light "
                        : " disabled btn-outline-dark "}`}
                onClick={() => setPage(Number(Page) - 1)}
              >
                Previous
              </button>
            </li>
            {PageRange.map((i, ind) => {
              return (
                <li key={ind}>
                  <button
                    class={` rounded btn ${
                      Page == i
                        ? Theme == "dark"
                          ? "active btn-outline-light "
                          : "active btn-outline-dark "
                        : Theme == "dark"
                        ? " btn-outline-light "
                        : " btn-outline-dark "
                    }  me-2`}
                    name={i}
                    onClick={handlePage}
                  >
                    {i}
                  </button>
                </li>
              );
            })}
            <li class="page-item">
              <button
                class={` btn ${Page != Pages
                        ? Theme == "dark"
                          ? "active btn-outline-light "
                          : "active btn-outline-dark "
                        : Theme == "dark"
                        ? " disabled btn-outline-light "
                        : " disabled btn-outline-dark "} `}
                onClick={() => setPage(Number(Page) + 1)}
              >
                Next
              </button>
            </li>
          </ul>
          </div>
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
            wrapperClass=""
          />
        )
      )}
    </div>
  );
}
