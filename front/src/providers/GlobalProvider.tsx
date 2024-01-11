import { IFooter, IGeneralInfo, IMainMenuItem } from '@/interfaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, ReactNode, createContext, useEffect, useState } from 'react';

interface GlobalContextType {
  mainMenuItems: IMainMenuItem[];
  isLoading: boolean;
  generalInfo?: IGeneralInfo;
  footer?: IFooter;
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
  const [generalInfo, setGeneralInfo] = useState<IGeneralInfo | undefined>(undefined);
  const [footer, setFooter] = useState<IFooter | undefined>(undefined);

  const value = { mainMenuItems, isLoading, generalInfo, footer };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [mainMenuRes, generalInfoRes, footerRes] = await Promise.all([
          axios.get<{ data: IMainMenuItem[] }>(`/api/main-menu?locale=${currentLocale}`).then((res) => res.data),
          axios.get<{ data: IGeneralInfo }>(`/api/general-info?locale=${currentLocale}`).then((res) => res.data),
          axios.get<{ data: IFooter }>(`/api/footer?locale=${currentLocale}`).then((res) => res.data),
        ]);

        setMainMenuItems(mainMenuRes.data);
        setGeneralInfo(generalInfoRes.data);
        setFooter(footerRes.data);
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
