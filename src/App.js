import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavDropdown,
  NavLink,
  Nav,
} from "react-bootstrap";
import ItemForm from "./ItemForm";

import { RiOilFill } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";

function App() {
  const [show, showState] = useState(false);
  // showState = () => {
  //   console.log("its clicked");
  // };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">IDEAS</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="itemsRow">
        <Container className="iemsCointainer">
          <Row>
            <Col xs={4}>
              {" "}
              <h3>
                {" "}
                <RiOilFill /> Car's Oil{" "}
              </h3>
            </Col>
            <Col xs={2}>
              <GrAddCircle onClick={() => showState(true)} /> Add
            </Col>
            <Col>
              <AiOutlineEdit /> Edit
            </Col>
          </Row>
        </Container>
      </div>

      {show && <ItemForm />}
    </div>
  );
}

export default App;
