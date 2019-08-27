import React from "react";
import GroupList from "./Components/GroupList";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <GroupList />
      </div>
    </>
  );
}

export default App;
