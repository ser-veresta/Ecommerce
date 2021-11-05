import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { PlusIcon, MinusIcon, XIcon } from "@heroicons/react/outline";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { editProduct, removeProduct } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE_KEY;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(p) => p.type === "filled" && "none"};
  background-color: ${(p) => (p.type === "filled" ? "Black" : "transparent")};
  color: ${(p) => p.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(p) => p.color};
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(p) => p.type === "total" && "500"};
  font-size: ${(p) => p.type === "total" && "24px"};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const {
    cart,
    user: { currentUser },
  } = useSelector((state) => state);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const {
          data: { data },
        } = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        setStripeToken(null);
        history.push("/success", { stripeData: data, cart });
      } catch (error) {
        console.log(error.response);
      }
    };
    if (!currentUser) {
      setStripeToken(null);
      history.push("/login");
    }
    stripeToken && makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeToken]);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => history.push("/")}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
          </TopTexts>
          <StripeCheckout
            name="E_SHOP"
            billingAddress
            shippingAddress
            description={`Your total is $${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={KEY}
          >
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, i) => (
              <div key={i}>
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <span>
                        <b>Product:</b> {product.title}
                      </span>
                      <span>
                        <b>ID:</b> {product._id}
                      </span>
                      <ProductColor color={product.color} />
                      <span>
                        <b>Size:</b> {product.size}
                      </span>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <XIcon style={{ cursor: "pointer" }} onClick={() => dispatch(removeProduct(i))} width="24px" />
                    </ProductAmountContainer>
                    <ProductAmountContainer>
                      <MinusIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(editProduct({ i, type: "dec" }))}
                        width="24px"
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <PlusIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(editProduct({ i, type: "inc" }))}
                        width="24px"
                      />
                    </ProductAmountContainer>
                    <ProductPrice>₹ {product.price * product.quantity}</ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <span>Subtotal</span>
              <span>₹ {cart.total}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Estimated Shipping</span>
              <span>₹ 5.90</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping Discount</span>
              <span>₹ -5.90</span>
            </SummaryItem>
            <SummaryItem type="total">
              <span>Total</span>
              <span>₹ {cart.total}</span>
            </SummaryItem>
            <StripeCheckout
              name="E_SHOP"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
