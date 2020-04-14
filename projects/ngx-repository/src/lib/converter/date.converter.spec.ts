import {DateConverter} from './date.converter';

describe('DateConverter', () => {
  const dateISOString: string = '2019-12-27T10:59:13.000Z';
  let dateConverter: DateConverter;

  beforeEach(() => {
    dateConverter = new DateConverter();
  });

  it('should return date object from value', () => {
    const date: Date = dateConverter.fromJson(dateISOString);

    expect(date instanceof Date).toBeTruthy();
    expect(date.getUTCSeconds()).toEqual(13);
    expect(date.getUTCMinutes()).toEqual(59);
    expect(date.getUTCHours()).toEqual(10);
    expect(date.getUTCDate()).toEqual(27);
    expect(date.getUTCMonth()).toEqual(11);
    expect(date.getUTCFullYear()).toEqual(2019);
  });

  it('should return the value when value is null or undefined', () => {
    expect(dateConverter.fromJson(null)).toBeNull();
    expect(dateConverter.fromJson(undefined)).toBeUndefined();
  });

  it('should return ISO String date from date object', () => {
    const date: Date = new Date(dateISOString);

    expect(dateConverter.toJson(date)).toEqual(dateISOString);
  });

  it('should return the value when date is null or undefined', () => {
    expect(dateConverter.toJson(null)).toBeNull();
    expect(dateConverter.toJson(undefined)).toBeUndefined();
  });
});
