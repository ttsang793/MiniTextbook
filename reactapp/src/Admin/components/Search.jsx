import { React, useState } from 'react';
import { MagnifyingGlass } from "@phosphor-icons/react";
import "./Search.css";

const Search = (props) => {
  const [attribute, setAttribute] = useState("name");
  const [search, setSearch] = useState("");

  const onClick = () => {
    props.onClick(attribute, search);
    setSearch("");
    setAttribute("name");
  }

  return (
    <div className="flex mb-3 w-3/4 justify-self-end">
      <select className="bg-gray-300/70 text-gray-900 rounded-lg ps-2 pe-4 me-3" value={attribute} onChange={e => setAttribute(e.target.value)}>
        <option value="id">ID</option>
        <option value="name">Tên</option>
      </select>
      <input
        type="search" id="search-input" className="bg-gray-300/70 text-gray-900 flex-1 rounded-s-full py-2 ps-5 placeholder:italic"
        placeholder="Tìm kiếm..." spellCheck="false" value={search} onChange={e => setSearch(e.target.value)}
        onKeyDown={e => {if (e.nativeEvent.key === "Enter") document.getElementById("search-btn").click()}}
      />
      <button id="search-btn" className="p-2 rounded-e-full bg-gray-300/70 text-gray-900 cursor-pointer hover:bg-pink-900 hover:text-pink-300 duration-200" onClick={() => onClick()}>
        <MagnifyingGlass size={24} className="cursor-pointer" />
      </button>
    </div>
  )
}

export default Search;