import React from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

import Loading from 'components/Loading/Loading';

export default function GlobalLoading() {
  const loadingVal = useSelector(
    (state: RootState) => state.loading.loadingVal
  );

  return loadingVal ? <Loading type="bar" /> : null;
}
