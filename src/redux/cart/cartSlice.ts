import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartList, CartProduct } from "../../types";

interface CartSlice {
  cartList: CartList[];
}

const initialState: CartSlice = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (
      state,
      {
        payload: { checkId, product },
      }: PayloadAction<{ checkId: string; product: CartProduct }>
    ) => {
      const checkIndex = state.cartList.findIndex((elem) => {
        return elem.checkId === checkId;
      });
      if (checkIndex === -1) {
        state.cartList.push({
          checkId,
          productList: [
            {
              ...product,
              quantity: 1,
            },
          ],
        });
      } else {
        const itemIndex = state.cartList[checkIndex].productList.findIndex(
          (elem) => {
            return elem.productName === product.productName;
          }
        );
        if (itemIndex > -1) {
          state.cartList[checkIndex].productList[itemIndex].quantity += 1;
        } else {
          state.cartList[checkIndex].productList.push({
            ...product,
            quantity: 1,
          });
        }
      }
    },
    deleteCartItem: (
      state,
      {
        payload: { checkId, productName },
      }: PayloadAction<{ checkId: string; productName: string }>
    ) => {
      const checkIndex = state.cartList.findIndex((elem) => {
        return elem.checkId === checkId;
      });

      if (checkIndex > -1) {
        const filteredProductList = state.cartList[
          checkIndex
        ].productList.filter((elem) => elem.productName !== productName);
        if (filteredProductList.length) {
          state.cartList[checkIndex].productList = filteredProductList;
        } else {
          state.cartList.splice(checkIndex, 1);
        }
      }
    },
    incrementCartItemQuantity: (
      state,
      {
        payload: { checkId, productName },
      }: PayloadAction<{ checkId: string; productName: string }>
    ) => {
      const checkIndex = state.cartList.findIndex((elem) => {
        return elem.checkId === checkId;
      });

      if (checkIndex > -1) {
        const itemIndex = state.cartList[checkIndex].productList.findIndex(
          (elem) => elem.productName === productName
        );

        if (itemIndex > -1) {
          state.cartList[checkIndex].productList[itemIndex].quantity += 1;
        }
      }
    },
    decrementCartItemQuantity: (
      state,
      {
        payload: { checkId, productName },
      }: PayloadAction<{ checkId: string; productName: string }>
    ) => {
      const checkIndex = state.cartList.findIndex((elem) => {
        return elem.checkId === checkId;
      });
      if (checkIndex > -1) {
        const index = state.cartList[checkIndex].productList.findIndex(
          (elem) => elem.productName === productName
        );
        if (index > -1) {
          if (state.cartList[checkIndex].productList[index].quantity > 1) {
            state.cartList[checkIndex].productList[index].quantity -= 1;
          }
        }
      }
    },
    createCheck: (
      state,
      { payload: { checkId } }: PayloadAction<{ checkId: string }>
    ) => {
      state.cartList.push({ checkId, productList: [] });
    },
    deleteCheck: (
      state,
      { payload: { checkId } }: PayloadAction<{ checkId: string }>
    ) => {
      state.cartList = state.cartList.filter((elem) => {
        return elem.checkId !== checkId;
      });
    },
  },
  selectors: {
    selectCartList: (state) => state.cartList,
  },
});

export const cartReducer = cartSlice.reducer;

export const { selectCartList } = cartSlice.selectors;
export const {
  addCartItem,
  deleteCartItem,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  createCheck,
  deleteCheck,
} = cartSlice.actions;

export type CartState = ReturnType<typeof cartReducer>;
