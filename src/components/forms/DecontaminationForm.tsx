import { useState } from 'react';
import type { ReturnCase, DecontaminationForm as DeconFormData } from '../../types';

interface Props {
  returnCase: ReturnCase;
  onSubmit: (caseId: string, form: DeconFormData) => void;
  onCancel: () => void;
}

export function DecontaminationFormView({ returnCase, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Omit<DeconFormData, 'completedAt' | 'completedBy' | 'certificationNumber'>>({
    biologicalHazard: false,
    chemicalHazard: false,
    radiationHazard: false,
    electricalHazard: false,
    hazardDescription: '',
    decontaminationMethod: '',
    safeForShipment: false,
    notes: '',
  });
  const [completedBy, setCompletedBy] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const anyHazard = form.biologicalHazard || form.chemicalHazard || form.radiationHazard || form.electricalHazard;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!completedBy || !form.decontaminationMethod || !form.safeForShipment) return;
    const certNum = `DCERT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 900 + 100)}`;
    onSubmit(returnCase.id, {
      ...form,
      completedAt: new Date().toISOString(),
      completedBy,
      certificationNumber: certNum,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Decontamination Certified</h2>
        <p className="text-gray-500">Form submitted and case can proceed to Customer Care review.</p>
        <button onClick={onCancel} className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Return to Case
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Mandatory banner */}
      <div className="bg-orange-50 border border-orange-300 rounded-xl p-4 mb-6 flex items-start gap-3">
        <span className="text-2xl">⚗️</span>
        <div>
          <p className="font-semibold text-orange-800">Mandatory Decontamination Form — Phase 1</p>
          <p className="text-sm text-orange-700 mt-0.5">
            This form must be completed and certified before the return can proceed to Customer Care. All fields are required.
          </p>
        </div>
      </div>

      {/* Case reference */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><p className="text-xs text-gray-400 font-medium uppercase">Case</p><p className="font-semibold text-gray-900">{returnCase.caseNumber}</p></div>
          <div><p className="text-xs text-gray-400 font-medium uppercase">Product</p><p className="font-semibold text-gray-900">{returnCase.productModel}</p></div>
          <div><p className="text-xs text-gray-400 font-medium uppercase">Serial</p><p className="font-semibold text-gray-900">{returnCase.serialNumber}</p></div>
          <div><p className="text-xs text-gray-400 font-medium uppercase">Customer</p><p className="font-semibold text-gray-900">{returnCase.customerName}</p></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Technician */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Technician Information
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Technician Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={completedBy}
              onChange={(e) => setCompletedBy(e.target.value)}
              required
              placeholder="Full name of certifying technician"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Hazard Assessment */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            Hazard Assessment
          </h3>
          <p className="text-sm text-gray-500 mb-4">Check all hazard types present in or on the equipment:</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { key: 'biologicalHazard', label: 'Biological Hazard', icon: '🦠', desc: 'Biological agents, pathogens, or organic contamination' },
              { key: 'chemicalHazard', label: 'Chemical Hazard', icon: '☢️', desc: 'Corrosive, toxic, or hazardous chemical residues' },
              { key: 'radiationHazard', label: 'Radiation Hazard', icon: '☢️', desc: 'Radioactive material or ionizing radiation source' },
              { key: 'electricalHazard', label: 'Electrical Hazard', icon: '⚡', desc: 'Stored electrical charge, capacitors, or live components' },
            ].map(({ key, label, icon, desc }) => {
              const checked = form[key as keyof typeof form] as boolean;
              return (
                <label
                  key={key}
                  className={`relative flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all
                    ${checked ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 accent-orange-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                      <span>{icon}</span> {label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </label>
              );
            })}
          </div>

          {anyHazard && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Hazard Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.hazardDescription}
                onChange={(e) => setForm((f) => ({ ...f, hazardDescription: e.target.value }))}
                required={anyHazard}
                rows={3}
                placeholder="Describe the nature of each hazard identified..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          )}
        </div>

        {/* Decontamination Method */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Decontamination Procedure
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Method Used <span className="text-red-500">*</span>
              </label>
              <select
                value={form.decontaminationMethod}
                onChange={(e) => setForm((f) => ({ ...f, decontaminationMethod: e.target.value }))}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select decontamination method...</option>
                <option value="Chemical flush and neutralization (SOP-DC-1)">Chemical flush and neutralization (SOP-DC-1)</option>
                <option value="Physical cleaning and UV sterilization (SOP-DC-2)">Physical cleaning and UV sterilization (SOP-DC-2)</option>
                <option value="Capacitor discharge and electrical isolation (SOP-DC-3)">Capacitor discharge and electrical isolation (SOP-DC-3)</option>
                <option value="Full chemical neutralization + electrical discharge (SOP-DC-4)">Full chemical neutralization + electrical discharge (SOP-DC-4)</option>
                <option value="Radiation shielding and controlled disposal (SOP-DC-5)">Radiation shielding and controlled disposal (SOP-DC-5)</option>
                <option value="No decontamination required — equipment clean">No decontamination required — equipment clean</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                placeholder="Any additional observations or actions taken..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Safety Certification */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
            Shipment Safety Certification
          </h3>
          <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all
            ${form.safeForShipment ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <input
              type="checkbox"
              checked={form.safeForShipment}
              onChange={(e) => setForm((f) => ({ ...f, safeForShipment: e.target.checked }))}
              className="mt-0.5 w-4 h-4 accent-green-500"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">I certify this equipment is safe for commercial shipment</p>
              <p className="text-xs text-gray-500 mt-1">
                By checking this box, I confirm that all identified hazards have been addressed per standard operating procedures and the equipment
                complies with transport regulations (IATA/ADR/IMDG as applicable).
              </p>
            </div>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700 font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!completedBy || !form.decontaminationMethod || !form.safeForShipment}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            Submit & Certify ⚗️
          </button>
        </div>
      </form>
    </div>
  );
}
