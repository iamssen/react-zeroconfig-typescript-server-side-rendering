import messages from 'generated/locales.json';
import React, { Consumer, Context, createContext, ReactNode, useContext } from 'react';
import { useLocale } from 'use-locale';
import { IntlProvider } from 'use-react-intl';
import { Timezone, useTimezone } from 'use-timezone';
import { cookieKeys, LanguageCode } from './config';
import { useInitialState } from './context-states/useInitialState';
import { InitialState } from './data-types/initialState';

export interface AppContextProps {
  initialState: InitialState | null;
  currentTimezone: string;
  currentLocale: LanguageCode;
  children: ReactNode;
}

export interface AppContextState {
  initialState: InitialState | null;
  locale: LanguageCode;
  timezone: Timezone;
  
  updateLocale: (languageCode: LanguageCode) => void;
  updateTimezone: (timezone: string | Timezone) => void;
}

// @ts-ignore
const AppContext: Context<AppContextState> = createContext<AppContextState>();

export function AppContextProvider({initialState: defaultInitialState, children, currentLocale, currentTimezone}: AppContextProps) {
  const {locale, updateLocale} = useLocale(currentLocale, {cookieKey: cookieKeys.locale});
  const {timezone, updateTimezone} = useTimezone(currentTimezone, cookieKeys.timezone);
  const {initialState} = useInitialState(defaultInitialState);
  
  return (
    <IntlProvider locale={locale.slice(0, 2)} messages={messages[locale]}>
      <AppContext.Provider value={{
        initialState,
        locale,
        timezone,
        updateLocale,
        updateTimezone,
      }}>
        {children}
      </AppContext.Provider>
    </IntlProvider>
  );
}

export function useAppContextState() {
  return useContext(AppContext);
}

export const AppContextConsumer: Consumer<AppContextState> = AppContext.Consumer;