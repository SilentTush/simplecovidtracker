import React from "react";
import { useHistory, useLocation } from "react-router-dom";

function Header({
  heading,
  loadHistoricData,
  historicData,
  closeHistoricData,
}) {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className="header">
      <h2 onClick={() => history.push("/")}>{heading}</h2>
      {location.pathname !== "/" ? (
        <div
          className="historicButton"
          onClick={historicData ? closeHistoricData : loadHistoricData}
        >
          {`${historicData ? "Close" : "Get"} Historic Data`}
        </div>
      ) : null}
    </div>
  );
}

export default Header;
