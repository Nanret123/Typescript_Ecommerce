import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect } from "react";
import { Store } from "../Store";
import { useCreateOrderMutation } from "../hooks/orderHooks";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";

const PlaceOrderPage = () => {
  const navigate = useNavigate();

  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

  cart.taxPrice = round2(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder, isPending } = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      console.log()
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {

      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroupItem key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid-rounded thumbnail"
                        />
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>
                        <span>{item.price}</span>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      {" "}
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      {" "}
                      <strong>${cart.totalPrice.toFixed(2)}</strong>{" "}
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0 || isPending}
                    >
                      Place Order
                    </Button>
                    {isPending && <LoadingBox />}
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
