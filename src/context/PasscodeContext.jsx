import { createContext, useContext, useState } from 'react';

// Create a context for storing passcode access
const PasscodeContext = createContext();

export function PasscodeProvider({ children }) {
  const [passcode, setPasscode] = useState('');

  return (
    <PasscodeContext.Provider value={{ passcode, setPasscode }}>
      {children}
    </PasscodeContext.Provider>
  );
}

export function usePasscode() {
  return useContext(PasscodeContext);
}
