export function Pendente({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-ferrugem/10 border border-dashed border-ferrugem px-3 py-1.5 text-sm uppercase tracking-wide text-ferrugem">
      {children}
    </span>
  );
}
