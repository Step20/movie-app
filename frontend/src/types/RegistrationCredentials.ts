type RegistrationCredentials = {
  name: string;
  userName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  recaptchaToken: string;
  userLocation: string;
};

export default RegistrationCredentials;
