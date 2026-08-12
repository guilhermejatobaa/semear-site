import unidades from "@/content/unidades.json";

export type Unidade = (typeof unidades)[number];

const RAIO_TERRA_KM = 6371;

export function distanciaKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RAIO_TERRA_KM * c;
}

export function unidadeMaisProxima(
  lat: number,
  lng: number
): { unidade: Unidade; distanciaKm: number } {
  let melhor: { unidade: Unidade; distanciaKm: number } | null = null;

  for (const unidade of unidades) {
    const d = distanciaKm(lat, lng, unidade.lat, unidade.lng);
    if (!melhor || d < melhor.distanciaKm) {
      melhor = { unidade, distanciaKm: d };
    }
  }

  return melhor!;
}
