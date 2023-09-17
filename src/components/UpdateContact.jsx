import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../App";
import { actionTypes } from "../app/reducer";
import Loader from "./Loader";
import { appContext } from "../app/context";


const UpdateContact = () => {
  const [{ isLoading }, dispatch] = useContext(appContext);

  const [contactDetail, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    jobpost: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleJobChange = (e) => {
    setContact((prev) => {
      return { ...prev, jobpost: e.target.value };
    });
  };
  const fetchContact = async () => {
    dispatch({
      type: actionTypes.fetchSingleContact,
      isLoading: true,
    });
    const { data } = await axios.get(`${BASE_URL}/api/contacts/${id}`);
    if (data.success) {
      setContact(() => {
        return data.contact;
      });
      dispatch({
        type: actionTypes.fetchSingleContact,
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `${BASE_URL}/api/contacts/${id}`,
      contactDetail
    );
    setContact({ name: "", email: "", phone: "", jobpost: "" });
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
    <div className="w-full min-h-screen bg-gray-200 flex flex-col gap-5 justify-start items-center py-10">
      <div className="">
        <h2 className="text-3xl text-gray-800 font-bold mb-3">
          Create new Contact
        </h2>
      </div>
      <form
        className="w-[40%] bg-white shadow-lg p-10 rounded-lg flex flex-col gap-5"
        method="post"
        onSubmit={handleUpdate}
      >
        <div className="flex flex-col gap-1">
          <label className="text-gray-900 font-medium" htmlFor="name">
            Name:
          </label>
          <input
            className="w-full h-10 outline-none border border-gray-900 text-gray-800 font-medium p-2 rounded"
            type="text"
            name="name"
            id="name"
            value={contactDetail.name}
            onChange={handleChange}
            placeholder="Enter full Name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-900 font-medium" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full h-10 outline-none border border-gray-900 text-gray-800 font-medium p-2 rounded"
            type="email"
            name="email"
            id="email"
            value={contactDetail.email}
            onChange={handleChange}
            placeholder="Enter EmailId"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-900 font-medium" htmlFor="phone">
            Phone:
          </label>
          <input
            className="w-full h-10 outline-none border border-gray-900 text-gray-800 font-medium p-2 rounded"
            type="tel"
            name="phone"
            id="phone"
            value={contactDetail.phone}
            onChange={handleChange}
            placeholder="+91 7846872343"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-900 font-medium" htmlFor="jobpost">
            Job Post:
          </label>
          <select
            className="w-full h-10 outline-none border border-gray-900 text-gray-800 font-medium p-2 rounded"
            name="jobpost"
            id="jobpost"
            value={contactDetail.jobpost}
            onChange={handleJobChange}
          >
            <option>Select job post</option>
            <option value="Front-end developer">Front-end developer</option>
            <option value="Backend-end developer">Backend-end developer</option>
            <option value="Full-stack developer">Full-stack developer</option>
            <option value="Devops Engineer">Devops Engineer</option>
            <option value="Web Designer">Web Designer</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <input
            className="w-full h-10 outline-none bg-yellow-400 cursor-pointer text-white font-medium p-2 rounded hover:bg-yellow-500 transition-all duration-150"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateContact;
