import React from "react";
import MainMenu from "./MainMenu";
import StatusBar from "./StatusBar";
import SearchAppBar from "./AppBarTest";
import Notes from "./Notes";
import "../Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <SearchAppBar className="search-app-bar" />
      <div className="main-app">
        <div className="main-menu">
          <MainMenu />
        </div>
        <div className="main-app">
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default Home;
