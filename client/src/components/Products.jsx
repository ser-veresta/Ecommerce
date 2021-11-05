import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category = "All", filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          category !== "All" ? `http://localhost:5000/products?category=${category}` : `http://localhost:5000/products`
        );
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category !== "All" &&
      setFilteredProducts(
        products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
      );
  }, [category, products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => prev.sort((a, b) => a.createdAt - b.createdAt));
    }
    if (sort === "asc") {
      setFilteredProducts((prev) => prev.sort((a, b) => a.price - b.price));
    }
    if (sort === "desc") {
      setFilteredProducts((prev) => prev.sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {category !== "All"
        ? filteredProducts.map((item, i) => <ProductItem item={item} key={item._id} />)
        : products.map((item, i) => <ProductItem item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
