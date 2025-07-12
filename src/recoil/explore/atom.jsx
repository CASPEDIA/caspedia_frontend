// recoil/exploreState.js (혹은 .ts)

import { atom } from 'recoil';

export const exploreQueryState = atom({
  key: 'exploreQueryState',
  default: {
    player: [1, 9],
    playtime: [10, 180],
    weight: [1, 5],
    sort: 'castdesc',
    page: 1,
    lastPage: 1,
    total: 0,
    exploreResult: [],
    pagination: [],
  },
});
