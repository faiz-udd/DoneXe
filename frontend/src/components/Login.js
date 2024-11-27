import { FaSignInAlt } from 'react-icons/fa'; // Fixed quotes
import { useState } from 'react'; 
import { useSelector, useDispatch } from "react-redux"; // Changed quotes
import { useNavigate } from "react-router-dom"; // Changed quotes
import { toast } from "react-toastify"; // Changed quotes
import { login, reset } from "../features/auth/authSlice"; // Changed quotes
import Spinner from "./Spinner"; // Changed quotes

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password }
    dispatch(login(userData))
    console.log('Form submitted:', formData); 
  };

  return (
    isLoading ? <Spinner /> : (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to your account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
    )
  );
};

export default Login;
