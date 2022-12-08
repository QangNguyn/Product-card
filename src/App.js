import { Route, Routes } from "react-router-dom";
import Cart from "./Cart/Cart";
import Detail from "./Product/Detail";
import Product from "./Product/Product";

function App() {
  // return <Product />;
  return (
    <>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
