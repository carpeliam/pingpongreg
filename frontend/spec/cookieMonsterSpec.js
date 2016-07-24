import Cookie from 'js-cookie';
import { fetchUser, setUser } from '../app/js/cookieMonster';

describe('cookieMonster', () => {
  const user = { id: 'abc123', name: 'margaret' };
  describe('#fetchUser', () => {
    it('retrieves and parses a user from a cookie when present', () => {
      spyOn(Cookie, 'get').and.returnValue(JSON.stringify(user));
      expect(fetchUser()).toEqual(user);
      expect(Cookie.get).toHaveBeenCalledWith('ping.user');
    });

    it('returns undefined when a cookie is not present', () => {
      spyOn(Cookie, 'get').and.returnValue(undefined);
      expect(fetchUser()).toEqual(undefined);
      expect(Cookie.get).toHaveBeenCalledWith('ping.user');
    });
  });

  describe('#setUser', () => {
    it('sets a stringified version of the user', () => {
      spyOn(Cookie, 'set');
      setUser(user);
      expect(Cookie.set).toHaveBeenCalledWith('ping.user', JSON.stringify(user));
    });
  });
});
