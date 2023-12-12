import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { toast } from "react-toastify";
import { convertProductToCartItem } from "../utils";

const ProductItem = ({ product }: { product: Product }) => {
  const { image, name, rating, price, numReviews, countInStock, slug } = product;

  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Product added to the cart");
  };

  return (
    <Card>
      <Link to={`/product/${slug}`}>
        <img src={image} alt={name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${slug}`}>
          <Card.Title>{name}</Card.Title>
        </Link>
        <Rating rating={rating} numReviews={numReviews} />
        <Card.Text>${price}</Card.Text>
        {countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
