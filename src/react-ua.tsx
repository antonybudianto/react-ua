import React, { useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import UAParser from 'ua-parser-js';

interface UserAgentProviderProps {
  value?: string;
  children: ReactNode;
}

const UserAgentContext = React.createContext<any>({});

export const UserAgent = UserAgentContext.Consumer;

export const UserAgentProvider: FC<UserAgentProviderProps> = ({
  value,
  children,
}) => {
  const initUA = useMemo(() => {
    return new UAParser(value).getResult();
  }, [value]);

  return (
    <UserAgentContext.Provider value={initUA}>
      {children}
    </UserAgentContext.Provider>
  );
};

export const useUserAgent = () => React.useContext(UserAgentContext);
