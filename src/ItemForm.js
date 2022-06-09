import { Form, Button, Container, Col, Row, Modal } from "react-bootstrap";
import AddedProducts from "./AddedProducts";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
function ItemForm() {
  const [item, setItem] = useState("");
  const [oil, oilSpec] = useState([]);
  const [brand, oilBrand] = useState([]);
  const [unit, oilUnit] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [show, stateShow] = useState(false);

  const handleClose = () => stateShow(false);

  useEffect(() => {
    async function getData() {
      const respond = await axios.get("https://ideas-001.herokuapp.com/items");
      console.log(respond.data);
      setAddedProducts(respond.data);
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(item);
    async function getItem() {
      const respond = await axios.get(`https://ideas-001.herokuapp.com/items/${item}`);
      if (respond.data.length > 0) {
        oilSpec(respond.data[0].specfications);
        oilBrand(respond.data[0].brand);
        oilUnit(respond.data[0].unit);
      }

      setAddedProducts(respond.data);
    }

    getItem();
  }, [item, show]);

  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      productName: `${item}`,
      specfications: e.target.spec.value,
      quantity: e.target.qauntity.value,
      brand: e.target.brand.value,
      unit: e.target.unit.value,
    };
    console.log(reqBody, e);
    const respond = await axios.post("https://ideas-001.herokuapp.com/items", reqBody);
    setAddedProducts(respond.data);
    console.log(respond.data, "...................................");

    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'The product has been added successfuly',
      showConfirmButton: false,
      timer: 1500
    })

    stateShow(false);
  };

  return (
    <div style={{ width: "85%", marginLeft: "7%" }}>
      <Form>
        <Form.Select
          aria-label="Default select example">
          <option>Open this select to Select product Name</option>
          <option
            value="Engine oil"
            onClick={(e) => {
              stateShow(true);
              setItem(e.target.value);
            }}
          >
            Engine Oil
          </option>
          <option
            value="Transimition Oil"
            onClick={(e) => {
              stateShow(true);
              setItem(e.target.value);
            }}
          >
            Transimition Oil
          </option>
          <option
            value="Conventional Motor Oil"
            onClick={(e) => {
              stateShow(true);
              setItem(e.target.value);
            }}
          >
            Conventional Motor Oil
          </option>
        </Form.Select>
        {show && (
          <Modal show={show} onHide={handleClose} className="modalForm">
            <Modal.Header closeButton>
              <Modal.Title style={{ marginLeft: "7%" }}>
                Add A New Product{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => handleSubmit(e)} className="modalForm">
                <Form.Select name="spec" className="modalForm">
                  <option>
                    Open this select to Select product Specification
                  </option>
                  {oil.map((item, ind) => {
                    return <option key={ind} value={item}>{item}</option>;
                  })}
                </Form.Select>
                <Form.Select name="brand" className="modalForm">
                  <option>Open this select to Select product brand</option>
                  {brand.map((item, ind) => {
                    return <option key={ind} value={item}>{item}</option>;
                  })}
                </Form.Select>

                <Form.Select name="unit" className="modalForm">
                  <option>Open this select to Select product unit</option>
                  {unit.map((item, ind) => {
                    return <option key={ind} value={item}>{item}</option>;
                  })}
                </Form.Select>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="add the quantity"
                    name="qauntity"
                  />
                </Form.Group>
                <Button style={{ backgroundColor: "grey" }} type="submit">
                  Add the Product
                </Button>
              </Form>{" "}
            </Modal.Body>
          </Modal>
        )}
      </Form>

      <div className="addedProducts">
        {" "}
        {addedProducts.length > 0 && (
          <AddedProducts addedProducts={addedProducts} />
        )}
      </div>
    </div>
  );
}

export default ItemForm;
