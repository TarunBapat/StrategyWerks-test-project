const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_PRODUCTS":
      return { ...state, allProducts: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_PRODUCT":
      return { ...state, product: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_ORDER":
      return { ...state, order: action.payload };
    case "SET_ORDER_PRICE":
      return { ...state, orderPrice: action.payload };
    default:
      return state;
  }
};

export default productReducer;
