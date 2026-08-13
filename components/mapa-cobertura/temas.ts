export type NomeTema = "mata" | "osso" | "ousado";

export type Tema = {
  mar: string;
  terra: string;
  vizinho: string;
  traco: string;
  uf: string;
  ponto: string;
  ativo: string;
  rotulo: string;
  halo: string;
  onda: boolean;
};

// Paleta afinada para legibilidade cartográfica — deliberadamente
// diferente dos tokens de UI (--mata, --cana, --dourado): o mar precisa
// contrastar com terra/vizinho, o que os tokens de página não garantem.
export const TEMAS: Record<NomeTema, Tema> = {
  mata: {
    mar: "#082B1A",
    terra: "#11492C",
    vizinho: "#0B3D24",
    traco: "rgba(243,248,236,.20)",
    uf: "rgba(243,248,236,.38)",
    ponto: "#73C82C",
    ativo: "#F9A70D",
    rotulo: "#F3F8EC",
    halo: "rgba(115,200,44,.18)",
    onda: false,
  },
  osso: {
    mar: "#F3F8EC",
    terra: "#E3EFD3",
    vizinho: "#EDF4E2",
    traco: "rgba(11,61,36,.28)",
    uf: "rgba(66,81,63,.55)",
    ponto: "#0B3D24",
    ativo: "#F9A70D",
    rotulo: "#0B3D24",
    halo: "rgba(11,61,36,.10)",
    onda: false,
  },
  ousado: {
    mar: "#0B3D24",
    terra: "#0F5330",
    vizinho: "#0A3520",
    traco: "rgba(115,200,44,.45)",
    uf: "rgba(115,200,44,.5)",
    ponto: "#73C82C",
    ativo: "#F9A70D",
    rotulo: "#F3F8EC",
    halo: "rgba(249,167,13,.14)",
    onda: true,
  },
};

export const UFS_ROTULO = [
  { s: "MARANHÃO", lat: -5.0, lng: -45.3 },
  { s: "CEARÁ", lat: -5.1, lng: -39.4 },
  { s: "R. G. DO NORTE", lat: -5.9, lng: -36.4 },
  { s: "PARAÍBA", lat: -7.3, lng: -36.5 },
  { s: "PERNAMBUCO", lat: -8.5, lng: -37.8 },
  { s: "ALAGOAS", lat: -9.25, lng: -36.3 },
  { s: "SERGIPE", lat: -10.55, lng: -38.05 },
  { s: "BAHIA", lat: -12.6, lng: -41.6 },
  { s: "PIAUÍ", lat: -7.6, lng: -42.9 },
];
