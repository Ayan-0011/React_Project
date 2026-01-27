import { useUser } from "@clerk/clerk-react";
import axios, { Axios } from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {

    const { user } = useUser();

    const [cartitem, setCartitem] = useState([]);
    //console.log(cartitem);



    const addToCart = (product) => {

        const itemIncart = cartitem.find((item) => item.id === product.id)

        if (itemIncart) {
            //increse quantity
            const updatCart = cartitem.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartitem(updatCart)
            toast.info("Product Quantity Increased!")
        } else {
            // add new item quantity
            setCartitem([...cartitem, { ...product, quantity: 1 }])
            toast.success("Product Added To Cart!")

        }
    }

    const updateQuantity = (cartitem, productId, action) => {
        setCartitem(cartitem.map(item => {
            if (item.id === productId) {
                let newUnit = item.quantity;
                if (action === "increase") {
                    newUnit = newUnit + 1
                    toast.success("Quantity is increased!")
                } else if (action === "dicrease") {
                    if (newUnit > 1) {
                        newUnit = newUnit - 1
                        toast.info("Quantity is decreased!")
                    }
                }
                return newUnit > 0 ? { ...item, quantity: newUnit } : null
            }
            return item;
        }).filter(item => item != null) // remove item quantity 0 
        )
    }

    const deleteItem = (productId) => {
        setCartitem(cartitem.filter(item => item.id !== productId))
        toast.error("Product is Deleted!")
    }

    // ✅ PLACE ORDER
    const placeOrder = async (paymentMethod) => {

        
        if (cartitem.length === 0) {
            toast.error("Cart is empty!");
            return;
        }
        
        const safeItems = cartitem.map(item => ({...item }));
        console.log(safeItems);
        
        const totalAmount = cartitem.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const orderData = {
            userId: user.id,
            username: user.fullName,
            items: safeItems,
            totalAmount: totalAmount + 7,
            paymentMethod: paymentMethod,
            status: totalAmount < 70000 ? "confirmed" : "Placed",
            createdAt: new Date().toISOString()
        };

        try {
            await axios.post("https://react-project-zt30.onrender.com/orders", orderData);
            setCartitem([]);
            localStorage.removeItem("cart")
            return true;
        } catch (error) {
            toast.error("Order Failed!");
            console.log(error);
            return false; 
        }
    };

    console.log(cartitem); 
 
    

    return <CartContext.Provider value={{ cartitem, setCartitem, addToCart, updateQuantity, deleteItem, placeOrder }}>
        {children}
    </CartContext.Provider>
}

export const useCart = () => useContext(CartContext)



