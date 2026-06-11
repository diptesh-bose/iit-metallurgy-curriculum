import { useState } from 'react';
import type { ReturnCase } from '../types';
import { STAGE_CONFIG, PRIORITY_CONFIG } from '../data/mockData';

interface Props {
  cases: ReturnCase[];
  onSelectCase: (id: string) => void;
  onNewReturn: () => void;
}

export function ReturnsList({ cases, onSelectCase, onNewReturn }: Props) {
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [sortBy, setSortBy] = useState<'updatedAt' | 'priority' | 'stage'>('updatedAt');

  const PRIORITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

  const filtered = cases
    .filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.caseNumber.toLowerCase().includes(q) && !c.customerName.toLowerCase().includes(q) && !c.productName.toLowerCase().includes(q) && !c.serialNumber.toLowerCase().includes(q)) return false;
      if (filterStage && c.stage !== filterStage) return false;
      if (filterPriority && c.priority !== filterPriority) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'updatedAt') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortBy === 'priority') return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      return a.stage.localeCompare(b.stage);
    });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Return Cases</h1>
          <p className="text-sm text-gray-500 mt-0.5">{cases.length} total · {cases.filter((c) => c.stage !== 'completed').length} active</p>
        </div>
        <button
          onClick={onNewReturn}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          + New Return Case
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
        <input
          type="text"
          placeholder="Search by case #, customer, product, serial..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Stages</option>
          {Object.entries(STAGE_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Priorities</option>
          {Object.entries(PRIORITY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="updatedAt">Sort: Recent</option>
          <option value="priority">Sort: Priority</option>
          <option value="stage">Sort: Stage</option>
        </select>
        <span className="text-xs text-gray-400">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-3xl mb-3">🔍</p>
          <p className="text-gray-500 font-medium">No cases match your filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const stage = STAGE_CONFIG[c.stage];
            const priority = PRIORITY_CONFIG[c.priority];
            return (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-blue-300 hover:shadow-md cursor-pointer transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{c.caseNumber}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stage.bgColor} ${stage.color}`}>{stage.label}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priority.bgColor} ${priority.color}`}>{priority.label}</span>
                      {c.decontaminationRequired && !c.decontaminationApproved && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 animate-pulse">⚗️ Decon</span>
                      )}
                    </div>
                    <p className="text-base font-medium text-gray-800 mt-1.5">{c.productName}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                      <span>🏢 {c.customerName}</span>
                      <span>·</span>
                      <span>SN: {c.serialNumber}</span>
                      <span>·</span>
                      <span>{c.returnReason}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right">
                    <p className="text-xs text-gray-400">{new Date(c.updatedAt).toLocaleDateString()}</p>
                    <div className="flex gap-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded ${c.sapRecord?.status === 'synced' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>SAP</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${c.serviceMaxRecord?.status === 'synced' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>SMAX</span>
                    </div>
                    {c.courierAssignment && (
                      <span className="text-xs text-teal-600 font-medium">🚚 {c.courierAssignment.provider} {c.courierAssignment.trackingNumber.slice(0, 14)}…</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
