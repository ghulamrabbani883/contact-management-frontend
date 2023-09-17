import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { appContext } from "../app/context";
import Loader from "./Loader";
import { actionTypes } from "../app/reducer";


const CreateContact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    jobpost: "",
  });
  const [{ isLoading }, dispatch] = useContext(appContext);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.createContact,
      isLoading: true,
    });
    const { data } = await axios.post(`${BASE_URL}/api/contacts`, contact);
    setContact({ name: "", email: "", phone: "", jobpost: "" });
    if (data.success) {
      dispatch({
        type: actionTypes.createContact,
        message: data.message,
        isLoading: false,
      });
      alert(data.message);
    } else {
      dispatch({
        type: actionTypes.error,
        message: data.message,
        isLoading: true,
      });
      alert(data.message);
    }
  };

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
        onSubmit={handleSubmit}
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
            value={contact.name}
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
            value={contact.email}
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
            value={contact.phone}
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
            value={contact.jobpost}
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

export default CreateContact;
