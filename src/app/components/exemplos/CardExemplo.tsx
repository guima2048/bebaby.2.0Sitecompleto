export default function CardExemplo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl shadow-lg bg-white/10 text-white max-w-xs mx-auto">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
} 