
export interface GridProps {
  cols: number | string;
  gtc?: string;
  justifyContent?: "space-around"|"space-between"|"space-evenly"|"center"|"flex-start"|"flex-end";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  space?: number|string;
  children?: React.ReactNode;
  w?: string;
  h?: string;
  rh?: number; // row height

  flex?: number | string;

  m?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;

  p?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
};
