import { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // Pode logar o erro
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center text-red-600 font-bold">Ocorreu um erro inesperado.</div>;
    }
    return this.props.children;
  }
} 