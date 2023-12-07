import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProduct } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useContext } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { convertProductToCartItem } from "../utils";

const ProductPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetSingleProduct(id!);

  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product!.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart");
    console.log(cart);
    navigate("/cart");
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="large" />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Helmet>
                <title>{product.name}</title>{" "}
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem>Price : ${product.price}</ListGroupItem>
            <ListGroupItem>
              Description : <p>{product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button variant="primary" onClick={addToCartHandler}>
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
