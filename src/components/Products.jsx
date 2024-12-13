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
  const [category, setCategory] = useState("all");
  const [order, setOrder] = useState("asc");
  const [orderPrice, setOrderPrice] = useState("low-to-high");
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

  // Fetch products whenever sort filter changes
  async function fetchFilteredProducts() {
    try {
      const response = await Api.getSortedProducts(order);
      setAllProducts(response.data);
      setProducts(response.data.slice(0, count));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFilteredProducts();
  }, [order]);

  // Fetch products whenever category changes
  async function fetchProductsCategory() {
    let response;
    try {
      if (category == "all") {
        response = await Api.getAllProducts();
      } else {
        response = await Api.getCategoryOfProduct(category);
      }
      setAllProducts(response.data);
      setProducts(response.data.slice(0, count));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProductsCategory();
  }, [category]);

  // Handle Load More button click
  const handleLoadMore = () => {
    let nextCount = products?.length + 10;
    let nextproducts = allProducts.slice(count, nextCount);
    setCount(nextCount);
    setProducts((prevProducts) => [...prevProducts, ...nextproducts]);
  };

  const getProductDetails = (data) => {
    setProduct(data);
  };
  const sortProductsByPrice = (orderPrice) => {
    return products?.sort((a, b) => {
      if (orderPrice === "high-to-low") {
        return b.price - a.price; // Descending order
      } else if (orderPrice === "low-to-high") {
        return a.price - b.price; // Ascending order
      }
      return 0; // Default case
    });
  };

  useEffect(() => {
    console.log("here");
    const priceFilteredData = sortProductsByPrice(orderPrice);
    setProducts(priceFilteredData.slice(0, count));
  }, [orderPrice, category]);

  return (
    <>
      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-8">
        {/* Category Filter */}
        <h3 className="bg-blue-100 text-blue-800 text-md font-semibold px-2 py-1 rounded">
          Sort Products:
        </h3>
        <select
          value={category}
          onChange={(e) => setCategory(e?.target?.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Categories</option>
          <option value="men's clothing">Mens Clothing</option>
          <option value="women's clothing">Womens Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>

        {/* Sort Order */}
        <select
          value={order}
          onChange={(e) => setOrder(e?.target?.value)}
          className="p-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        {/* Sort Order */}
        <select
          value={orderPrice}
          onChange={(e) => {
            setOrderPrice(e?.target?.value);
          }}
          className="p-2 border rounded"
        >
          <option value="high-to-low">price high to low</option>
          <option value="low-to-high">price low to high</option>
        </select>
      </div>

      {/* Modal*/}
      {showModal && (
        <ProductModal setShowModal={setShowModal} product={product} />
      )}
      <div className="text-center mt-6">{loading && <Loader />}</div>

      {/* Products*/}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
        {!loading &&
          products?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              setShowModal={setShowModal}
              getProduct={getProductDetails}
            />
          ))}
      </div>

      {/* Load More Button */}

      <div className="text-center mt-6">
        {products?.length >= allProducts?.length ? (
          ""
        ) : (
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default Products;
