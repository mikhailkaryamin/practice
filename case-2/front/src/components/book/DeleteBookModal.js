import React from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteBookModal({ onHide, deleteBook, show, quantity }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{ fontSize: "20px" }}
                >
                    Уверен что хочешь удалить?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer style={{ justifyContent: "space-between" }}>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        deleteBook();
                        onHide();
                    }}
                >
                    Удалить книгу
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteBookModal;
