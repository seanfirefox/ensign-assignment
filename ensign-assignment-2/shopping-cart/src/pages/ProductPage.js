import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
        setShowDialog(true);
        setTimeout(() => setShowDialog(false), 2000);
    };

    return (
        <div className="product-page-container">
            <div className="product-page">
                <div className="product-image-section">
                    <img src={product.image} alt={product.title} className="product-image" />
                </div>
                <div className="product-details-section">
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating">
                        <span>{product.rating.rate} ★</span>
                        <span>{product.rating.count} ratings</span>
                    </div>
                    <p className="product-price">${product.price}</p>
                    <div className="product-action">
                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-btn"
                        >
                            Add to Cart
                        </button>

                        {showDialog && (
                            <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow-lg dialog">
                                Product added to cart successfully!
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
