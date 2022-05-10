import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (value: string) => void;
}) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value: any) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span style={{ marginBottom: '200px' }}>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export default GlobalFilter;
