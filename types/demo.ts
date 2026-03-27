export type EntityRecord = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  sector: string;
  region: string;
  headquarters: string;
  summary: string;
  focus: string;
  highlights: string[];
  kpis: {
    recurringRevenueBillions: number;
    trackedAssets: number;
    controlledCapacityGw: number;
    transitionScore: number;
    portfolioIntensity: number;
    yoyIntensityChangePct: number;
  };
  peerComparison: Array<{
    label: string;
    value: number;
  }>;
};

export type AssetRecord = {
  entityId: string;
  assetId: string;
  name: string;
  country: string;
  region: string;
  technology: string;
  status: string;
  capacityMw: number;
  emissionsIndex: number;
  riskLevel: "Low" | "Moderate" | "High";
};

export type OwnershipEdge = {
  rootId: string;
  sourceId: string;
  targetId: string;
  percentage: number;
  category: "owner" | "subsidiary";
};

export type ScenarioPoint = {
  entityId: string;
  year: number;
  actual: number;
  committed: number;
  accelerated: number;
  benchmark15: number;
  benchmark2: number;
  capex: number;
};

export type EntityOption = {
  id: string;
  label: string;
  value: string;
};

export type OverviewPayload = {
  entity: EntityRecord;
  assets: AssetRecord[];
  footprint: Array<{
    region: string;
    assets: number;
    capacityMw: number;
  }>;
  ownershipSummary: {
    ownerCount: number;
    subsidiaryCount: number;
    concentrationPct: number;
  };
};

export type OwnershipPayload = {
  data: OwnershipEdge[];
  rawData: OwnershipEdge[];
  totalRecords: number;
  layerLimitation: string;
};

export type ScenarioPayload = {
  entity: EntityRecord;
  points: ScenarioPoint[];
};
