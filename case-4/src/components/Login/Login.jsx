import React from 'react'
import { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState(false);
  const [isAuthorize, setAuth] = useState(false);
  const auth = getAuth();

  const handleChangeEmail = (e) => {
    setError(false);
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setError(false);
    setPassword(e.target.value);
  }

  const handleLogin = () => {
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuth(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <main className="">
      <div className="w-full">
        <h1 className="m-4">Авторизация</h1>

        <div className="m-4 flex flex-col w-1/4">
          <span>Email</span>
          <input className="border mb-4" type="text" name="" id="" onChange={handleChangeEmail} placeholder="john@doe.com" />

          <span>Пароль</span>
          <input className="border" type="text" name="" id="" onChange={handleChangePassword} placeholder="***************" />
          <button className="mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" block onClick={handleLogin}>Войти</button>

        </div>
        {isAuthorize && <Redirect to='/app/' />}

        <div>
          {errorMessage && <p>Неверный пароль</p>}
        </div>

      </div>
    </main>
  )
}

export default Login