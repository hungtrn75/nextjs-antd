import React from "react";

export default props => {
  return (
    <div className="contact">
      <div>{props.city}</div>
      <div>
        {props.prop}
        {props.state}
      </div>
      <div>
        {props.loc[0]}
        {"-"}
        {props.loc[1]}
      </div>
      <div />
    </div>
  );
};
