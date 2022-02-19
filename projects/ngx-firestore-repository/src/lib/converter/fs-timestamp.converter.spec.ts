import { FsTimestampConverter } from './fs-timestamp.converter';
import { Timestamp } from 'firebase/firestore';

describe('FsTimestampConverter', () => {

  const converter: FsTimestampConverter = new FsTimestampConverter();

  describe('#fromJson()', () => {
    it('should convert timestamp to date', () => {
      const date: Date = converter.fromJson(Timestamp.fromDate(new Date(2020, 8)));
      expect(date.getMonth()).toEqual(8);
      expect(date.getFullYear()).toEqual(2020);
    });

    it('should not convert null', () => {
      expect(converter.fromJson(null)).toBeNull();
    });

    it('should not convert undefined', () => {
      expect(converter.fromJson(undefined)).toBeUndefined();
    });
  });

  describe('#toJson()', () => {
    it('should convert timestamp to date', () => {
      const timestamp: Timestamp = converter.toJson(new Date(2020, 8));
      expect(timestamp.toDate().getMonth()).toEqual(8);
      expect(timestamp.toDate().getFullYear()).toEqual(2020);
    });

    it('should not convert null', () => {
      expect(converter.toJson(null)).toBeNull();
    });

    it('should not convert undefined', () => {
      expect(converter.toJson(undefined)).toBeUndefined();
    });
  });
});
