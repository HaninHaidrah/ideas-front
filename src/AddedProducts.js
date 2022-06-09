import { Container, Row, Col } from "react-bootstrap";

export default function AddedProducts({ addedProducts }) {
  return (
    <>
      <h2>Added Products </h2>
      <Row className="addedRow">
        <Col xs={2}>
          {" "}
          <h6>Product's Name</h6>
        </Col>
        <Col xs={2}>product Specfications</Col>
        <Col xs={4}>product Brand</Col>
        <Col xs={2}>product unit</Col>

        <Col>product Quantity</Col>
      </Row>
      {addedProducts.map((product, ind) => {
        return (
          <Container key={ind} className="iemsCointainer">
            <Row>
              <Col  id={ind} xs={2}>
                {" "}
                <h6>{product.productName}</h6>
              </Col>
              <Col id={ind} xs={2}>{product.specfications[0]}</Col>
              <Col id={ind} xs={4}>{product.brand[0]}</Col>
              <Col id={ind} xs={2}>{product.unit[0]}</Col>
              <Col id={ind} >{product.quantity}</Col>
            </Row>
          </Container>
        );
      })}
    </>
  );
}
