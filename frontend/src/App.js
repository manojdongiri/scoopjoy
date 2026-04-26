import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "https://scoopjoy.onrender.com";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔹 Load Products
  useEffect(() => {
    if (user) {
      axios.get(`${API}/api/products/`)
        .then(res => setProducts(res.data))
        .catch(err => {
          console.error(err);
          alert("Backend not responding ❌");
        });
    }
  }, [user]);

  // 🔹 Login
  const login = () => {
    if (!email || !password) {
      alert("Enter email & password ⚠️");
      return;
    }

    axios.post(`${API}/api/auth/login`, { email, password })
      .then(res => {
        if (res.data.message?.toLowerCase().includes("success")) {
          setUser(email);
          setPage("products");
        } else {
          alert("Invalid login ❌");
        }
      })
      .catch(() => alert("Login failed ❌"));
  };

  // 🔹 Signup
  const signup = () => {
    if (!email || !password) {
      alert("Enter email & password ⚠️");
      return;
    }

    axios.post(`${API}/api/auth/signup`, { email, password })
      .then(res => alert(res.data.message))
      .catch(() => alert("Signup failed ❌"));
  };

  // 🔹 Add to Cart
  const addToCart = (item) => {
    const existing = cart.find(p => p.id === item.id);

    if (existing) {
      setCart(cart.map(p =>
        p.id === item.id ? { ...p, qty: p.qty + 1 } : p
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }

    setPage("cart");
  };

  // 🔹 Remove Item
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // 🔹 Total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 🔹 Load Orders
  const loadOrders = () => {
    axios.get(`${API}/api/orders/`)
      .then(res => setOrders(res.data))
      .catch(() => alert("Failed to load orders ❌"));
  };

  // 🔹 Checkout
  const checkout = () => {
    if (cart.length === 0) {
      alert("Cart is empty ⚠️");
      return;
    }

    axios.post(`${API}/api/orders/`, {
      user,
      items: cart,
      total
    })
    .then(() => {
      alert("Order placed 🎉");
      setCart([]);
      loadOrders();
      setPage("orders");
    })
    .catch(() => alert("Checkout failed ❌"));
  };

  // 🔹 Navbar
  const Navbar = () => (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-pink-500 to-purple-500 text-white"
    >
      <h1 className="text-2xl font-bold">🍦 ScoopJoy</h1>

      {user && (
        <div className="space-x-4">
          <button onClick={() => setPage("products")}>Home</button>
          <button onClick={() => setPage("cart")}>Cart</button>
          <button onClick={() => { loadOrders(); setPage("orders"); }}>Orders</button>
          <button
            onClick={() => {
              setUser(null);
              setPage("login");
            }}
            className="text-red-200"
          >
            Logout
          </button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      <Navbar />

      {/* LOGIN */}
      {page === "login" && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center h-[80vh]"
        >
          <div className="backdrop-blur-lg bg-white/70 p-8 rounded-xl shadow-xl w-80 text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome 👋</h2>

            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="border p-2 w-full mb-3 rounded"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={login}
              className="bg-green-500 text-white w-full py-2 rounded mb-2"
            >
              Login
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={signup}
              className="bg-blue-500 text-white w-full py-2 rounded"
            >
              Signup
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* PRODUCTS */}
      {page === "products" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {products.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.08 }}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover rounded-lg"
              />

              <h3 className="mt-3 font-bold">{item.name}</h3>
              <p>₹{item.price}</p>

              <button
                onClick={() => addToCart(item)}
                className="mt-2 w-full bg-pink-500 text-white py-2 rounded"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* CART */}
      {page === "cart" && (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">🛒 Cart</h2>

          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between bg-white p-4 mb-3 rounded shadow">
                  <span>{item.name} × {item.qty}</span>
                  <span>
                    ₹{item.price * item.qty}
                    <button onClick={() => removeItem(item.id)} className="ml-2 text-red-500">❌</button>
                  </span>
                </div>
              ))}

              <h3 className="mt-4 font-bold">Total: ₹{total}</h3>

              <button
                onClick={checkout}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded"
              >
                Checkout 🚀
              </button>
            </>
          )}
        </div>
      )}

      {/* ORDERS */}
      {page === "orders" && (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">📄 Orders</h2>

          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map((order, i) => (
              <div key={i} className="bg-white p-4 mb-3 rounded shadow">
                <h3 className="font-bold">Order {i + 1}</h3>

                {order.items.map((item, index) => (
                  <p key={index}>{item.name} × {item.qty}</p>
                ))}

                <p className="font-bold mt-2">Total: ₹{order.total}</p>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

export default App;