/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { ConfirmationResult } from 'firebase/auth';

interface AuthFlowContextType {
  phoneNumber: string | null;
  setPhoneNumber: (phone: string | null) => void;
  confirmationResult: ConfirmationResult | null;
  setConfirmationResult: (result: ConfirmationResult | null) => void;
}

const AuthFlowContext = createContext<AuthFlowContextType | undefined>(undefined);

export const AuthFlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  return (
    <AuthFlowContext.Provider value={{ phoneNumber, setPhoneNumber, confirmationResult, setConfirmationResult }}>
      {children}
    </AuthFlowContext.Provider>
  );
};

export const useAuthFlow = () => {
  const context = useContext(AuthFlowContext);
  if (context === undefined) {
    throw new Error('useAuthFlow must be used within an AuthFlowProvider');
  }
  return context;
};
export default AuthFlowContext;