import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(()=>{
        if(JSON.parse(localStorage.getItem("USER"))){
            return JSON.parse(localStorage.getItem("USER")).isAdmin;
        }else{
            return false;
        }
    });

    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("USER"))){
            localStorage.removeItem("USER");
            navigate("/login");
        }
    },[]);

    const Surveys = JSON.parse(localStorage.getItem("FORMS")) || [];

    const navigate = useNavigate();

    const handleActionClick = (url) => {
        navigate(url);
    };

    const logout = () => {
        localStorage.removeItem("USER");
        navigate("/login");
    }

  return (
    <div className="homepage">
      <h1>Homepage</h1>
      {isAdmin && <button className='button' onClick={()=>{navigate("/createsurvey")}}>Create Survey</button>}
      <button className='logout' onClick={logout}>Logout</button>
      <div className="cards">
        {Surveys.map((link, index) => (
            <div key={index} className="card">
                <div>{`Survey Form ${index+1}`}</div>
                {isAdmin ? (
                    <button onClick={() => handleActionClick(`/view/form`)}>View Responses</button>
                ):(
                    <button onClick={() => handleActionClick(`/form/${index+1}`)}>Take Action</button>
                )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
