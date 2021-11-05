import styled from "styled-components";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { Badge, Link as MLink } from "@material-ui/core";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({
    height: "50px",
  })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Link = styled(MLink)`
  color: black !important;
  text-decoration: none !important;
`;

const Navbar = () => {
  const {
    user: { currentUser },
    cart: { quantity },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
        </Left>
        <Center>
          <Logo>
            <Link component={RouterLink} to="/">
              E_SHOP.
            </Link>
          </Logo>
        </Center>
        <Right>
          {!currentUser ? (
            <>
              <MenuItem>
                <Link component={RouterLink} to="/register">
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link style={{ color: "black" }} component={RouterLink} to="/login">
                  SIGN IN
                </Link>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>{currentUser?.username}</MenuItem>
              <Link style={{ color: "black" }} component={RouterLink} to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartIcon width="24px" />
                  </Badge>
                </MenuItem>
              </Link>
              <MenuItem
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                LOGOUT
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
