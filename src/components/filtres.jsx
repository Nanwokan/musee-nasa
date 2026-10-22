//import { useState } from "react";

export default function Filtres({onTypeChange, onStartYearChange, onEndYearChange}) {
  //const [sort, setSort] = useState();


  return (
    <form action="">
      <select name="" id="" onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">Tous</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Son</option>
      </select>
      <input type="number" name="start-year" id="start-year" onChange={(e) => onStartYearChange(e.target.value)}/>
      <input type="number" name="end-year" id="end-year" onChange={(e) => onEndYearChange(e.target.value)}/>
    </form>
  );
}
