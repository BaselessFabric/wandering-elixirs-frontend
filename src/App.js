import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import CartMenu from "./scenes/global/CartMenu";
import NavBar from "./scenes/global/NavBar";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Bio from "./scenes/bio/Bio";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <NavBar />
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="item/:itemId" element={<ItemDetails />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="checkout/success" element={<Confirmation />} />
                    <Route path="/bio" element={<Bio />} />
                </Routes>
                <CartMenu />
            </BrowserRouter>
        </div>
    );
}

export default App;
