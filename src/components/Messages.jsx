import React, { useRef } from "react";
import styled from "styled-components";
function Messages({ messages, scrollRef, keyUuid }) {
  return (
    <Container>
      <div className="chat-messages">
        {messages.map((message, index) => {
          return (
            <div ref={scrollRef} key={keyUuid()}>
              <div
                className={`message ${
                  message.fromSelf ? "sender" : "received"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 80%;
  .chat-messages {
    display: flex;
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1rem;
    overflow-x: hidden;
    height: 125%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #1a72ad;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem;
        font-size: 1.1rem;
        border-radius: 1.5rem;
        color: #d1d1d1;
      }
    }
    .sender {
      justify-content: flex-end;
      .content {
        background-color: #f3fd0121;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #dcd5e020;
      }
    }
  }
`;
export default Messages;
