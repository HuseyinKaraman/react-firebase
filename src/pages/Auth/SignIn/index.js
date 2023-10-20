import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validation";

import { useDispatch } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import { changeInfo, login } from "../../../redux/authSlice";

function Signin() {
    const dispatch = useDispatch();

    const isLoading = useOutletContext();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            try {
                dispatch(login({ email: values.email, password: values.password }));
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
                <FormLabel>E-mail</FormLabel>
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
            <div className="flex w-full my-2">
                <Link className="text-blue-400 ml-auto" to="/forgot-password">
                    Forgot Password?
                </Link>
            </div>
            <Button mt="2" width="full" colorScheme="green" type="submit" disabled={isLoading} value={"Sign in"}>
                {isLoading ? "Loading ..." : "Sign In"}
            </Button>
            <div className="flex w-full my-2">
                Don't you have an account?{" "}
                <Link className="text-blue-600 ml-2" to="/sign-up">
                    Sign Up
                </Link>
            </div>
        </form>
    );
}

export default Signin;
