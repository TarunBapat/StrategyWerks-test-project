import { useReducer } from "react";
import { useEffect } from "react";
import Api from "../Api";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import productReducer from "../reducer/productReducer";
import initialState from "../reducer/initialState";

const Products = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  async function fetchProducts() {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // setLoading(true);
      const response = await Api.getAllProducts();
      dispatch({ type: "SET_ALL_PRODUCTS", payload: response.data });
      // setAllProducts(response.data);
      dispatch({
        type: "SET_PRODUCTS",
        payload: response.data.slice(0, state?.count),
      });
      // setProducts(response.data.slice(0, count));
      dispatch({ type: "SET_LOADING", payload: false });
      // setLoading(false);
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
      const response = await Api.getSortedProducts(state.order);
      dispatch({ type: "SET_ALL_PRODUCTS", payload: response.data });
      // setAllProducts(response.data);
      dispatch({
        type: "SET_PRODUCTS",
        payload: response.data.slice(0, state?.count),
      });
      // setProducts(response.data.slice(0, state.count));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchFilteredProducts();
  }, [state?.order]);

  // Fetch products whenever category changes
  async function fetchProductsCategory() {
    let response;
    try {
      if (state?.category == "all") {
        response = await Api.getAllProducts();
      } else {
        response = await Api.getCategoryOfProduct(state.category);
      }
      dispatch({ type: "SET_ALL_PRODUCTS", payload: response.data });
      // setAllProducts(response.data);
      dispatch({
        type: "SET_PRODUCTS",
        payload: response.data.slice(0, state?.count),
      });
      // setProducts(response.data.slice(0, state.count));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProductsCategory();
  }, [state?.category]);

  // Handle Load More button click
  const handleLoadMore = () => {
    let nextCount = state?.products?.length + 10;
    let nextproducts = state?.allProducts?.slice(state?.count, nextCount);
    dispatch({
      type: "SET_COUNT",
      payload: nextCount,
    });
    // setCount(nextCount);
    dispatch({
      type: "SET_PRODUCTS",
      payload: [...state.products, ...nextproducts],
    });
    // setProducts((prevProducts) => [...prevProducts, ...nextproducts]);
  };

  const getProductDetails = (data) => {
    dispatch({
      type: "SET_PRODUCT",
      payload: data,
    });
    // setProduct(data);
  };
  const sortProductsByPrice = (orderPrice) => {
    return state?.products?.sort((a, b) => {
      if (orderPrice === "high-to-low") {
        return b.price - a.price; // Descending order
      } else if (orderPrice === "low-to-high") {
        return a.price - b.price; // Ascending order
      }
      return 0; // Default case
    });
  };

  useEffect(() => {
    const priceFilteredData = sortProductsByPrice(state?.orderPrice);
    dispatch({
      type: "SET_PRODUCTS",
      payload: priceFilteredData.slice(0, state?.count),
    });
    // setProducts(priceFilteredData.slice(0, state?.count));
  }, [state?.orderPrice, state?.category]);

  return (
    <>
      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-8">
        {/* Category Filter */}
        <h3 className="bg-blue-100 text-blue-800 text-md font-semibold px-2 py-1 rounded">
          Sort Products:
        </h3>
        <select
          value={state?.category}
          onChange={(e) =>
            dispatch({
              type: "SET_CATEGORY",
              payload: e.target.value,
            })
          }
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
          value={state?.order}
          onChange={(e) =>
            dispatch({
              type: "SET_ORDER",
              payload: e.target.value,
            })
          }
          className="p-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        {/* Sort Order */}
        <select
          value={state?.orderPrice}
          onChange={(e) => {
            dispatch({
              type: "SET_ORDER_PRICE",
              payload: e.target.value,
            });
          }}
          className="p-2 border rounded"
        >
          <option value="high-to-low">price high to low</option>
          <option value="low-to-high">price low to high</option>
        </select>
      </div>

      {/* Modal*/}
      {state?.showModal && (
        <ProductModal
          // setShowModal={setShowModal}
          product={state?.product}
          dispatch={dispatch}
        />
      )}
      <div className="text-center mt-6">{state?.loading && <Loader />}</div>

      {/* Products*/}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
        {!state?.loading &&
          state?.products?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              // setShowModal={setShowModal}
              dispatch={dispatch}
              getProduct={getProductDetails}
            />
          ))}
      </div>

      {/* Load More Button */}

      <div className="text-center mt-6">
        {state?.products?.length >= state?.allProducts?.length ? (
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
