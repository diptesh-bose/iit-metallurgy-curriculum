export type WorkflowStage =
  | 'initiation'
  | 'decontamination'
  | 'customer_care_review'
  | 'courier_assignment'
  | 'courier_pickup'
  | 'in_transit'
  | 'factory_receipt'
  | 'inspection'
  | 'completed'
  | 'cancelled';

export type Role = 'service_team' | 'customer_care' | 'courier' | 'factory' | 'admin';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export type CourierProvider = 'XPO' | 'DHL' | 'FedEx' | 'UPS';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface DecontaminationForm {
  completedAt: string;
  completedBy: string;
  biologicalHazard: boolean;
  chemicalHazard: boolean;
  radiationHazard: boolean;
  electricalHazard: boolean;
  hazardDescription: string;
  decontaminationMethod: string;
  safeForShipment: boolean;
  certificationNumber: string;
  notes: string;
}

export interface CourierAssignment {
  provider: CourierProvider;
  trackingNumber: string;
  assignedAt: string;
  assignedBy: string;
  estimatedPickup: string;
  estimatedDelivery: string;
  specialInstructions: string;
  contactName: string;
  contactPhone: string;
}

export interface SAPRecord {
  salesOrderNumber: string;
  materialCode: string;
  plantCode: string;
  storageLocation: string;
  returnOrderNumber: string;
  creditMemoNumber: string;
  syncedAt: string;
  status: 'pending' | 'synced' | 'error';
}

export interface ServiceMaxRecord {
  caseNumber: string;
  workOrderNumber: string;
  assetId: string;
  contractNumber: string;
  syncedAt: string;
  status: 'pending' | 'synced' | 'error';
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  stage: WorkflowStage;
  actor: string;
  role: Role;
  action: string;
  notes: string;
}

export interface ReturnCase {
  id: string;
  caseNumber: string;
  createdAt: string;
  updatedAt: string;
  priority: Priority;
  stage: WorkflowStage;

  // Product
  productName: string;
  productModel: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiry: string;

  // Customer
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupAddress: Address;

  // Return details
  returnReason: string;
  faultDescription: string;
  requestedResolution: 'repair' | 'replace' | 'refund';

  // Assignments
  assignedServiceTeam: string;
  assignedCustomerCare: string;

  // Sub-forms
  decontaminationForm: DecontaminationForm | null;
  courierAssignment: CourierAssignment | null;

  // Integration records
  sapRecord: SAPRecord | null;
  serviceMaxRecord: ServiceMaxRecord | null;

  // Timeline
  timeline: TimelineEvent[];

  // Flags
  decontaminationRequired: boolean;
  decontaminationApproved: boolean;
}

export type ViewName =
  | 'dashboard'
  | 'returns_list'
  | 'return_detail'
  | 'new_return'
  | 'decontamination_form'
  | 'courier_assignment'
  | 'inspection_form';
