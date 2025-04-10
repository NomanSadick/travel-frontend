// providers/ReduxProvider.tsx
'use client';

import { store } from '@/app/store';
import React from 'react';
import { Provider } from 'react-redux';


type Props = {
  children: React.ReactNode;
};

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

{/* <div className="flex items-center justify-between mb-4">
<h2 className="text-xl font-bold">Filters</h2>
<button
  className="flex items-center text-orange-500 hover:underline"
  onClick={() => {
    setSelectedCategory("All");
    setPriceRange({ min: 0, max: 100000 });
    setSortOrder("Default");
  }}
>
  Reset
</button>
</div> */}
