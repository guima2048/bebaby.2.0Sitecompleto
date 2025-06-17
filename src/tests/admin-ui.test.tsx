import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as nextRouter from 'next/navigation';
import AdminLoginPage from '@/app/admin/login/page';
import Admin2FAPage from '@/app/admin/2fa/page';
import AdminDashboardPage from '@/app/admin/dashboard/page';

vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
    }),
  }
});

describe('Admin UI Components', () => {
  beforeEach(() => {
    // Resetar mocks antes de cada teste
    vi.clearAllMocks();
    
    // Mock do fetch para simular respostas da API
    global.fetch = vi.fn();
  });

  describe('Login Page', () => {
    it('should render login form correctly', () => {
      render(<AdminLoginPage />);
      
      // Verificar elementos principais
      expect(screen.getByText('Área Administrativa')).toBeInTheDocument();
      expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
      expect(screen.getByLabelText('Senha')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
    });

    it('should show error message for invalid credentials', async () => {
      // Mock da resposta da API para credenciais inválidas
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'E-mail ou senha inválidos' })
      });

      render(<AdminLoginPage />);
      
      // Preencher formulário com credenciais inválidas
      fireEvent.change(screen.getByLabelText('E-mail'), {
        target: { value: 'wrong@example.com' }
      });
      fireEvent.change(screen.getByLabelText('Senha'), {
        target: { value: 'wrongpass' }
      });
      
      // Submeter formulário
      fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
      
      // Verificar mensagem de erro
      await waitFor(() => {
        expect(screen.getByText('E-mail ou senha inválidos')).toBeInTheDocument();
      });
    });

    it('should redirect to 2FA page on successful login', async () => {
      // Mock da resposta da API para login bem-sucedido
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ tempToken: 'temp-token' }),
      });

      render(<AdminLoginPage />);
      
      // Preencher formulário com credenciais válidas
      fireEvent.change(screen.getByLabelText('E-mail'), {
        target: { value: 'admin@exemplo.com' }
      });
      fireEvent.change(screen.getByLabelText('Senha'), {
        target: { value: 'Senha123' }
      });
      
      // Submeter formulário
      fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
      
      // Verificar redirecionamento
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'admin@exemplo.com',
            password: 'Senha123'
          })
        });
      });
    });
  });

  describe('2FA Page', () => {
    it('should render 2FA form correctly', () => {
      render(<Admin2FAPage />);
      
      // Verificar elementos principais
      expect(screen.getByText('Verificação em Duas Etapas')).toBeInTheDocument();
      expect(screen.getByLabelText('Código de Verificação')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Verificar' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reenviar código' })).toBeInTheDocument();
    });

    it('should only accept numeric input in code field', () => {
      render(<Admin2FAPage />);
      
      const codeInput = screen.getByLabelText('Código de Verificação');
      
      // Tentar inserir letras
      fireEvent.change(codeInput, { target: { value: 'abc123' } });
      expect(codeInput).toHaveValue('123');
      
      // Tentar inserir mais de 6 dígitos
      fireEvent.change(codeInput, { target: { value: '1234567' } });
      expect(codeInput).toHaveValue('123456');
    });

    it('should redirect to dashboard on successful verification', async () => {
      // Mock da resposta da API para verificação bem-sucedida
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: 'jwt-token' }),
      });

      render(<Admin2FAPage />);
      
      // Preencher código válido
      fireEvent.change(screen.getByLabelText('Código de Verificação'), {
        target: { value: '123456' }
      });
      
      // Submeter formulário
      fireEvent.click(screen.getByRole('button', { name: 'Verificar' }));
      
      // Verificar redirecionamento
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: '123456'
          })
        });
      });
    });
  });

  describe('Dashboard Page', () => {
    it('should render dashboard correctly', () => {
      render(<AdminDashboardPage />);
      
      // Verificar elementos principais
      expect(screen.getByText('Acesso Liberado!')).toBeInTheDocument();
      expect(screen.getByText(/Você está autenticado como administrador/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
    });

    it('should handle logout correctly', async () => {
      // Mock da resposta da API para logout
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
      });

      render(<AdminDashboardPage />);
      
      // Clicar no botão de logout
      fireEvent.click(screen.getByRole('button', { name: 'Logout' }));
      
      // Verificar redirecionamento
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/logout', {
          method: 'POST',
        });
      });
    });
  });
}); 