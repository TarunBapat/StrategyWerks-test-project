const ProductCard = ({ product, setShowModal, getProduct, dispatch }) => {
  return (
    <div
      key={product?.id}
      className="bg-white p-4 rounded shadow-md border"
      onClick={() => {
        dispatch({
          type: "TOGGLE_MODAL",
          payload: true,
        });
        getProduct(product);
      }}
    >
      {/* Product Image */}
      <img
        src={product?.image}
        alt={product?.name}
        className="w-full h-48 object-contain rounded mb-4"
      />

      {/* Product Name */}
      <h2 className="text-lg font-semibold">{product?.title}</h2>

      {/* Product Price */}
      <p className="font-bold">${product?.price}</p>
    </div>
  );
};

export default ProductCard;
