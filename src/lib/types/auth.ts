export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  birthDate: string;
  zodiacSign: string;
}

export interface AuthResponse {
  token?: string;
  success: boolean;
  message?: string;
}