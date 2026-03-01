"use client";

import { createContext, useContext, ReactNode } from "react";
import { useBirthday } from "@/lib/hooks/useBirthday";

interface BirthdayContextType {
  birthday: Date | null;
  setBirthday: (date: Date) => void;
  clearBirthday: () => void;
  isLoaded: boolean;
}

const BirthdayContext = createContext<BirthdayContextType>({
  birthday: null,
  setBirthday: () => {},
  clearBirthday: () => {},
  isLoaded: false,
});

export function useBirthdayContext() {
  return useContext(BirthdayContext);
}

export default function BirthdayProvider({ children }: { children: ReactNode }) {
  const birthdayState = useBirthday();

  return (
    <BirthdayContext.Provider value={birthdayState}>
      {children}
    </BirthdayContext.Provider>
  );
}
