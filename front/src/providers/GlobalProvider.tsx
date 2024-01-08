import { IMainMenuItem } from '@/interfaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, ReactNode, createContext, useEffect, useState } from 'react';

interface GlobalContextType {
  mainMenuItems: IMainMenuItem[];
  isLoading: boolean;
}

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const router = useRouter();
  const currentLocale = router.locale;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mainMenuItems, setMainMenuItems] = useState<IMainMenuItem[]>([]);

  const value = { mainMenuItems, isLoading };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await axios
          .get<{ data: IMainMenuItem[] }>(`/api/main-menu?locale=${currentLocale}`)
          .then((res) => res.data);

        setMainMenuItems(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentLocale]);

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
