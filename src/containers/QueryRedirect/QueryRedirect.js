import React from "react";
import Loader from "../../components/UI/Loader/Loader";
const QueryRedirect = props => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <Loader />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <h3>If you can see this, your quote is loading</h3>
      </div>
    </div>
  );
};

export default QueryRedirect;
