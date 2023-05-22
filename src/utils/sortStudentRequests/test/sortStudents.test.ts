import { HEADERS } from 'components/StudentRequestTable/StudentRequestTable';
import { sortStudents } from '../sortStudents';
import { bubbleSort } from './bubbleSortStudents';
import { studentRequestTestingData } from './testingData';

describe('Sort Student Requests', () => {
  const sortHeaders = HEADERS.slice(0, HEADERS.length - 1);
  let order: 'Up' | 'Down';
  describe('Up', () => {
    beforeAll(() => {
      order = 'Up';
    });

    test.each(sortHeaders)('by %s', (attribute) => {
      const expectedSortedArray = bubbleSort(
        studentRequestTestingData,
        order,
        attribute
      );
      const actualSortedArray = sortStudents(
        studentRequestTestingData,
        attribute,
        order
      );
      expect(actualSortedArray).toEqual(expectedSortedArray);
    });
  });
});
