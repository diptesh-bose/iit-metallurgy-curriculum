import { useState } from 'react';
import type { ReturnCase, Priority } from '../../types';

interface Props {
  onSubmit: (newCase: ReturnCase) => void;
  onCancel: () => void;
}

function generateId() {
  return `RC-${String(Date.now()).slice(-5)}`;
}

function generateCaseNumber() {
  const n = Math.floor(Math.random() * 900 + 100);
  return `WR-2024-0${n}`;
}

export function NewReturnForm({ onSubmit, onCancel }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // Product
    productName: '',
    productModel: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: '',
    // Customer
    customerName: '',
    customerId: '',
    customerEmail: '',
    customerPhone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    // Return
    returnReason: '',
    faultDescription: '',
    requestedResolution: 'repair' as 'repair' | 'replace' | 'refund',
    priority: 'medium' as Priority,
    assignedServiceTeam: '',
    decontaminationRequired: true,
  });

  const up = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit() {
    const now = new Date().toISOString();
    const id = generateId();
    const caseNumber = generateCaseNumber();
    const newCase: ReturnCase = {
      id,
      caseNumber,
      createdAt: now,
      updatedAt: now,
      priority: form.priority,
      stage: 'initiation',
      productName: form.productName,
      productModel: form.productModel,
      serialNumber: form.serialNumber,
      purchaseDate: form.purchaseDate,
      warrantyExpiry: form.warrantyExpiry,
      customerId: form.customerId || `CUST-${Math.floor(Math.random() * 9000 + 1000)}`,
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      pickupAddress: { street: form.street, city: form.city, state: form.state, country: form.country, zip: form.zip },
      returnReason: form.returnReason,
      faultDescription: form.faultDescription,
      requestedResolution: form.requestedResolution,
      assignedServiceTeam: form.assignedServiceTeam,
      assignedCustomerCare: '',
      decontaminationRequired: form.decontaminationRequired,
      decontaminationApproved: false,
      decontaminationForm: null,
      courierAssignment: null,
      sapRecord: {
        salesOrderNumber: '',
        materialCode: '',
        plantCode: '',
        storageLocation: '',
        returnOrderNumber: '',
        creditMemoNumber: '',
        syncedAt: '',
        status: 'pending',
      },
      serviceMaxRecord: {
        caseNumber: `SMAX-2024-${Math.floor(Math.random() * 90000 + 10000)}`,
        workOrderNumber: '',
        assetId: `ASSET-${form.serialNumber}`,
        contractNumber: '',
        syncedAt: now,
        status: 'synced',
      },
      timeline: [
        {
          id: 't1',
          timestamp: now,
          stage: 'initiation',
          actor: form.assignedServiceTeam || 'System',
          role: 'service_team',
          action: 'Return case created',
          notes: `New warranty return initiated for ${form.productName}.`,
        },
      ],
    };
    onSubmit(newCase);
  }

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  const steps = ['Product & Warranty', 'Customer & Address', 'Return Details'];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">New Warranty Return Case</h2>
        <p className="text-sm text-gray-500 mt-1">Creates case in ServiceMax and syncs to SAP</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 ${i + 1 === step ? 'text-blue-700' : i + 1 < step ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                ${i + 1 === step ? 'bg-blue-600 border-blue-600 text-white' : i + 1 < step ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span className="text-xs font-semibold hidden sm:block">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i + 1 < step ? 'bg-green-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Product & Warranty Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Product Name <span className="text-red-500">*</span></label>
                <input className={inputClass} value={form.productName} onChange={(e) => up('productName', e.target.value)} placeholder="e.g. Industrial Compressor Unit" required />
              </div>
              <div>
                <label className={labelClass}>Model Number <span className="text-red-500">*</span></label>
                <input className={inputClass} value={form.productModel} onChange={(e) => up('productModel', e.target.value)} placeholder="e.g. ICU-3500X" required />
              </div>
              <div>
                <label className={labelClass}>Serial Number <span className="text-red-500">*</span></label>
                <input className={inputClass} value={form.serialNumber} onChange={(e) => up('serialNumber', e.target.value)} placeholder="e.g. SN-ICU-884721" required />
              </div>
              <div>
                <label className={labelClass}>Priority</label>
                <select className={inputClass} value={form.priority} onChange={(e) => up('priority', e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Purchase Date</label>
                <input type="date" className={inputClass} value={form.purchaseDate} onChange={(e) => up('purchaseDate', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Warranty Expiry</label>
                <input type="date" className={inputClass} value={form.warrantyExpiry} onChange={(e) => up('warrantyExpiry', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Assigned Service Technician</label>
              <input className={inputClass} value={form.assignedServiceTeam} onChange={(e) => up('assignedServiceTeam', e.target.value)} placeholder="Technician name" />
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200 mt-2">
              <input type="checkbox" checked={form.decontaminationRequired} onChange={(e) => up('decontaminationRequired', e.target.checked)} className="w-4 h-4 accent-orange-500" id="decon" />
              <label htmlFor="decon" className="text-sm font-medium text-orange-800 cursor-pointer">
                Decontamination required before shipment ⚗️
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Customer & Pickup Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Customer Name <span className="text-red-500">*</span></label>
                <input className={inputClass} value={form.customerName} onChange={(e) => up('customerName', e.target.value)} placeholder="Company or individual name" required />
              </div>
              <div>
                <label className={labelClass}>Customer ID</label>
                <input className={inputClass} value={form.customerId} onChange={(e) => up('customerId', e.target.value)} placeholder="SAP Customer ID" />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" className={inputClass} value={form.customerEmail} onChange={(e) => up('customerEmail', e.target.value)} placeholder="customer@company.com" />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input className={inputClass} value={form.customerPhone} onChange={(e) => up('customerPhone', e.target.value)} placeholder="+1-555-0000" />
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Pickup Address</p>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Street Address</label>
                  <input className={inputClass} value={form.street} onChange={(e) => up('street', e.target.value)} placeholder="123 Industrial Blvd" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className={labelClass}>City</label>
                    <input className={inputClass} value={form.city} onChange={(e) => up('city', e.target.value)} placeholder="City" />
                  </div>
                  <div>
                    <label className={labelClass}>State / Province</label>
                    <input className={inputClass} value={form.state} onChange={(e) => up('state', e.target.value)} placeholder="State" />
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <input className={inputClass} value={form.country} onChange={(e) => up('country', e.target.value)} placeholder="USA" />
                  </div>
                  <div>
                    <label className={labelClass}>ZIP / Postal</label>
                    <input className={inputClass} value={form.zip} onChange={(e) => up('zip', e.target.value)} placeholder="10001" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 mb-4">Return Details</h3>
            <div>
              <label className={labelClass}>Return Reason <span className="text-red-500">*</span></label>
              <select className={inputClass} value={form.returnReason} onChange={(e) => up('returnReason', e.target.value)} required>
                <option value="">Select reason...</option>
                <option value="Equipment failure under warranty">Equipment failure under warranty</option>
                <option value="Performance degradation">Performance degradation</option>
                <option value="Calibration drift">Calibration drift</option>
                <option value="Physical damage (warranty covered)">Physical damage (warranty covered)</option>
                <option value="Safety-critical malfunction">Safety-critical malfunction</option>
                <option value="Software / firmware fault">Software / firmware fault</option>
                <option value="Unexpected shutdown / production halt">Unexpected shutdown / production halt</option>
                <option value="Other warranty issue">Other warranty issue</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Fault Description <span className="text-red-500">*</span></label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={4}
                value={form.faultDescription}
                onChange={(e) => up('faultDescription', e.target.value)}
                placeholder="Describe the fault in detail — error codes, symptoms, frequency of occurrence, impact on operations..."
                required
              />
            </div>
            <div>
              <label className={labelClass}>Requested Resolution</label>
              <div className="flex gap-3">
                {(['repair', 'replace', 'refund'] as const).map((r) => (
                  <label key={r} className={`flex-1 p-3 rounded-lg border-2 text-center cursor-pointer capitalize text-sm font-medium transition-all
                    ${form.requestedResolution === r ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    <input type="radio" name="resolution" value={r} checked={form.requestedResolution === r} onChange={() => up('requestedResolution', r)} className="sr-only" />
                    {r === 'repair' ? '🔧' : r === 'replace' ? '🔄' : '💰'} {r}
                  </label>
                ))}
              </div>
            </div>

            {/* Integration preview */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">On Submit — System Actions</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">S</span>
                  <span className="text-gray-600">ServiceMax: Create case + work order</span>
                  <span className="ml-auto text-xs text-blue-500 font-medium">Auto ✓</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="w-5 h-5 bg-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">S</span>
                  <span className="text-gray-600">SAP: Create return order (RO)</span>
                  <span className="ml-auto text-xs text-orange-500 font-medium">Pending</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">D</span>
                  <span className="text-gray-600">Decontamination form required before handoff</span>
                  {form.decontaminationRequired ? (
                    <span className="ml-auto text-xs text-orange-500 font-medium">Required ⚗️</span>
                  ) : (
                    <span className="ml-auto text-xs text-green-500 font-medium">Skipped</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5 pb-8">
        <button
          onClick={step === 1 ? onCancel : () => setStep((s) => s - 1)}
          className="text-gray-500 hover:text-gray-700 font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {step === 1 ? 'Cancel' : '← Back'}
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!form.productName || !form.serialNumber || !form.returnReason || !form.faultDescription}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            Create Return Case ✓
          </button>
        )}
      </div>
    </div>
  );
}
