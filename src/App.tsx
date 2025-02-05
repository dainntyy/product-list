import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GridProduct from './components/ProductList/ProductList';
import CartBar from './components/Cart/Cart';
import { CartItem } from './types';
import './App.css';

function App() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [highlighted, setHighlighted] = useState<{ [key: number]: boolean }>({});

    return (
        <Container>
        <Row>
          <h1 className='fw-bold ms-3 mt-5'>Desserts</h1>
                {/* Main product grid */}
                <Col md={8}>
                    <GridProduct cart={cart} setCart={setCart} setHighlighted={setHighlighted} />
                </Col>

                {/* Cart sidebar */}
                <Col md={4}>
                    <CartBar cart={cart} setCart={setCart} setHighlighted={setHighlighted}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
