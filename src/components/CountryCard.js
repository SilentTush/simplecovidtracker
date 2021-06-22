import React from "react";
import { useHistory } from "react-router-dom";

function CountryCard({ data }) {
  const history = useHistory();

  return (
    <div
      className="countryCard"
      onClick={() => history.push(`/country/${data.country}`)}
    >
      <img src={data.countryInfo.flag} alt="countryFlag" />
      <div className="detailsWrapper">
        <p className="country">{data.country}</p>
        <p className="cases">Active cases {data.active}</p>
        <p className="deaths">Deaths-today {data.todayDeaths}</p>
      </div>
    </div>
  );
}

export default CountryCard;
