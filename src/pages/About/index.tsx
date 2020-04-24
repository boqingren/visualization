import React from "react";

const About = React.memo(() => {

  console.log("render about page...");

  return (
    <div>
      About Page.
    </div>
  );
});

export default About;