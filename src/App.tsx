import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GridProduct from './components/productList';
import CartBar from './components/Cart';
import { CartItem } from './types';

function App() {
    const [cart, setCart] = useState<CartItem[]>([]);

    return (
        <Container>
        <Row>
          <h1>Desserts</h1>
                {/* Main product grid */}
                <Col md={9}>
                    <GridProduct setCart={setCart} />
                </Col>

                {/* Cart sidebar */}
                <Col md={3}>
                    <CartBar cart={cart} setCart={setCart} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
