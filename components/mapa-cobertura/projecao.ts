// Projeção equirretangular simples, suficiente para posicionar pontos num
// SVG estilizado do Nordeste — não é uma projeção cartográfica de precisão.
const LAT_MIN = -18;
const LAT_MAX = 0;
const LNG_MIN = -48.5;
const LNG_MAX = -34;

export const VIEWBOX_W = 600;
export const VIEWBOX_H = 620;
const PAD = 40;

export function projetar(lat: number, lng: number): { x: number; y: number } {
  const x =
    PAD + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (VIEWBOX_W - PAD * 2);
  const y =
    PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (VIEWBOX_H - PAD * 2);
  return { x, y };
}
