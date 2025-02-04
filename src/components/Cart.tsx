import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import Product from './productList';
import { CartItem } from '../types';

interface CartBarProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function CartBar({ cart, setCart }: CartBarProps) {
    const updateQuantity = (id: number, change: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
            )
        );
    };

    const removeFromCart = (id: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    return (
        <div className="cart-bar">
            <h4>Your Cart</h4>
            <ListGroup>
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
        </div>
    );
}

export default CartBar;