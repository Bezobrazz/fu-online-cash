import { CategoryState } from "../types";

export const getCategoryStateDescription = (state: CategoryState): string => {
  switch (state) {
    case CategoryState.Add:
      return "Додати категорію";
    case CategoryState.Edit:
      return "Редагувати категорію";
    case CategoryState.Delete:
      return "Видалити категорію";
    default:
      return "Невідома категорія";
  }
};
