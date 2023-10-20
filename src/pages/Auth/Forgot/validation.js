import * as yup from "yup";

const validations = yup.object().shape({
   email: yup.string().email("Geçerli bir email adresi giriniz").required("Zorunlu alan"),
});


export default validations;