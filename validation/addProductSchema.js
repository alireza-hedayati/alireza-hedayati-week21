import * as yup from "yup";

const productSchema = yup.object().shape({
  name: yup.string().required("نام کالا ضروری است"),
  quantity: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .positive("عدد مثبت وارد کنید")
    .required("تعداد کالا ضروری است"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .positive("عدد مثبت وارد کنید")
    .required("قیمت کالا ضروری است"),
});
export default productSchema;
