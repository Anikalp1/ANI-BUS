import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      {user && <h1>Welcome {user?.name}</h1>}
      {user && <h1>{user?.email}</h1>}
    </div>
  );
}

export default Home;
