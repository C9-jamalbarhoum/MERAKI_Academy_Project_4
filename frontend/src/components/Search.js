import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { USEContext } from "../App";
function Search() {
  const { SearchVal, setSearchVal } = useContext(USEContext);
  const [SearchData, setSearchData] = useState([]);
  console.log(SearchVal);
  console.log(SearchData);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/search?q= ${SearchVal}`)
      .then((result) => {
        setSearchData(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {/* <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <p>Lorem</p>
      <h2>{SearchData[0].title}</h2> */}
    </>
  );
}

export default Search;
