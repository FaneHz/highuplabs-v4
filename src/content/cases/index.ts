export * from "./types";

import { trotineteElectrice } from "./trotinete-electrice";
import { agentieTurismArges } from "./agentie-turism-arges";

export { trotineteElectrice, agentieTurismArges };

import { CaseStudy } from "./types";

export const allCases: CaseStudy[] = [
  trotineteElectrice,
  agentieTurismArges,
];
