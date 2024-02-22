import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Screen.css";
import avator from "../assets/avator.svg";
import Footer from "../components/Footer";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [recom, setRecom] = useState("");
  const [rl, srl] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const submitHandler = () => {
    history.push(`/favourite/${match.params.id}?qty=${qty}`);
  };
  const postRecom = async () => {
    srl(true);
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/recom",
        { recommendation: recom, farmer_id: product.user._id },
        config
      );
      console.log(data.response.msg);
    } catch (error) {
      console.log(error.response.data.message);
    }
    srl(false);
  };
  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Link to="/" className="btn back-btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <>
          <Row>
            <Col sm={12} md={6}>
              <Carousel pause="hover">
                {product?.product?.images &&
                  product?.product?.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <div className="Pimage">
                        <img
                          className="d-block w-100 product-images"
                          src={image.url}
                          alt={product?.product?.title}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product?.product?.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.product?.rating}
                    text={`${product?.product?.numReviews} reviews`}
                  />
                </ListGroup.Item>{" "}
                <ListGroup.Item>
                  Description: {product?.product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Accuracy</Col>
                      <Col>{product?.product?.accuracy}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Training Data</Col>
                      <Col>
                        <a
                        color="blue"
                          href={product?.product?.trainingData}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Demo link
                        </a>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Version</Col>
                      <Col>{product?.product?.version}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Framework</Col>
                      <Col>{product?.product?.framework}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      onClick={submitHandler}
                      className="btn-block1"
                      type="button"
                    >
                      Add To Favourites
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <div className="farmer-details">
              <img src={avator} alt="" className="avator-details" />
              <p className="details-title">Creator Detail's</p>
              <Col>
                <p className="detail-name">
                  <span className="span-details">Name : </span>
                  {product?.user?.name}
                </p>
                <p className="detail-email">
                  <span className="span-details">Email : </span>
                  {product?.user?.email}
                </p>
                <p className="detail-since">
                  <span className="span-details">Creator Since : </span>
                  {product?.user?.createdAt.split("T")[0]}
                </p>
                {/* <p>{product?.user?.updatedAt}</p> */}
              </Col>
            </div>
          </Row>

          <Row>
            <div className="review-section">
              <Col md={6}>
                <h2 className="review-title">Reviews</h2>
                {product?.product?.reviews.length === 0 && (
                  <Message>No Reviews</Message>
                )}
                <ListGroup variant="flush">
                  {product?.product?.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <div className="review-details">
                        <strong> By : {review.name}</strong>

                        <p className="commt"> {review.comment}</p>
                        <p>Posted on : {review.createdAt.substring(0, 10)}</p>
                      </div>
                      <div className="stars">
                        <Rating value={review.rating} />
                      </div>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {successProductReview && (
                      <Message variant="success">
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={reviewSubmitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </div>
          </Row>
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductScreen;
