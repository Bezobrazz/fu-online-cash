import * as yup from "yup";

export const editCashboxFormSchema = yup.object().shape({
  title: yup
    .string()
    .required(`Це поле обов'язкове для заповнення`)
    .min(4, "Мінімальна довжина назви 4 символи")
    .max(32, "Максимальна довжина назви 32 символи"),
  cash: yup
    .number()
    .typeError("Це поле обов'язкове для заповнення")
    .required(`Це поле обов'язкове для заповнення`),
  employeeId: yup.string().required(`Це поле обов'язкове для заповнення`),
});
