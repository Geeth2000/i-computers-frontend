import "./App.css";
import ProductCard from "./components/productCard";

function App() {
  return (
    <>
      <ProductCard
        name="Laptop"
        price="100,000.00"
        image="https://picsum.photos/id/1/200/300"
      />

      <ProductCard
        name="Phone"
        price="90,000.00"
        image="https://picsum.photos/id/3/200/300"
      />

      <ProductCard
        name="Watch"
        price="5,000.00"
        image="https://picsum.photos/id/5/200/300"
      />
    </>
  );
}

export default App;
