import Cookie from 'js-cookie';
import shortid from 'shortid';
import fetchCurrentUser from '../app/js/fetchCurrentUser';

describe('fetchCurrentUser', () => {
  describe('when cookie is present', () => {
    beforeEach(() => {
      spyOn(Cookie, 'get').and.returnValue('uid');
    });
    it('retrieves user from the cookie', () => {
      expect(fetchCurrentUser()).toEqual('uid');
      expect(Cookie.get).toHaveBeenCalledWith('userid');
    });
  });
  describe('when cookie is not present', () => {
    beforeEach(() => {
      spyOn(Cookie, 'get').and.returnValue(undefined);
    });
    it('creates a new user and saves it to the cookie', () => {
      spyOn(shortid, 'generate').and.returnValue('abcd');
      spyOn(Cookie, 'set');
      expect(fetchCurrentUser()).toEqual('abcd');
      expect(Cookie.set).toHaveBeenCalledWith('userid', 'abcd');
    });
  });
});
