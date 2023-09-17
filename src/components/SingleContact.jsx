import { useContext, useEffect } from "react";
import { BASE_URL } from "../App";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiUserMinus, BiPhone } from "react-icons/bi";
import {
  MdOutlineMailOutline,
  MdOutlineLaptopChromebook,
  MdOutlineUpdate,
} from "react-icons/md";


import { actionTypes } from "../app/reducer";
import Loader from "./Loader";
import { appContext } from "../app/context";

const SingleContact = () => {
  const [{ isLoading, contact }, dispatch] = useContext(appContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchContact = async () => {
    dispatch({
      type: actionTypes.fetchSingleContact,
      isLoading: true,
    });
    const { data } = await axios.get(`${BASE_URL}/api/contacts/${id}`);
    if (data.success) {
      dispatch({
        type: actionTypes.fetchSingleContact,
        contact: data.contact,
        isLoading: false,
      });
    } else {
      dispatch({
        type: actionTypes.error,
        message: data.message,
        isLoading: false,
      });
      alert(data.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const { data } = await axios.delete(`${BASE_URL}/api/contacts/${id}`);
    if (data.success) {
      alert(data.message);
    } else {
      alert(data.message);
    }
    navigate("/");
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-200 py-10 px-16">
      {contact && (
        <div className="p-5 flex flex-col gap-5">
          <div className="flex gap-3">
            <BiUserMinus className="font-medium text-yellow-400 text-4xl" />
            <p className="font-medium text-gray-800 text-2xl">{contact.name}</p>
          </div>
          <div className="flex gap-3">
            <MdOutlineMailOutline className="font-medium text-yellow-400 text-2xl" />
            <p className="font-medium text-gray-800">{contact?.email}</p>
          </div>
          <div className="flex gap-3">
            <BiPhone className="font-medium text-yellow-400 text-2xl" />
            <p className="font-medium text-gray-800">{contact?.phone}</p>
          </div>
          <div className="flex gap-3">
            <MdOutlineLaptopChromebook className="font-medium text-yellow-400 text-2xl" />
            <p className="font-medium text-gray-800">{contact?.jobpost}</p>
          </div>
          <div className="flex gap-3">
            <MdOutlineUpdate className="font-medium text-yellow-400 text-2xl" />
            <p className="font-medium text-gray-800">
              {contact?.createdAt?.split("T")[0]}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="w-36 bg-yellow-400 text-white h-10 font-medium text-lg cursor-pointer hover:bg-yellow-500 transition-all duration-150"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
            <Link to={`/contact/update/${contact?._id}`}>
              <button
                className="w-36 bg-yellow-400 text-white h-10 font-medium text-lg cursor-pointer hover:bg-yellow-500 transition-all duration-150"
                type="button"
              >
                Update
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleContact;
