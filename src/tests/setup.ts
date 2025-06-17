import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';

// Mock do fetch global
global.fetch = vi.fn();

// Mock do useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Mock do cookies
vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
}));

// Limpar mocks após cada teste
afterEach(() => {
  vi.clearAllMocks();
}); 