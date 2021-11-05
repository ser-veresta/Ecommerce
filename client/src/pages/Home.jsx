import Announcement from "../components/Announcement";
import Catagories from "../components/Catagories";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Catagories />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
