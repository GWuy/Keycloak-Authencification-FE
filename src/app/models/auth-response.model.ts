export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  userId: bigint;
  roles: string;
}
