import { useState } from "react";
import { useEffect } from "react";
import Api from "../Api";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await Api.getAllProducts();
      setAllProducts(response.data);
      setProducts(response.data.slice(0, count));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("allProducts", allProducts);
  // Handle Load More button click
  const handleLoadMore = () => {
    console.log("allProducts", allProducts);
    let nextCount = products?.length + 10;
    let nextproducts = allProducts.slice(count, nextCount);
    setCount(nextCount);
    setProducts((prevProducts) => [...prevProducts, ...nextproducts]);
    console.log("products", products);
  };
  const getProductDetails = (data) => {
    console.log("data", data);
    setProduct(data);
  };
  return (
    <>
      {/* Modal*/}
      {showModal && (
        <ProductModal setShowModal={setShowModal} product={product} />
      )}
      <div className="text-center mt-6">{loading && <Loader />}</div>

      {/* Products*/}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {!loading &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setShowModal={setShowModal}
              getProduct={getProductDetails}
            />
          ))}
      </div>

      {/* Load More Button */}

      <div className="text-center mt-6">
        <button
          onClick={handleLoadMore}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          disabled={count >= allProducts.length}
        >
          {"Load More"}
        </button>
      </div>
    </>
  );
};

export default Products;
