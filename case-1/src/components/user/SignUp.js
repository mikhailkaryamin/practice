import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { BiSolidUserRectangle } from 'react-icons/bi';
import { MdEmail, MdLock } from 'react-icons/md';
import { HiUserAdd } from 'react-icons/hi';
import { setSignInOrSignUp, showNotification } from '../../store';
import { auth, db } from '../../firebase-config';
import ReactIcon from '../other/ReactIcon';
import Input from '../input/Input';
import Button from '../other/Button';

function SignUp() {
  const [userEmail, setUserEmail] = useState('');

  const [userPassword, setUserPassword] = useState('');
  const [confirmedUserPassword, setConfirmedUserPassword] = useState('');

  const dispatch = useDispatch();

  const setUserData = async () => {
    try {
      const creationTime = new Date(auth.currentUser.metadata.creationTime);

      await setDoc(doc(db, 'users', auth.currentUser.uid, 'posts', 'userData'), {
        uid: auth.currentUser.uid,
        photoURL: '',
        name: '',
        creationTime,
        subscribers: [],
        subscriptions: [],
        marked: '',
        header: ''
      });
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Ошибка, попробуйте войти снова.'
      }));
    }
  }

  const signUp = async () => {
    if (!userEmail || !userPassword || !confirmedUserPassword) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Заполните все поля'
      }));

      return;
    }

    if (!userEmail.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Неверный формат email'
      }));

      return;
    }

    if (userPassword.length < 6) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Пароль минимум 6 символов'
      }));

      return;
    }

    if (userPassword !== confirmedUserPassword) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Пароли не совпадают'
      }));

      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      await setUserData();

      dispatch(setSignInOrSignUp('signIn'));
      dispatch(showNotification({
        id: nanoid(), type: 'Info', text: 'Пользователь успешно создан'
      }));
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Ошибка создания пользователя'
      }));
    }
  }

  return (
    <div className="h-full flex justify-center items-center">
      <section className="flex flex-col items-center p-6 bg-[white] rounded-xl shadow-lg">
        <ReactIcon src={<BiSolidUserRectangle className="w-28 h-28 mb-4" />} color="" />

        <div className="w-full mb-4">
          <Input value={userEmail} onChange={(text) => { setUserEmail(text) }} onSubmit={signUp}
            type="text" placeholder="Email" icon={<MdEmail className="h-8 w-8" />} />
        </div>

        <div className="flex flex-col space-y-2 mb-4">
          <Input value={userPassword} onChange={(text) => { setUserPassword(text) }} onSubmit={signUp}
            type="password" placeholder="Пароль" icon={<MdLock className="h-8 w-8" />} />
          <Input value={confirmedUserPassword} onChange={(text) => { setConfirmedUserPassword(text) }} onSubmit={signUp}
            type="password" placeholder="Подтвердите пароль" icon={<MdLock className="h-8 w-8" />} />
        </div>

        <Button className="w-full mb-6" onClick={signUp}>
          <ReactIcon src={<HiUserAdd className="w-6 h-6" />} color="white" />
          <span>Зарегистрироваться</span>
        </Button>

        <p>Already have an account? <span className="text-secondary cursor-pointer"
          onClick={() => { dispatch(setSignInOrSignUp('signIn')) }}>Войти</span></p>
      </section>
    </div>
  );
}

export default SignUp;
