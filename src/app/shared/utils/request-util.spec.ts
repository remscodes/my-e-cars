import { HttpParams } from '@angular/common/http';
import { createParams } from './request-util';

describe('RequestUtil', () => {

  describe('createQueryParams', () => {
    const startDate: string = new Date(2022, 3, 8).toDateString();
    const endDate: string = new Date(2022, 3, 9).toDateString();

    it('should inject date params', () => {
      const params: HttpParams = createParams({ startDate, endDate });

      expect(params.get('startDate')).toEqual(startDate);
      expect(params.get('endDate')).toEqual(endDate);
    });
  });
});
