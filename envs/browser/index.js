import makeMTProto from '../../src';
import SHA1 from './sha1';
import SHA256 from './sha256';
import PBKDF2 from './pbkdf2';
import Transport from './transport';
import getRandomBytes from './get-random-bytes';
import getLocalStorage from './get-local-storage';

function createTransport(dc, crypto) {
  return new Transport(dc, crypto);
}

const MTProto = makeMTProto({
  SHA1,
  SHA256,
  PBKDF2,
  getRandomBytes,
  getLocalStorage,
  createTransport,
});

export default MTProto;
