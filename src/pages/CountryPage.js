import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";

function CountryPage() {
  const { countryName } = useParams();
  const [data, setData] = useState([]);
  const [historicData, setHistoricData] = useState(null);
  const history = useHistory();
  async function loadHistoricData() {
    axios
      .get(`https://corona.lmao.ninja/v2/historical/${countryName}`)
      .then((result) => {
        setHistoricData(result.data.timeline);
      })
      .catch((err) => {
        alert(`Historic data for ${countryName}, does not exist`);
      });
  }
  useEffect(() => {
    getData();
    async function getData() {
      axios
        .get(`https://corona.lmao.ninja/v2/countries/${countryName}`)
        .then((result) => {
          let data = result.data;
          delete data.undefined;
          setData(result.data);
        })
        .catch((err) => {
          history.push("/");
          alert(`Cannot get Data for ${countryName}`);
        });
    }
  }, []);

  return (
    <div className="countryPage">
      <Header
        heading={countryName[0].toUpperCase() + countryName.slice(1)}
        loadHistoricData={loadHistoricData}
        historicData={historicData}
        closeHistoricData={() => setHistoricData(null)}
      />
      <img src={data?.countryInfo?.flag} />
      {historicData === null ? (
        <div className="detailsWrapper">
          {Object.keys(data).map((item, index) => {
            if (item === "countryInfo" || item === "updated") return null;
            else
              return (
                <div
                  className={`dataItem ${index % 2 === 0 ? "" : "alternate"} `}
                >
                  <p className="title">
                    {item[0].toUpperCase() + item.slice(1)}
                  </p>
                  <p className="data">{data[item]}</p>
                </div>
              );
          })}
        </div>
      ) : (
        <div className="historicWrapper">
          <div className="dataItem heading">
            <p className="cell date">Date</p>
            <p className="cell cases">Cases</p>
            <p className="cell deaths">Deaths</p>
            <p className="cell recovered">Recovered</p>
          </div>
          {Object.keys(historicData.cases).map((date, index) => {
            let indianDate =
              date.split("/")[1] +
              "-" +
              date.split("/")[0] +
              "-" +
              date.split("/")[2];

            return (
              <div className={`dataItem ${index % 2 === 0 ? "" : "alternate"}`}>
                <p className="cell date">{indianDate}</p>
                <p className="cell cases">{historicData.cases[date]}</p>
                <p className="cell deaths">{historicData.deaths[date]}</p>
                <p className="cell recovered">{historicData.recovered[date]}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CountryPage;
