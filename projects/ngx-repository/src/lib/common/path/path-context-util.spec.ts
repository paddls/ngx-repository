import {PathContextUtil} from './path-context-util';

describe('RepositoryPathUtil', () => {

  describe('getReadPath', () => {

    it('should make path based on read path', () => {
      expect(PathContextUtil.getReadPath({
        read: '/read-path/:id?name=:name',
        path: '/path/:id?name=:name'
      })).toEqual('/read-path/:id?name=:name');
    });

    it('should make path based on path', () => {
      expect(PathContextUtil.getReadPath({
        path: '/path/:id?name=:name'
      })).toEqual('/path/:id?name=:name');
    });

    it('should throw an error when no path found', () => {
      expect(() => PathContextUtil.getReadPath({
        path: null
      })).toThrowError('You must define one path to read data');
    });
  });

  describe('getCreatePath', () => {

    it('should make path based on create path', () => {
      expect(PathContextUtil.getCreatePath({
        create: '/create-path/:id?name=:name',
        write: '/write-path/:id?name=:name',
        path: '/path/:id?name=:name'
      })).toEqual('/create-path/:id?name=:name');
    });

    it('should make path based on write path', () => {
      expect(PathContextUtil.getCreatePath({
        write: '/write-path/:id?name=:name',
        path: '/path/:id?name=:name'
      })).toEqual('/write-path/:id?name=:name');
    });

    it('should make path based on path', () => {
      expect(PathContextUtil.getCreatePath({
        path: '/path/:id?name=:name'
      })).toEqual('/path/:id?name=:name');
    });

    it('should throw an error when no path found', () => {
      expect(() => PathContextUtil.getCreatePath({
        path: null
      })).toThrowError('You must define one path to create data');
    });
  });

  describe('getUpdatePath', () => {

    it('should make path based on update path', () => {
      expect(PathContextUtil.getUpdatePath({
        update: '/update-path/:id?name=:name',
        write: '/write-path/:id?name=:name',
        path: '/path/:id?name=:name'
      })).toEqual('/update-path/:id?name=:name');
    });

    it('should make path based on write path', () => {
      expect(PathContextUtil.getUpdatePath({
        write: '/write-path/:id?name=:name',
        path: '/path/:id?name=:name'
      })).toEqual('/write-path/:id?name=:name');
    });

    it('should make path based on path', () => {
      expect(PathContextUtil.getUpdatePath({
        path: '/path/:id?name=:name'
      })).toEqual('/path/:id?name=:name');
    });

    it('should throw an error when no path found', () => {
      expect(() => PathContextUtil.getUpdatePath({
        path: null
      })).toThrowError('You must define one path to update data');
    });
  });

  describe('getDeletePath', () => {

    it('should make path based on delete path', () => {
      expect(PathContextUtil.getDeletePath({
        delete: '/delete-path/:id?name=:name',
        write: '/write-path/:id?name=:name',
        path: '/path/:id?name=:name'
      })).toEqual('/delete-path/:id?name=:name');
    });

    it('should make path based on write path', () => {
      expect(PathContextUtil.getDeletePath({
        write: '/write-path/:id?name=:name',
        path: '/path/:id?name=:name'
      })).toEqual('/write-path/:id?name=:name');
    });

    it('should make path based on path', () => {
      expect(PathContextUtil.getDeletePath({
        path: '/path/:id?name=:name'
      })).toEqual('/path/:id?name=:name');
    });

    it('should throw an error when no path found', () => {
      expect(() => PathContextUtil.getDeletePath({
        path: null
      })).toThrowError('You must define one path to delete data');
    });
  });
});
