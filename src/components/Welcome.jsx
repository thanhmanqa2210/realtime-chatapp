import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";
function Welcome({ currentUser }) {
  const [username, setUsername] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);
  return (
    <>
      <Container>
        <div className="logout">
          <Logout title={"Logout"} />
        </div>
        <img src={Robot} alt="robot" />
        <h1>
          Welcome, <span>{username}</span>
        </h1>
        <h3>Please select a chat Start Messaging.</h3>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  .logout {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
export default Welcome;
