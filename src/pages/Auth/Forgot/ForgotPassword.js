import { Button, FormControl, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useOutletContext } from "react-router-dom";
import { forgotPassword } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import validationSchema from "./validation";

function ForgotPassword() {
    const isLoading = useOutletContext();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            try {
                dispatch(forgotPassword(values.email));
            } catch (error) {
                bag.setErrors({ general: error.response.data.message });
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <Input
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Enter your email address"
                    isInvalid={formik.touched.email && formik.errors.email}
                />
            </FormControl>
            <Button mt="4" width="full" colorScheme="green" type="submit" disabled={isLoading}>
                {isLoading ? "Loading ..." : "Send reset password email"}
            </Button>
            <div className="flex w-full my-3">
                <Link className="text-blue-400" to="/sign-in">
                    Back to sign in
                </Link>
            </div>
        </form>
    );
}

export default ForgotPassword;
