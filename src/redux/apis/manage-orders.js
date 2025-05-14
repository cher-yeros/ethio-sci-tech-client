import api from "../../utils/api";
import {
  getAllorder,
  getorderStarted,
  orderError,
  getSingleorder as gSU,
} from "../orderSlice";

export const getAllOrder = async (dispatch, currentPage, query) => {
  dispatch(getorderStarted());
  try {
    const { data } = await api.get(
      `/order/all-orders?page=${currentPage}&keyword=${query}`
    );
    dispatch(getAllorder(data));
  } catch (error) {
    dispatch(orderError(error.response.data.message));
  }
};

export const deleteOrder = async (OrderId, dispatch) => {
  dispatch(getorderStarted());
  try {
    const { data } = await api.delete("/admin/Order/" + OrderId);
    await getAllOrder(dispatch);
  } catch (error) {
    dispatch(orderError(error.response.data.message));
  }
};
export const getSingleOrder = async (OrderId, dispatch) => {
  dispatch(getorderStarted());
  try {
    const { data } = await api.get("/admin/Order/" + OrderId);
    dispatch(gSU(data.Order));
  } catch (error) {
    dispatch(orderError(error.response.data.message));
  }
};
export const updateOrder = async (OrderId, credential, dispatch, onHide) => {
  dispatch(getorderStarted());
  try {
    const { data } = await api.put("/admin/Order/" + OrderId, credential);
    await getAllOrder(dispatch);
    onHide();
  } catch (error) {
    dispatch(orderError(error.response.data.message));
  }
};
export const addOrder = async (dispatch, credential, onHide) => {
  //console.log(credential);
  dispatch(getorderStarted());
  try {
    const { data } = await api.post("/order/create-order", credential);

    await getAllOrder(dispatch);
    alert("Your order has been created successfully!");
  } catch (error) {
    dispatch(orderError(error?.response?.data?.message));
  }
};

export const makeSold = async (orderId, dispatch) => {
  dispatch(getorderStarted());
  try {
    const { data } = await api.post("/admin/make-sold/" + orderId);
    await getAllOrder(dispatch);
    //onHide();
  } catch (error) {
    dispatch(orderError(error.response.data.message));
  }
};
