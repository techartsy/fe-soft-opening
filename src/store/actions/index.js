import {
  POST_REGISTRATION,
  GET_ALL_GUEST,
  SET_GUESTS,
  SET_MESSAGES,
  SET_NEW_GUEST,
  SET_ERROR_POST,
  RESET_ERROR_POST,
  POST_GIFT_CONFIRMATION,
  SET_CONFIRMATION_ERROR,
  RESET_CONFIRMATION_ERROR,
  SET_CONFIRMATION_SUCCESS,
  RESET_CONFIRMATION_SUCCESS,
  GET_MESSAGES,
} from "../constants/index";

export const getAllGuest = () => {
  return {
    type: GET_ALL_GUEST,
  };
};
export const setGuests = (guests) => {
  return {
    type: SET_GUESTS,
    guests,
  };
};
export const submitRegistration = (guestData, cbError, cbSuccess) => {
  return {
    type: POST_REGISTRATION,
    guestData,
    cbError,
    cbSuccess
  };
};
export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages,
  };
};
export const setNewGuest = (guest) => {
  return {
    type: SET_NEW_GUEST,
    guest,
  };
};
export const setErrorPost = () => {
  return {
    type: SET_ERROR_POST,
  };
};
export const resetErrorPost = () => {
  return {
    type: RESET_ERROR_POST,
  };
};
export const postGiftConfirmation = (userData) => {
  return {
    type: POST_GIFT_CONFIRMATION,
    userData,
  };
};
export const setConfirmationError = (message) => {
  return {
    type: SET_CONFIRMATION_ERROR,
    message,
  };
};
export const resetConfirmationError = () => {
  return {
    type: RESET_CONFIRMATION_ERROR,
  };
};
export const setConfirmationSuccess = () => {
  return {
    type: SET_CONFIRMATION_SUCCESS,
  };
};
export const resetConfirmationSuccess = () => {
  return {
    type: RESET_CONFIRMATION_SUCCESS,
  };
};
export const getMessages = () => {
  return {
    type: GET_MESSAGES,
  };
};
