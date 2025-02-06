export const apiList = {
  // user routes
  USER_REGISTER: "auth/register",
  USER_LOGIN: "auth/login",
  USER_LOGOUT: "auth/logout",
  GET_USER_PROFILE: "invoices/profile",
  // admin routes
  ADMIN_REGISTER: "adminAuth/register",
  ADMIN_LOGIN: "adminAuth/login",
  ADMIN_LOGOUT: "adminAuth/logout",
  // all users routes
  ALL_USERS: "allUsers/getUsers",
  CREATE_USER: "allUsers/createUser",
  UPDATE_USER: "allUsers/updateUser",
  DELETE_SINGLE_USER: "allUsers/deleteSingleUser",
  DELETE_ALL_USERS: "allUsers/deleteAllUsers",
  // Invoice routes
  FREE_TRIAL: "invoices/freeTrial",
  CREATE_INVOICE: "invoices/createInvoice",
  INVOICE: "invoices/invoice",
  GET_INVOICE: "invoices/getInvoice",
  GET_SINGLE_INVOICE: "invoices/singleInvoice",
  GET_USER_INVOICE: "invoices/userInvoice",
  DELETE_SINGE_INVOICE: "invoices/deleteInvoice",
  DELETE_ALL_INVOICES: "invoices/deleteInvoices",
};
