import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('yumoraCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('yumoraCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, options = {}) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { ...product, options, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, options = {}) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item.id === productId && JSON.stringify(item.options) === JSON.stringify(options))
      )
    );
  };

  const updateQuantity = (productId, options, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, options);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && JSON.stringify(item.options) === JSON.stringify(options)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const total = cart.reduce((sum, item) => {
    let price = item.price;
    if (item.options?.scoop) {
      price = item.pricing[item.options.scoop];
    }
    return sum + (price * item.quantity);
  }, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    total
  };
};
