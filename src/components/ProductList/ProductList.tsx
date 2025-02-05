import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Product, CartItem } from '../../types';
import './ProductList.css';

interface GridProductProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    setHighlighted: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}

function GridProduct({ cart, setCart, setHighlighted }: GridProductProps)  {
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

        setHighlighted(prev => ({ ...prev, [product.id]: true }));
    };

    const updateQuantity = (id: number, change: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + change } : item
            )
                .filter(item => item.quantity > 0)
        );

        if (change < 0 && cart.find(item => item.id === id)?.quantity === 1) {
            setHighlighted(prev => ({ ...prev, [id]: false })); // Видаляємо бордер, якщо кількість = 0
        }
    };

    const getCartItemQuantity = (id: number) => {
        const item = cart.find(item => item.id === id);
        return item ? item.quantity : 0;
    };

    return (
        <>
             <Row xs={1} md={2} lg={3} className="g-4">
                {data.map((item) => {
                const cartItem = cart.find(i => i.id === item.id);
                const quantity = getCartItemQuantity(item.id);
                return (
                    <Col key={item.id}>
                        <Card className="product-card border-0 p-3">
                            {/* using <picture> for adaptive images */}
                        <picture className={`rounded ${cartItem && quantity > 0 ? "picked-image" : ""}`}>
                            <source srcSet={item.image.desktop} media="(min-width: 1024px)" />
                            <source srcSet={item.image.tablet} media="(min-width: 768px)" />
                            <source srcSet={item.image.mobile} media="(min-width: 480px)" />
                                <img
                                    src={item.image.mobile}
                                    alt={item.name}
                                    className= "rounded img-fluid"
                            />
                        </picture>
                            <Card.Body className='product-body d-flex flex-column align-items-start m-0 p-0'>
                                {quantity === 0 ? (
                                    <div className='d-flex flex-column align-items-center w-100'>
                                        <Button variant='outline-danger' className='add-to-cart-button fw-semibold rounded-pill d-flex align-items-center gap-2' onClick={() => addToCart(item)}>
                                            <img src={require('../../assets/images/icon-add-to-cart.svg').default} />Add to Cart
                                        </Button>
                                    </div>
                                ) : (
                                        <div className='d-flex flex-row align-items-center justify-content-center w-100'>
                                            <div className='gap-3 button-group d-flex flex-row align-items-center rounded-pill px-3 py-2'>
                                                <Button variant="outline-light" className='rounded-circle d-flex align-items-center quantity-button p-0 ' size="sm" onClick={() => updateQuantity(item.id, -1)}>
                                                    <img src={require('../../assets/images/icon-decrement-quantity.svg').default} className='my-2 mx-1' />
                                            </Button>
                                            <span className="mx-2">{quantity}</span>
                                                <Button variant="outline-light" className='rounded-circle d-flex align-items-center quantity-button p-0' size="sm" onClick={() => updateQuantity(item.id, 1)}>
                                                    <img src={require('../../assets/images/icon-increment-quantity.svg').default} className='m-1'/>
                                            </Button>

                                            </div>
                                    </div>
                                )}
                                <div className=' d-flex flex-column align-items-start m-0 p-0'>
                                    <Card.Text className='category text-secondary'>{item.category}</Card.Text>
                                    <Card.Title className='product-title fw-semibold'>{item.name}</Card.Title>
                                    <Card.Text className='price text-danger fw-bold fs-5'>${item.price.toFixed(2)}</Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
        </>
    );
};

export default GridProduct;