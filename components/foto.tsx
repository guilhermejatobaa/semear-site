import Image from "next/image";

/**
 * Foto real, preenchendo o espaço do contêiner (que define altura e largura).
 * Substitui o PendenteFoto quando a imagem existe em public/fotos/.
 * `foco` ajusta o enquadramento quando o recorte do espaço corta o assunto.
 */
export function Foto({
  src,
  alt,
  sizes,
  foco = "center",
  prioridade = false,
  className = "",
}: {
  src: string;
  alt: string;
  /** Largura ocupada na tela, para o next/image escolher o arquivo certo. */
  sizes: string;
  foco?: string;
  prioridade?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-mata-fundo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={prioridade}
        className="object-cover"
        style={{ objectPosition: foco }}
      />
    </div>
  );
}
