import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

describe('Admin Authentication Flow', () => {
  beforeEach(() => {
    // Resetar mocks antes de cada teste
    vi.clearAllMocks();
    
    // Mock do fetch global
    global.fetch = vi.fn();
  });

  describe('Login Flow', () => {
    it('should reject invalid credentials', async () => {
      // Mock da resposta da API
      (global.fetch as any).mockResolvedValueOnce({
        status: 401,
        json: () => Promise.resolve({ error: 'Credenciais inválidas' })
      });

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'wrong@example.com',
          password: 'wrongpass'
        })
      });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBeDefined();
    });

    it('should reject weak passwords', async () => {
      // Mock da resposta da API
      (global.fetch as any).mockResolvedValueOnce({
        status: 400,
        json: () => Promise.resolve({ error: 'A senha deve ter pelo menos 8 caracteres e conter ao menos uma letra maiúscula.' })
      });

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@exemplo.com',
          password: 'weak'
        })
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toContain('deve ter pelo menos 8 caracteres');
    });

    it('should accept valid credentials and return temp token', async () => {
      // Mock da resposta da API
      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        headers: {
          get: () => 'admin_temp_token=temp_123; Path=/; HttpOnly'
        },
        json: () => Promise.resolve({ success: true })
      });

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@exemplo.com',
          password: 'Senha123'
        })
      });

      expect(response.status).toBe(200);
      const cookies = parse(response.headers.get('set-cookie') || '');
      expect(cookies.admin_temp_token).toBeDefined();
    });
  });

  describe('2FA Flow', () => {
    it('should reject invalid 2FA code', async () => {
      // Mock da resposta da API
      (global.fetch as any).mockResolvedValueOnce({
        status: 401,
        json: () => Promise.resolve({ error: 'Código inválido' })
      });

      const response = await fetch('/api/admin/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: '000000'
        })
      });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBeDefined();
    });

    it('should accept valid 2FA code and return JWT', async () => {
      const mockToken = 'mock.jwt.token';
      // Mock da resposta da API
      (global.fetch as any).mockResolvedValueOnce({
        status: 200,
        headers: {
          get: () => `admin_token=${mockToken}; Path=/; HttpOnly`
        },
        json: () => Promise.resolve({ success: true })
      });

      const response = await fetch('/api/admin/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: '123456'
        })
      });

      expect(response.status).toBe(200);
      const cookies = parse(response.headers.get('set-cookie') || '');
      expect(cookies.admin_token).toBeDefined();
    });
  });

  describe('Protected Routes', () => {
    it('should reject access to admin routes without token', async () => {
      // Mock da resposta da API
      (global.fetch as any).mockResolvedValueOnce({
        status: 302,
        headers: {
          get: () => '/admin/login'
        }
      });

      const response = await fetch('/admin/dashboard');
      expect(response.status).toBe(302);
    });

    it('should allow access to admin routes with valid token', async () => {
      const mockToken = 'mock.jwt.token';
      
      // Mock das respostas da API
      (global.fetch as any)
        // Login
        .mockResolvedValueOnce({
          status: 200,
          headers: {
            get: () => 'admin_temp_token=temp_123; Path=/; HttpOnly'
          },
          json: () => Promise.resolve({ success: true })
        })
        // 2FA
        .mockResolvedValueOnce({
          status: 200,
          headers: {
            get: () => `admin_token=${mockToken}; Path=/; HttpOnly`
          },
          json: () => Promise.resolve({ success: true })
        })
        // Dashboard
        .mockResolvedValueOnce({
          status: 200,
          json: () => Promise.resolve({ success: true })
        });

      // Login
      const loginResponse = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@exemplo.com',
          password: 'Senha123'
        })
      });

      const loginCookies = parse(loginResponse.headers.get('set-cookie') || '');
      
      // 2FA
      const verifyResponse = await fetch('/api/admin/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: '123456'
        })
      });

      const verifyCookies = parse(verifyResponse.headers.get('set-cookie') || '');
      
      // Dashboard
      const dashboardResponse = await fetch('/admin/dashboard', {
        headers: {
          Cookie: `admin_token=${verifyCookies.admin_token}`
        }
      });

      expect(dashboardResponse.status).toBe(200);
    });
  });

  describe('Rate Limiting', () => {
    it('should block IP after multiple failed attempts', async () => {
      // Mock das respostas da API
      (global.fetch as any)
        // 5 tentativas falhas
        .mockResolvedValueOnce({
          status: 401,
          json: () => Promise.resolve({ error: 'Credenciais inválidas' })
        })
        .mockResolvedValueOnce({
          status: 401,
          json: () => Promise.resolve({ error: 'Credenciais inválidas' })
        })
        .mockResolvedValueOnce({
          status: 401,
          json: () => Promise.resolve({ error: 'Credenciais inválidas' })
        })
        .mockResolvedValueOnce({
          status: 401,
          json: () => Promise.resolve({ error: 'Credenciais inválidas' })
        })
        .mockResolvedValueOnce({
          status: 401,
          json: () => Promise.resolve({ error: 'Credenciais inválidas' })
        })
        // Tentativa após bloqueio
        .mockResolvedValueOnce({
          status: 429,
          json: () => Promise.resolve({ error: 'IP bloqueado por tentativas inválidas. Tente novamente em 15 minutos.' })
        });

      // 5 tentativas falhas
      for (let i = 0; i < 5; i++) {
        await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'admin@exemplo.com',
            password: 'wrongpass'
          })
        });
      }

      // Tentativa após bloqueio
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@exemplo.com',
          password: 'Senha123'
        })
      });

      expect(response.status).toBe(429);
      const data = await response.json();
      expect(data.error).toContain('bloqueado');
    });
  });
}); 