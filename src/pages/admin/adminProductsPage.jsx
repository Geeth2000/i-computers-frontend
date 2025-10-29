import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
  return (
    <div className="w-full h-full items-center justify-center flex relative">
      Admin Products Page
      <Link
        to="/admin/add-product"
        className="absolute bottom-5 right-5 w-[50px] h-[50px] bg-accent text-primary rounded-full flex justify-center items-center text-4xl hover:scale-110 transition-transform shadow-lg"
      >
        <BsPlus />
      </Link>
    </div>
  );
}
