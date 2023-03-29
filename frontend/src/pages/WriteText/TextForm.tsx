import React, { useState } from "react";
import styled from "styled-components";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { writeTextAPI } from "../../apis/writeText";
import { useParams } from "react-router-dom";

interface Comment {
  bookId: number;
  content: string;
}

export default function TextForm() {
  const bookId: number = Number(useParams().bookid);
  const [content, setContent] = useState<string>("");
  const comment: Comment = {
    bookId: bookId,
    content: content,
  };

  // bookId와 text를 한꺼번에 보내기

  const handleTextChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const wirteText = async (comment: Comment) => {
    const data = await writeTextAPI(comment);
    console.log(data);
    setContent("");
  };

  return (
    <>
      <Container>
        <Title>여러분의 생각을 남겨보세요.</Title>
        <Form>
          <Input
            type="text"
            value={content}
            // placeholder="여기에 글을 작성해주세요."
            onChange={handleTextChnage}
          ></Input>
          <Button
            onClick={() => {
              wirteText(comment);
            }}
          >
            <Icon>
              <PaperAirplaneIcon />
            </Icon>
          </Button>
        </Form>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 90%;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  padding-right: 8px;
`;

const Title = styled.div`
  color: #5c5649;
  font-weight: bold;
  margin-top: 0.3rem;
`;

const Input = styled.input`
  background-color: transparent;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #5c5649;
  width: 100%;
  height: 2.3rem;
  margin-top: 0.4rem;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const Icon = styled.div`
  border: #5c5649;
  height: 20px;
  width: 20px;
`;