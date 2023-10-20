import * as yup from "yup";

const validations = yup.object().shape({
   email: yup.string().email("Geçerli bir email adresi giriniz").required("Zorunlu alan"),
   password: yup.string().min(7, "Parolanız min 7 karakterli olmali").required(),
});


export default validations;