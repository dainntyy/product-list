import './Modal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartItem } from '../../types';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface OrderConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    cart: CartItem[];
}

function ModalWindow({ show, onHide, cart }: OrderConfirmationModalProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className='mx-3 mt-4 border-0'>
                <div>
                    <img src={ require('../../assets/images/icon-order-confirmed.svg').default } />
                    <Modal.Title className='fw-bold fs-1'>Order Confirmed</Modal.Title>
                    <p className='text-muted'>We hope you enjoy your food!</p>
                </div>
            </Modal.Header>
            <Modal.Body className='mx-3'>
                <ListGroup >
                    {cart.map(item => (
                        <ListGroup.Item key={item.id} className='order-item'>
                            <Row className='d-flex flex-row'>
                                <Col xs={3}>
                                    <img src={item.image.thumbnail} />
                                </Col>
                                <Col xs={ 9} className='d-flex align-items-center'>
                                        <div className='d-flex flex-column w-100'>
                                            <strong>{item.name}</strong>
                                            <div className='d-flex flex-row w-100 justify-content-between'>
                                                <div className='d-flex justify-content-between gap-2'>
                                                    <p className='cart-item-quantity fw-semibold'>{item.quantity}x</p>
                                                    <p>
                                                        @ ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className='text-end'>
                                                    <p className='fw-semibold'>${ (item.quantity * item.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                </Col>
                            </Row>
                            
                        </ListGroup.Item>
                    ))}
                    <div className='d-flex align-items-center justify-content-between order-box'>
                        <p className='my-4'>Order Total:</p>
                        <strong className='fs-4'>${total.toFixed(2)}</strong>
                    </div>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer className='mx-3 mb-3 border-0'>
                <Button variant="danger" className='close-modal-btn w-100 rounded-pill p-3' onClick={onHide}>
                    Start New Order
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow;