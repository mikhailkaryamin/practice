import Address from "./Address";
import Form from "react-bootstrap/Form";

function CustomerAddress({
  placeOrder,
  handleChangeAddress,
  billingAddress,
  deliveryAddress,
  validated
}) {
  return (
    <>
      {" "}
      <div className="section-title mt-5">
        <span className="section-number">2</span>
        <h3>Выберите адрес</h3>
      </div>
      <Form
        onSubmit={(e) => placeOrder(e)}
        className="p-2 address-form"
        noValidate
        validated={validated}
      >
        <Address
          title="Адрес доставки"
          handleChangeAddress={(e) => handleChangeAddress(e, "delivery")}
          address={deliveryAddress}
        />
        <Address
          title="Адрес счета"
          handleChangeAddress={(e) => handleChangeAddress(e, "billing")}
          address={billingAddress}
        />
        <div className="d-flex justify-content-end mt-3">
          <button className="order-btn btn btn-outline-dark" type="submit">
            Разместить заказ
          </button>
        </div>
      </Form>{" "}
    </>
  );
}

export default CustomerAddress;
