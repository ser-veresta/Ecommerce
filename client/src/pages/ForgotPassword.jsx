import { useState } from "react";
import styled from "styled-components";
import { forgotPassword } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0px 0px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 0px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 10px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Message = styled.p`
  font-weight: 300;
  margin: 20px 0px 0px;
  color: ${(p) => (p.error ? "red" : "")};
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, errorMessage, successMessage } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Title>FORGOT PASSWORD</Title>
        <Form>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"></Input>
          <Button
            onClick={(e) => {
              e.preventDefault();
              forgotPassword(dispatch, email);
            }}
          >
            SEND EMAIL
          </Button>
        </Form>
        {successMessage && <Message>{successMessage}</Message>}
        {error && <Message error={error}>{errorMessage}</Message>}
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
