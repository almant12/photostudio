export interface JWTPayload {
    id: string; // Using string since your ID is a string in the payload
    name: string;
    role: string;
    exp?: number; // Expiration time as a number (Unix timestamp)
  }