export type PeriodType = "1month" | "6months" | "1year";

export interface CardProps {
  groupId: string;
  familyName: string;
  budget?: number;
  initialPeriod?: PeriodType;
}

// Mapeo para mostrar nombres amigables
export const PERIOD_LABELS: Record<PeriodType, string> = {
  "1month": "Monthly",
  "6months": "Semi-Annual",
  "1year": "Annual",
};