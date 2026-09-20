import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

  const updateQty = useCallback((item, delta) => {
    setCartItems(prev => {
      const currentQty = prev[item.id]?.qty || 0;
      const nextQty = currentQty + delta;
      if (nextQty <= 0) {
        const next = { ...prev };
        delete next[item.id];
        return next;
      }
      return {
        ...prev,
        [item.id]: {
          qty: nextQty,
          name: item.name,
          price: item.price,
          img: item.img,
          restaurant: item.restaurant || '',
          isVeg: item.isVeg ?? true,
          desc: item.desc || '',
        },
      };
    });
  }, []);

  const addItem = useCallback((item) => {
    updateQty(item, 1);
  }, [updateQty]);

  const removeItem = useCallback((itemId) => {
    setCartItems(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCartItems({}), []);

  const totalItems = Object.values(cartItems).reduce((s, i) => s + i.qty, 0);
  const totalPrice = Object.values(cartItems).reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, updateQty, addItem, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
