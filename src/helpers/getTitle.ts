import type { CardListItemType } from "../types";
import { isCashbox, isProduct, isSalePoint, isUserInfo } from "./typeGuards";

export const getTitle = (item: CardListItemType) => {
  if (isUserInfo(item)) return "Редагування працівника";
  if (isSalePoint(item)) return "Редагування торгової точки";
  if (isCashbox(item)) return "Редагування каси";
  if (isProduct(item)) return "Редагування продукту";
  return "";
};
