import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import { changeInfo, register } from "../../../redux/authSlice";
import validationSchema from "./validation";

function SignUp() {
    const dispatch = useDispatch();

    const isLoading = useOutletContext();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            try {
                dispatch(
                    register({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                    })
                );
            } catch (error) {
                bag.setErrors({ general: error.response.data.message });
            }
        },
    });

    const handleInfo = (e) => {
        dispatch(changeInfo([e.target.name, e.target.value]));
        formik.handleChange(e);
    };

    return (
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        onChange={handleInfo}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        isInvalid={formik.touched.email && formik.errors.email}
                    />
                    {formik.errors.email}
                </FormControl>
                <FormControl mt="4">
                    <FormLabel>Name</FormLabel>
                    <Input
                        name="name"
                        type="text"
                        onChange={handleInfo}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        isInvalid={formik.touched.name && formik.errors.name}
                    />
                    {formik.errors.name}
                </FormControl>
                <FormControl mt="4">
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={formik.touched.password && formik.errors.password}
                    />
                    {formik.errors.password}
                </FormControl>
                <FormControl mt="4">
                    <FormLabel>Password Confirm</FormLabel>
                    <Input
                        name="passwordConfirm"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordConfirm}
                        isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                    />
                    {formik.errors.passwordConfirm}
                </FormControl>
                <Button mt="2" width="full" colorScheme="green" type="submit" disabled={isLoading} value={"Sign Up"}>
                    {isLoading ? "Loading ..." : "Sign Up"}
                </Button>
                <div className="flex w-full my-3">
                    Do you have an account already?{" "}
                    <Link className="text-blue-600 ml-2" to="/sign-in">
                        Sign In
                    </Link>
                </div>
            </form>
    );
}

export default SignUp;
