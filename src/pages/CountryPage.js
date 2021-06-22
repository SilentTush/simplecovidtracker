import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function CountryPage() {
  const { countryName } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
    async function getData() {
      axios
        .get(`https://corona.lmao.ninja/v2/countries/${countryName}`)
        .then((result) => {
          setData(result.data);
        });
    }
  }, []);

  return (
    <div className="countryPage">
      <Header heading={countryName[0].toUpperCase() + countryName.slice(1)} />
    </div>
  );
}

export default CountryPage;
