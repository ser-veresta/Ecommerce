import styled from "styled-components";
import { mobile } from "../responsive";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../redux/apiCalls";
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
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  margin-top: 20px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
`;

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, errorMessage } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setMatch("");
      const pass = password;
      setPassword("");
      setConfirmPassword("");
      resetPassword(dispatch, history, resetToken, pass);
    } else {
      setMatch(`Password doesn't match`);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
          <Input
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
          <Button onClick={handleClick}>RESET</Button>
        </Form>
        {match && <Error>{match}</Error>}
        {error && <Error>{errorMessage}</Error>}
      </Wrapper>
    </Container>
  );
};

export default ResetPassword;
