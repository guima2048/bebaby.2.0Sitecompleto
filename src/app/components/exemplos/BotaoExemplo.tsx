export default function BotaoExemplo({ children, onClick, type = "button" }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button type={type} onClick={onClick} className="px-4 py-2 rounded bg-[#a259cb] text-white font-semibold shadow hover:brightness-110 transition">
      {children}
    </button>
  );
} 