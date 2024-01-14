import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  getAdditionalUserInfo,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { setSignInOrSignUp, showNotification } from '../../store';
import { db, auth, googleProvider } from '../../firebase-config';
import { BiSolidUserRectangle } from 'react-icons/bi';
import { MdEmail, MdLock, MdLogin } from 'react-icons/md';
import ReactIcon from '../other/ReactIcon';
import Input from '../input/Input';
import Button from '../other/Button';
import google from '../../svg/google.svg';

function SignIn() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const dispatch = useDispatch();

  const resetPassword = async () => {
    if (!userEmail) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Введите ваш email'
      }));

      return;
    }

    try {
      await sendPasswordResetEmail(auth, userEmail);

      dispatch(showNotification({
        id: nanoid(), type: 'Info', text: `Сбросить email ${userEmail}`
      }));
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Ошибка отправки email'
      }));
    }
  }

  const setUserData = async () => {
    try {
      const creationTime = new Date(auth.currentUser.metadata.creationTime);

      await setDoc(doc(db, 'users', auth.currentUser.uid, 'posts', 'userData'), {
        uid: auth.currentUser.uid,
        photoURL: auth.currentUser.providerData[0].photoURL || '',
        name: auth.currentUser.providerData[0].displayName || '',
        creationTime,
        subscribers: [],
        subscriptions: [],
        marked: '',
        header: ''
      });
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Ошибка получения данных. Попробуйте залогинится снова'
      }));
    }
  }

  const signInWithEmail = async () => {
    if (!userEmail || !userPassword) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Заполните все поля'
      }));

      return;
    }

    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);

      dispatch(showNotification({
        id: nanoid(), type: 'Info', text: 'Успешный вход'
      }));
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Ошибка входа'
      }));
    }
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (getAdditionalUserInfo(result).isNewUser) await setUserData();

      dispatch(showNotification({
        id: nanoid(), type: 'Info', text: 'Успешных вход в Google'
      }));
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Ошибка входа'
      }));
    }
  }

  return (
    <div className="h-full flex justify-center items-center">
      <section className="flex flex-col items-center p-6 bg-[white] rounded-xl shadow-lg">
        <ReactIcon src={<BiSolidUserRectangle className="w-28 h-28 mb-4" />} color="" />

        <div className="flex flex-col space-y-2 mb-4">
          <Input value={userEmail} onChange={(text) => { setUserEmail(text) }} onSubmit={signInWithEmail}
            type="text" placeholder="Email" icon={<MdEmail className="h-8 w-8" />} />
          <Input value={userPassword} onChange={(text) => { setUserPassword(text) }} onSubmit={signInWithEmail}
            type="password" placeholder="Пароль" icon={<MdLock className="h-8 w-8" />} />

          <p className="self-end text-lg cursor-pointer" onClick={resetPassword}>Забыли пароль?</p>
        </div>

        <div className="columns-2 w-full mb-6">
          <Button className="w-full" onClick={signInWithEmail}>
            <ReactIcon src={<MdLogin className="h-6 w-6" />} color="white" />
            <span>Вход</span>
          </Button>

          <Button className="w-full" onClick={signInWithGoogle}>
            <img className="w-6 h-6" src={google} alt="" />
            <span>Google</span>
          </Button>
        </div>

        <p>Еще нет аккаунта? <span className="text-secondary cursor-pointer"
          onClick={() => { dispatch(setSignInOrSignUp('signUp')) }}>Зарегистрироваться</span></p>
      </section>
    </div>
  );
}

export default SignIn;
