import styled from "styled-components";
import { ShoppingCartIcon, SearchIcon } from "@heroicons/react/outline";
import { Link as RouterLink } from "react-router-dom";
import { Link as MLink } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Link = styled(MLink)`
  color: black !important;
  text-decoration: none !important;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 400px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 85%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon onClick={() => dispatch(addProduct({ ...item, color: item.color[0], size: item.size[0], quantity: 1 }))}>
          <ShoppingCartIcon width="24px" />
        </Icon>
        <Icon>
          <Link component={RouterLink} to={`/product/${item._id}`}>
            <SearchIcon width="24px" />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default ProductItem;
