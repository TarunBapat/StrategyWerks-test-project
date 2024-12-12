const ProductCard = ({ product, setShowModal, getProduct }) => {
  return (
    <div
      key={product?.id}
      className="bg-white p-4 rounded shadow-md border"
      onClick={() => {
        setShowModal(true);
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

      {/* Product Description */}
      <p className="text-gray-500">{product?.description}</p>

      {/* Product Price */}
      <p className="font-bold">${product?.price}</p>
    </div>
  );
};

export default ProductCard;
