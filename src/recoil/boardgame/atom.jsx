import { atom } from 'recoil';

export class BoardGame {
  constructor({
    boardgameKey = 1,
    imageUrl = "",
    nameKor = "",
    nameEng = "",
    yearPublished = 0,
    description = "",
    minPlayers = 0,
    maxPlayers = 0,
    minPlaytime = 0,
    maxPlaytime = 0,
    geekWeight = 0,
    geekScore = 0,
    castScore = 0,
    age = 0,
    // isLikePressed = false,
  }) {
    this.boardgameKey = boardgameKey;
    this.imageUrl = imageUrl;
    this.nameKor = nameKor;
    this.nameEng = nameEng;
    this.yearPublished = yearPublished;
    this.description = description;
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.minPlaytime = minPlaytime;
    this.maxPlaytime = maxPlaytime;
    this.geekWeight = geekWeight;
    this.geekScore = geekScore;
    this.castScore = castScore;
    this.age = age;
    // this.isLikePressed = isLikePressed;
  }

  getPlayerRange() {
    return this.minPlayers === this.maxPlayers
      ? `${this.minPlayers} 인`
      : `${this.minPlayers}-${this.maxPlayers} 인`;
  }

  getPlaytimeRange() {
    return this.minPlaytime === this.maxPlaytime
      ? `${this.minPlaytime} 분`
      : `${this.minPlaytime}-${this.maxPlaytime} 분`;
  }
}

export const boardgameState = atom({
  key: 'boardgameState',
  default: new BoardGame({}), // 초기값을 빈 BoardGame 인스턴스로 설정
});