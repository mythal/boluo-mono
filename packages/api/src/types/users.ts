import type { User } from 'server-bindings/User';
import type { GetMe } from 'server-bindings/GetMe';
import type { LoginReturn } from 'server-bindings/LoginReturn';

export interface EditUser {
  nickname?: string;
  bio?: string;
}

export interface RegisterData {
  username: string;
  nickname: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface CheckEmail {
  email: string;
}

export interface CheckUsername {
  username: string;
}

export interface Settings {
  enterSend?: boolean;
  expandDice?: boolean;
}

export interface ResetPassword {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  password: string;
}

export interface ResetPasswordTokenCheck {
  token: string;
}

export { User, GetMe, LoginReturn };
