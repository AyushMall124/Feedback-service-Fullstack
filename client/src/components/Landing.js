import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Feedback Services</h1>
      Send emails to your users to collect feedback
      <div style={{ marginTop: "15px" }}>
        <Link to="/surveys" className=" waves-effect waves-light btn center">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;
