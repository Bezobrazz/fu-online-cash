import * as yup from "yup";

export const addCaterogyFormSchema = yup.object().shape({
  category: yup
    .string()
    .required("Назва категорії обов'якова для заповнення")
    .min(5, "Назва категорії повинна містити мінімум 5 символів")
    .max(60, "Назва категорії повинна містити максимум 60 символів"),
});
