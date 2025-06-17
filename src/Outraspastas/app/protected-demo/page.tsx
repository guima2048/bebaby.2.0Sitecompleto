import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import SeoHead from "../components/SeoHead";

export default function ProtectedDemo() {
  const { logout } = useAuth();
  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#18122B] text-white font-sans">
        <SeoHead title="Demo Rota Protegida" description="Demonstração de proteção de rota com autenticação fake." />
        <h1 className="text-2xl font-bold mb-4">Acesso permitido!</h1>
        <p className="mb-8">Você está autenticado e pode ver esta página protegida.</p>
        <button onClick={logout} className="px-4 py-2 rounded bg-[#a259cb]">Logout</button>
      </main>
    </ProtectedRoute>
  );
} 