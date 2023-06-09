import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 쓰는 방법
// import 하고 text=텍스트, link=navigate 할 곳
// <NavBack text="여기다가 넣으면 돼" link="/list"/>

type Props = {
  text: String;
  link: String;
  name?: string;
};

export default function NavBack({ text, link, name }: Props) {
  const navigate = useNavigate();

  return (
    <Container className={name}>
      <svg
        onClick={() => {
          if (link === "-1") navigate(-1);
          else navigate(`${link}`);
        }}
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="64" height="64" />
        <path
          d="M30.25 38.5L24 32.25ZM24 32.25L30.25 26ZM24 32.25H39Z"
          fill="white"
        />
        <path
          d="M30.25 38.5L24 32.25M24 32.25L30.25 26M24 32.25H39"
          stroke="#5C5649"
          strokeWidth="2"
        />
      </svg>
      <Text>{text?.length > 15 ? text.slice(0, 15)+'...' : text}</Text>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  background:#f9f9f7;
  &.mypage {
    background-color: #DBD4C3;
  }
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #5c5649;
`;
