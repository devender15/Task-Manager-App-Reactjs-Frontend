import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../utilities/fetchUser";
import { Navbar, TasksTable, Spinner } from "./index";

const Home = () => {
  const userToken = fetchUser();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getUserDetails = () => {
    setLoading(true);
    try {
    fetch(`${process.env.REACT_APP_API_URL}/user-auth/details`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserDetails(data))
      .then(setLoading(false));
    }
    catch (error) {
      navigate('/login');
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <Navbar username={userDetails?.fname} />

      <div className="mt-20">
        <h1 className="font-bold text-3xl text-center my-4">
          Add your today's tasks
        </h1>

        <div className="p-4 px-[10vw]">
          {loading && <Spinner message="loading"/>}
          <TasksTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
