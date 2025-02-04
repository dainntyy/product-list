import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import CartBar from './Cart';
import { Product, CartItem } from '../types';

interface GridProductProps {
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function GridProduct({ setCart }: GridProductProps)  {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
            .catch((error) => console.log(error))
    }, []);

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    return (
        <>
             <Row xs={1} md={2} lg={3} className="g-4">
            {data.map((item) => (
                <Col key={item.id}>
                    <Card>
                        <Card.Img variant="top" src={item.image.desktop} alt={item.name} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                Category: {item.category} <br />
                                Price: ${item.price.toFixed(2)}
                            </Card.Text>
                            <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        </>
    );
};

export default GridProduct;