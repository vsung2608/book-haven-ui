export interface LoginRequest{
  username?: string;
  passwprd?: string
}

export interface TokenResponse{
  accessToken: string;
  refreshToken: string;
}
