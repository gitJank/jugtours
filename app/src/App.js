import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import NavBar from "./Components/NavBar";
import GroupList from "./Components/GroupList";
import "./App.css";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <NavBar />
        <GroupList />
      </div>
    </>
  );
}

export default App;
