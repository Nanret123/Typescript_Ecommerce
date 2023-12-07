import { Col, Row } from "react-bootstrap";
import { ApiError } from "../types/ApiError";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductQuery } from "../hooks/productHooks";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error as ApiError}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>E-Com</title>
      </Helmet>
      {products!.map((product) => {
        return (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Col>
        );
      })}
    </Row>
  );
};

export default HomePage;
