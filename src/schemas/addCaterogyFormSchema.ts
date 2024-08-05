import * as yup from "yup";

export const addCaterogyFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Назва категорії обов'якова для заповнення")
    .min(3, "Назва категорії повинна містити мінімум 3 символа")
    .max(60, "Назва категорії повинна містити не быльше 30 символів")
    .test(
      "first-letter-uppercase",
      "Назва категорії повинна починатися з великої літери",
      (value) => (value ? /^[A-ZА-Я]/.test(value) : false)
    ),
});
