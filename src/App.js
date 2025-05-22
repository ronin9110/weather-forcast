import { createContext, useState } from "react";
import { Route, Routes } from "react-router";
import NavBar from "./Components/NavBar";
import SearchLoc from "./Pages/SearchLoc.js";
import SearchCountry from "./Pages/SearchCountry.js";
import DashBoard from "./Pages/DashBoard.js";

const ThemeProvider = createContext(null);

function App() {
  const [Theme, setTheme] = useState("light");
  console.log(process.env.REACT_APP_API_KEY)

  return (
    <ThemeProvider.Provider value={{ Theme, setTheme }}>
        <Routes>
      <Route element={<NavBar/>} >
        <Route index element={<DashBoard />} />
                <Route path="/searchlocation" element={<SearchLoc />} />
        <Route path="/searchcountry" element={<SearchCountry />} />

      </Route>
    </Routes>
    </ThemeProvider.Provider>
  );
}

export { App, ThemeProvider };
