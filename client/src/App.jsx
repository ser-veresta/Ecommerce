import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Success from "./pages/Success";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { currentUser: user } = useSelector((state) => state.user);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products/:category" component={ProductList} />
        <Route path="/product/:id" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">{user ? <Redirect to="/" /> : <Register />}</Route>
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/ResetPassword/:resetToken" component={ResetPassword} />
        <Route path="/success" component={Success} />
      </Switch>
    </Router>
  );
}

export default App;
