import { Modal, Button } from "react-bootstrap";
function DeleteItemModal({deleteCartItemAndModalClose, ...props}) {
  return (
    <Modal
      {...props}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Действительно хотите удалить?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Закрыть
        </Button>
        <Button variant="danger" onClick={deleteCartItemAndModalClose}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteItemModal;
