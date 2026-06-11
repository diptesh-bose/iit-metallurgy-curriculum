import type { ReturnCase } from '../types';
import { STAGE_CONFIG, PRIORITY_CONFIG } from '../data/mockData';
import { ProgressTracker } from './workflow/ProgressTracker';

interface Props {
  returnCase: ReturnCase;
  onBack: () => void;
  onOpenDecon: (id: string) => void;
  onOpenCourier: (id: string) => void;
  onAdvanceStage: (id: string) => void;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-gray-800 mt-0.5">{value || '—'}</p>
    </div>
  );
}

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${bg} ${color}`}>{label}</span>;
}

function IntegrationCard({ name, icon, color, record }: { name: string; icon: string; color: string; record: { status: string; [key: string]: string } | null }) {
  const status = record?.status ?? 'pending';
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-7 h-7 rounded flex items-center justify-center text-sm font-bold text-white ${color}`}>{icon}</span>
        <span className="font-semibold text-sm text-gray-800">{name}</span>
        <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full
          ${status === 'synced' ? 'bg-green-100 text-green-700' : status === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {status === 'synced' ? '✓ Synced' : status === 'error' ? '✗ Error' : '⏳ Pending'}
        </span>
      </div>
      {record && status === 'synced' && (
        <div className="space-y-1">
          {Object.entries(record)
            .filter(([k, v]) => k !== 'status' && k !== 'syncedAt' && v)
            .slice(0, 3)
            .map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-gray-400 capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-medium text-gray-700 font-mono">{v}</span>
              </div>
            ))}
        </div>
      )}
      {status === 'pending' && <p className="text-xs text-gray-400">Awaiting sync...</p>}
    </div>
  );
}

export function ReturnDetail({ returnCase: c, onBack, onOpenDecon, onOpenCourier, onAdvanceStage }: Props) {
  const stage = STAGE_CONFIG[c.stage];
  const priority = PRIORITY_CONFIG[c.priority];

  // Determine next action
  const nextActionLabel = (() => {
    switch (c.stage) {
      case 'initiation': return c.decontaminationRequired ? 'Complete Decontamination Form ⚗️' : 'Advance to Customer Care →';
      case 'decontamination': return 'Decontamination form pending';
      case 'customer_care_review': return 'Approve & Assign Courier →';
      case 'courier_assignment': return 'Courier assigned — await pickup';
      case 'courier_pickup': return 'Advance to In Transit →';
      case 'in_transit': return 'Mark as Factory Received →';
      case 'factory_receipt': return 'Start Inspection →';
      case 'inspection': return 'Close Case — Mark Completed ✓';
      case 'completed': return null;
      default: return null;
    }
  })();

  const canAdvance = c.stage !== 'decontamination' && c.stage !== 'completed' && c.stage !== 'courier_assignment';

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 font-medium transition-colors">
          ← Back to list
        </button>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">{c.caseNumber}</h1>
              <Badge label={stage.label} color={stage.color} bg={stage.bgColor} />
              <Badge label={priority.label} color={priority.color} bg={priority.bgColor} />
              {c.decontaminationRequired && !c.decontaminationApproved && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 animate-pulse">
                  ⚗️ Decon Required
                </span>
              )}
            </div>
            <p className="text-gray-500 mt-1 text-sm">{c.productName} · {c.customerName}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {c.stage === 'initiation' && c.decontaminationRequired && !c.decontaminationApproved && (
              <button
                onClick={() => onOpenDecon(c.id)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                ⚗️ Decon Form
              </button>
            )}
            {c.stage === 'customer_care_review' && !c.courierAssignment && (
              <button
                onClick={() => onOpenCourier(c.id)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                🚚 Assign Courier
              </button>
            )}
            {canAdvance && nextActionLabel && c.stage !== 'customer_care_review' && (
              <button
                onClick={() => onAdvanceStage(c.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                {nextActionLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <ProgressTracker currentStage={c.stage} decontaminationRequired={c.decontaminationRequired} />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column: product + customer */}
        <div className="lg:col-span-2 space-y-5">
          {/* Product card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-base">📦</span> Product Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InfoRow label="Product Name" value={c.productName} />
              <InfoRow label="Model" value={c.productModel} />
              <InfoRow label="Serial Number" value={c.serialNumber} />
              <InfoRow label="Purchase Date" value={c.purchaseDate} />
              <InfoRow label="Warranty Expiry" value={c.warrantyExpiry} />
              <InfoRow label="Resolution" value={c.requestedResolution.charAt(0).toUpperCase() + c.requestedResolution.slice(1)} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Fault Description</p>
              <p className="text-sm text-gray-700 leading-relaxed">{c.faultDescription}</p>
            </div>
          </div>

          {/* Customer card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-base">🏢</span> Customer & Pickup
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InfoRow label="Customer" value={c.customerName} />
              <InfoRow label="Customer ID" value={c.customerId} />
              <InfoRow label="Email" value={c.customerEmail} />
              <InfoRow label="Phone" value={c.customerPhone} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">Pickup Address</p>
              <p className="text-sm text-gray-700">
                {c.pickupAddress.street}, {c.pickupAddress.city}, {c.pickupAddress.state} {c.pickupAddress.zip}, {c.pickupAddress.country}
              </p>
            </div>
          </div>

          {/* Decontamination card */}
          {c.decontaminationRequired && (
            <div className={`rounded-xl border p-5 shadow-sm ${c.decontaminationForm ? 'bg-white border-gray-200' : 'bg-orange-50 border-orange-200'}`}>
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-base">⚗️</span> Decontamination
                {c.decontaminationForm ? (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Certified</span>
                ) : (
                  <span className="ml-2 text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full font-medium animate-pulse">Pending</span>
                )}
              </h3>
              {c.decontaminationForm ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <InfoRow label="Completed By" value={c.decontaminationForm.completedBy} />
                    <InfoRow label="Cert Number" value={c.decontaminationForm.certificationNumber} />
                    <InfoRow label="Method" value={c.decontaminationForm.decontaminationMethod} />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {c.decontaminationForm.biologicalHazard && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">🦠 Biological</span>}
                    {c.decontaminationForm.chemicalHazard && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">☢️ Chemical</span>}
                    {c.decontaminationForm.radiationHazard && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">☢️ Radiation</span>}
                    {c.decontaminationForm.electricalHazard && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">⚡ Electrical</span>}
                    {c.decontaminationForm.safeForShipment && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Safe for Shipment</span>}
                  </div>
                  {c.decontaminationForm.notes && <p className="text-sm text-gray-600">{c.decontaminationForm.notes}</p>}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-orange-700 mb-3">Decontamination form must be completed before this case can proceed.</p>
                  <button
                    onClick={() => onOpenDecon(c.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Complete Form Now →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Courier card */}
          {c.courierAssignment && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-base">🚚</span> Courier Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <InfoRow label="Provider" value={c.courierAssignment.provider} />
                <InfoRow label="Tracking" value={c.courierAssignment.trackingNumber} />
                <InfoRow label="Assigned By" value={c.courierAssignment.assignedBy} />
                <InfoRow label="Est. Pickup" value={new Date(c.courierAssignment.estimatedPickup).toLocaleString()} />
                <InfoRow label="Est. Delivery" value={new Date(c.courierAssignment.estimatedDelivery).toLocaleString()} />
                <InfoRow label="Site Contact" value={c.courierAssignment.contactName} />
              </div>
              {c.courierAssignment.specialInstructions && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs font-semibold text-yellow-800 mb-1">Special Instructions</p>
                  <p className="text-sm text-yellow-700">{c.courierAssignment.specialInstructions}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column: integrations + timeline */}
        <div className="space-y-5">
          {/* Assignments */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>👥</span> Team Assignments
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700">
                  {c.assignedServiceTeam ? c.assignedServiceTeam[0] : '?'}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Service Team</p>
                  <p className="text-sm font-medium text-gray-800">{c.assignedServiceTeam || 'Unassigned'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-700">
                  {c.assignedCustomerCare ? c.assignedCustomerCare[0] : '?'}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Customer Care</p>
                  <p className="text-sm font-medium text-gray-800">{c.assignedCustomerCare || 'Unassigned'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SAP Integration */}
          <IntegrationCard
            name="SAP"
            icon="S"
            color="bg-blue-800"
            record={c.sapRecord as unknown as { status: string; [key: string]: string } | null}
          />

          {/* ServiceMax Integration */}
          <IntegrationCard
            name="ServiceMax"
            icon="M"
            color="bg-blue-500"
            record={c.serviceMaxRecord as unknown as { status: string; [key: string]: string } | null}
          />

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📜</span> Activity Timeline
            </h3>
            <div className="space-y-0">
              {[...c.timeline].reverse().map((event, idx, arr) => {
                const roleColors: Record<string, string> = {
                  service_team: 'bg-blue-500',
                  customer_care: 'bg-purple-500',
                  courier: 'bg-teal-500',
                  factory: 'bg-amber-500',
                };
                return (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${roleColors[event.role] ?? 'bg-gray-400'}`} />
                      {idx < arr.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                    </div>
                    <div className="pb-4 flex-1">
                      <p className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleString()}</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{event.action}</p>
                      <p className="text-xs text-gray-500">{event.actor}</p>
                      {event.notes && <p className="text-xs text-gray-400 mt-1 italic">{event.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
