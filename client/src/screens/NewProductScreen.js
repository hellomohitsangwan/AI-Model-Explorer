import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listProductDetails,
  newProduct,
  updateProduct,
} from "../actions/productActions";
import {
  NEW_PRODUCT_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";
// import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const NewProductScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  //   const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [trainingData, setTrainingData] = useState("");
  const [version, setVersion] = useState("");
  const [framework, setFramework] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // if (!userInfo || !userInfo.isAdmin) {
    //   history.push("/");
    // }
    if (userInfo && userInfo.isAdmin) {
      if (success) {
        // history.push("/admin/products");
        dispatch({ type: NEW_PRODUCT_RESET });
        dispatch({ type: PRODUCT_UPDATE_RESET });
        history.push("/admin/modellist");
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, success, history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("accuracy", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("countInStock", countInStock);
    formData.set("trainingData", trainingData);
    formData.set("version", version);
    formData.set("framework", framework);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };
  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Link to="/admin/modellist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Model</h1>
        {/* {(loading && !error) && <Loader />}
        {error && <Message variant="danger">{error}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter model"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Accuracy</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Accuracy"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="form-group">
              <label>Images</label>

              <div className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                  multiple
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Images
                </label>
              </div>

              {imagesPreview.map((img) => (
                <img
                  src={img}
                  key={img}
                  alt="Images Preview"
                  className="mt-3 mr-2"
                  width="55"
                  height="52"
                />
              ))}
            </div>{" "}
            
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId="trainingData">
            <Form.Label>Training Data</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter training data link"
              value={trainingData}
              onChange={(e) => setTrainingData(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="version">
            <Form.Label>Version</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="framework">
            <Form.Label>Framework</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter framework"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
            ></Form.Control>
          </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Model
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default NewProductScreen;
