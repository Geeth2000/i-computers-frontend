import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkOut";
import OrdersPage from "./ordersPage";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";
import ReviewPage from "./reviewPage";
import HomeContentPage from "./homeContentPage";

export default function HomePage() {
  return (
    <div className="w-full h-full max-h-full bg-primary text-secondary overflow-y-scroll">
      <Header />
      <div className="w-full min-h-[calc(100%-100px)]">
        <Routes>
          <Route path="/" element={<HomeContentPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
