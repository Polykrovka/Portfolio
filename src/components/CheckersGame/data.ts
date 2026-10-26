import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

function createInitialState(): Record<string, any> {
  // Initial placement of pieces on the board
  const gameState: Record<string, any> = {};
  let toggle = false;

  for (let j = 1; j <= 8; j++) {
    for (let i = 1; i <= 8; i++) {
      gameState[`${i}${j}`] = { color: `${toggle ? 'white' : 'black'}`, figure: null, isActive: false, canGo: false, canFight: false }
      if (i === 2 ) {
        gameState[`${i}${j}`].figure = 'whitePawn';
        gameState[`${i}${j}`].figureColor = 'white';
      } else if (i === 7) {
        gameState[`${i}${j}`].figure = 'blackPawn';
        gameState[`${i}${j}`].figureColor = 'black';
      } else if (i === 8 && j ===5) {
        gameState[`${i}${j}`].figure = 'blackQueen';
        gameState[`${i}${j}`].figureColor = 'black';
      } else if (i === 1 && j === 5) {
        gameState[`${i}${j}`].figure = 'whiteQueen';
        gameState[`${i}${j}`].figureColor = 'white';
      } else if (i === 8 && j === 4) {
        gameState[`${i}${j}`].figure = 'blackKing';
        gameState[`${i}${j}`].figureColor = 'black';
      } else if (i === 1 && j === 4) {
        gameState[`${i}${j}`].figure = 'whiteKing';
        gameState[`${i}${j}`].figureColor = 'white';
      } else if (i === 8 && (j === 8 || j === 1)) {
        gameState[`${i}${j}`].figure = 'blackCastle';
        gameState[`${i}${j}`].figureColor = 'black';
      } else if (i === 1 && (j === 8 || j === 1)) {
        gameState[`${i}${j}`].figure = 'whiteCastle';
        gameState[`${i}${j}`].figureColor = 'white';
      } else if (i === 8 && (j === 6 || j === 3)) {
        gameState[`${i}${j}`].figure = 'blackOfficer';
        gameState[`${i}${j}`].figureColor = 'black';
      } else if (i === 1 && (j === 6 || j === 3)) {
        gameState[`${i}${j}`].figure = 'whiteOfficer';
        gameState[`${i}${j}`].figureColor = 'white';
      } else if (i === 8 && (j === 7 || j === 2)) {
        gameState[`${i}${j}`].figure = 'blackHorse';
        gameState[`${i}${j}`].figureColor = 'black';
      } else if (i === 1 && (j === 7 || j === 2)) {
        gameState[`${i}${j}`].figure = 'whiteHorse';
        gameState[`${i}${j}`].figureColor = 'white';
      }

      toggle = !toggle;
    }
    toggle = !toggle;
  }

  return gameState;
}

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: createInitialState(),
  reducers: {
    resetGameState() {
      return createInitialState();
    },
    removeCanGo(state) {
      for (const key of Object.keys(state)) {
        state[key].canGo = false;
      }
    },
    clearActive(state) {
      const activeKey = Object.keys(state).find((key) => state[key].isActive);
      if (activeKey) {
        state[activeKey].isActive = false;
      }
    },
    movePiece(state, action: PayloadAction<{ from: string; to: string }>) {
      const { from, to } = action.payload;
      state[to].figure = state[from].figure;
      state[to].figureColor = state[from].figureColor;
      state[from].figure = null;
      state[from].figureColor = null;
    },
    setActive(state, action: PayloadAction<string>) {
      state[action.payload].isActive = true;
    },
    setCanGo(state, action: PayloadAction<string[]>) {
      for (const id of action.payload) {
        state[id].canGo = true;
      }
    },
  },
});

export const { resetGameState, removeCanGo, clearActive, movePiece, setActive, setCanGo } = gameStateSlice.actions;

export const store = configureStore({
  reducer: {
    gameState: gameStateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
