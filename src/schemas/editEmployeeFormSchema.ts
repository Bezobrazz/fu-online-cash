import * as yup from "yup";

export const editEmployeeFormSchema = yup.object().shape({
  name: yup
    .string()
    .required(`Це поле обов'язкове для заповнення`)
    .min(4, "Мінімальна довжина назви 4 символи")
    .max(32, "Максимальна довжина назви 32 символи"),
  phone: yup
    .string()
    .required("Це поле обов'язкове для заповнення")
    .matches(/^[0-9]+$/, "Поле повинно бути валідним номером")
    .length(9, "Довжина номеру повинна містити 9 цифр"),
});
