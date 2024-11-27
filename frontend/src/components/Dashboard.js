import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { useSelector } from "react-redux"; 
import TaskForm from './TaskForm'

const Dashboard = () => {
  const navigate = useNavigate(); // Hook must be inside the component
  const { user } = useSelector((state) => state.auth); // Fixed arrow function syntax and quotes

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Fixed navigation path quotes
    }
  }, [user, navigate]); // Ensure dependencies are accurate

  return (
    <>
    <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <div style ={{display:'flex',justifyContent:'center' }}>
            <button className="btn" onClick={()=>navigate('./alltasks')}>Check Tasks</button>
        </div>
    </section>
    <TaskForm/>
    </>
    

  );
};

export default Dashboard;
