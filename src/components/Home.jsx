import React from "react";
import MainMenu from "./MainMenu";
import StatusBar from "./StatusBar";
import Notes from "./Notes";
import "../Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <div className="main-menu">
        <MainMenu />
      </div>
      <div className="main-app">
        <StatusBar />
        <Notes />
      </div>
    </div>
  );
};

export default Home;
