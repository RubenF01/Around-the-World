import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = ({ setSearch }) => {
  return (
    <div className="flex items-center space-x-2 px-2.5 py-2.5 w-3/12 h-11 rounded shadow">
      <AiOutlineSearch className="" />
      <input
        type="text"
        placeholder="Search for a country"
        className="outline-none w-full"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      ></input>
    </div>
  );
};

export default Searchbar;
