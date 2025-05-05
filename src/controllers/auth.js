import { logoutUser, refreshUser, registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const userData = req.body;
  const newUser = await registerUser(userData);

  res.status(201).send({
    message: 'User registered successfully',
    status: 201,
    data: newUser,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).send({
    message: 'User logged in successfully and session created',
    status: 200,
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  await logoutUser(sessionId);

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(200).send({
    message: 'User logged out successfully',
    status: 200,
  });
};

export const refreshUserController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const session = await refreshUser({ refreshToken, sessionId });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).send({
    message: 'User refresh flow completed successfully',
    status: 200,
    data: {
      accessToken: session.accessToken,
    },
  });
};
