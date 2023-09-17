import axios from "axios";
import { useEffect, useContext } from "react";
import { BASE_URL } from "../App";
import { AiOutlineFolderView, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { appContext } from "../app/context";
import { actionTypes } from "../app/reducer";
import Loader from "./Loader";
import { TableToExcelReact } from "table-to-excel-react";


const Home = () => {
  const [{ isLoading, contacts }, dispatch] = useContext(appContext);

  const fetchContacts = async () => {
    dispatch({
      type: actionTypes.fetchContacts,
      isLoading: true,
    });
    const { data } = await axios.get(`${BASE_URL}/api/contacts`);
    if (data.success) {
      dispatch({
        type: actionTypes.fetchContacts,
        contacts: data.contacts,
        isLoading: false,
      });
    } else {
      alert(data.message);
    }
  };
  const handleDelete = async (id) => {
    dispatch({
      type: actionTypes.deleteContact,
      isLoading: true,
    });
    const { data } = await axios.delete(`${BASE_URL}/api/contacts/${id}`);
    if (data.success) {
      dispatch({
        type: actionTypes.deleteContact,
        isLoading: false,
      });
      alert(data.message);
    } else {
      dispatch({
        type: actionTypes.deleteContact,
        isLoading: false,
      });
      alert(data.message);
    }
    window.location.reload();
  };
  useEffect(() => {
    fetchContacts();
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="w-full min-h-screen bg-gray-200 py-5 px-10">
      <div className="w-64 block mx-auto">
        <TableToExcelReact
          table="table-to-xls"
          fileName="contactDetails"
          sheet="contacts"
        >
          <button className="w-fit px-3 h-10 rounded-lg bg-yellow-400 text-white font-medium cursor-pointer block mx-auto my-5 hover:bg-yellow-500 transition-all duration-150">
            Download Contacts
          </button>
        </TableToExcelReact>
      </div>
      <table id="table-to-xls" className="w-full border border-gray-700">
        <tr className="bg-yellow-400 w-full h-10 text-left">
          <th className="border border-gray-700 pl-2">[]</th>
          <th className="border border-gray-700 pl-2">Name</th>
          <th className="border border-gray-700 pl-2">Email</th>
          <th className="border border-gray-700 pl-2">Phone</th>
          <th className="border border-gray-700 pl-2">Job Post</th>
          <th className="border border-gray-700 pl-2">Created</th>
          <th className="border border-gray-700 pl-2">Actions</th>
        </tr>
        {contacts?.map((contact, index) => {
          return (
            <tr key={index} className="text-left border border-gray-700 h-10">
              <td className="border border-gray-700 pl-2">
                <input type="checkbox" />
              </td>
              <td className="border border-gray-700 pl-2">{contact.name}</td>
              <td className="border border-gray-700 pl-2">{contact.email}</td>
              <td className="border border-gray-700 pl-2">{contact.phone}</td>
              <td className="border border-gray-700 pl-2">{contact.jobpost}</td>
              <td className="border border-gray-700 pl-2">
                {contact.createdAt?.split("T")[0]}
              </td>
              <td className="flex justify-evenly items-center pl-2">
                <Link to={`/contact/${contact._id}`}>
                  <AiOutlineFolderView
                    className="font-bold text-blue-600 cursor-pointer"
                    size={20}
                  />
                </Link>
                <Link to={`/contact/update/${contact._id}`}>
                  <AiFillEdit
                    className="font-bold text-green-600 cursor-pointer"
                    size={20}
                  />
                </Link>
                <AiFillDelete
                  className="font-bold text-red-600 cursor-pointer"
                  onClick={() => handleDelete(contact._id)}
                  size={20}
                />
              </td>
            </tr>
          );
        })}
      </table>
    </main>
  );
};

export default Home;
