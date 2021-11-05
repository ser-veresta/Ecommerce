import styled from "styled-components";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { mobile } from "../responsive";
import { Link as RouterLink } from "react-router-dom";
import { Link as MLink } from "@material-ui/core";

const Link = styled(MLink)`
  color: black !important;
  text-decoration: none !important;
`;

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  font-weight: 500;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  background-color: #${(p) => p.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Payment = styled.img`
  width: 50%;
`;

const footer = () => {
  return (
    <Container>
      <Left>
        <Logo>E_SHOP.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates libero voluptate sunt ut aperiam, atque
          iste doloremque facilis corrupti perspiciatis.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3b5999">
            <i className="fab fa-facebook-square fa-2x"></i>
          </SocialIcon>
          <SocialIcon color="e4405f">
            <i className="fab fa-instagram fa-2x"></i>
          </SocialIcon>
          <SocialIcon color="55acee">
            <i className="fab fa-twitter fa-2x"></i>
          </SocialIcon>
          <SocialIcon color="e60023">
            <i className="fab fa-pinterest fa-2x"></i>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Usefull Links</Title>
        <List>
          <ListItem>
            <Link component={RouterLink} to="/">
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/cart">
              Cart
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/products/men">
              Men Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/products/women">
              Women Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/products/jacket">
              Jacket
            </Link>
          </ListItem>
          <ListItem>
            <Link component={RouterLink} to="/products/jeans">
              Jeans
            </Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <PhoneIcon width="24px" /> +91 9789954186
        </ContactItem>
        <ContactItem>
          <MailIcon width="24px" /> subramaniang573@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default footer;
