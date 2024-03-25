// AuthProvider.js
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setSession, isValidToken } from '../utils/jwt';
import { BASE_URL } from '../utils/axios';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  success: null,
  message: false,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload || { isAuthenticated: true, user: 'l' };
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    
    const { user, success, message } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      success,
      message
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const userStr = window.localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;

        if (accessToken && isValidToken(accessToken) && user) {
          setSession(accessToken);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password
      });
      const { accessToken, user, success, message } = response.data;
      setSession(accessToken);

      // Save user details in local storage
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('user', JSON.stringify(user));
      window.localStorage.setItem('message', JSON.stringify(message));
      window.localStorage.setItem('success', JSON.stringify(success));

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          success,
          message
        }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
