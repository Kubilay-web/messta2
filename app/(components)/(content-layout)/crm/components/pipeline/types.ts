export type KanbanLead = {
  id: string;
  title: string;
  contactName: string;
  contactPhone: string | null;
  contactEmail: string | null;
  company: string | null;
  source: string;
  status: string;
  temperature: string;
  value: number | null;
  currency: string;
  city: string | null;
  district: string | null;
  listingType: string | null;
  propertyType: string | null;
  roomCount: string | null;
  tags: string[];
  agentId: string | null;
  agentName: string | null;
  clientId: string | null;
  listingId: string | null;
  expectedCloseDate: string | null;
  lastActivityAt: string;
  stageId: string;
  position: number;
  _count: { tasks: number; activities: number };
};

export type KanbanStage = {
  id: string;
  name: string;
  color: string;
  probability: number;
  isWon: boolean;
  isLost: boolean;
};

export type FormOptions = {
  agents: { id: string; firstName: string; lastName: string }[];
  listings: { id: string; title: string; listingNo: string; askingPrice: number; currency: string }[];
  clients: { id: string; firstName: string; lastName: string; phone: string }[];
};
