export * from "./types";

import { ceEsteBrandScaling } from "./ce-este-brand-scaling";
import { ceEstePoas } from "./ce-este-poas";
import { roasVsPoas } from "./roas-vs-poas";
import { marjaNeta } from "./marja-neta";
import { adSpendMediaBudget } from "./ad-spend-media-budget";
import { redFlagsAgentii } from "./11-red-flags-agentii";
import { retainerVsComision } from "./retainer-vs-comision";
import { selfAuditAgentie30Min } from "./self-audit-agentie-30-min";
import { estiPregatitDeScaling } from "./esti-pregatit-de-scaling";
import { cumRecunostiAgentia } from "./cum-recunosti-agentia-care-te-fura";
import { maiOptimizamScuze } from "./mai-optimizam-scuze";
import { metriciInventate } from "./metrici-inventate";
import { produsProstNuEVinaAgentiei } from "./produs-prost-nu-e-vina-agentiei";
import { ceAiNevoieInainteDeAgentie } from "./ce-ai-nevoie-inainte-de-agentie";
import { cumSaCalculeziMarjaNeta } from "./cum-sa-calculezi-marja-neta";

export {
  ceEsteBrandScaling,
  ceEstePoas,
  roasVsPoas,
  marjaNeta,
  adSpendMediaBudget,
  redFlagsAgentii,
  retainerVsComision,
  selfAuditAgentie30Min,
  estiPregatitDeScaling,
  cumRecunostiAgentia,
  maiOptimizamScuze,
  metriciInventate,
  produsProstNuEVinaAgentiei,
  ceAiNevoieInainteDeAgentie,
  cumSaCalculeziMarjaNeta,
};

import { Article } from "./types";

export const allArticles: Article[] = [
  ceEsteBrandScaling,
  ceEstePoas,
  roasVsPoas,
  marjaNeta,
  adSpendMediaBudget,
  redFlagsAgentii,
  retainerVsComision,
  selfAuditAgentie30Min,
  estiPregatitDeScaling,
  cumRecunostiAgentia,
  maiOptimizamScuze,
  metriciInventate,
  produsProstNuEVinaAgentiei,
  ceAiNevoieInainteDeAgentie,
  cumSaCalculeziMarjaNeta,
];
