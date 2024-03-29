import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Address({ title, handleChangeAddress, address }) {
  return (
    <div id="billing-address">
      <div className="row g-3 address-section">
        <h4>{title}</h4>
        <Form.Group
          as={Col}
          md="4"
          className="mb-3"
          controlId="validationCustom02"
        >
          <Form.Label>Улица</Form.Label>
          <Form.Control
            onChange={handleChangeAddress}
            value={address.street}
            name="street"
            type="text"
            className="form-control"
            aria-describedby="inputGroupPrepend1"
            pattern="(^[A-Za-z]{2,30})([ ]{0,1})([A-Za-z]{2,30}[ ]{0,1}){0,3}"
            required
          />
          <Form.Control.Feedback type="invalid">
            Неверная улица.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          className="mb-3"
          controlId="validationCustom02"
        >
          <Form.Label>Город</Form.Label>
          <Form.Control
            onChange={handleChangeAddress}
            value={address.city}
            name="city"
            type="text"
            className="form-control"
            aria-describedby="inputGroupPrepend2"
            required
            pattern="(^[A-Za-z]{2,30})([ ]{0,1})([A-Za-z]{2,30})"
          />
          <Form.Control.Feedback type="invalid">
            Неверный город.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          className="mb-3"
          controlId="validationCustom02"
        >
          <Form.Label>Номер дома</Form.Label>
          <Form.Control
            onChange={handleChangeAddress}
            value={address.suite}
            name="suite"
            type="text"
            className="form-control"
            aria-describedby="inputGroupPrepend3"
            pattern="^[.0-9a-zA-Z\s,-]+$"
            required
          />
          <Form.Control.Feedback type="invalid">
            Неверный номер дома.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          className="mb-3"
          controlId="validationCustom02"
        >
          <Form.Label>Индекс</Form.Label>
          <Form.Control
            onChange={handleChangeAddress}
            value={address.zipcode}
            name="zipcode"
            type="text"
            className="form-control"
            aria-describedby="inputGroupPrepend4"
            pattern="^[0-9]{6}$"
            required
          />
          <Form.Control.Feedback type="invalid">
            Неверный индекс.
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
  );
}

export default Address;
