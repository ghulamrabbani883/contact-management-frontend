import { useContext, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { appContext } from "../app/context";
import axios from "axios";
import { BASE_URL } from "../App";
import { actionTypes } from "../app/reducer";


const Header = () => {
  const [search, setSearch] = useState("");
  const [sort] = useState("");
  const [{}, dispatch] = useContext(appContext);

  const fetchDataOnSearch = async (search, sort) => {
    dispatch({
      type: actionTypes.fetchContacts,
      isLoading: true,
    });
    const query = `search=${search}&sort=${sort}`;
    const { data } = await axios.get(`${BASE_URL}/api/contacts?${query}`);
    if (data.success) {
      console.log(data.contacts);
      dispatch({
        type: actionTypes.fetchContacts,
        contacts: data.contacts,
        isLoading: false,
      });
    } else {
      alert(data.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDataOnSearch(search, sort);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(() => e.target.value);
  };
  const handleSortChange = async (e) => {
    e.preventDefault();
    // setSort(e.target.value);
    fetchDataOnSearch(search, e.target.value);
  };

  return (
    <nav className="w-full h-16 bg-yellow-500 flex justify-between items-center px-10">
      <div className="">
        <Link to="/">
          <h1 className="text-3xl text-white font-bold">Contacts</h1>
        </Link>
      </div>
      <div className="flex gap-3 items-center w-84">
        <div className="flex items-center bg-white border border-gray-800">
          <input
            className="flex-8 outline-none h-10 p-2 text-gray-800 font-medium text-md"
            type="search"
            value={search}
            onChange={handleSearchChange}
          />
          <AiOutlineSearch
            className="flex-2 border-l-2 border-l-gray-800 font-medium cursor-pointer hover:font-bold"
            size={24}
            onClick={handleSearch}
          />
        </div>
        <select
          className="outline-none h-10 p-2 border border-gray-800 text-gray-800 font-medium text-md"
          name="sort"
          value={sort}
          onChange={handleSortChange}
        >
          <option className="font-medium" value="">Sort the contacts</option>
          <option className="font-medium" value="name">
            By name
          </option>
          <option className="font-medium" value="createdAt">
            By date
          </option>
        </select>
        <Link to="/contact/create">
          <IoCreateOutline className="text-white font-bold" size={28} />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
