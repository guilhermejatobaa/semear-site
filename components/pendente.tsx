export function Pendente({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-dourado/10 border border-dashed border-mata px-3 py-1.5 text-sm uppercase tracking-wide text-mata">
      {children}
    </span>
  );
}
