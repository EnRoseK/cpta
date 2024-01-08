import { GlobalContext } from '@/providers';
import { useContext } from 'react';

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);

  if (!ctx) throw new Error('Context must used inside provider!');

  return ctx;
};
