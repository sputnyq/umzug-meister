import { Urls } from '../../../api/Urls';
import { appRequest } from '../../../api/fetch-client';

import { Order } from 'um-types';

export function useOrderSearch(onFinally?: () => void) {
  return function (searchValue: string): Promise<Order[]> {
    const url = isNaN(Number(searchValue)) ? Urls.orderSearch(searchValue) : Urls.orderById(searchValue);

    return appRequest('get')(url)
      .then((result) => (Array.isArray(result) ? result : [result]))

      .catch((e) => {
        console.error(e);
        return [];
      })

      .finally(onFinally);
  };
}