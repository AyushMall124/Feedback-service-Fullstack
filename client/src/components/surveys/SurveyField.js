//Contains logic to render single input and text input

import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  //Add event handlers from redux form and wiring them up

  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
