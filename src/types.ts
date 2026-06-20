/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DrugItem {
  id: string;
  name: string;          // e.g. "Cefazolin"
  chineseName: string;   // e.g. "頭孢唑林"
  prefixSuffix: string;  // e.g. "Cefa-"
  category: string;      // e.g. "第一代頭孢菌素抗生素"
  disease: string;       // e.g. "Cephalosporin類抗生素"
  indications: string;   // 適應症
  contraindications: string; // 用藥禁忌
  sideEffects: string;   // 副作用
  biochemKnowledge: string; // 高中生化知識說明
}

export interface PrefixSuffixInfo {
  id: string;
  pattern: string;       // e.g. "-pril"
  categoryName: string;  // e.g. "ACEI"
  diseaseGroup: string;  // e.g. "高血壓"
  mechanism: string;     // 藥理機轉描述 (e.g. 血管收縮素轉化酶抑制劑)
  examples: Array<{ name: string; chinese: string }>;
  exceptions?: string;   // 例外備註
}

export interface DiseaseCategory {
  id: string;
  name: string;          // e.g. "高血壓"
  englishName: string;   // e.g. "Hypertension"
  description: string;
  color: string;         // Tailwind class
  patterns: PrefixSuffixInfo[];
}

export interface HighSchoolLesson {
  id: string;
  title: string;
  targetSubject: string; // "生物" | "化學" | "跨學科"
  difficulty: "基礎" | "進階";
  intro: string;
  mechanismDiagram: string; // HTML-like structured steps or graphical cues
  biochemPathway: string[];  // Step-by-step description of RAAS, stomach acid, lipids etc.
  highSchoolLink: string;   // Connection directly to high school textbook (e.g. "基礎生物下冊：人體的防禦作用與內分泌系統")
  chemicalStructureConcept?: string; // Chemical bonding or molecular explanation
}

export interface HealthTip {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "服藥安全" | "生活飲食" | "儲存保管" | "正確觀念";
  checklist: string[];
}
