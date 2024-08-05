import {
  type Product,
  type SalePoint,
  type CardListItemType,
  type Cashbox,
  type UserInfo,
} from "../types";

export const isUserInfo = (item: CardListItemType): item is UserInfo => {
  return (item as UserInfo).role !== undefined;
};

export const isCashbox = (item: CardListItemType): item is Cashbox => {
  return (item as Cashbox).card !== undefined;
};

export const isProduct = (item: CardListItemType): item is Product => {
  return (item as Product).article !== undefined;
};

export const isSalePoint = (item: CardListItemType): item is SalePoint => {
  return (
    (item as SalePoint).enterpriseId !== undefined &&
    (item as SalePoint).title !== undefined
  );
};
