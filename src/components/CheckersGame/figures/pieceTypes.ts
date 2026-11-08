export type PieceColor = 'white' | 'black';

export type PieceClickEvent = {
  target: {
    id: string;
    className: string;
    parentElement: { id: string };
  };
};
