export const apiList = {
  // user routes
  USER_REGISTER: "api/auth/register",
  USER_LOGIN: "api/auth/login",
  USER_LOGOUT: "api/auth/logout",
  GET_USER_PROFILE: "api/invoices/profile",
  // admin routes
  ADMIN_REGISTER: "api/adminAuth/register",
  ADMIN_LOGIN: "api/adminAuth/login",
  ADMIN_LOGOUT: "api/adminAuth/logout",
  // all users routes
  ALL_USERS: "api/allUsers/getUsers",
  CREATE_USER: "api/allUsers/createUser",
  UPDATE_USER: "api/allUsers/updateUser",
  DELETE_SINGLE_USER: "api/allUsers/deleteSingleUser",
  DELETE_ALL_USERS: "api/allUsers/deleteAllUsers",
  // Invoice routes
  FREE_TRIAL: "api/invoices/freeTrial",
  CREATE_INVOICE: "api/invoices/createInvoice",
  INVOICE: "api/invoices/invoice",
  GET_INVOICE: "api/invoices/getInvoice",
  GET_SINGLE_INVOICE: "api/invoices/invoice",
};
