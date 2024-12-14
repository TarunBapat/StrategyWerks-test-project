const ProductModal = ({ setShowModal, product, dispatch }) => {
  const { image, title, category, description, price, rating } = product;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg text-center relative">
        <span
          onClick={() =>
            dispatch({
              type: "TOGGLE_MODAL",
              payload: false,
            })
          }
          className="absolute right-0 top-0 bg-red-400 p-3 rounded- cursor-pointer"
        >
          X
        </span>
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border">
          <img src={image} alt={title} className="w-full h-48 object-contain" />

          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-gray-800">{title}</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                {category}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{description}</p>

            <p className="text-gray-800 font-bold mb-4">${price.toFixed(2)}</p>

            <div className="flex items-center">
              <span className="ml-2 text-gray-600 text-sm bg-blue-100 font-semibold px-2 py-1 rounded">
                {rating.rate}/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
