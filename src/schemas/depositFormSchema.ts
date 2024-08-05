import * as yup from "yup";

export const depositFormSchema = yup.object().shape({
  deposit: yup
    .number()
    .typeError("Поле повинно бути числом без використання коми")
    .required("Це поле обов'язкове для заповнення")
    .test(
      "nonZeroOrNotStartingWithZero",
      "Значення не може бути нулем або починатися з нуля",
      function (value) {
        const stringValue = String(value);
        return value !== 0 && !/^0/.test(stringValue);
      }
    ),
});
