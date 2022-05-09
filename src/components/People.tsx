import React from 'react';
import useAxios from 'axios-hooks';
import { ToastContainer, toast } from 'react-toastify';

const People = () => {
  const [{ data, error, loading }] = useAxios({
    url: 'https://swapi.dev/api/planets/?page=1',
    method: 'GET',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error loading...</div>;
  }
  console.log(data.results);
  return <div>Hello World!</div>;
};

export default People;
