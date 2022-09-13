import React, { useState, useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";
function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatars, setSelectedAvatars] = useState(undefined);
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const setProfilePicture = async (e) => {
    e.preventDefault();
    if (selectedAvatars === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      console.log(user);
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatars],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again");
      }
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const data = [];
    const resImg = async () => {
      for (let i = 0; i < 15; i++) {
        try {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = await new Buffer(image.data);
          data.push(buffer.toString("base64"));
          console.log(buffer);
        } catch (error) {}
      }
      setAvatars(data);
      setIsLoading(false);
    };
    resImg();
    return () => {};
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={Loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatars === index ? "selected" : ""
                  } `}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatars(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={(e) => setProfilePicture(e)}>
            Set as profile picture
          </button>
        </Container>
      )}

      <ToastContainer />
    </>
  );
}

export default SetAvatar;
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: #fff;
    }
  }
  .avatars {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: #fff;
    border: none;
    padding: 1rem 2rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
