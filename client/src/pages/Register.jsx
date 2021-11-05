import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";

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
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  margin-top: 20px;
  color: red;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [match, setMatch] = useState("");
  const dispatch = useDispatch();
  const { error, errorMessage, isFetching } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (inputs.confirmPassword === inputs.password) {
      setMatch("");
      const user = inputs;
      setInputs({});
      register(dispatch, user);
    } else {
      setMatch(`Password doesn't match`);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input name="username" value={inputs.username || ""} onChange={handleChange} placeholder="username"></Input>
          <Input name="email" value={inputs.email || ""} onChange={handleChange} placeholder="email"></Input>
          <Input name="password" value={inputs.password || ""} onChange={handleChange} placeholder="password"></Input>
          <Input
            name="confirmPassword"
            value={inputs.confirmPassword || ""}
            onChange={handleChange}
            placeholder="confirm password"
          ></Input>
          <Agreement>
            By creating an account,I consent to processing of my personal data in accordance with the{" "}
            <b>PRIVACY POLICY</b>
          </Agreement>
          <Button disabled={isFetching} onClick={handleClick}>
            CREATE
          </Button>
        </Form>
        {match && <Error>{match}</Error>}
        {error && <Error>{errorMessage}</Error>}
      </Wrapper>
    </Container>
  );
};

export default Register;
