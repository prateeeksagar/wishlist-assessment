// app/ReduxProvider.tsx
"use client"; // Ensure this is a client component

import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Adjust the path as needed

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
