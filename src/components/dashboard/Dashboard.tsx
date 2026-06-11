import type { ReturnCase } from '../../types';
import { STAGE_CONFIG, PRIORITY_CONFIG } from '../../data/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  cases: ReturnCase[];
  onSelectCase: (id: string) => void;
  onNewReturn: () => void;
}

export function Dashboard({ cases, onSelectCase, onNewReturn }: Props) {
  const totalCases = cases.length;
  const activeCases = cases.filter((c) => c.stage !== 'completed' && c.stage !== 'cancelled').length;
  const criticalCases = cases.filter((c) => c.priority === 'critical').length;
  const pendingDecon = cases.filter((c) => c.decontaminationRequired && !c.decontaminationApproved).length;
  const inTransit = cases.filter((c) => c.stage === 'in_transit' || c.stage === 'courier_pickup').length;

  // Stage distribution for pie
  const stageData = Object.entries(
    cases.reduce<Record<string, number>>((acc, c) => {
      acc[c.stage] = (acc[c.stage] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([stage, count]) => ({ name: STAGE_CONFIG[stage]?.label ?? stage, value: count, stage }));

  const PIE_COLORS = ['#3b82f6', '#f97316', '#a855f7', '#06b6d4', '#14b8a6', '#6366f1', '#eab308', '#f59e0b', '#22c55e'];

  // Priority bar data
  const priorityData = [
    { name: 'Low', count: cases.filter((c) => c.priority === 'low').length },
    { name: 'Medium', count: cases.filter((c) => c.priority === 'medium').length },
    { name: 'High', count: cases.filter((c) => c.priority === 'high').length },
    { name: 'Critical', count: cases.filter((c) => c.priority === 'critical').length },
  ];

  const BAR_COLORS = ['#9ca3af', '#3b82f6', '#f97316', '#ef4444'];

  const recentCases = [...cases].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Warranty Returns Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">End-to-end return management · ServiceMax + SAP integrated</p>
        </div>
        <button
          onClick={onNewReturn}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          <span className="text-base">+</span> New Return Case
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Cases', value: totalCases, icon: '📁', color: 'bg-gray-50 border-gray-200', valueColor: 'text-gray-900' },
          { label: 'Active', value: activeCases, icon: '⚡', color: 'bg-blue-50 border-blue-200', valueColor: 'text-blue-700' },
          { label: 'Critical Priority', value: criticalCases, icon: '🚨', color: 'bg-red-50 border-red-200', valueColor: 'text-red-700' },
          { label: 'Pending Decon', value: pendingDecon, icon: '⚗️', color: 'bg-orange-50 border-orange-200', valueColor: 'text-orange-700' },
          { label: 'In Transit', value: inTransit, icon: '🚚', color: 'bg-teal-50 border-teal-200', valueColor: 'text-teal-700' },
        ].map(({ label, value, icon, color, valueColor }) => (
          <div key={label} className={`${color} border rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{icon}</span>
              {label === 'Critical Priority' && value > 0 && (
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Cases by Stage</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={stageData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {stageData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} case(s)`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1.5">
              {stageData.map(({ name, value, stage }, i) => (
                <div key={stage} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-gray-600 flex-1 truncate">{name}</span>
                  <span className="font-semibold text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Cases by Priority</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={priorityData} barSize={32}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {priorityData.map((_, i) => (
                  <Cell key={i} fill={BAR_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Required */}
      {(criticalCases > 0 || pendingDecon > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-amber-800 flex items-center gap-2 mb-3">
            <span>⚠️</span> Action Required
          </h3>
          <div className="space-y-2">
            {cases
              .filter((c) => c.priority === 'critical' || (c.decontaminationRequired && !c.decontaminationApproved))
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100 cursor-pointer hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_CONFIG[c.priority].bgColor} ${PRIORITY_CONFIG[c.priority].color}`}>
                      {PRIORITY_CONFIG[c.priority].label}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{c.caseNumber} · {c.productName}</p>
                      <p className="text-xs text-gray-500">{c.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.decontaminationRequired && !c.decontaminationApproved && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Decon Pending</span>
                    )}
                    <span className="text-gray-400 text-sm">→</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recent Cases Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
          <span className="text-xs text-gray-400">Sorted by last update</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Case</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Decon</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentCases.map((c) => {
                const stage = STAGE_CONFIG[c.stage];
                const priority = PRIORITY_CONFIG[c.priority];
                return (
                  <tr key={c.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => onSelectCase(c.id)}>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-gray-900">{c.caseNumber}</p>
                      <p className="text-xs text-gray-400">{new Date(c.updatedAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-gray-700">{c.productName}</p>
                      <p className="text-xs text-gray-400">{c.serialNumber}</p>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{c.customerName}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${stage.bgColor} ${stage.color}`}>
                        {stage.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${priority.bgColor} ${priority.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                        {priority.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {!c.decontaminationRequired ? (
                        <span className="text-xs text-gray-400">N/A</span>
                      ) : c.decontaminationApproved ? (
                        <span className="text-xs text-green-600 font-medium">✓ Cleared</span>
                      ) : (
                        <span className="text-xs text-orange-600 font-medium animate-pulse">⚠ Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 text-right">→</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
