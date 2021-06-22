import axios from "axios";
import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import Header from "../components/Header";

function Home() {
  const [countryList, setCountryList] = useState([]);
  const [countryListB, setCountryListB] = useState([]);
  const [loading, setloading] = useState(false);
  const [query, setquery] = useState("");

  // loading data when page loads
  useEffect(() => {
    getData();
    async function getData() {
      setloading(true);
      axios.get("https://corona.lmao.ninja/v2/countries").then((result) => {
        setCountryList(result.data);
        setCountryListB(result.data);
        setloading(false);
      });
    }
  }, []);

  // search whenever search input changes
  useEffect(() => {
    if (query === "") {
      setCountryList(countryListB);
    } else {
      let match = [];
      countryList.forEach((country) => {
        if (country.country.toUpperCase().indexOf(query.toUpperCase()) !== -1) {
          match.push(country);
        }
      });
      setCountryList(match);
    }
  }, [query]);
  return (
    <div className="home">
      <Header heading="Simple Covid Tracker" />
      <h2 className="SearchHeading">Search country</h2>
      <div className="searchBar">
        <input
          type="text"
          value={query}
          onChange={(e) => setquery(e.target.value.trim())}
        />
        <div className="go">Go</div>
      </div>
      <div className="countryListWrapper">
        {!loading ? (
          countryList.map((data) => {
            return <CountryCard data={data} />;
          })
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
