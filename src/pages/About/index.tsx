import React from "react";

const About = React.memo(() => {

  console.log("render about page...");

  return (
    <div className="about-page-container">
      <h1 className="about-page-title">
        About Page.
      </h1>
    </div>
  );
});

export default About;