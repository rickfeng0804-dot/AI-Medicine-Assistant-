/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiseaseCategory, DrugItem, HighSchoolLesson, HealthTip } from "./types";

export const diseaseCategories: DiseaseCategory[] = [
  {
    id: "hypertension",
    name: "高血壓",
    englishName: "Hypertension",
    description: "影響全球數億人的慢性疾病，透過調控心血管受體、離子通道或RAAS荷爾蒙系統來維持血壓穩定。",
    color: "rose",
    patterns: [
      {
        id: "ht_1",
        pattern: "-pril",
        categoryName: "ACEI",
        diseaseGroup: "高血壓",
        mechanism: "血管收縮素轉化酶抑制劑 (Angiotensin-Converting Enzyme Inhibitor)。抑制 Angiotensin I 轉變為強效血管收縮劑 Angiotensin II，同時減少醛固酮分泌，降低血壓與心臟負荷。",
        examples: [
          { name: "Captopril", chinese: "卡妥普利" },
          { name: "Lisinopril", chinese: "賴諾普利" }
        ],
        exceptions: "可能會引起乾咳（因 Bradykinin 緩激肽累積）。"
      },
      {
        id: "ht_2",
        pattern: "-sartan",
        categoryName: "ARB",
        diseaseGroup: "高血壓",
        mechanism: "血管收縮素受體阻斷劑 (Angiotensin II Receptor Blocker)。選擇性阻斷 AT1 受體，使 Angiotensin II 無法發揮血管收縮作用，療效與 ACEI 相似但較不易引起乾咳副作用。",
        examples: [
          { name: "Losartan", chinese: "洛沙坦" },
          { name: "Valsartan", chinese: "代沙坦" }
        ]
      },
      {
        id: "ht_3",
        pattern: "-dipine",
        categoryName: "CCB",
        diseaseGroup: "高血壓",
        mechanism: "鈣通道阻斷劑 (Calcium Channel Blocker)。主要阻斷二氫吡啶類 L-型鈣通道，阻止鈣離子流入動脈平滑肌細胞，使血管舒張，進而降低外周血管阻力並降壓。",
        examples: [
          { name: "Amlodipine", chinese: "脈優/阿米洛地平" },
          { name: "Nifedipine", chinese: "耐力平/硝苯地平" }
        ]
      },
      {
        id: "ht_4",
        pattern: "-olol, -lol",
        categoryName: "β-blocker",
        diseaseGroup: "高血壓",
        mechanism: "乙型腎上腺素受體阻斷劑 (Beta-Blocker)。阻斷心臟上的 β1 受體，減緩心率、減弱心肌收縮力，並抑制腎臟分泌腎素(Renin)，雙管齊下降壓。",
        examples: [
          { name: "Propranolol", chinese: "普萘洛爾/心律整" },
          { name: "Carvedilol", chinese: "卡維地洛" }
        ],
        exceptions: "非選擇性乙型阻斷劑（如 Propranolol）會同時阻斷氣管的 β2 受體，氣喘患者禁用。"
      },
      {
        id: "ht_5",
        pattern: "-osin",
        categoryName: "α1-blocker",
        diseaseGroup: "高血壓",
        mechanism: "甲型腎上腺素受體阻斷劑 (Alpha-1 Blocker)。選擇性阻斷血管平滑肌上的 α1 受體，阻止去甲腎上腺素結合，引發血管舒張。也可用於改善前列腺肥大引起的排尿障礙。",
        examples: [
          { name: "Prazosin", chinese: "普拉唑嗪" },
          { name: "Terazosin", chinese: "特拉唑嗪" }
        ],
        exceptions: "初次服用可能引發嚴重的「首劑低血壓（起立性低血壓）」，建議睡前服用。"
      }
    ]
  },
  {
    id: "diabetes",
    name: "糖尿病",
    englishName: "Diabetes",
    description: "以高血糖為特徵的代謝性疾病，口服與注射降糖藥作用於胰臟、肝臟、肌肉和腎臟等不同靶點。",
    color: "amber",
    patterns: [
      {
        id: "db_1",
        pattern: "-glinide",
        categoryName: "Meglitinide",
        diseaseGroup: "糖尿病",
        mechanism: "非磺醯尿素類胰島素促泌劑 (Glinides)。與胰臟 β 細胞上的 ATP 敏感性鉀離子通道結合，促進鈣離子流入，引發胰島素快速釋放。特別針對降低餐後血糖。",
        examples: [
          { name: "Nateglinide", chinese: "那格列奈" },
          { name: "Repaglinide", chinese: "瑞格列奈" }
        ],
        exceptions: "需於餐前 15-30 分鐘內服用，不進食則不服藥，避免低血糖。"
      },
      {
        id: "db_2",
        pattern: "-glitazone",
        categoryName: "TZD",
        diseaseGroup: "糖尿病",
        mechanism: "噻唑烷二酮類胰島素增敏劑 (Thiazolidinedione)。作為轉錄因子 PPARγ 的促效劑，調控與脂質及葡萄糖代謝相關的基因轉錄，顯著提升肌肉與脂肪組織對胰島素的敏感性。",
        examples: [
          { name: "Pioglitazone", chinese: "吡格列酮" },
          { name: "Troglitazone", chinese: "曲格列酮" }
        ],
        exceptions: "有導致水腫與心衰竭惡化的風險，嚴重心衰竭患者應避免使用。"
      },
      {
        id: "db_3",
        pattern: "-tide",
        categoryName: "GLP-1 analog",
        diseaseGroup: "糖尿病",
        mechanism: "類升糖素胜肽-1 類似物 (GLP-1 Receptor Agonist)。模擬天然腸泌素 GLP-1 作用，以血糖依賴性方式促進胰島素分泌、抑制升糖素、延緩胃排空並提升飽足感。",
        examples: [
          { name: "Exenatide", chinese: "艾塞那肽" },
          { name: "Liraglutide", chinese: "利拉魯肽" }
        ]
      },
      {
        id: "db_4",
        pattern: "-gliptin",
        categoryName: "DPP4-I",
        diseaseGroup: "糖尿病",
        mechanism: "二肽基肽酶-4 抑制劑 (DPP-4 Inhibitor)。抑制體內降解 GLP-1 的 DPP-4 酵素活性，使內源性 GLP-1 濃度增至 2-3 倍，安全改善胰島素分泌且不易造成低血糖。",
        examples: [
          { name: "Saxagliptin", chinese: "沙格列汀" },
          { name: "Linagliptin", chinese: "利格列汀" }
        ]
      },
      {
        id: "db_5",
        pattern: "-gliflozin",
        categoryName: "SGLT2-I",
        diseaseGroup: "糖尿病",
        mechanism: "鈉-葡萄糖共同輸送器2抑制劑 (SGLT2 Inhibitor)。阻斷腎臟近曲小管對尿糖的重吸收作用，使多餘的葡萄糖直接隨尿液排出體外，達到降糖、減重且排鈉護心的效果。",
        examples: [
          { name: "Canagliflozin", chinese: "卡格列淨" },
          { name: "Dapagliflozin", chinese: "達格列淨" },
        ],
        exceptions: "尿糖增加，因此需多喝水，避免泌尿道或陰道念珠菌感染。"
      }
    ]
  },
  {
    id: "hyperlipidemia",
    name: "高血脂",
    englishName: "Hyperlipidemia",
    description: "體內的膽固醇或甘油三酯過高，累積在血管壁引發動脈粥樣硬化，藥物主要調控肝臟脂質合成與清除率。",
    color: "orange",
    patterns: [
      {
        id: "hl_1",
        pattern: "-statin",
        categoryName: "HMG-CoA reductase-I",
        diseaseGroup: "高血脂",
        mechanism: "HMG-CoA 還原酶抑制劑。競爭性抑制肝臟中膽固醇合成的限速酶 HMG-CoA reductase，降低細胞內膽固醇。間接使肝細胞表面 LDL 受體表達上升，大量清除血液中的低密度脂蛋白（「壞膽固醇」）。",
        examples: [
          { name: "Lovastatin", chinese: "洛伐他汀" },
          { name: "Simvastatin", chinese: "辛伐他汀" }
        ],
        exceptions: "絕對不能與葡萄柚汁共服，且少數患者可能出現肌肉疼痛、橫紋肌溶解症。"
      },
      {
        id: "hl_2",
        pattern: "-fibr-",
        categoryName: "Fibric acid derivatives",
        diseaseGroup: "高血脂",
        mechanism: "纖維酸類衍生物 (Fibrates)。活化 PPARα 轉錄因子，提升脂蛋白脂酶 (LPL) 活性，加速血液中極低密度脂蛋白 (VLDL) 及甘油三酯 (TG) 的降解，是降低甘油三酯的首選藥物。",
        examples: [
          { name: "Fenofibrate", chinese: "非諾貝特" },
          { name: "Gemfibrozil", chinese: "吉非羅齊" },
          { name: "Ciprofibrate", chinese: "希普貝特" }
        ]
      },
      {
        id: "hl_3",
        pattern: "-cumab",
        categoryName: "PCSK9-I",
        diseaseGroup: "高血脂",
        mechanism: "PCSK9 單株抗體 (PCSK9 Inhibitor)。抑制 PCSK9 酵素，防止其與 LDL 受體結合並引導受體降解。使肝細胞表面維持高密度的 LDL 受體，強力且持久地拉低血液 LDL 濃度。",
        examples: [
          { name: "Evolocumab", chinese: "依伏庫單抗" },
          { name: "Alirocumab", chinese: "阿里庫單抗" }
        ],
        exceptions: "為注射劑型（非口服），費用昂貴，通常用於頑固型家族性高膽固醇血症。"
      }
    ]
  },
  {
    id: "coagulation",
    name: "凝血異常",
    englishName: "Coagulation Disorders",
    description: "涉及血栓形成或異常出血，抗凝血藥物作用於凝血瀑布的關鍵因子（如Xa因子、凝血酶II因子或血小板活化通路）。",
    color: "blue",
    patterns: [
      {
        id: "co_1",
        pattern: "-parin",
        categoryName: "肝素衍生物",
        diseaseGroup: "凝血異常",
        mechanism: "肝素及其低分子量衍生物。活化體內的抗凝血酶 III (Antithrombin III, AT-III)，使其對凝血因子 Xa 和 IIa (凝血酶) 的抑制速度加快數千倍，達到即時抗凝血效果。",
        examples: [
          { name: "Fondaparinux", chinese: "芳達帕魯/楓達肝素" }
        ]
      },
      {
        id: "co_2",
        pattern: "-xaban",
        categoryName: "抑制凝血因子Xa",
        diseaseGroup: "凝血異常",
        mechanism: "新型口服抗凝血劑 (NOACs)。高選擇性且直接地結合併抑制游離與結合態的凝血因子 Xa，中斷凝血瀑布，阻止凝血酶原(Prothrombin)活化為凝血酶。",
        examples: [
          { name: "Apixaban", chinese: "艾必妥/阿哌沙班" }
        ]
      },
      {
        id: "co_3",
        pattern: "-udin, -gatr-",
        categoryName: "抑制凝血因子II",
        diseaseGroup: "凝血異常",
        mechanism: "直接凝血酶 (Factor IIa) 抑制劑。藉由直接結合凝血酶的催化活性位點，阻止纖維蛋白原(Fibrinogen)轉化為纖維蛋白(Fibrin)，有效阻斷血栓凝聚的最後階段。",
        examples: [
          { name: "Desirudin", chinese: "地西盧定" },
          { name: "Dabagiatran", chinese: "達比加群" }
        ]
      },
      {
        id: "co_4",
        pattern: "-grel-",
        categoryName: "抑制ADP/P2Y12",
        diseaseGroup: "凝血異常",
        mechanism: "抗血小板藥物。阻斷血小板表面的 ADP P2Y12 受體，阻止 ADP 誘導的 GPIIb/IIIa 複合物活化，進而徹底抑制血小板的聚集與黏附，防範心肌梗塞與中風復發。",
        examples: [
          { name: "Clopidogrel", chinese: "保栓通/氯吡格雷" },
          { name: "Ticagrelor", chinese: "百憂心/替格瑞洛" }
        ]
      }
    ]
  },
  {
    id: "ulcer",
    name: "胃潰瘍",
    englishName: "Gastric Ulcer",
    description: "胃黏膜受胃酸侵蝕受損，治療主力是控制胃壁細胞上的胃酸分泌受體，或直接關閉質子泵（離子幫浦）。",
    color: "emerald",
    patterns: [
      {
        id: "ul_1",
        pattern: "-tidine",
        categoryName: "H2-blocker",
        diseaseGroup: "胃潰瘍",
        mechanism: "組織胺第二型受體拮抗劑。競爭性拮抗胃壁細胞膜上的 H2 受體，阻斷組織胺引起的胃酸分泌，並部分減弱胃泌素(Gastrin)與乙醯膽鹼(ACh)誘導的胃酸產生。",
        examples: [
          { name: "Cimetidine", chinese: "西咪替丁" }
        ],
        exceptions: "Cimetidine 會抑制肝臟 CYP450 酵素，易與其他藥物（如 Warfarin）產生嚴重的交互作用。"
      },
      {
        id: "ul_2",
        pattern: "-prazole",
        categoryName: "PPI",
        diseaseGroup: "胃潰瘍",
        mechanism: "氫離子幫浦抑制劑 (Proton Pump Inhibitor)。具備弱鹼性，被壁細胞吸收後在酸性小管活化，以共價鍵不可逆地結合於 H+/K+-ATPase (質子泵) 活性部位，徹底切斷壁細胞終末胃酸分泌路徑。",
        examples: [
          { name: "Omeprazole", chinese: "歐美拉唑/吉胃福適" }
        ],
        exceptions: "通常建議在第一餐「餐前 30 分鐘」服用，此時有最多啟動的質子泵可供藥物結合。"
      }
    ]
  },
  {
    id: "asthma",
    name: "氣喘",
    englishName: "Asthma",
    description: "呼吸道慢性發炎與狹窄，治療手段包括迅速舒張氣管平滑肌（急救），以及阻斷發炎介質路徑（長期保養）。",
    color: "indigo",
    patterns: [
      {
        id: "as_1",
        pattern: "-terol",
        categoryName: "β2-agonist",
        diseaseGroup: "氣喘",
        mechanism: "乙型第二型腎上腺素受體促效劑 (Beta-2 Agonist)。選擇性活化支氣管平滑肌上的 β2 受體，激活腺苷酸環化酶 (AC)，使細胞內 cAMP 增加，進而促使平滑肌鬆弛、呼吸道寬敞。",
        examples: [
          { name: "Salmeterol", chinese: "沙美特羅" },
          { name: "Formoterol", chinese: "福莫特羅" }
        ],
        exceptions: "屬於「長效型 (LABA)」，絕不能用於急性氣喘發作時的緊急救命，需與吸入型類固醇合併使用。"
      },
      {
        id: "as_2",
        pattern: "-leu-, -lukast",
        categoryName: "LTRA",
        diseaseGroup: "氣喘",
        mechanism: "白三烯素受體拮抗劑 (Leukotriene Receptor Antagonist)。阻斷 CysLT1 受體，中斷白三烯素強烈的支氣管收縮、血管通透性增加與黏液分泌作用，從根源降低過敏發炎。",
        examples: [
          { name: "Zileuton", chinese: "齊留通" },
          { name: "Montelukast", chinese: "欣流/蒙特魯卡" }
        ]
      }
    ]
  },
  {
    id: "sedatives",
    name: "鎮靜安眠",
    englishName: "Sedatives & Hypnotics",
    description: "作用於中樞神經系統中的 GABA-A 受體複合物，促進氯離子通道開放，達到神經突觸抑制、情緒安定與誘導睡眠。",
    color: "violet",
    patterns: [
      {
        id: "sd_1",
        pattern: "-barbital",
        categoryName: "巴比妥酸鹽類",
        diseaseGroup: "鎮靜安眠",
        mechanism: "巴比妥酸鹽類 (Barbiturates)。可直接開啟氯離子通道（不一定需 GABA 存在），且拉長通道開啟的「時間」，治療窗極窄，安全度低，易造成呼吸抑制。現今多用作抗癲癇或麻醉劑。",
        examples: [
          { name: "Pentobarbital", chinese: "戊巴比妥" }
        ],
        exceptions: "管制藥品。長期使用極易成癮與產生抗藥性，過量致死率高。"
      },
      {
        id: "sd_2",
        pattern: "-azepam, -azolam",
        categoryName: "BZD",
        diseaseGroup: "鎮靜安眠",
        mechanism: "苯二氮平類 複合物 (Benzodiazepines)。必須依附 GABA 存在，結合於 BZD 異位點，增加氯離子通道開啟的「頻率」，增強突觸後抑制作用，兼具抗焦慮、肌肉鬆弛和安眠效果。",
        examples: [
          { name: "Prazepam", chinese: "普拉西泮" },
          { name: "Triazolam", chinese: "三唑侖" }
        ],
        exceptions: "可能引起肌肉無力、日間嗜睡、記憶力減退。長者服用需謹防跌倒。"
      },
      {
        id: "sd_3",
        pattern: "Z-",
        categoryName: "non-BZD",
        diseaseGroup: "鎮靜安眠",
        mechanism: "非苯二氮平類安眠藥 (Z-drugs)。高選擇性結合於 GABA-A 的 α1 亞型受體，主要僅提供「助眠與縮短入睡時間」的單純效果，幾乎沒有抗焦慮或肌肉鬆弛等全身性副作用、隔日宿醉感亦較輕微。",
        examples: [
          { name: "Zolpidem", chinese: "舒樂安定/使蒂諾斯" },
          { name: "Zaleplon", chinese: "扎來普隆" }
        ],
        exceptions: "可能引發俗稱的「夢遊」或「睡眠中夢境狀態購物/暴食」等異常行為，服完藥後請務必立刻躺床入睡。"
      }
    ]
  },
  {
    id: "antivirals",
    name: "抗病毒",
    englishName: "Antivirals",
    description: "干擾病毒在宿主細胞內的複製週期，包含反轉錄、蛋白質剪切成熟以及核酸複製。常用於愛滋病 (HIV) 與 C 型肝炎 (HCV) 聯合療法。",
    color: "teal",
    patterns: [
      {
        id: "av_1",
        pattern: "-vir-",
        categoryName: "NNRTI",
        diseaseGroup: "抗病毒",
        mechanism: "非核苷酸反轉錄酶抑制劑 (Non-Nucleoside Reverse Transcriptase Inhibitor)。直接結合於反轉錄酶的活性口袋旁，引發酵素空間構型改變，使其喪失催化活性，中斷病毒 RNA 轉錄為 DNA。",
        examples: [
          { name: "Nevirapine", chinese: "奈非雷平" }
        ]
      },
      {
        id: "av_2",
        pattern: "-navir",
        categoryName: "抑制蛋白酶",
        diseaseGroup: "抗病毒",
        mechanism: "HIV 蛋白酶抑制劑 (Protease Inhibitor)。藉由競爭性結合 HIV-1 蛋白酶活性部位，阻止病毒前體蛋白裂解。使得轉譯出的多肽鏈無法切出關鍵的功能性蛋白，組裝出的新病毒因不成熟而無感染力。",
        examples: [
          { name: "Ritonavirr", chinese: "利托那韋" }
        ],
        exceptions: "在中文/英文拼寫上常出現在複合製劑，因能大幅調高其他藥物血中濃度。"
      },
      {
        id: "av_3",
        pattern: "-gravir",
        categoryName: "Integrase-I",
        diseaseGroup: "抗病毒",
        mechanism: "病毒整合酶抑制劑 (Integrase Inhibitor)。特異性抑制整合酶活性，阻止病毒雙股 DNA 插入宿主細胞染色體基因組，從根本斬斷病毒永久潛伏的能力。",
        examples: [
          { name: "Raltegravir", chinese: "拉替拉韋" }
        ]
      },
      {
        id: "av_4",
        pattern: "-previr",
        categoryName: "NS3/4A PI",
        diseaseGroup: "抗病毒",
        mechanism: "C型肝炎病毒 NS3/4A 蛋白酶抑制劑。結合 C型肝炎病毒的核心多肽裂解酶，抑制病毒複製複合物的生成與RNA轉錄，是根治C型肝炎的全口服神藥 components 之一。",
        examples: [
          { name: "Simeprevir", chinese: "西美瑞韋" }
        ]
      },
      {
        id: "av_5",
        pattern: "-asvir",
        categoryName: "NS5A PI",
        diseaseGroup: "抗病毒",
        mechanism: "C型肝炎病毒 NS5A 複製複合物抑制劑。與 NS5A 膜结合蛋白特異性結合，干擾 HCV 的複製、組裝、以及極低密度脂蛋白共同分泌的環節。",
        examples: [
          { name: "Daclatasvir", chinese: "達克拉韋" }
        ]
      },
      {
        id: "av_6",
        pattern: "-buvir",
        categoryName: "NS5B PI",
        diseaseGroup: "抗病毒",
        mechanism: "C型肝炎病毒 NS5B 聚合酶抑制劑。可為核苷酸或非核苷酸類類似物，結合於 RNA 依賴性 RNA 聚合酶 (NS5B)，導致轉錄鏈提前終止，促使C肝病毒無法繁殖。",
        examples: [
          { name: "Dasabuvir", chinese: "達沙布韋" }
        ]
      }
    ]
  },
  {
    id: "cephalosporins",
    name: "Cephalosporin類抗生素",
    englishName: "Cephalosporins",
    description: "頭孢菌素類β-內酰胺抗生素，通過抑制細菌細胞壁合成而發揮殺菌作用。隨著代數發展，其對革蘭氏陰性菌活性增強、且對β-內醯胺酶抗性提高。",
    color: "cyan",
    patterns: [
      {
        id: "cf_1",
        pattern: "Cefa-, Ceph-",
        categoryName: "1代",
        diseaseGroup: "Cephalosporin類抗生素",
        mechanism: "第一代頭孢菌素。主要針對革蘭氏陽性菌(G+)（如金黃色葡萄球菌），主要機制為不可逆地結合到青黴素結合蛋白 (PBPs)，阻止細菌細胞壁肽聚糖的多肽鏈交聯，導致細胞壁破裂、溶解死亡。",
        examples: [
          { name: "Cefazolin", chinese: "頭孢唑林" },
          { name: "Cephalexin", chinese: "頭孢氨苄" }
        ],
        exceptions: "【注意二代例外】Cefaclor 雖以 Cefa- 開頭，但它在藥理分類上屬於「第二代頭孢菌素」。"
      },
      {
        id: "cf_2",
        pattern: "-ime, -one, -ten",
        categoryName: "3代",
        diseaseGroup: "Cephalosporin類抗生素",
        mechanism: "第三代頭孢菌素。加強了對革蘭氏陰性菌(G-)（如綠膿桿菌、腸桿菌）的穿透能力與阻斷交聯效果，能高度抵抗細菌分泌的 β-lactamase (內醯胺酶)，廣泛用於嚴重全身性感染。",
        examples: [
          { name: "Ceftazidime", chinese: "頭孢他啶" },
          { name: "Ceftriaxone", chinese: "頭孢曲松" },
          { name: "Ceftibuten", chinese: "頭孢布烯" }
        ],
        exceptions: "【注意代數例外】Cefuroxime 以 -ime 結尾，但屬於「第二代」；Cefepime 以 -ime 結尾，但屬於「第四代」。"
      },
      {
        id: "cf_3",
        pattern: "-pi-",
        categoryName: "4代",
        diseaseGroup: "Cephalosporin類抗生素",
        mechanism: "第四代頭孢菌素。分子含有雙離子性，穿透革蘭氏陰性菌細胞外膜的孔道蛋白(porin)極快，且與 PBPs 結合親和力更高、抗酶耐受性最強，堪稱治療多重抗藥性細菌的重案武器。",
        examples: [
          { name: "Cefepime", chinese: "頭孢吡普/特治星成分" }
        ]
      },
      {
        id: "cf_4",
        pattern: "-rol-",
        categoryName: "5代",
        diseaseGroup: "Cephalosporin類抗生素",
        mechanism: "第五代頭孢菌素。全新研發之抗生素，具有特殊的三維空間立體構型，對原本β-lactam類完全無奈的 MRSA (耐甲氧西林金黃色葡萄球菌) 具有極佳結合力，重拾強力殺菌本院。",
        examples: [
          { name: "Ceftaroline", chinese: "頭孢洛林" }
        ]
      }
    ]
  }
];

// Combine all examples into a rich drug catalog database
export const ALL_DRUGS: DrugItem[] = [];

// Helper function to load and enrich ALL_DRUGS database
diseaseCategories.forEach((cat) => {
  cat.patterns.forEach((pat) => {
    pat.examples.forEach((ex) => {
      // Define indications, side effects, biochem, and contraindications systematically
      let indications = "";
      let sideEffects = "";
      let contraindications = "";
      let biochemKnowledge = "";

      switch (pat.categoryName) {
        case "ACEI":
          indications = "高血壓、充血性心臟衰竭、糖尿病腎病變保護、心肌梗塞後療護。";
          sideEffects = "乾咳、高血鉀、血管性水腫、低血壓、味覺喪失。";
          contraindications = "雙側腎動脈狹窄患者、孕婦（具高度致畸胎性，會破壞胎兒腎臟發育）、曾經因服用此類藥物發生血管水腫者。";
          biochemKnowledge = "高一/高三生物 RAAS 系統：原本腎臟分泌「腎素」(Renin) 將血管收縮素原剪切為 Angiotensin I。「血管收縮素轉化酶」(ACE) 會將 I 改造成 II。II 會促使腺體分泌醛固酮(Aldosterone) 促進遠曲小管重吸收鈉與水。ACEI 阻斷了此酶，切斷了整個保鈉排鉀與收縮血管的機制。";
          break;
        case "ARB":
          indications = "高血壓、糖尿病腎病變、充血性心臟衰竭。適合無法耐受 ACEI 引起的乾咳患者。";
          sideEffects = "高血鉀、頭痛、頭暈、疲倦、腹瀉。";
          contraindications = "孕婦（禁用）、嚴重肝功能不全、雙側腎動脈狹窄。";
          biochemKnowledge = "高中生物：同樣作用於 RAAS 軸，但在最下游進行攔截。Angiotensin II 必須與細胞膜表面的 G-蛋白偶聯受體 (GPCR) - AT1 受體結合，才會引發細胞內鈣離子釋放造成血管收縮。ARB 像個蓋子把受體罩住，使 Angiotensin II 無用武之地，但因不干擾緩激肽 (bradykinin) 的降解，故極少產生乾咳。";
          break;
        case "CCB":
          indications = "高血壓、穩定型心絞痛、心律不整（部分非二氫吡啶型如 Verapamil）。";
          sideEffects = "便秘、周邊水腫（特別是腳踝）、潮紅、牙齦增生、心悸。";
          contraindications = "嚴重主動脈瓣狹窄、急性心肌梗塞發作、心源性休克。";
          biochemKnowledge = "高中物理與生物：肌肉收縮依賴胞内鈣離子濃度。當胞外 Ca2+ 隨著鈣離子通道流入血管平滑肌，會迅速結合「鈣調蛋白」(Calmodulin)，激活肌球蛋白輕鏈激酶 (MLCK)，引發肌動蛋白與肌球蛋白相對滑動造成收縮。CCB 物理阻斷血管上的 L-type Ca2+ channel，造成平滑肌細胞舒張，血管截面積變大，血液阻力因而大幅大降。";
          break;
        case "β-blocker":
          indications = "高血壓、心律不整、冠狀動脈疾病、心衰竭、偏頭痛預防、甲狀腺亢進症狀緩解。";
          sideEffects = "心跳過慢、疲勞、冷肢、呼吸急促（氣喘誘發）、血糖掩蓋現象、睡眠障礙。";
          contraindications = "氣喘患者（特別非選擇性）、二度或三度房室傳導阻滯、嚴重心因性休克。";
          biochemKnowledge = "高中生物 - 植物與人類自主神經：交感神經釋放去甲腎上腺素與腎上腺素，結合心臟 β1 受體，透過 Gs 蛋白活化腺苷酸環化酶，將 ATP 轉為 cAMP，開啟鈣通道，心肌強力跳動。Beta-blocker 則競爭性阻斷受體結合，降慢心音與心跳，同時阻斷腎臟旁器 JGA 表面的 β1 受體，抑制腎素釋放，阻止水鹽滯留。";
          break;
        case "α1-blocker":
          indications = "高血壓、良性前列腺/膀胱頸肥大引發的排尿困難。";
          sideEffects = "姿勢性低血壓（首劑反應）、頭暈、疲累、心悸、水腫、鼻塞。";
          contraindications = "體位性低血壓病史、嚴重主動脈瓣狹窄、嚴重肝功能不全。";
          biochemKnowledge = "高中生物：去甲腎上腺素與血管平滑肌 surface ligand - α1 受體結合，活化 Gq 蛋白，召喚磷脂酶C (PLC) 水解 PIP2 產生 IP3 和 DAG。IP3 結合到內質網上的鈣通道使內源鈣離子釋放進細胞質。α1 阻斷劑抑制此路徑，使細胞內無 Ca2+ 來促成肌原纖維交聯，進而使尿道平滑肌與全身小動脈同時舒張。";
          break;
        case "Meglitinide":
          indications = "第二型糖尿病（特別針對控制餐後血糖高值）。";
          sideEffects = "低血糖、體重增加、腹瀉、腹痛。";
          contraindications = "第一型糖尿病、酮酸中毒、嚴重肝或腎指數異常。";
          biochemKnowledge = "高中化学與生物：胰臟 β 細胞如何感應血糖？葡萄糖經由 GLUT 流入細胞後產生 ATP，ATP 比值增加會關閉細胞膜表面的「ATP 敏感性鉀離子通道 (K-ATP Channel)」，促使細胞膜去極化，進而開啟電壓敏感性鈣通道(Ca2+ Channel)，游離 Ca2+ 引導胰島素胞吐作用釋出。Glinides 直接結合於 K-ATP 通道並將其關閉，跨過葡萄糖限速，達到極速刺激胰島素釋放效果。";
          break;
        case "TZD":
          indications = "第二型糖尿病（特別是合併肥胖、明顯胰島素阻抗之患者）。";
          sideEffects = "體重增加、體液滯留（水腫）、骨折風險增加（特別女性）、貧血。";
          contraindications = "NYHA 心臟衰竭三～四型、活動性肝炎/肝功能不全、膀胱癌或有病史患者。";
          biochemKnowledge = "高三選修生物 - 基因轉錄調控：TZD 類藥物是細胞核受體 PPAR-γ (Peroxisome Proliferator-Activated Receptor Gamma) 的高親和力配體。結合後，PPARγ 與 RXR 受體形成異二聚體，與 DNA 上的特定反應元件結合，加速轉錄引發 GLUT4、脂蛋白酶等基因表現，大幅增加骨骼肌與脂肪細胞攝取多餘血糖的能力，是「基因轉錄層面」的調控。";
          break;
        case "GLP-1 analog":
          indications = "第二型糖尿病（降糖與心血管疾病防護）、肥胖/體重超重管理（如 Liraglutide）。";
          sideEffects = "噁心嘔吐、腹瀉、食慾不振、胃脹、急性胰臟炎（罕見）。";
          contraindications = "甲狀腺髓樣癌 (MTC) 家族史、多發性內分泌腫瘤綜合徵第二型 (MEN 2)。";
          biochemKnowledge = "高中生物 - 消化道內分泌：人類進食後，空迴腸與結腸的 L 細胞會釋放「腸泌素」GLP-1。但在體內極易被二肽基肽酶-4 (DPP-4) 迅速降解（半衰期極短）。GLP-1 類似物透過胜肽鏈改造（例如接入脂肪酸鏈防止酵素剪切），延長半衰期。結合胰臟 β 細胞受體，促進「葡萄糖感應依賴性」的胰島素分泌，故在空腹、低血糖狀態時不發生刺激，安全係數極高。";
          break;
        case "DPP4-I":
          indications = "第二型糖尿病。";
          sideEffects = "鼻咽炎、頭痛、皮疹、輕微關節痛。";
          contraindications = "對此藥物過敏史、急慢性胰臟炎病史。";
          biochemKnowledge = "高中有機化學與生化 - 活性中心與競爭抑制：DPP-4 是一種主要表現在內皮細胞與白血球表面的絲胺酸蛋白酶，專門辨識並剪切 GLP-1 胜肽鏈 N 端的第 2 個胺基酸丙胺酸(Alanine)或脯胺酸(Proline)。Gliptin 類分子含有脯胺酸類似物，競爭性卡在 DPP-4 的酶活性口袋中心，阻止內源活性 GLP-1 被降解，使我們自己產生的腸泌素濃度自發性延長數倍，健康調節餐後血糖。";
          break;
        case "SGLT2-I":
          indications = "第二型糖尿病、慢性心衰竭（減少心血管死亡與住院）、慢性腎臟病。";
          sideEffects = "尿道及陰道生殖器黴菌感染、多尿、脫水、糖尿病酮酸中毒（罕見/正常血糖型）。";
          contraindications = "嚴重腎功能衰竭（透析患者不適用其降糖機制）、對其過敏。";
          biochemKnowledge = "高中生物 - 腎臟與排泄系統：健康人體的腎小球每天濾出 180 克的葡萄糖，並在近曲小管(proximal tubule)被 100% 重吸收回血管。其中 90% 是由 SGLT2 (Sodium-Glucose Cotransporter 2) 主動協同轉運體（利用二次主動運輸：Na+/K+ 泵建立的鈉離子濃度梯度）把葡萄糖運進內皮。SGLT2 抑制劑阻斷此 cotransporter，尿中糖分隨即暴增（每天排糖約 70~80g），相當於每天用排除尿液的方式流失 300 大卡熱量。";
          break;
        case "HMG-CoA reductase-I":
          indications = "高膽固醇血症、高三酸甘油脂血症、心血管事件一級與二級預防、冠心病穩定。";
          sideEffects = "肌肉酸痛、血清轉氨酶(AST/ALT)上升、頭痛、皮疹、極罕見橫紋肌溶解症。";
          contraindications = "活動性肝病、孕婦與哺乳期婦女（禁用，膽固醇是胎兒大腦與神經 myelin 鞘發育必須）。";
          biochemKnowledge = "高中化學與生物 - 細胞脂質與酶反應：體內 80% 膽固醇是肝臟自行合成，僅 20% 來自飲食。肝臟合成路徑中，乙醯輔酶A經過多步轉化生成 HMG-CoA，此時「HMG-CoA還原酶」是決定性的一步：催化其還原成甲羥戊酸 (Mevalonate)。Statin 分子的結構酷似 HMG-CoA，能競爭性咬合該酵素活性位點，停擺合成。細胞因缺膽固醇，會代償性過度表現細胞膜 surface 上的 LDL 受體，大量吸納、分解走血循環中的低密度脂蛋白。";
          break;
        case "Fibric acid derivatives":
          indications = "嚴重高甘油三酯血症（防範急性胰臟炎發作）、混合型高脂血症。";
          sideEffects = "胃腸不適、肌痛、膽結石風險增加、肝功能異常。";
          contraindications = "嚴重腎功能不全、膽囊疾病、嚴重肝病。";
          biochemKnowledge = "高中生物與化學：Fibrates 作用於核受體 PPARα（過氧化體增殖劑活化受體 A）。PPAR-A 活化後會啟動與自由脂肪酸氧化相關的基因轉錄，並增加「脂蛋白脂肪酶 (LPL)」在微血管內皮的外顯率。LPL 的工作就像血管壁上的剪刀，會猛烈將乳糜微粒 (Chylomicron) 和極低密度脂蛋白 (VLDL) 裡頭的核心甘油三酯解離成甘油與脂肪酸，大幅消除血中游離油脂。";
          break;
        case "PCSK9-I":
          indications = "原發性高膽固醇血症（包括遺傳型雜合子高膽固醇血症）、已有心血管病之降脂治療。";
          sideEffects = "注射部位反應（紅腫痛）、流感樣症狀、輕微背痛。";
          contraindications = "對單株抗體活性成分嚴重過敏者。";
          biochemKnowledge = "高中生物 - 內吞作用與受體再循環：正常的 LDL 受體 (LDLR) 捕捉完血中 LDL 膽固醇後，會整顆內吞進內質體。在酸性環境下 LDL 脫屑，受體會重新循環返回細胞膜。然而，肝細胞會分泌一種蛋白稱為 PCSK9，它會跟 LDLR 緊鎖在一起。內吞後，PCSK9 會引導整個細胞溶酶體把受體一併溶解，無法循環。PCSK9 抑制劑為單攻單株抗體，鎖死 PCSK9，促使 LDL 受體能反覆循環使用 150 次以上，驚人地降低降血脂。";
          break;
        case "肝素衍生物":
          indications = "深靜脈血栓 (DVT)、肺栓塞 (PE) 的預防與治療、急性心肌梗塞輔助。";
          sideEffects = "出血、血小板低下（HIT 原發反應）、骨質疏鬆（長期注射）。";
          contraindications = "活動性大出血、血友病、重度未控制的高血壓、血小板極度低下。";
          biochemKnowledge = "高中生物 - 血液與防禦系統：正常血液中存在防禦血栓的「抗凝血酶 III」(Antithrombin III)。它平常作用極慢，只有在遇到內皮硫酸乙醯肝素時活性才猛增。肝素 (Heparin) 是一條高度帶負電的黏多醣鏈（其表面帶有大量帶負電的硫酸基），結合 AT-III 的鹼性胺基酸，使其分子構型瞬間翻轉，把活性中心暴露，能加速將 Xa 因子、IIa 因子鎖死。";
          break;
        case "抑制凝血因子Xa":
          indications = "非瓣膜性心房顫動患者預防中風、靜脈血栓栓塞症 (VTE) 的防範與治療。";
          sideEffects = "出血（牙齦、皮下紫斑、尿血等）、輕微貧血。";
          contraindications = "活動性臨床大出血、伴有凝血障礙之嚴重肝病。";
          biochemKnowledge = "高三生物 - 凝血瀑布機制：凝血瀑布分為內源與外源。這兩條路徑最終在「因子Xa」那裡合流為共同路徑。Xa 因子負責拉動凝血酶原活化複合物 (Prothrombinase)，將不活潑的複合物 II (凝血酶原) 剪切為活耀的 IIa (凝血酶)。由於 Xa 是瀑布的匯流大壩（1個Xa分子可放大生成 1000個凝血酶），Xaban 直接抑制 Xa，就像在大壩下游築牆，比傳統抑制單一凝血酶更能全面控制栓塞形成，且出血率更安全。";
          break;
        case "抑制凝血因子II":
          indications = "預防非瓣膜性房顫中風、靜脈血栓栓塞 DVT 預防（骨科術後）。";
          sideEffects = "出血、消化不良、胃痛（Dabigatran 膠囊含酒石酸酸核，可能刺激胃壁）。";
          contraindications = "活動性出血、嚴重腎衰竭（該藥主要靠腎臟排泄）、人工心臟瓣膜患者。";
          biochemKnowledge = "高中生物：抗凝血反應的最末端。凝血酶 (Thrombin, Factor IIa) 的核心任務就是把水溶性的「纖維蛋白原」(Fibrinogen) 分子上的小游離端剪掉，使其轉為不可溶的「纖維蛋白單體」(Fibrin monomer) 並自發聚合成網織血塊，捕捉紅血球。Gatr 類或 Desirudin 就像螺絲帽，死死卡住凝血酶的催化三聯體結構，促使血小板和細菌纖維無法被網織固化。";
          break;
        case "抑制ADP/P2Y12":
          indications = "急性冠心症候群 (ACS)、近期中風或外周動脈疾病患者預防動脈粥樣硬化血栓形成，常與阿斯匹靈合併使用。";
          sideEffects = "出血、青斑、呼吸困難（Ticagrelor 容易誘發）、中性白血球減少。";
          contraindications = "活動性顱內出血或消化道大出血、嚴重的肝臟功能不全。";
          biochemKnowledge = "高中生物：血管損傷暴露膠原蛋白時，首批奔赴的血小板會被活化，釋放胞內儲存密集的「ADP（腺苷二磷酸）」。釋出的 ADP 會結合到其他周圍血小板的 P2Y12 偶聯受體，大量動員內膜上的鈣，進而誘導血小板形狀改變（長出大量偽足）並把 GPIIb/IIIa 受體立起來相互手牽手。P2Y12 拮抗劑徹底封鎖此受體，阻斷整個血小板雪崩式召喚的瀑布效應。";
          break;
        case "H2-blocker":
          indications = "胃潰瘍、十二指腸潰瘍、逆流性食道炎、胃酸過多。";
          sideEffects = "頭痛、腹瀉、疲倦、少數男性女乳化（Cimetidine 有抗雄性素副作用，新一代 H2 blocker 無）。";
          contraindications = "對本類藥物過敏，可能掩蓋胃癌引起的症狀。";
          biochemKnowledge = "高中生物 - 胃的生理學：胃壁細胞分泌鹽酸(HCl)受到三種神經/體液訊號引導：副交感分泌的乙醯膽鹼(ACh)、G細胞分泌的胃泌素、以及ECL細胞釋放的「組織胺」(Histamine)。組織胺會結合 H2 受體，活化 Gs 蛋白，促使腺苷酸環化酶活化產生 cAMP，進而調動 H+/K+ 泵運作。H2 拮抗劑能將此放大通道的主幹切斷，能抑制約 70% 的日間與夜間夜間酸分泌。";
          break;
        case "PPI":
          indications = "消化性潰瘍（胃與十二指腸）、胃食道逆流 (GERD)、幽門螺桿菌根除三合一療法、Zollinger-Ellison 綜合徵（胃泌素瘤）。";
          sideEffects = "頭痛、腹瀉、便秘、長期服用可能阻礙維生素 B12、鈣與鐵的吸收（因缺酸無法離子化）。";
          contraindications = "對 Omeprazole 等藥物成分嚴重過敏者的重度反應，不宜與需要高酸度吸收的抗黴菌藥共服。";
          biochemKnowledge = "高中化學與生物：不管壁細胞受到 Histamine、ACh 還是 Gastrin 多強烈催促，胃酸分泌的最後關卡只有唯一一個：位於壁細胞酸性小管上的「氫離子／鉀離子共同轉運幫浦 (H+/K+-ATPase)」，也就是俗稱的「質子泵」。它消耗一個 ATP，逆著百萬倍濃度梯度強行把胞內 H+ 泵乾到胃腔。PPI 為弱鹼性前驅藥，能高度靶向濃縮在極酸的胞器管腔中，活化成活性親電體，與質子泵上的半胱胺酸(Cysteine)硫氫基形成不可逆的「共價二硫鍵」，徹底敲毀泵結構、關閉最後總閥。";
          break;
        case "β2-agonist":
          indications = "支氣管哮喘、慢性阻塞性肺病 (COPD)引起的氣管狹窄、氣候性氣喘預防。";
          sideEffects = "心悸（高劑量部分作用在 β1）、骨骼肌顫抖、低血鈉（長效長期過載）、頭痛。";
          contraindications = "嚴重缺血性心臟病、心律不整、嗜鉻細胞瘤。";
          biochemKnowledge = "高中生物：支氣管張縮受自主神經支配。副交感神經刺激 M 受體收縮，而交感神經經由 β2 受體鬆弛平滑肌。當藥物結合 β2 受體，Gs-cAMP 訊號轉導途徑啟動。cAMP 活化蛋白質激酶A (PKA)，PKA 會對肌球蛋白輕鏈激酶 (MLCK) 進行磷酸化使其「失去活性」，並且加速將胞質鈣離子泵回肌漿網。胞質 Ca2+ 枯竭且 MLCK 停工，氣管肌肉自然舒展張開。";
          break;
        case "LTRA":
          indications = "過敏性氣喘長期控制、預防運動誘發之支氣管收縮、過敏性鼻炎。";
          sideEffects = "頭痛、胃腸不適、偶爾發生幻覺或睡眠多夢等神經精神反應。";
          contraindications = "急性氣喘大發作（其作用緩慢，完全不能用於急救）、對白三烯素受體抗劑過敏史。";
          biochemKnowledge = "高中生物 - 免疫與發炎反應：過敏原結合肥大細胞表面的 IgE 抗體時，會誘發花生四烯酸代謝釋放極強的炎性油脂——「白三烯素 (Leukotrienes, LTs)」。白三烯素（特別是 LTD4）的收縮支氣管威力是組織胺的 1000 倍以上！且會誘發黏膜產生大量濃痰。Montelukast 會競爭性阻斷 LTC4/LTD4 與 CysLT1 受體，使過敏介質無法引發氣管內黏膜水腫與管道變窄。";
          break;
        case "巴比妥酸鹽類":
          indications = "麻醉誘導（如 Thiopental）、頑固性癲癇、嚴重腦傷後控制腦壓（現已不當一般安眠藥）。";
          sideEffects = "高度嗜睡、呼吸抑制（危及生命）、成癮性、生理依賴、停藥反彈。";
          contraindications = "急性間歇性紫質症（會誘導 ALA 合成酶）、嚴重呼吸功能不全、重症肌無力。";
          biochemKnowledge = "高中生物 - 神經衝動與突觸：神經抑制最仰賴 GABA 遞質與 GABAA 型配體門控氯通道。當通道開啟，Cl- 順著濃度差流入突觸後神經，使電位更為負值（超極化），進而徹底熄滅神經動作電位。巴比妥酸鹽直接結合在通道的非異位區，不但增強 GABA 親和力，而且在 GABA 缺席時也能自行開啟通道，且迫使其開放的「總時間」大幅度延長，使氯離子無止盡大量湧入。這會全面熄滅大腦皮質與延腦呼吸中樞，危險性極高。";
          break;
        case "BZD":
          indications = "失眠症、急性焦慮狀態、肌肉痙攣、酒精戒斷綜合徵、癲癇重積狀態。";
          sideEffects = "日間宿醉感、共濟失調（步態不穩、易跌倒）、短暫失憶、耐受性與生理依賴。";
          contraindications = "重症肌無力、急性閉角性青光眼、嚴重睡眠呼吸中止症。";
          biochemKnowledge = "高中生物 - 突觸傳遞：與巴比妥類不同，BZD 分子結合在突觸後膜 GABAA 受體的 α 和 γ 亞基交界處的異位調節區。它自己並不能在沒有 GABA 時開啟離子通道；但當 GABA 與通道結合時，BZD 會產生別構調控，讓通道開啟的「頻率」顯著升高。這意味著它只是放大了身體原有的抑制訊號，有自限保護效益。";
          break;
        case "non-BZD":
          indications = "短期治療入睡困難之失眠症。";
          sideEffects = "夢遊（複雜睡眠行為）、隔日味苦或口乾、輕微頭痛、幻覺。";
          contraindications = "夢遊史患者（絕對禁用，易引發無意識夢遊危險）、嚴重呼吸功能不全、小兒及孕婦。";
          biochemKnowledge = "高三生物 - 大腦皮質分區與受體亞型：GABAA 性受體複合物在大腦各區有不同亞基結構。含有 α1 的受體主導大腦的「催眠、安眠與鎮靜」作用，而含有 α2, α3, α5 的則負責「放鬆肌肉、抗焦慮與抗癲癇」。BZD 類是抓著所有亞型無差別通殺（所以睡醒全身軟綿綿易摔倒）；而 Z-drugs (如 Zolpidem) 對含有 α1 亞型的受體高度靶向，精確誘導入睡，完全不鬆弛肌肉與抗癲癇，故隔日無力、宿醉感極輕，但因單點高度抑制催眠，易使部分患者的大腦進入不協調的半醒夢遊狀態。";
          break;
        case "NNRTI":
          indications = "HIV-1 感染（需要與其他抗反轉錄藥物聯合組成三合一「雞尾酒療法」）。";
          sideEffects = "嚴重皮疹（可能惡化為 Stevens-Johnson 綜合徵）、肝毒性、發燒、頭痛。";
          contraindications = "對 Nevirapine 嚴重過敏史、中重度肝功能損傷。";
          biochemKnowledge = "高中生物：愛滋病毒 (HIV) 屬於反轉錄病毒 (Retrovirus)。宿主沒有這種將 RNA 反向轉錄為單股 DNA 的「反轉錄酶 (Reverse Transcriptase)」。NNRTI 為非競爭性抑制劑，結合在反轉錄酶酶活性中心後方的一個疏水結構口袋（稱為 NNRTI 結合口袋, BP）。這個結合會引發酶的三維構型物理扭曲或僵化，致其催化中心彈性喪失，使病毒 RNA 鏈無法配對轉錄。";
          break;
        case "抑制蛋白酶":
          indications = "HIV-1 感染，近年也常作為強效 CYP3A4 抑制劑「增強劑」來提高其他蛋白酶抑制劑血中濃度（如 Paxlovid 復方中的 Ritonavir 增效作用）。";
          sideEffects = "高血糖與脂肪代謝異常（水牛背、中央肥胖）、腹瀉吐、周邊神經病變。";
          contraindications = "不宜與高度依賴 CYP3A4 代謝且過載致死的藥物（如 Amiodarone）共服。";
          biochemKnowledge = "高中生物：病毒在宿主核糖體轉譯出的產物是一整條無活性的巨型「前體多肽鏈」(Gag-Pol polyprotein)。必須經由病毒自己專屬的「天冬氨酸蛋白酶」(HIV protease) 將其精準剪切成 reverse transcriptase、integrase、gp120 等各功能小片段，病毒才能組裝與成型。蛋白酶抑制劑利用仿胜肽結構卡死蛋白酶，細菌剪刀折斷，新釋放的病毒因缺乏核心功能蛋白而全數失去感染力。";
          break;
        case "Integrase-I":
          indications = "HIV-1 感染（聯合雞尾酒療法核心組合生物）。";
          sideEffects = "失眠、頭痛、噁心、罕見的橫紋肌溶解症、輕度抑鬱。";
          contraindications = "對 Raltegravir 嚴重過敏者。";
          biochemKnowledge = "高中生物 - 遺傳學：病毒單股 DNA 反轉錄完成並在胞質雙鍊化後，會由「整合酶 (Integrase)」打包成前整合複合物 (PIC) 並護送入細胞核。整合酶會將宿主 DNA 雙股各剪切開 2~5 個鹼基，將病毒 DNA 兩端與宿主切口縫合，使 HIV 基因庫與人類完全融為一體，達成無休止終身複製催化。整合酶阻斷劑 (InSTI) 能螯合整合酶活性中心上的雙價金屬陽離子（Mg2+ 或 Mn2+），促使切割與拼接功能完全崩潰。";
          break;
        case "NS3/4A PI":
          indications = "慢性 C 型肝炎（基因 1 或 4 型等口服 DAAs 根治組合）。";
          sideEffects = "光敏感性（易曬傷）、皮疹、噁心、暫時性膽紅素升高、瘙癢。";
          contraindications = "中重度肝損害（Child-Pugh B或C）、禁止單獨使用、不宜與 CYP3A 誘導劑共服。";
          biochemKnowledge = "高三生物：C 型肝炎病毒是由單股正鏈 RNA (+ssRNA) 組成的套膜病毒。轉譯時，NS3 蛋白是一個帶有絲胺酸蛋白酶結構域的酵素，NS4A 則是它的輔助輔因子，兩者組成的複合體專門在 C 肝病毒多肽的前 4 個特定切點橫切。Simeprevir 直接覆蓋阻斷這把剪刀，使 HCV 的非結構功能蛋白（NS3, NS4A, NS4B, NS5A, NS5B）全部粘在一團而直接降解。";
          break;
        case "NS5A PI":
          indications = "慢性 C 型肝炎（全基因型 DAA 根治雞尾酒，如丙通沙成分）。";
          sideEffects = "頭痛、 fatigue （疲倦）、噁心、貧血（部分聯合 Ribavirin 時）。";
          contraindications = "禁止與強效 CYP3A4 誘導劑聯用，可能降低藥效。";
          biochemKnowledge = "高中生物：C肝病毒的 NS5A 是一種磷酸化親膜糖蛋白，本身沒有明顯的酶催化活性，但它是全套病毒複製工廠（RNA 複製複合物）的物理支架，主導將新生 RNA 鏈從複製中心轉移給宿主內質網外表的病毒衣殼進行裝配。Daclatasvir 與 NS5A 的對稱結構特異性接合，瞬間使這個複製底座崩解，病毒無法搭建裝配流水線。";
          break;
        case "NS5B PI":
          indications = "慢性 C 型肝炎（根治方案的核心成分，如 Sofosbuvir，Dasabuvir 等）。";
          sideEffects = "疲倦、頭痛、噁心、失眠、紅血球下降。";
          contraindications = "不得與強效 P-gp 誘導劑聯用（如聖約翰草、Rifampin）。";
          biochemKnowledge = "高三生物 - 分子生物學：C 肝病毒自我複製最關鍵的工具是 RNA 依賴性 RNA 聚合酶 (NS5B RdRp)。這與我們人類用 DNA 轉錄 RNA 的 DNA 依賴性 RNA 聚合酶截然不同。NS5B 阻斷劑往往經過精密的核苷酸結構修飾，它會主動充當 NS5B 聚合酶的底物伪裝（假的三磷酸尿苷），在 RdRp 將其誤組裝進新合成的 RNA 鏈後，會立刻阻斷下一個核苷酸的接入，使 HCV 遺傳鏈合成「斷尾止步」。";
          break;
        case "1代":
          indications = "皮膚與軟組織感染、手術前預防感染、泌尿道感染。對革蘭氏陽性菌強力殺滅。";
          sideEffects = "過敏反應（皮疹、蕁麻疹）、胃腸不適（腹瀉）、注射部位疼痛、輕度肝腎功能暫時波動。";
          contraindications = "曾發生對頭孢菌素類或青黴素類抗生素嚴重過敏性休克（Anaphylaxis）者。";
          biochemKnowledge = "選修生物 - 原核細胞與肽聚糖細胞壁：細菌之所以能在極高的胞內滲透壓下不脹破，全靠由 N-乙醯葡萄糖胺和 N-乙醯胞壁酸交替排列、並由五胜肽鏈交聯支撐的堅硬細胞壁。細菌在增殖時，必須利用轉肽酶 (Transpeptidase, 即青黴素結合蛋白 PBP) 把多肽鏈互相交聯、編織。第一代頭孢菌素分子結構中的 β-lactam 環結構極像轉肽酶的天然底物 D-Ala-D-Ala。轉肽酶誤與藥物共價結合後，活性受損，細菌無法交聯新細胞壁，在自溶酶作用下，菌體吸水膨脹物理炸裂死亡。";
          break;
        case "3代":
          indications = "嚴重骨盆腔、下呼吸道（肺炎）、腦膜炎、敗血症、腹腔及複雜泌尿道感染。對 G- 陰性菌極佳。";
          sideEffects = "消化道腹瀉（殺滅正常腸道菌群可能引發偽膜性腸炎）、嗜酸性粒細胞增多。";
          contraindications = "新生兒高膽固醇血症（Ceftriaxone 可能與鈣劑沉澱造成嚴重新生兒肺腎沉積）。";
          biochemKnowledge = "選修生物 - 細菌抗藥性機制：革蘭氏陰性菌外膜有孔道蛋白，且常分泌青黴素酶/β-lactamase 來將抗生素的內醯胺環剪斷。第三代頭孢分子在 C-7 位側鏈引入了帶有高度親水性及對 β-內醯胺酶具有強大立體阻礙的基團（例如甲氧亞氨基）。這使得它既能順利穿過陰性菌的孔道蛋白，又讓細菌的 β-lactamase 「咬不動」藥物，因而對抗藥性細菌有極佳的穿透殺壞力。";
          break;
        case "4代":
          indications = "院內多重抗藥性細菌重度感染、中性白血球低下併發發燒、複雜腹腔與腎盂腎炎。";
          sideEffects = "皮疹、腦病變（高劑量且腎功能不全長者，出現抽搐、意識模糊）、腹瀉。";
          contraindications = "嚴重過敏史、重度腎衰竭未調整劑量。";
          biochemKnowledge = "選修生物：第四代頭孢菌素（如 Cefepime）具有獨特的「雙離子分子（Zwitterion）」特性。這代表其一端帶正電荷，另一端帶負電荷，總電中性。這種構造能讓藥物以極高密度的速度快速「滑過」革蘭氏陰性菌外膜上密布的 OmpF/OmpC 孔道蛋白，在幾秒鐘內滲入周質腔，同時與內膜 PBPs 結合親和度比三代高十倍，還能牢牢抵抗去極化耐受。";
          break;
        case "5代":
          indications = "耐甲氧西林金黃色葡萄球菌 (MRSA) 引起的複雜皮膚和軟組織感染、社群獲得性肺炎。";
          sideEffects = "噁心、腹瀉、搔癢、偶爾引發庫姆斯試驗 (Coombs test) 陽性（抗體附著紅血球導致溶血可能性）。";
          contraindications = "重度頭孢類過敏史患者。";
          biochemKnowledge = "選修生物 - 遺傳突變與靶點變異：金黃色葡萄球菌之所以對幾乎所有青黴素和前四代頭孢產生抗藥性 (MRSA)，是因為其獲取了 mecA 基因，表達出一種結構變異的青黴素結合蛋白 —— PBP2a。PBP2a 結構的活性位點被深埋在分子溝槽內，前幾代抗生素因分子長度或構型不對，無法與其結合。第五代頭孢菌素 (Ceftaroline) 的側鏈經特殊結構設計，能精準與 PBP2a 溝槽外部發生結合，誘發其蛋白質結構別構改變，把隱藏的活性中心大步亮出，使藥物能順利共價結合併終結細菌。";
          break;
        default:
          indications = "一般臨床適應症。";
          sideEffects = "請遵醫囑注意副作用。";
          contraindications = "有過敏史者禁用。";
          biochemKnowledge = "高中生物：調控人體細胞或抑制致病原增殖。";
      }

      ALL_DRUGS.push({
        id: `drug_${ALL_DRUGS.length + 1}`,
        name: ex.name,
        chineseName: ex.chinese,
        prefixSuffix: pat.pattern,
        category: pat.categoryName,
        disease: pat.diseaseGroup,
        indications,
        contraindications,
        sideEffects,
        biochemKnowledge
      });
    });
  });
});


export const highSchoolLessons: HighSchoolLesson[] = [
  {
    id: "lesson_raas",
    title: "RAAS(腎素-血管收縮素-醛固酮)系統與高血壓藥物",
    targetSubject: "生物 (內分泌與恆定)",
    difficulty: "進階",
    intro: "RAAS 系統是人體調控外周阻力與血容量的關鍵反饋環路。高中生物提及腎上腺、血壓跟腎小管重吸收，在生醫界中，這五種截然不同的降血壓藥字首與字尾正是圍繞著這個精密的系統設計！",
    mechanismDiagram: "【血壓偏低/腎灌流不足】➔ 腎臟 JGA 分泌 ➔ 【腎素 (Renin)】\n" +
      "                              ⬇\n" +
      "               血管收縮素原 (肝) ➔【血管收縮素 I (無活性)】\n" +
      "                              ⬇ ⬅ 【ACEI 阻斷此步 (-pril)】\n" +
      "                    【血管收縮素 II (強效收縮 & GPCR 激活)】 ⬅ 【ARB 阻斷此受體 (-sartan)】\n" +
      "                              ⬇\n" +
      "                    促使【腎上極皮質】分泌 ➔ 【醛固酮 (Aldosterone)】\n" +
      "                              ⬇\n" +
      "                【遠曲小管/集尿管】 ➔ 保納排鉀、重吸收水 ➔ 【血容量升高、血壓回升】",
    biochemPathway: [
      "當人體失血、缺鈉或灌流壓降低時，入球小動脈的近腎小球細胞(JGA)會釋放天冬胺酸蛋白酶——腎素(Renin)。",
      "腎素會剪切血液中的血管收縮素原(Angiotensinogen)，產生無收縮活性的十肽——血管收縮素 I (Angiotensin I)。",
      "肺血管內皮細胞、腎血管表面大量的「血管收縮素轉化酶」(ACE) 會剪去兩個胺基酸，使其成為強烈的八肽——血管收縮素 II (Angiotensin II)。",
      "血管收縮素 II 作用於血管平滑肌 AT1 受體，促使外周小動脈劇烈收縮，並促使腎上腺皮質釋放醛固酮促進遠曲小管吸鈉排鉀，帶起大量水分重吸收，造成血容量與血壓暴增。",
      "藥物切入點：【-pril】字尾(ACEI) 直接阻斷轉化酶，【-sartan】字尾(ARB) 直接卡住 AT1 受體阻斷作用；而【-olol, -lol】(Beta-blocker) 則是阻斷心臟上與 JGA 表面的 β1 受體，從最上源直接抑制腎素的分泌。"
    ],
    highSchoolLink: "一○八課綱高中隨修生物：人體的循環、內分泌系統以及排泄與恆定機制。",
    chemicalStructureConcept: "ACEI 分子如 Captopril 多含有巰基 (Sulfhydryl group)，能與 ACE 活性中心內含的必須催化性鋅離子 (Zn2+) 發生強烈的配位螯合作用，從而使酶失效。"
  },
  {
    id: "lesson_insulin",
    title: "胰島素分泌與 SGLT2-SGLT1 腎臟葡萄糖重吸收化學機制",
    targetSubject: "生物與化學 (主動運輸與熱力學)",
    difficulty: "基礎",
    intro: "降血糖藥不僅有促使胰島細胞擠出胰島素的藥物，更有最新突破性的「排糖藥」（-gliflozin），能在不依賴胰島素的情況下，透過腎臟「主動運輸物理截留」將糖排出！",
    mechanismDiagram: "【血流通往腎小球濾過】➔ 100% 葡萄糖進入 【原尿】\n" +
      "                                       ⬇\n" +
      "           近曲小管壁細胞 SGLT2 (Na+/Glucose 協同轉運) ⬅ 【SGLT2 抑制劑阻斷 (-gliflozin)】\n" +
      "                                       ⬇\n" +
      "          正常重吸收受阻 ➔ 【每日排 70-80 克葡萄糖至尿液中】 ➔ 血糖自發性降低、不需胰腺干擾",
    biochemPathway: [
      "腎小球濾過的液體（原尿）含有高濃度葡萄糖，如果在排出前不收回，人體將流失能量。100% 的葡萄糖重吸收發生在腎臟近曲小管段。",
      "這裡的內皮細胞膜上存在「鈉-葡萄糖協同轉運蛋白2」(SGLT2)。這是一種「主動運輸（二次主動運輸）」，其驅動力並非直接水解 ATP，而是藉由細胞底膜上的 Na+/K+-ATPase 消耗 ATP 將鈉離子泵出胞外，在細胞內外建立一個巨大的「電化學鈉濃度梯度」。",
      "SGLT2 利用這個外高內低的鈉離子傾角勢能，像個旋轉門一樣，順便把濾過液中的葡萄糖逆著濃度差「強制協同」拉回細胞內，隨後在底側由 GLUT2 經由便利擴散釋放回血循環。",
      "藥物切入點：【-gliflozin】(SGLT2-I) 能與 SGLT2 發生競爭性卡位。當重吸收受阻，多餘的葡萄糖就會隨著尿液排出。每毫升尿糖排除帶來 4 大卡的熱量釋出，進而達到降糖與減重降壓的效果，堪稱不依賴胰臟細胞的物理降糖神藥。"
    ],
    highSchoolLink: "高中生物與選修化學：細胞膜的物質跨膜運輸、二次主動運輸機制、重吸收作用。",
    chemicalStructureConcept: "-gliflozin 分子是高度改裝的葡萄糖苷類似物（C-糖苷結構）。這代表其本體是一個葡萄糖環，但原本容易被水解的 C-O 糖苷鍵被改成極其穩固的 C-C 共價鍵，促使腎臟的糖外水解酶「切不斷」它，得以持久咬在 SGLT2 的結合孔中。"
  },
  {
    id: "lesson_statin",
    title: "酶競爭性抑制與肝臟膽固醇合成限速酶 (-statin)",
    targetSubject: "化學 (化學反應速率與酵素動力學)",
    difficulty: "進階",
    intro: "身體內高達 8 成的膽固醇是由肝臟細胞親自動手合成。這條合成路徑包含 30 幾步酵素催化結構，其中最重要也最核心的限速酶催化阻斷，便是 Statins 降血脂藥大展身手的領域！",
    mechanismDiagram: "【2 乙醯輔酶A】➔ ➔ ➔ 【HMG-CoA (羥甲基戊二酸單醯輔酶A)】\n" +
      "                              ⬇\n" +
      "               ❌ 【HMG-CoA 還原酶 (Reductase)】 ⬅ 競爭性抑制阻斷抗衡 【Statin 藥物】\n" +
      "                              ⬇\n" +
      "                   【甲羥戊酸 (Mevalonate)】 ➔ ➔ ➔ 【生化膽固醇】\n" +
      "                              ⬇ (細胞內膽固醇銳減)\n" +
      "         【肝細胞膜表面過表達 LDL 內吞捕捉受體】 ➔ 【瘋狂清除循環血中低密度脂蛋白】",
    biochemPathway: [
      "膽固醇是生物膜流動性、維生素D與類固醇類荷爾蒙（如睪固酮、皮質醇）的重要材料。在肝臟中，它由小分子乙醯輔酶A一步步縮合。",
      "在此三十級階梯中，將 HMG-CoA 還原為甲羥戊酸(Mevalonate) 的步驟最慢，故這一步的催化活性決定了整條膽固醇生產線的總速度。此反應由 HMG-CoA 還原酶掌控。",
      "Statin 降血脂分子的結構，有很大一個特徵是包含一個類似 HMG 活性底物的「羥基酸二羥基」類似物。這個構造在立體上與酵素高度親和！",
      "Statins 會捷足先登咬住還原酶的活性配基空腔。由於藥物的親和力足足高出天然底物數萬倍，HMG-CoA 無法與之接觸，膽固醇合成線遂徹底停工。",
      "生化聯接：由於胞內膽固醇大減，肝細胞核內的 SREBP 蛋白釋放並活化，轉錄出多十倍的 LDL 受體。這些受體大量嵌在細胞膜上，將血液中高危險性、容易引發硬化的低密度脂蛋白 LDL 「内吞降解」，從而驚人地改良血脂結構。"
    ],
    highSchoolLink: "選修化學：酶的特性與催化機制、化學反應速率與抑制劑（競爭性抑制 vs 非競爭性抑制）。",
    chemicalStructureConcept: "Statins 被吸收後在體內水解，暴露出一個類似開環甲羥戊酸(Mevalonic acid)的活性基團。它在三維幾何上與還原酶活性中心裡的三羧酸殘基、組胺酸等形成多重親水氫鍵及離子鍵，並將疏水側鏈卡在酶的疏水通道中，牢不可破。"
  },
  {
    id: "lesson_gaba",
    title: "GABA-A 受體離子通道突觸後抑制與鎮靜安眠藥理",
    targetSubject: "生物 (神經傳導與突觸電位學)",
    difficulty: "進階",
    intro: "在大腦裡，神經元不只有興奮，更需要穩定的抑制來防範過載和焦慮。鎮靜安眠藥（BZD, 巴比妥, Z-drugs）正是利用了生物化學中最精妙的配體門控氯離子通道異位調節，讓心靈重歸寧靜！",
    mechanismDiagram: "突觸前傳送 ➔ 釋放遞質 ➔ 【GABA (γ-胺基丁酸)】\n" +
      "                             ⬇\n" +
      "           與突觸後膜配體門控離子通道 【GABA-A 受體複合物】 結合\n" +
      "                             ⬇ ⬅ 【BZD 結合異位點 ➔ 增加通道開啟頻率 (-azepam, -azolam)】\n" +
      "                             ⬇ ⬅ 【Z-drugs 選擇性結合 α1 亞單元 ➔ 僅誘安眠 (Zolpidem)】\n" +
      "                             ⬇ ⬅ 【Barbiturates 增加開啟時間/直接開通 (-barbital)】\n" +
      "                  【氯離子 (Cl-) 大量流入突觸後神經元】\n" +
      "                             ⬇\n" +
      "                  突觸後膜超極化 ➔ 阻斷去極化動作電位 ➔ 【神經活性全面放鬆、疲睏及安眠】",
    biochemPathway: [
      "大腦最核心的抑制性神經遞質是 γ-胺基丁酸 (GABA)。當 GABA 由上一級突觸釋放並跨越間隙結合到突觸後膜的 GABA-A 受體上時，離子通道形變打開。",
      "GABA-A 受體是一個五聚體跨膜醣蛋白，其中間部分是一個能讓陰離子通過的巨大孔道。在正常生理下，細胞外的氯離子 (Cl-) 濃度遠高於細胞內。",
      "通道開啟後，帶負電荷的氯離子順著電化學梯度迅速湧入神經細胞質中，使得突觸後細胞內的靜止電位變得更負，產生了強大的「超極化突觸後電位 (IPSP)」，使任何興奮性電位都無法將其去極化。動作電位就此熄滅、神經元沈默。",
      "藥物調控分水嶺：\n" +
      "  - 【-barbital】(巴比妥類)：直接狂野開啟 Cl- 通道並拉長開放「時間」，甚至不需內源GABA。危險度高，易抑制呼吸。\n" +
      "  - 【-azepam / -azolam】(BZD)：結合於旁側異位點，增加 GABA 引起通道開放的「頻率」，需 GABA 協同，安全範圍較好，但肌肉與抗焦慮均放鬆。\n" +
      "  - 【Z-drugs】(Zolpidem等)：只認準含有 α1 亞基的睡眠專屬受體。完全不影響肌肉，僅負責將睡眠神經在幾分鐘內一鍵休眠，不宿醉。"
    ],
    highSchoolLink: "高中生物與選修生物：神經元的軸突電位、突觸神經遞質、配體門控性離子通道與電位變化。",
    chemicalStructureConcept: "BZD 分子含有一部分不對稱的苯環共軛與七元 diazepine 環組成的扁平多元剛性結構，能夠以精準的側基夾角嵌入配體受體亞單元的交叉凹槽中，引發變構效應。"
  }
];

export const healthTips: HealthTip[] = [
  {
    id: "tip_1",
    title: "抗生素（頭孢菌素）必須吃滿完整療程！",
    summary: "不可因症狀改善就擅自停藥，否則未被消滅的細菌會突變演化成具有頂級抗藥性的超級細菌。",
    category: "服藥安全",
    checklist: [
      "即使不發燒、傷口不紅腫了，仍務必遵醫囑將處方的抗生天數全部吃完。",
      "定時定量服用（如一日三次即每8小時一次），維持穩定的血中抗生素殺菌濃度。",
      "遺漏服藥時若已接近下次服藥時間，請服一次量即可，千萬不要吃雙倍劑量，以免藥物濃度過載中毒。"
    ],
    content: "抗生素是人類對抗細菌病害的偉大武器，但細菌也是具備適應能力的活生物。在服用抗生素的首 1-2 天，體內 90% 最敏感的病原細菌就會死亡，此時你會感到症狀大為減輕。但剩下那 10% 的頑強細菌正在與體內的抗生素頑強搏鬥。如果你此時私自停藥，這批「殘餘精兵」將會依據抗生素的分子缺陷產生結構突變（如合成 β-lactamase 內醯胺酶或變異 PBPs 配體），一旦重新繁殖，將演化成當下抗生素完全無效的超級抗藥性死株，並傳染給家人。"
  },
  {
    id: "tip_2",
    title: "高血脂藥（降脂Statins）與「葡萄柚汁」的絕對禁忌",
    summary: "葡萄柚含有強效抑制肝臟 CYP3A4 代謝酶的成分，兩者共服會導致藥物在體內累積數倍、大幅提高肌肉毒性。",
    category: "生活飲食",
    checklist: [
      "服用 Statin 類藥物、鈣離子阻斷劑降血壓藥時，一律避免飲用葡萄柚汁或食用柚子。",
      "即使「隔開 12 小時以上」服用仍然不安全！因為葡萄柚對酵素的抑制是不可逆的，肝臟需要 2-3 天才能重新合成新的酵素。",
      "若出現不尋常的肌肉酸痛、深褐色（可樂色）尿液，請立即就醫並抽血檢測肌酸激酶 (CK)。"
    ],
    content: "許多藥物（例如 Lovastatin, Simvastatin, CCB 盤尼西林血管擴張劑 Amlodipine）在口服後，必須經過肝臟和小腸中一種名為 CYP3A4 的細胞色素 P450 酶進行首關代謝，去除多餘藥量以控制血中濃度。然而，葡萄柚、柚子（包含大白柚、西施柚）裡富含大量的「呋喃香豆素 (Furanocoumarins)」，它會與 CYP3A4 進行強烈的共價結合，使酵素失去活性。這導致 Statin 藥物在腸道吸收和肝臟代謝率劇烈下降，血藥濃度攀升 5-10 倍！進而誘發致命的橫紋肌溶解症，造成肌肉纖維溶解堵塞腎小管，甚至引發急性腎衰竭。"
  },
  {
    id: "tip_3",
    title: "空腹、飯前、飯中、飯後服藥時間的科學原理",
    summary: "服藥時間不是隨便選的，而是依循藥物對胃黏膜的刺激度、吸收極大化以及食物的化學交互作用來量身定制。",
    category: "正確觀念",
    checklist: [
      "飯前（空腹）：通常指「餐前 30 分鐘至 1 小時」，或「餐後 2 小時」胃排空時。此時吸收最佳或是保護胃壁所需。",
      "飯後：通常指「餐後 30 分鐘內」，此時胃內有食物，可以保護胃壁細胞，或利用油脂增加脂溶性藥物的吸收率。",
      "飯中：指吃藥與第一口熱食共進，用以降低消化道副作用，或直接隨食物消化吸收（如醣類阻斷劑）。"
    ],
    content: "不同的降血糖藥與胃潰瘍藥有着明確的生理時鐘：例如【-gliflozin】SGLT2 排糖藥通常在早上第一餐前或隨餐服用；而胃酸質子泵抑制劑【-prazole】（PPI）必須嚴格在「餐前 30 分鐘」服用，因為空腹時，壁細胞內的酸性微管尚未充盈，當你吃第一口飯時胃酸開始激發，此時藥物剛好吸收到血循環並靶向送達壁細胞，能與剛啟動、最多的質子泵大門形成不可逆結合；若是吃飽飯後才服藥，多數質子泵已完成胃酸擠壓並關閉，藥效將退減 50% 以上。"
  },
  {
    id: "tip_4",
    title: "降血壓藥物的「起步姿勢性低血壓」自我防護",
    summary: "特別是服用 α1-blocker（-osin）或利尿劑，初次或半夜起床時，血管放鬆過大易造成腦部短暫缺氧昏厥跌倒。",
    category: "服藥安全",
    checklist: [
      "起床時實施「三個半分鐘」：在床上坐半分鐘、床沿懸腳半分鐘、站立站半分鐘再邁步。",
      "初次服用 α1-blocker 應選在「臨睡前」，在床上入睡，可避開白天姿勢性低血壓的危險高峰期。",
      "若感到頭暈、目眩，應立刻原地蹲下或坐下，防止直接摔倒骨折。"
    ],
    content: "像 Prazosin、Terazosin 這種甲型腎上腺素受體阻斷劑，能快速鬆弛大動脈與外周小血管，也用於改善攝護腺肥大的尿道阻塞。當我們在躺臥狀態突然快速站立時，地心引力會將血液向下拉回雙腿。此時反射中樞原本會命令心臟和血管迅速收縮以維持腦部灌流血壓。但因藥物已經強力阻斷了血管上 α1 收縮受體，使人體自發的代償抗衡血管收縮機能暫時失靈。這會造成血液暫時留在下半身，大腦血流瞬間急降，引發眼前發黑甚至暈倒受傷。長輩與家人對此防範尤為關鍵。"
  },
  {
    id: "tip_5",
    title: "鎮靜安眠藥，一律不能「配酒」或與「酒精」共服",
    summary: "酒精與 BZD、安眠藥皆為中樞神經強烈抑制劑，兩者共同作用在同一個離子受體上，會造成呼吸抑制、一睡不醒。",
    category: "服藥安全",
    checklist: [
      "服藥當天（特別睡前），滴酒不沾。不要以為隔開幾小時喝酒就沒事。",
      "酒精會增強 Z-drugs 或 BZD 的夢遊風險，可能導致患者夢中外出、開車，發生無意識危險。",
      "酒精也與多種抗生素、降血糖藥藥具有致命反應（如雙硫崙樣反應、急性低血糖發作）。"
    ],
    content: "酒精（乙醇）是 GABA-A 離子通道的別構調節劑，它會改變脂質雙層膜的流動性，使氯離子通道更容易開放。而 BZD、巴比妥酸鹽和 Z-drugs 也是在該孔道蛋白的不同口袋大跳雙人舞。兩者共用就像是把神經元抑制大門「鎖得死死的死胡同」。在大腦皮質、邊緣系統全面熄滅的同時，也會使延腦的呼吸中樞失去活性，引發呼吸變慢、變淺，最後因血氧急降、組織缺氧而在睡夢中發生不可逆窒息死亡。此為極高危險性的服藥習慣。"
  },
  {
    id: "tip_6",
    title: "正確儲存藥物：陰涼、乾燥、避光與防幼童探秘",
    summary: "藥物最怕三樣東西：熱氣、濕氣、和強光，除特殊藥外「切勿全部擅自冰冰箱」。",
    category: "儲存保管",
    checklist: [
      "除非包裝印指示『需冷藏（2-8度）』如胰島素、部分眼藥水，否則一律在常溫乾燥陰涼處保存。",
      "不要存放在流理台、浴室抽屜、或廚房等環境，驚人的水氣會讓多數粉末及膠囊提早潮解水解。",
      "將外裹包裝保留阻光阻氧。丟棄發霉、產生酸味、超過效期（開封後超過半年或指明瓶裝期限）的藥物。"
    ],
    content: "許多人習慣把所有的藥丸放在浴室或廚房的藥箱裡，或是出於好意將所有藥都冰在家中冰箱。然而，冰箱內部是高度潮濕的環境。當你頻繁把常溫藥盒拿下、放入冰箱時，空氣中的高溫水氣會在冰涼的藥丸包裝表面迅速凝結成細微水滴，並透過泡殼膠囊小氣孔滲透，使阿斯匹靈等藥物在水解下釋出酸氣而報廢。另外，像糖尿病口服和降血壓藥通常置於密閉防潮抽屜即可，且需要放在高處，防止幼齡兒童誤認為糖果吞食，酿成低血壓休克慘劇。"
  },
  {
    id: "tip_7",
    title: "抗凝血新型口服藥 (NOACs) 的刷牙與出血照護",
    summary: "服用【-xaban】或【-grel】抗血栓藥，凝血機制受控，有出血傾向需要防範外傷大出血。",
    category: "服藥安全",
    checklist: [
      "使用超軟毛牙刷，以防刷牙時牙齦因劇烈摩擦而出血點不斷。",
      "若計畫進行拔牙、胃鏡或外科手術，必須主動出示藥卡與藥品名，通常需要提前 2-5 天暫停服用抗凝血藥。",
      "日常穿著、修指甲請避免利器外傷。若排便呈現柏油般黑色，代表可能有胃腸道出血，應火速回診。"
    ],
    content: "在血栓預防或心房顫動防範中，抗凝血藥和抗血小板藥物是不可或缺的保命藥，能防止血栓塞住腦血管造成癱瘓。然而，這也是一把雙面刃。藥物抑制了凝血因子，使傷口血管的破口無法在第一時間由纖維蛋白網住、血小板聚集成塊，這會讓哪怕是很小的出血點都比一般人流得更久、更難止血。尤其是，如果服用此類藥物又同時吃了過量的活血中藥（如當歸、人參、銀杏、大蒜精），會疊加造成致命的自發性內出血或顱內出血危機，不可不慎。"
  },
  {
    id: "tip_8",
    title: "服用多種藥物時，「主動準備藥單及藥卡」是救命關鍵",
    summary: "在急診或轉診時，將目前的藥物卡或藥包交給醫護人員，可瞬間規避高達 9 成的致命藥物重疊與交互作用。",
    category: "正確觀念",
    checklist: [
      "收集正在服用的所有常規藥物：醫院藥袋、診所夾袋、以及購買的保健食品外包裝。",
      "可利用健保雲端藥歷系統由醫生現場查詢，或把所有處方紙存照，備存在手機相冊，看病時出示。",
      "拒絕不明來源、無中文標示與衛署證號之地下藥丸、草藥或強效補骨粉。"
    ],
    content: "不同科別（如心臟內科、新陳代謝科、泌尿科、骨科和一般身心科）開立的藥名往往很多。若是病人在不同的醫院跨科別就診，且缺少雲端藥史的互通，非常容易出現藥物重複的現象——例如在心臟內科拿到一種 β-blocker，又在胸腔科拿了另一種相同效果的抗氣喘支氣管藥物；或者在骨科拿了消炎止痛藥 NSAIDs，又在一般診所拿了含有相同成分的感冒退燒藥，導致肝腎功能在未知的情況下過載、衰竭。主動呈報藥歷是第一時間防護用藥安全的上善之策。"
  },
  {
    id: "tip_9",
    title: "糖尿病口服藥與「高劑量補鈣藥物」的服用時辰隔開！",
    summary: "高纖維食物、高鈣牛奶或高劑量鈣片片會吸附特定口服降糖藥，阻礙其在小腸絨毛的吸收率。",
    category: "生活飲食",
    checklist: [
      "若有服用高劑量鈣片（或高鐵劑、骨質疏鬆藥），建議與大部分降糖降壓口服藥至少「隔開 2 小時」以上。",
      "服用排糖藥【-gliflozin】時應多補充水分，能有效防護泌尿道中的糖分濃度，避開徽菌快速生長繁殖。",
      "絕不能因為要狂吃高油高糖大餐而私自將糖尿病降糖藥「加倍剂量」吞服，極易引發深度低血糖昏迷。"
    ],
    content: "補骨防疏鬆是長輩的重要課題。但高劑量鈣片、高氮牛奶製品當中的雙價鈣離子 (Ca2+) 具備極強的螯合、沉澱性質。多種藥物（例如頭孢菌素抗生素、特定降血糖藥）在小腸被輸送帶吸收前，如果碰到游離的鈣離子、鐵離子 (Fe3+)、或鋁離子（常見於市售胃散胃乳中），會在腸腔內發生「錯合物包膜效應」，形成大分子不可溶沉澱。這會導致小腸完全無法攝取這些救命藥丸，使其直接跟隨排泄物被排掉，病患卻納悶為什麼天天按時吃降血糖藥血壓藥，指數依然居高不下。了解此交互結合機轉，分段服藥是關鍵學術。"
  },
  {
    id: "tip_10",
    title: "廢棄與過期藥物的安全清理：保護地球與家人",
    summary: "千萬不要把沒吃完的抗生素、降壓降糖藥「直接丟進馬桶或水槽沖掉」，這會造成水源劇烈污染與生態浩劫。",
    category: "儲存保管",
    checklist: [
      "針劑、抗癌藥、基因毒性藥、以及所有「抗生素」，務必送回醫院的「藥品廢棄物回收箱」統一高溫焚化。",
      "一般感冒藥、降壓降糖等非特殊藥物，可用吸水紙巾將剩下的藥水藥水、抗凝藥水等吸飽，密封於塑料袋隨「一般垃圾」焚化處理。",
      "將空殼泡罩和紙箱妥善交由資源回收（大批量特殊藥物需專門回收）。"
    ],
    content: "在台灣與世界各地，飲用水和河流底泥中已被檢測出含有微量的抗生素、避孕藥避孕激素及止痛藥成分。這正是因為民眾將剩下的過期藥水、藥錠圖方便直接沖進馬桶，而家庭廢水處理廠的汙水處理膜根本無法將這類微量、極細的化學有機分子完全除去，使得它們重回生態界。這不單使得魚類及野生動物發生雌性化或畸變，更在大自然中大量培養著細菌的抗藥性。掌握「特殊藥送醫、一般藥吸水密封丟垃圾、不沖馬桶」的三大防守線，是公民的基礎素養。"
  }
];
