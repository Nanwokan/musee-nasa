//import { useState } from "react";

export default function Filtres({
  type,
  startYear,
  endYear,
  onTypeChange,
  onStartYearChange,
  onEndYearChange,
}) {
  //const [sort, setSort] = useState();


  return (
    <form action="">
      <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">Tous</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Son</option>
      </select>
      <input type="number" name="start-year" id="start-year" value={startYear} onChange={(e) => onStartYearChange(e.target.value)}/>
      <input type="number" name="end-year" id="end-year" value={endYear} onChange={(e) => onEndYearChange(e.target.value)}/>
    </form>
  );
}
