import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(
        loginRoute,
        {
          username,
          password,
          email,
        },
        { withCredentials: false }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const handleValidation = () => {
    const { password, username, email } = values;
    if (password === "") {
      toast.error("Incorrect password! ", toastOptions);
      return false;
    } else if (username.length === 0 && email === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    if (e.target.value.includes("@") && e.target.value.includes(".com")) {
      setValues({ ...values, ["email"]: e.target.value });
    } else setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>TM</h1>
          </div>
          <input
            type="text"
            placeholder="Username or Email"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
      background-color:transparent;
      padding:1rem;
      border:0.1rem solid #4e0eff;
      border-radius:.4rem;
      color:#fff;
      width:100%;
      font-size:1rem;
      &:focus{
        border.1rem solid #997af0;
        outline:none; 
      }
    } 
    button{
      background-color:#997af0;
      color:#fff;
      border:none;
      padding:1rem 2rem;
      font-weight:bold;
      text-transform:uppercase;
      cursor:pointer;
      border-radius:.4rem;
      font-size:1rem;
      transition:.2s ease-in-out;
      &:hover{
        background-color:#4e0eff;
      }
    }
    span{
      color:#ffff;
      text-transform:uppercase;
      a{
        font-weight:bold;
        text-decoration:none;
      }
    }
  }
`;
export default Login;
