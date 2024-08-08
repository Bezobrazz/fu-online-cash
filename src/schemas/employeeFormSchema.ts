import * as yup from "yup";

export const employeeFormSchema = yup.object().shape({
  name: yup
    .string()
    .required(`Це поле обов'язкове для заповнення`)
    .min(4, "Мінімальна довжина назви 4 символи")
    .max(32, "Максимальна довжина назви 32 символи")
    .matches(
      /^[^\s].*[^\s]$/,
      "Назва не повинна починатися або закінчуватися пробілами"
    )
    .matches(
      /^(?!.*\s{2,}).*$/,
      "Назва не повинна містити більше одного пробілу між словами"
    ),
  phone: yup
    .string()
    .required("Це поле обов'язкове для заповнення")
    .matches(/^[0-9]+$/, "Поле повинно бути валідним номером")
    .length(9, "Поле повинно бути валідним номером"),
});
