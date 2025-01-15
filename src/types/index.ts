import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface CivicUser {
  id: string;
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  updated_at?: Date;
}

export interface WalletInfo {
  address: string;
  balance: string;
}

export interface AuthError {
  message: string;
  code?: string;
}
