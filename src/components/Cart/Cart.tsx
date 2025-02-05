import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/ListGroup";
import { CartItem } from '../../types';
import ModalWindow from '../Modal/Modal';
import { useState } from 'react';
import './Cart.css';

interface CartBarProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    setHighlighted: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}

function CartBar({ cart, setCart, setHighlighted }: CartBarProps) {

    const updateQuantity = (id: number, change: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
            )
        );

        if (change < 0 && cart.find(item => item.id === id)?.quantity === 1) {
            setHighlighted(prev => ({ ...prev, [id]: false })); // При зменшенні кількості до 0 прибираємо border
        }
    };

    const removeFromCart = (id: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
        setHighlighted(prev => ({ ...prev, [id]: false }));
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className="cart-bar">
             <h4 className='fw-bold'>Your Cart <span>({totalItems})</span></h4>
                {/* <img src={require('../../assets/images/icon-carbon-neutral.svg').default}></img> */}
                
                {totalItems === 0 ? (
                    <div className= 'd-flex flex-column align-items-center justify-content-center w-100'>
                        <img src={require('../../assets/images/illustration-empty-cart.svg').default} alt="Empty Cart" className='img-fluid'></img>
                        <p className='text-muted'>Your added items will appear here</p>
                    </div>
                ) : (
                        <>
                            <ListGroup>
                                {cart.map(item => (
                                    <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>{item.name}</strong>
                                            <div className='d-flex gap-2 mt-2 info-container'>
                                                <p className='cart-item-quantity fw-semibold'>{item.quantity}x</p>
                                                <p>
                                                    @ ${item.price.toFixed(2)}
                                                </p>
                                                <p className='fw-semibold'>${ (item.quantity * item.price).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Button size="sm" variant="" onClick={() => removeFromCart(item.id)}>
                                                <img src={require('../../assets/images/icon-remove-item.svg').default}></img>
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                                <p className='my-3 d-flex justify-content-between align-items-center'>Your total <strong className='fs-5'>${total.toFixed(2)}</strong></p>
                                <div className='d-flex gap-2 w-100 justify-content-center carbon-box rounded'>
                                    <img src={require('../../assets/images/icon-carbon-neutral.svg').default } />
                                    <p className='my-3'>This is a <span className='fw-semibold'>carbon-neutral</span> delivery</p>
                                </div>
                            </ListGroup>
                            <div>
                                <Button variant='danger' className="w-100 mt-3 rounded-pill p-2 confirm-order-btn fw-semibold" onClick={() => setModalShow(true)}>Confirm Order</Button>
                            </div>
                            <ModalWindow show={modalShow} onHide={() => setModalShow(false) } cart={cart}/>
                        </>
                )}
        </div>
            {/* Кнопка для відкриття корзини */}
            {/* <Button variant="outline-dark" className="position-fixed top-0 end-0 m-3" onClick={() => setShow(true)}>
                🛒 Your Cart <span>({totalItems})</span>
            </Button>

            {/* Бокова панель корзини */}
            {/* <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart <span>({totalItems})</span></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column">
                    {cart.length === 0 ? (
                        // Фон-зображення при порожній корзині
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <img src={emptyCartImage} alt="Empty Cart" className="img-fluid" style={{ maxWidth: "60%" }} />
                            <p className="text-muted mt-3">Your cart is empty!</p>
                        </div>
                    ) : (
                        <>
                            <ListGroup variant="flush" className="flex-grow-1">
                                {cart.map(item => (
                                    <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>{item.name}</strong> ({item.quantity}x)
                                            <br />
                                            ${item.price.toFixed(2)} each
                                        </div>
                                        <div>
                                            <Button size="sm" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                                            <Button size="sm" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                                            <Button size="sm" variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            {/* Кнопка підтвердження замовлення */}
                            {/* <Button variant="success" className="w-100 mt-3">✅ Confirm Order</Button>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas> */}
        </>
        
    );
}

export default CartBar;