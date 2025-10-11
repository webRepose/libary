import { useState } from "react";
import Style from '../styles/sComponents/searchBar.module.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // вызываем колбэк при каждом вводе
  };

  console.log(Style)

  return (
    <div className={Style.search}>
      <input
        type="text"
        placeholder="Поиск книги..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
