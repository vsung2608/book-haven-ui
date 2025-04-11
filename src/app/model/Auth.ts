export interface LoginRequest{
  username?: string;
  passwprd?: string
}

export interface TokenResponse{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest{
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
