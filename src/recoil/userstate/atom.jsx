import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const UNLOGINED_USER = {
  hasLogin: false,
  id:null,
  nanoid:null,
  jwtToken:null,
  authority: null,
  userImageKey: null,
}

export const userState = atom({
  key: 'userState',
  default : Object.assign(UNLOGINED_USER),
  effects_UNSTABLE: [persistAtom],
})