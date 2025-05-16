import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

import { editLogo, saveAWSLogo } from '../../api/SettingAPIs';
import { updatePassword } from '../../api/UserAPIs';
import Input from '../../components/ui/Input';
import Loading from '../../components/ui/Loading';
import Toast from '../../components/ui/Toast';
import {
  CONFIRM_PASSWORD_MSG,
  ERROR,
  STRONG_PASSWORD_MSG,
  STRONG_PASSWORD_REGEX,
  SUCCESS,
} from '../../constant/Constant';
import { changeLoading, changeMessage } from '../../reducers/ActionSlice';
import { RootState } from '../../store';
import { documentTitle } from '../../utils';

export function Settings() {
  documentTitle('Settings');
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['shopId', 'logoUrl']);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordMsg, setCurrentPasswordMsg] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordMsg, setNewPasswordMsg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');
  const [file, setFile] = useState('');
  const [logoFile, setLogoFile] = useState(new File([''], ''));
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const loading = useSelector((state: RootState) => state.action.loading);
  const message = useSelector((state: RootState) => state.action.message);

  const editLogoMutatioin = useMutation({
    mutationFn: editLogo,
    onSuccess: data => {
      const formData = new FormData();

      Object.keys(data.fields).forEach(key => {
        formData.set(key, data.fields[key]);
      });
      formData.append('file', logoFile);
      setNewLogoUrl(data.url + data.fields['key']);

      saveAWSLogoMutatioin.mutate({
        url: data.url,
        formData: formData,
      });
    },
    onError: () => {
      console.log('Edit logo failed');
    },
  });

  const saveAWSLogoMutatioin = useMutation({
    mutationFn: saveAWSLogo,
    onSuccess: () => {
      removeCookie('logoUrl');
      setCookie('logoUrl', newLogoUrl);
    },
    onError: () => {
      console.log('save logo failed');
    },
  });

  const handleChangeFile = (event: any) => {
    if (event.target.files) {
      setFile(URL.createObjectURL(event.target.files[0]));
      setLogoFile(event.target.files[0]);
      editLogoMutatioin.mutate({
        shopId: cookies.shopId,
        logoExtension: event.target.files[0].type,
      });
    }
  };

  const editPasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      dispatch(
        changeMessage({
          content: 'Password updated!',
          type: SUCCESS,
        }),
      );
      dispatch(changeLoading(false));
    },
    onError: error => {
      dispatch(
        changeMessage({
          content: error.message,
          type: ERROR,
        }),
      );
      dispatch(changeLoading(false));
    },
  });

  const handleUpdatePassword = (event: any) => {
    event.preventDefault();

    if (validate()) {
      dispatch(changeLoading(true));
      editPasswordMutation.mutate({
        current_password: currentPassword,
        new_password: newPassword,
      });
    }
  };

  function validate() {
    if (currentPassword == '') {
      setCurrentPasswordMsg('Please input existing password!');
      return false;
    }

    if (newPassword == '') {
      setNewPasswordMsg('Please input new password!');
      return false;
    }

    if (!STRONG_PASSWORD_REGEX.test(newPassword)) {
      setNewPasswordMsg(STRONG_PASSWORD_MSG);
      return false;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordMsg(CONFIRM_PASSWORD_MSG);
      return false;
    }

    setCurrentPasswordMsg('');
    setNewPasswordMsg('');
    setConfirmPasswordMsg('');
    return true;
  }

  return (
    <div className={`max-w-2xl mx-auto p-4 ${loading && 'relative block'}`}>
      <div className={`mb-8 ${loading && 'opacity-15'}`}>
        <div className="space-y-4 md:space-y-6">
          <div className="w-full pr-10">
            <div className="text-sm font-bold mb-4">Logo</div>
            <div className="flex items-center mb-4">
              {file !== '' ? (
                <img
                  className="h-10 w-10 inline-block rounded-full border-solid border-2 border-gray-200"
                  src={file}
                />
              ) : (
                <img
                  className="inline-block h-16 w-16 rounded-full"
                  src={cookies.logoUrl}
                  alt=""
                />
              )}
              <div className="ml-4 text-sm text-gray-700">
                {logoFile.name.length < 30
                  ? logoFile.name
                  : logoFile.name.substring(0, 30) + '....'}
              </div>
            </div>
            <div
              className="w-fit h-9 flex justify-center items-center border border-gray-300 shadow-sm
                text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
            >
              <label className="py-2 px-4 cursor-pointer">
                Edit
                <input
                  type="file"
                  className="absolute top-0 w-16 opacity-0"
                  onChange={handleChangeFile}
                />
              </label>
            </div>
          </div>

          <h2 className="text-sm font-semibold">Change Password</h2>
          <Input
            id={'currentPassWord'}
            label="Current Password"
            type={'password'}
            required={true}
            value={currentPassword}
            error={currentPasswordMsg}
            placeholder="••••••••"
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <Input
            id={'newPassWord'}
            label="New Password"
            type={'password'}
            required={true}
            value={newPassword}
            error={newPasswordMsg}
            placeholder="••••••••"
            onChange={e => setNewPassword(e.target.value)}
          />
          <Input
            id={'confirmPassword'}
            label="Confirm Password"
            type={'password'}
            required={true}
            value={confirmPassword}
            error={confirmPasswordMsg}
            placeholder="••••••••"
            onChange={e => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={handleUpdatePassword}
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Update Password
          </button>
        </div>
      </div>

      {loading && <Loading />}
      {message.content && <Toast />}
    </div>
  );
}
