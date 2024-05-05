import * as yup from "yup";

type Registration = {
  userName?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userLocation: string;
};

const validateRegistration = async (formValues: Registration) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required().min(5),
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "confirmPassword does not match."),
      userLocation: yup.string().required(),
    });
    const validation = await schema.validate(formValues);
    return { isError: false };
  } catch (err: any) {
    return { isError: true, errors: err.errors };
  }
};

export default validateRegistration;
