import type { WorkflowStage } from '../../types';

const STAGES: { id: WorkflowStage; label: string; sublabel: string; icon: string; team: string }[] = [
  { id: 'initiation', label: 'Initiation', sublabel: 'Return Request', icon: '📋', team: 'Service Team' },
  { id: 'decontamination', label: 'Decontamination', sublabel: 'Safety Clearance', icon: '⚗️', team: 'Service Team' },
  { id: 'customer_care_review', label: 'CC Review', sublabel: 'Warranty Check', icon: '🔍', team: 'Customer Care' },
  { id: 'courier_assignment', label: 'Courier Assign', sublabel: 'Logistics Setup', icon: '📦', team: 'Customer Care' },
  { id: 'courier_pickup', label: 'Pickup', sublabel: 'From Customer', icon: '🚚', team: 'Courier' },
  { id: 'in_transit', label: 'In Transit', sublabel: 'To Factory', icon: '✈️', team: 'Courier' },
  { id: 'factory_receipt', label: 'Factory Receipt', sublabel: 'Arrived', icon: '🏭', team: 'Service Team' },
  { id: 'inspection', label: 'Inspection', sublabel: 'Diagnosis & Fix', icon: '🔧', team: 'Service Team' },
  { id: 'completed', label: 'Completed', sublabel: 'Case Closed', icon: '✅', team: 'Service Team' },
];

const STAGE_ORDER = STAGES.map((s) => s.id);

interface Props {
  currentStage: WorkflowStage;
  decontaminationRequired: boolean;
}

export function ProgressTracker({ currentStage, decontaminationRequired }: Props) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
        Workflow Progress
      </h3>

      {/* Horizontal stepper */}
      <div className="relative">
        {/* connector line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 z-0" />
        <div
          className="absolute top-6 left-6 h-0.5 bg-blue-500 z-0 transition-all duration-700"
          style={{ width: currentIndex <= 0 ? '0%' : `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
        />

        <div className="relative z-10 flex justify-between">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isUpcoming = idx > currentIndex;
            const isSkipped = stage.id === 'decontamination' && !decontaminationRequired;

            return (
              <div key={stage.id} className="flex flex-col items-center" style={{ width: `${100 / STAGES.length}%` }}>
                {/* Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-300 shadow-sm
                    ${isCompleted ? 'bg-blue-500 border-blue-500' : ''}
                    ${isCurrent ? 'bg-white border-blue-500 ring-4 ring-blue-100 scale-110' : ''}
                    ${isUpcoming && !isSkipped ? 'bg-white border-gray-300' : ''}
                    ${isSkipped ? 'bg-gray-100 border-dashed border-gray-300 opacity-50' : ''}
                  `}
                >
                  {isCompleted ? (
                    <span className="text-white text-base">✓</span>
                  ) : (
                    <span className={isSkipped ? 'opacity-40' : ''}>{stage.icon}</span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-2 text-center px-0.5">
                  <p className={`text-xs font-semibold leading-tight
                    ${isCompleted ? 'text-blue-600' : ''}
                    ${isCurrent ? 'text-blue-700' : ''}
                    ${isUpcoming ? 'text-gray-400' : ''}
                    ${isSkipped ? 'text-gray-300' : ''}
                  `}>
                    {stage.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight hidden xl:block">{stage.sublabel}</p>
                </div>

                {/* Team badge */}
                {isCurrent && (
                  <div className="mt-1.5 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-medium whitespace-nowrap">
                    {stage.team}
                  </div>
                )}
                {isSkipped && (
                  <div className="mt-1.5 px-2 py-0.5 bg-gray-200 text-gray-400 text-xs rounded-full font-medium">
                    N/A
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current stage callout */}
      <div className="mt-8 flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg flex-shrink-0">
          {STAGES[currentIndex]?.icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-800">
            Currently at: {STAGES[currentIndex]?.label}
          </p>
          <p className="text-xs text-blue-600 mt-0.5">
            Assigned to <span className="font-medium">{STAGES[currentIndex]?.team}</span> · {STAGES[currentIndex]?.sublabel}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-blue-500 font-medium">Step {currentIndex + 1} of {STAGES.length}</p>
          <div className="w-24 h-1.5 bg-blue-200 rounded-full mt-1">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${((currentIndex + 1) / STAGES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Team handoff legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {[
          { team: 'Service Team', color: 'bg-blue-500', stages: [0, 1, 6, 7, 8] },
          { team: 'Customer Care', color: 'bg-purple-500', stages: [2, 3] },
          { team: 'Courier (XPO/DHL/FedEx)', color: 'bg-teal-500', stages: [4, 5] },
        ].map(({ team, color, stages }) => (
          <div key={team} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-gray-500">{team}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">Steps {stages.map((s) => s + 1).join(', ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
