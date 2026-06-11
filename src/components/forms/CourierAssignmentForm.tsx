import { useState } from 'react';
import type { ReturnCase, CourierAssignment, CourierProvider } from '../../types';

interface Props {
  returnCase: ReturnCase;
  onSubmit: (caseId: string, assignment: CourierAssignment) => void;
  onCancel: () => void;
}

const COURIERS: { id: CourierProvider; name: string; icon: string; color: string }[] = [
  { id: 'DHL', name: 'DHL Express', icon: '🟡', color: 'border-yellow-400 bg-yellow-50' },
  { id: 'XPO', name: 'XPO Logistics', icon: '🔵', color: 'border-blue-400 bg-blue-50' },
  { id: 'FedEx', name: 'FedEx', icon: '🟣', color: 'border-purple-400 bg-purple-50' },
  { id: 'UPS', name: 'UPS', icon: '🟤', color: 'border-amber-600 bg-amber-50' },
];

function generateTracking(provider: CourierProvider) {
  const n = Math.floor(Math.random() * 9_000_000_000 + 1_000_000_000);
  return `${provider}-${n}`;
}

export function CourierAssignmentForm({ returnCase, onSubmit, onCancel }: Props) {
  const [provider, setProvider] = useState<CourierProvider | ''>('');
  const [form, setForm] = useState({
    estimatedPickup: '',
    estimatedDelivery: '',
    specialInstructions: '',
    contactName: '',
    contactPhone: '',
    assignedBy: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!provider) return;
    const assignment: CourierAssignment = {
      provider: provider as CourierProvider,
      trackingNumber: generateTracking(provider as CourierProvider),
      assignedAt: new Date().toISOString(),
      assignedBy: form.assignedBy,
      estimatedPickup: form.estimatedPickup,
      estimatedDelivery: form.estimatedDelivery,
      specialInstructions: form.specialInstructions,
      contactName: form.contactName,
      contactPhone: form.contactPhone,
    };
    onSubmit(returnCase.id, assignment);
    setSubmitted(true);
  }

  const up = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">🚚</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Courier Assigned</h2>
        <p className="text-gray-500">Pickup scheduled. Tracking information will update automatically.</p>
        <button onClick={onCancel} className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Return to Case
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Courier Assignment</h2>
        <p className="text-sm text-gray-500 mt-1">Schedule pickup from customer site for {returnCase.caseNumber}</p>
      </div>

      {/* Case reference */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><p className="text-xs text-gray-400 font-medium uppercase">Pickup From</p><p className="font-semibold">{returnCase.customerName}</p></div>
          <div><p className="text-xs text-gray-400 font-medium uppercase">Address</p><p className="font-semibold text-xs">{returnCase.pickupAddress.city}, {returnCase.pickupAddress.state}</p></div>
          <div><p className="text-xs text-gray-400 font-medium uppercase">Product</p><p className="font-semibold">{returnCase.productModel}</p></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Courier selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Select Courier Provider</h3>
          <div className="grid grid-cols-2 gap-3">
            {COURIERS.map((c) => (
              <label key={c.id} className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all
                ${provider === c.id ? c.color + ' border-opacity-100' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                <input type="radio" name="courier" value={c.id} checked={provider === c.id} onChange={() => setProvider(c.id)} className="sr-only" />
                <span className="text-2xl">{c.icon}</span>
                <span className="font-semibold text-gray-800">{c.name}</span>
                {provider === c.id && <span className="ml-auto text-sm">✓</span>}
              </label>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Schedule</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Estimated Pickup Date/Time <span className="text-red-500">*</span></label>
              <input type="datetime-local" className={inputClass} value={form.estimatedPickup} onChange={(e) => up('estimatedPickup', e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Estimated Delivery Date/Time <span className="text-red-500">*</span></label>
              <input type="datetime-local" className={inputClass} value={form.estimatedDelivery} onChange={(e) => up('estimatedDelivery', e.target.value)} required />
            </div>
          </div>
        </div>

        {/* Contact & Instructions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">On-Site Contact & Instructions</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Site Contact Name</label>
                <input className={inputClass} value={form.contactName} onChange={(e) => up('contactName', e.target.value)} placeholder="Person to meet courier" />
              </div>
              <div>
                <label className={labelClass}>Contact Phone</label>
                <input className={inputClass} value={form.contactPhone} onChange={(e) => up('contactPhone', e.target.value)} placeholder="+1-555-0000" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Special Handling Instructions</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                value={form.specialInstructions}
                onChange={(e) => up('specialInstructions', e.target.value)}
                placeholder="Fragile, hazmat, temperature sensitive, keep upright..."
              />
            </div>
            <div>
              <label className={labelClass}>Assigned By</label>
              <input className={inputClass} value={form.assignedBy} onChange={(e) => up('assignedBy', e.target.value)} placeholder="Your name (Customer Care)" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pb-8">
          <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700 font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!provider || !form.estimatedPickup || !form.estimatedDelivery}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            Assign Courier & Schedule Pickup 🚚
          </button>
        </div>
      </form>
    </div>
  );
}
