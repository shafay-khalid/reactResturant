// CartContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartRef = collection(firestore, "carts");
        const cartSnap = await getDocs(cartRef);
        const cartItems = cartSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCartItems(cartItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const cartRef = doc(firestore, "carts", itemId);
      await updateDoc(cartRef, { quantity });
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart item quantity: ", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const cartRef = doc(firestore, "carts", itemId);
      await deleteDoc(cartRef);
      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing cart item: ", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, handleUpdateQuantity, handleRemoveItem }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export { useCartContext };
export default CartProvider;