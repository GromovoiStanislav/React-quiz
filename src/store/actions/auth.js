import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
    if (isLogin) {
      URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
    }

    const response = await axios.post(URL, authData);
    const data = response.data;
    localStorage.setItem(
      'expirationData',
      new Date(new Date().getTime() + data.expiresIn * 1000)
    );
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));

    //можно и просто так
    // setTimeout(() => {
    //   dispatch(logout());
    // }, data.expiresIn * 1000);
  };
}

export function authSuccess(token) {
  return { type: AUTH_SUCCESS, token };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem('expirationData');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  return { type: AUTH_LOGOUT };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationData = new Date(localStorage.getItem('expirationData'));
      if (expirationData <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationData.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}
