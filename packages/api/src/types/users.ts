import type { User } from 'server-bindings/User';
import type { GetMe } from 'server-bindings/GetMe';
import type { LoginReturn } from 'server-bindings/LoginReturn';
import type { Register as RegisterData } from 'server-bindings/Register';
import type { CheckEmailExists as CheckEmail } from 'server-bindings/CheckEmailExists';
import type { CheckUsernameExists as CheckUsername } from 'server-bindings/CheckUsernameExists';
import type { ResetPassword } from 'server-bindings/ResetPassword';
import type { ResetPasswordConfirm } from 'server-bindings/ResetPasswordConfirm';
import type { ResetPasswordTokenCheck } from 'server-bindings/ResetPasswordTokenCheck';

export interface EditUser {
  nickname?: string;
  bio?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface Settings {
  enterSend?: boolean;
  expandDice?: boolean;
}

export {
  User,
  GetMe,
  LoginReturn,
  RegisterData,
  CheckEmail,
  CheckUsername,
  ResetPassword,
  ResetPasswordConfirm,
  ResetPasswordTokenCheck,
};
