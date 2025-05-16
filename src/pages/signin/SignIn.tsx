import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { signIn } from '../../api/Auth';
import { accessToken } from '../../api/axios';
import Logo from '../../assets/icons/logo.png';
import Input from '../../components/ui/Input';
import {
  EMAIL_NOT_FOUND_MSG,
  EMPTY_EMAIL_MSG,
  EMPTY_PASSWORD_MSG,
  LOGIN_FAILED_MSG,
  WRONG_PASSWORD_MSG,
} from '../../constant/Constant';
import useAuth from '../../hooks/useAuth';

export default function SignIn() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();
  const [, setCookie] = useCookies([
    'shopId',
    'shopName',
    'shopUrl',
    'logoUrl',
  ]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState({
    general: '',
    email: '',
    password: '',
  });

  function validate() {
    let result = true;
    const errorMsgTemp = { ...errorMsg };

    if (email == '') {
      errorMsgTemp.email = EMPTY_EMAIL_MSG;
      result = false;
    } else {
      errorMsgTemp.email = '';
    }
    if (password == '') {
      errorMsgTemp.password = EMPTY_PASSWORD_MSG;
      result = false;
    } else {
      errorMsgTemp.password = '';
    }
    setErrorMsg(errorMsgTemp);
    return result;
  }

  const signin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validate()) {
      const errorMsgTemp = {
        general: '',
        email: '',
        password: '',
      };

      const response = await signIn({ email: email, password: password });

      if (response?.status === 200) {
        setCookie('shopId', response.data.shop_id);
        setCookie('shopName', response.data.shop_name);
        setCookie('shopUrl', response.data.shop_url);
        setCookie('logoUrl', response.data.logo_url);
        accessToken.value = response.data.access;
        setAuthenticated(true);
        navigate('/dashboard', { replace: true });
      } else if (response.status === 404) {
        if (response.data.message === EMAIL_NOT_FOUND_MSG) {
          errorMsgTemp.email = EMAIL_NOT_FOUND_MSG;
        } else if (response.data.message === WRONG_PASSWORD_MSG) {
          errorMsgTemp.password = WRONG_PASSWORD_MSG;
        }
      } else {
        errorMsgTemp.general = LOGIN_FAILED_MSG;
      }
      setErrorMsg(errorMsgTemp);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <a
            href=""
            className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="mr-2 h-8 w-8" src={Logo} alt="logo" />
            CrossLink
          </a>
          <div
            className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700
              dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
          >
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1
                className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white
                  md:text-2xl"
              >
                Sign in to your account
              </h1>
              {errorMsg.general !== '' && (
                <div className="my-4 text-sm text-gray-500 text-red-500">
                  {errorMsg.general}
                </div>
              )}
              <form className="space-y-4 md:space-y-6" action="#">
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  required={true}
                  value={email}
                  error={errorMsg.email}
                  placeholder="example@gmail.com"
                  onChange={e => setEmail(e.target.value)}
                />
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  required={true}
                  value={password}
                  error={errorMsg.password}
                  placeholder="••••••••"
                  onChange={e => setPassword(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="focus:ring-1 h-4 w-4 rounded border border-gray-300 bg-gray-50
                          focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700
                          dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        required={true}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href=""
                    className="text-sm font-medium text-gray-600 hover:underline dark:text-gray-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium
                    text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={signin}
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{'  '}
                  <a
                    href="/signup"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
