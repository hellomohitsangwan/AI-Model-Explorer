import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite, removeFromFavourite } from "../actions/cartActions";
import "./Screen.css";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Footer from "../components/Footer";

const FavouriteScreen = ({ match, location, history }) => {
  //match is to get routes in linked
  //location is to get query params in link
  //history is to redirect to a link
  const productId = match.params.id;

  // location.qty it gives me ?qty=1
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { favouriteItems } = cart;
  const dispatch = useDispatch();

  const removeFromFavouriteHandler = (id) => {
    dispatch(removeFromFavourite(id));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToFavourite(productId, qty));
      history.push("/favourite");
    }
    console.log(qty);
  }, [dispatch, productId, qty, history]);
  console.log(favouriteItems);
  return (
    <div>
      <Row>
        <Col md={8}>
          <h1 className="cart-title">Your Favourite models</h1>
          <div className="green-underline"></div>
          <div className="black-underline"></div>
          {favouriteItems.length === 0 ? (
            <Message children="Your cart is empty">
              <Link to="/home">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {favouriteItems.map((item) => (
                <ListGroup.Item>
                  <Row>
                    <Col md={4}>
                      <Image
                        src={item.images[0].url}
                        fluid
                        rounder
                        className="cart-image"
                      />
                    </Col>
                    <div className="cart-status ml-5 pl-5">
                    <Col md={4} className="ml-5 pl-5 mb-4">
                      <Link
                        to={`/product/${item.product}`}
                        className="cart-product-title"
                      >
                        {item.name}
                      </Link>
                    </Col>
                      <Col md={2}>
                      <Button
                          type="button"
                          variant="light"
                          onClick={() => history.push(`/product/${item.product}`)}
                          className="viewDetailsFav"
                        >
                          <p className="remove">View Details</p>
                        </Button>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromFavouriteHandler(item.product)}
                          className="viewDetails"
                        >
                          <p className="remove">Remove</p>
                        </Button>
                      </Col>
                    </div>
                  </Row>
                  <div className="black-underline"></div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FavouriteScreen;
