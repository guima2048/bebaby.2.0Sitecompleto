export default function InputExemplo({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="px-3 py-2 rounded border border-[#a259cb] focus:outline-none focus:ring-2 focus:ring-[#a259cb]" />
  );
} 