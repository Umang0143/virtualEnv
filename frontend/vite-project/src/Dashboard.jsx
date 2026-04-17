import { use, useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // const [data, setData] = useState(null);
  // const navigate = useNavigate();

  // // Protect route
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  // // Fetch API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");

  //       const res = await axios.get("http://127.0.0.1:8000/dashboard", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       console.log(res.data);
  //       setData(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // //  Logout function
  // const handleLogout = async () => {
  //   try {
  //     await signOut({ global: true });

  //     localStorage.clear();

  //     navigate("/login");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  cost [data, setData] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      // Fetch data
      const fetchData = async () => {
        try {
          const res = await axios.get("http://127.0.0.1:8000/dashboard", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>

      <p>{data?.message}</p>
      
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;