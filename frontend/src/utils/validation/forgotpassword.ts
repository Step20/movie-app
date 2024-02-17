import * as yup from "yup";

const validateForgotPassword = async (formValues: { email: string }) => {
  try {
    const schema = yup.object().shape({
      email: yup.string().email(),
    });
    const validation = await schema.validate(formValues);
    return { isError: false };
  } catch (err: any) {
    return { isError: true, errors: err.errors };
  }
};

const validateResetPassword = async (formValues: {
  password: string;
  confirmpassword: string;
}) => {
  const { password, confirmpassword } = formValues;

  // if (password !== confirmpassword) {
  //   console.log("Error in here");

  //   return { isError: true, errors: "Password doesn't match" };
  // }
  try {
    const schema = yup.object().shape({
      passwor: yup.string().min(8),
      confirmpassword: yup.string().min(8),
    });
    const validation = await schema.validate(formValues);
    return { isError: false };
  } catch (err: any) {
    return { isError: true, errors: err.errors };
  }
};

export { validateResetPassword, validateForgotPassword };
