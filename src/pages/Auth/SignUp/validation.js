import * as yup from "yup";

const validations = yup.object().shape({
    name: yup.string().min(5, "name en az 5 karakterli olmalı").required(),
    email: yup.string().email("Geçerli bir email adresi giriniz").required("Zorunlu alan"),
    password: yup.string().min(7, "Parolanız min 7 karakterli olmalı").required("Zorunlu alan"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Parolalar uyuşmuyor!")
        .required("Zorunlu alan"),
});

export default validations;
