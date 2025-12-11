import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signUp } from "../../api/Auth";
import Logo from "../../assets/icons/logo.png";
import Input from "../../components/ui/Input";
import {
  CONFIRM_PASSWORD_MSG,
  STRONG_PASSWORD_MSG,
  STRONG_PASSWORD_REGEX,
} from "../../constant/Constant";

export default function SignUp() {
  const queryParams = new URLSearchParams(window.location.search);
  const [shopUrl, setShopUrl] = useState(queryParams.get("shop_url") || "");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [shopUrlErrorMsg, setShopUrlErrorMsg] = useState("");
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");
  const navigate = useNavigate();

  const signup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (checkSignupForm()) {
      (async () => {
        const response = await signUp({
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          shop_url: shopUrl,
        });

        if (response?.status == 200) {
          navigate("/signin", { replace: true });
        } else {
          const errorMsg = response?.response?.data?.message;

          if (errorMsg === "Shop not found") {
            setShopUrlErrorMsg(errorMsg);
          }
        }
      })();
    }
  };

  function checkSignupForm() {
    setPasswordMsg("");
    setShopUrlErrorMsg("");
    setFirstNameErrorMsg("");
    setLastNameErrorMsg("");
    setConfirmPasswordErrorMsg("");
    setEmailErrorMsg("");
    let checkedForm = true;

    if (shopUrl === "") {
      setShopUrlErrorMsg("Shop url must be not empty.");
      checkedForm = false;
    }
    if (email === "") {
      setEmailErrorMsg("Email must be not empty.");
      checkedForm = false;
    }
    if (firstName === "") {
      setFirstNameErrorMsg("First name must be not empty.");
      checkedForm = false;
    }
    if (lastName === "") {
      setLastNameErrorMsg("Last name must be not empty.");
      checkedForm = false;
    }
    if (!STRONG_PASSWORD_REGEX.test(password)) {
      setPasswordMsg(STRONG_PASSWORD_MSG);
      checkedForm = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErrorMsg(CONFIRM_PASSWORD_MSG);
      checkedForm = false;
    }
    if (checkedForm) {
      setPasswordMsg("");
      setShopUrlErrorMsg("");
      setFirstNameErrorMsg("");
      setLastNameErrorMsg("");
      setConfirmPasswordErrorMsg("");
      setEmailErrorMsg("");
    }
    return checkedForm;
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen xl:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
            CrossLink
          </div>
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0
              dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl
                  dark:text-white"
              >
                Sign up to your account
              </h1>
              <form className="space-y-2" action="#">
                <Input
                  id="shopUrl"
                  label="Your Shop Url"
                  type="text"
                  name="shopUrl"
                  required={true}
                  value={shopUrl}
                  error={shopUrlErrorMsg}
                  placeholder="example@shopify.com"
                  onChange={(e) => setShopUrl(e.target.value)}
                />

                <Input
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  required={true}
                  value={email}
                  error={emailErrorMsg}
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex items-stretch justify-between gap-2">
                  <div className="self-start">
                    <Input
                      id="firstName"
                      label="First Name"
                      type="text"
                      name="firstName"
                      required={true}
                      value={firstName}
                      error={firstNameErrorMsg}
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="self-start">
                    <Input
                      id="lastName"
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={lastName}
                      error={lastNameErrorMsg}
                      required={true}
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <Input
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  required={true}
                  value={password}
                  placeholder="••••••••"
                  error={passwordMsg}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  required={true}
                  value={confirmPassword}
                  placeholder="••••••••"
                  error={confirmPasswordErrorMsg}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </form>
              <div className="mt-2">
                <button
                  className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium
                    text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={signup}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
