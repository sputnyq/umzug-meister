import { Button } from '@mui/material';

import React, { useCallback, useEffect, useState } from 'react';

import { AppDataGrid } from '../components/shared/AppDataGrid';
import { AppDateCell } from '../components/shared/AppDateCell';
import { RootBox } from '../components/shared/RootBox';
import SearchBar from '../components/shared/SearchBar';
import { useGenerateOrder } from '../hooks/useGenerateOrder';
import { useInitJF } from '../hooks/useInitJF';
import { useSaveOrder } from '../hooks/useSaveOrder';
import { convertData } from '../utils/generateOrderUtils';

const PAGE_SIZE = 10;

export default function Import() {
  useInitJF();
  const generateOrder = useGenerateOrder();
  const saveOrder = useSaveOrder();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  useEffect(() => {
    const { page, pageSize } = paginationModel;
    setLoading(true);
    window.JF?.getSubmissions({ offset: page * pageSize, limit: pageSize }, (data: any[]) => {
      setData(convertData(data));
      setLoading(false);
    });
  }, [paginationModel]);

  const onSearch = useCallback((searchValue: string) => {
    window.JF.getSubmission(
      searchValue,
      (res: any) => {
        setData(convertData([res]));
      },
      () => {
        setData([]);
      },
    );
  }, []);

  const onClear = useCallback(() => {
    setPaginationModel({ page: 0, pageSize: PAGE_SIZE });
  }, []);

  const onImportRequest = useCallback(
    (data: any) => {
      const order = generateOrder(data);
      saveOrder(order);
    },
    [generateOrder, saveOrder],
  );

  return (
    <RootBox>
      <SearchBar onClear={onClear} onSearch={onSearch} placeholder="Submission ID" />
      <AppDataGrid
        data={data}
        loading={loading}
        columns={[
          { field: 'orderId', headerName: 'Auftrag' },
          {
            field: 'name',
            headerName: 'Name',
            flex: 1,
          },
          {
            field: 'createdAt',
            headerName: 'Erstellt',
            flex: 1,
            renderCell(params) {
              return <AppDateCell date={new Date(params.value)} />;
            },
          },
          { field: 'email', headerName: 'E-Mail', flex: 1 },
          { field: 'id', headerName: 'Submission ID', flex: 1 },
          {
            field: '__import',
            headerName: '',
              flex: 1,
            renderCell({ row }) {
              return (
                <Button variant="contained" onClick={() => onImportRequest(row)} color="secondary">
                  Import
                </Button>
              );
            },
          },
        ]}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
      />
    </RootBox>
  );
}
