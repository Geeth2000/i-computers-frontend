import { Link, Route, Routes } from "react-router-dom";
import { LuBoxes, LuUsers } from "react-icons/lu";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-accent flex">
      <div className="w-[300px] h-full bg-accent">
        <div className="w-full h-[100px] flex items-center text-primary text-2xl">
          <img src="/logo.png" className="h-full" />
          <h1>Admin</h1>
        </div>

        <div className="w-full h-[600px] text-primary text-2xl flex flex-col gap-5 p-5">
          <Link
            to="/admin/"
            className="w-full h-[50px] flex gap-[10px] items-center"
          >
            <HiOutlineClipboardList />
            Orders
          </Link>
          <Link
            to="/admin/products"
            className="w-full h-[50px] flex gap-[10px] items-center"
          >
            <LuBoxes />
            Products
          </Link>
          <Link
            to="/admin/users"
            className="w-full h-[50px] flex gap-[10px] items-center"
          >
            <LuUsers />
            Users
          </Link>
          <Link
            to="/admin/reviews"
            className="w-full h-[50px] flex gap-[10px] items-center"
          >
            <MdOutlineRateReview />
            Reviews
          </Link>
        </div>
      </div>
      <div className="w-[calc(100%-300px)] h-full bg-primary text-secondary border-[10px] rounded-3xl border-accent overflow-auto">
        <Routes>
          <Route path="/" element={<h1>Orders Page</h1>} />
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/add-product" element={<AdminAddProductPage />} />
          <Route path="/users" element={<h1>Users Page</h1>} />
          <Route path="/reviews" element={<h1>Reviews Page</h1>} />
        </Routes>
      </div>
    </div>
  );
}
