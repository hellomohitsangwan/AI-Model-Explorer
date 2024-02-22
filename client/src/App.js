import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductScreen from "../src/screens/ProductScreen";
import FavouriteScreen from "../src/screens/FavouriteScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Header from "./components/Header";
import ProductListScreen from "./screens/ProductListScreen";
import MainFooter from "./components/MainFooter";
import NewProductScreen from "./screens/NewProductScreen";
import DashboardScreen from "./screens/DashboardScreen";
import TopProductsScreen from "./screens/TopProductsScreen";
const App = () => {
  return (
    <Router>
      <main>
        <Header />
        <Route path="/topProducts" component={TopProductsScreen}/>
        <Route path="/model/:id" component={ProductScreen} />

        <Route path="/dashboard" component={DashboardScreen}/>
        <Route path="/favourite/:id?" component={FavouriteScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/admin/modellist" component={ProductListScreen} />
        <Route path="/admin/model/new" component={NewProductScreen} />
        <Route path="/home" component={HomeScreen} exact />
        <Route path="/" component={RegisterScreen} exact/>
        <MainFooter />
      </main>
    </Router>
  );
};

export default App;
