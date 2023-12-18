import { useState } from 'react';

const useLoading = (): [boolean, () => void, () => void] => {
  const [loading, setLoading] = useState<boolean>(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return [loading, stopLoading, startLoading];
};

export default useLoading;
