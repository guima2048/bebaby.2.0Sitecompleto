"use client";
import { useRouter } from 'next/navigation';

export default function AprovarPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h1 style={{ fontSize: 32, color: '#2563eb', marginBottom: 16 }}>Página de Aprovação</h1>
      <p style={{ fontSize: 18 }}>Você está autenticado e visualizando a rota protegida <b>/admin/aprovar/</b>.</p>
      <button onClick={handleLogout} style={{ marginTop: 32, padding: '12px 32px', fontSize: 18, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
} 