"use client";

import { ReactNode } from "react";
import { AuthProvider, useAuth } from "./AuthProvider";
import LoginScreen from "./LoginScreen";

interface AuthGateContentProps {
  children: ReactNode;
}

const AuthGateContent = ({ children }: AuthGateContentProps) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginScreen />;
  }
  
  return <>{children}</>;
};

interface AuthGateProps {
  children: ReactNode;
  secretPhrase: string;
}

const AuthGate = ({ children, secretPhrase }: AuthGateProps) => {
  return (
    <AuthProvider secretPhrase={secretPhrase}>
      <AuthGateContent>{children}</AuthGateContent>
    </AuthProvider>
  );
};

export default AuthGate;
