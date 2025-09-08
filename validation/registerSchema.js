import * as yup from "yup"

const registerSchema = yup.object().shape({
  username:yup.string().min(6,"حداقل 6 کاراکتر").max(20,"حداکثر 20 کاراکتر").required("پر کردن این قسمت الزامی است!"),
  password:yup.string().min(6,"حداقل 6 کاراکتر").max(20,"حداکثر 20 کاراکتر").required("پر کردن این قسمت الزامی است!"),
  confirmPassword:yup.string().oneOf([yup.ref("password")], "رمز عبور مطابقت ندارد").required("پر کردن این قسمت الزامی است!")
})

export default registerSchema

