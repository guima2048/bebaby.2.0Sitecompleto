'use client';

import { useState, useMemo } from 'react';
import { roadmapItems as initialRoadmapItems } from '../../data/roadmap';
import { RoadmapItem, RoadmapStatus } from '../../types/roadmap';
import { DateClient } from './DateClient';

const categoryLabels: Record<string, string> = {
  auth: 'Autenticação e Segurança',
  user: 'Perfil e Usuários',
  chat: 'Chat e Comunicação',
  admin: 'Admin e Moderação',
  payment: 'Pagamentos e Planos',
  performance: 'Performance e Cache',
  content: 'Conteúdo e SEO',
  security: 'Segurança',
};

export default function RoadmapPage() {
  const [items, setItems] = useState<RoadmapItem[]>(initialRoadmapItems);

  // Ordenar por categoria e título
  const grouped = useMemo(() => {
    const cats: Record<string, RoadmapItem[]> = {};
    items.forEach((item) => {
      if (!cats[item.category]) cats[item.category] = [];
      cats[item.category].push(item);
    });
    Object.keys(cats).forEach((cat) => {
      cats[cat].sort((a, b) => a.title.localeCompare(b.title));
    });
    return cats;
  }, [items]);

  const total = items.length;
  const approved = items.filter(i => i.status === 'approved').length;
  const progress = Math.round((approved / total) * 100);

  // Aprovar/desaprovar subtarefa
  const handleSubtaskToggle = (itemId: string, subtaskId: string) => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      const subtasks = item.subtasks || [];
      const newSubtasks = subtasks.map(st => {
        if (st.id !== subtaskId) return st;
        if (st.status === 'approved') {
          return { ...st, status: 'pending' as RoadmapStatus, approvedAt: undefined, approvedBy: undefined };
        }
        return { ...st, status: 'approved' as RoadmapStatus, approvedAt: new Date().toISOString(), approvedBy: 'admin' };
      });
      // Atualiza status do item se todas subtarefas aprovadas
      const allApproved = newSubtasks.length > 0 && newSubtasks.every(st => st.status === 'approved');
      return {
        ...item,
        subtasks: newSubtasks,
        status: allApproved ? 'approved' as RoadmapStatus : 'pending' as RoadmapStatus,
        approvedAt: allApproved ? new Date().toISOString() : undefined,
        approvedBy: allApproved ? 'admin' : undefined,
      };
    }));
  };

  let itemNumber = 1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Roadmap de Desenvolvimento</h1>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-blue-700">Progresso geral</span>
          <span className="text-sm font-medium text-blue-700">{approved}/{total} etapas</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      {Object.entries(grouped).map(([cat, catItems]) => (
        <div key={cat} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-800 border-b pb-1">{categoryLabels[cat] || cat}</h2>
          <div className="space-y-4">
            {catItems.map((item) => {
              // Progresso por item
              const subtasks = item.subtasks || [];
              const totalSub = subtasks.length;
              const approvedSub = subtasks.filter(st => st.status === 'approved').length;
              const itemProgress = totalSub ? Math.round((approvedSub / totalSub) * 100) : 0;
              return (
                <div
                  key={item.id}
                  className={`relative p-5 rounded-lg border shadow-sm transition-all duration-300 ${
                    item.status === 'approved'
                      ? 'bg-green-50 border-green-300 opacity-80'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-500">{itemNumber++}.</span>
                    <span className="text-lg font-semibold">{item.title}</span>
                    {item.status === 'approved' && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-100 text-green-800 flex items-center gap-1">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#22c55e" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                        Aprovado
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
                      {categoryLabels[item.category] || item.category}
                    </span>
                  </div>
                  {/* Barra de progresso por item */}
                  {totalSub > 0 && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Progresso deste item</span>
                        <span className="text-xs text-gray-600">{approvedSub}/{totalSub} ({itemProgress}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${itemProgress}%` }}></div>
                      </div>
                    </div>
                  )}
                  {/* Subtarefas detalhadas */}
                  {totalSub > 0 && (
                    <ol className="list-decimal ml-6 space-y-2">
                      {subtasks.map((st, idx) => (
                        <li key={st.id} className="flex items-center gap-2">
                          <button
                            onClick={() => handleSubtaskToggle(item.id, st.id)}
                            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none mr-2 ${
                              st.status === 'approved'
                                ? 'bg-green-500 border-green-600 text-white'
                                : 'bg-white border-gray-300 text-gray-400 hover:bg-gray-100'
                            }`}
                            aria-label={st.status === 'approved' ? 'Desaprovar' : 'Aprovar'}
                          >
                            {st.status === 'approved' ? (
                              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                            ) : (
                              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" stroke="#888" strokeWidth="2"/></svg>
                            )}
                          </button>
                          <span className={st.status === 'approved' ? 'line-through text-green-700' : ''}>{st.title}</span>
                          {st.status === 'approved' && st.approvedAt && (
                            <span className="ml-2 text-xs text-gray-400">(<DateClient date={st.approvedAt} />)</span>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                  {/* Aviso de pronto para testar */}
                  {itemProgress === 100 && totalSub > 0 && (
                    <div className="mt-3 px-3 py-2 rounded bg-blue-100 text-blue-800 text-sm font-semibold flex items-center gap-2">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#2563eb" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      Pronto para testar!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
} 