/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Leaf, 
  Search, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";

interface ChineseMedicine {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  pinyin: string;
  activeComponents: string;
  description: string;
  highSchoolBiochem: string;
  interactions: Array<{
    westernClass: string;
    westernExample: string;
    risk: "高風險" | "中風險" | "低風險";
    mechanism: string;
    suggestion: string;
  }>;
}

const CHINESE_MEDICINES_DATA: ChineseMedicine[] = [
  {
    id: "cm_1",
    name: "人參",
    pinyin: "Renshen",
    scientificName: "Panax ginseng",
    category: "補氣藥",
    activeComponents: "人參皂苷 (Ginsenosides)、人參酸 (Ginsenic acid)",
    description: "大補元氣、補脾益肺、生津止渴、安神益智。是傳統補益藥之首。",
    highSchoolBiochem: "人參皂苷屬於三萜皂苷類化合物，其構造與固醇類激素 (Steroid Hormones) 相似，能與細胞膜上特定的受體或離子通道結合，調節細胞內第二傳訊者 (如 cAMP) 的濃度，進而增進線粒體呼吸鏈效率與 ATP 合成速度。",
    interactions: [
      {
        westernClass: "抗凝血藥 (Anticoagulants)",
        westernExample: "華法林 (Warfarin)",
        risk: "高風險",
        mechanism: "人參可能誘導肝臟細胞色素 P450 酵素 (如 CYP3A4) 活性，加速華法林的代謝排泄，導致抗凝血效果顯著下降，提高血栓形成風險。",
        suggestion: "服用華法林等抗凝血患者應一律避免長期服用人參，且需定期監測 INR 指標。"
      },
      {
        westernClass: "抗血小板藥 (Antiplatelets)",
        westernExample: "阿斯匹靈 (Aspirin)、保栓通 (Clopidogrel)",
        risk: "中風險",
        mechanism: "人參皂苷本身具有微弱的抗血小板凝聚活性，與西藥抗血小板藥物併服具有加乘效應，容易延長凝血時間，誘發皮下出血或內出血。",
        suggestion: "手術前 7-14 天應停服人參，避免術中出血不止。日常併服應觀察是否有異常瘀青或牙齦出血。"
      },
      {
        westernClass: "降血糖藥 (Antidiabetics)",
        westernExample: "胰島素 (Insulin)、美獲平 (Metformin)",
        risk: "中風險",
        mechanism: "人參具有協同促進胰島細胞釋放胰島素、增強骨骼肌對葡萄糖攝取的作用。與降糖西藥聯用易造成「協同效應」，引發突發性低血糖。",
        suggestion: "併服時需更頻繁監測血糖。若出現心悸、冷汗等低血糖症狀，應立刻補充足夠糖分。"
      },
      {
        westernClass: "單胺氧化酶抑制劑 (MAOIs)",
        westernExample: "抗憂鬱劑 Phenelzine",
        risk: "高風險",
        mechanism: "人參能興奮中樞神經系統，若與單胺氧化酶抑制劑聯用，可能導致突觸間隙之神經遞質 (如正腎上腺素、多巴胺) 積聚過多，誘發躁狂、頭痛、失眠或血壓飆升。",
        suggestion: "此類精神科藥物與人參為絕對禁忌，嚴禁合併使用。"
      }
    ]
  },
  {
    id: "cm_2",
    name: "當歸",
    pinyin: "Danggui",
    scientificName: "Angelica sinensis",
    category: "補血藥",
    activeComponents: "阿魏酸 (Ferulic acid)、藁本內酯 (Ligustilide)",
    description: "補血活血、調經止痛、潤腸通便。常稱「婦科聖藥」。",
    highSchoolBiochem: "當歸中的阿魏酸 (Ferulic acid) 是一種酚酸類抗氧化劑，構造具有不飽和雙鍵，可有效清除自由基。在生物化學中，阿魏酸能抑制血小板中血栓素 A2 (TxA2) 的合成，從而改變細胞膜之膜電位，產生舒張平滑肌與抑制凝血之功效。",
    interactions: [
      {
        westernClass: "抗凝血藥 (Anticoagulants)",
        westernExample: "華法林 (Warfarin)",
        risk: "高風險",
        mechanism: "當歸中含有微量天然香豆素 (Coumarin) 衍生物，會直接加乘抗凝血藥華法林的藥理活性，大幅延長凝血酶原時間 (PT)，導致嚴重的自發性出血甚至腦出血風險。",
        suggestion: "服用華法林期間切勿食用含當歸之藥膳 (如十全大補湯、當歸鴨)，若誤食需密切追蹤凝血功能。"
      },
      {
        westernClass: "抗血小板藥 (Antiplatelets)",
        westernExample: "阿斯匹靈 (Aspirin)、布洛芬 (Ibuprofen)",
        risk: "高風險",
        mechanism: "阿魏酸具有強效抑制血小板凝集作用，與非類固醇消炎止痛藥 (NSAIDs) 或阿斯匹靈聯用，會對凝血途徑產生多重打擊，易導致胃黏膜出血或皮下大量瘀斑。",
        suggestion: "有胃潰瘍病史或長期服止痛藥者應避免服用當歸。女性月經期間也應暫停，以防經血過多。"
      }
    ]
  },
  {
    id: "cm_3",
    name: "甘草",
    pinyin: "Gancao",
    scientificName: "Glycyrrhiza uralensis",
    category: "補氣藥",
    activeComponents: "甘草酸 (Glycyrrhizin/Glycyrrhizic acid)",
    description: "補脾益氣、清熱解毒、祛痰止咳、調和諸藥。在中藥處方中覆蓋率極高。",
    highSchoolBiochem: "甘草酸在體內水解後釋出甘草次酸。甘草次酸能競爭性抑制腎臟中的 11-beta-羥基類固醇去氫酶 (11-beta-HSD2)。該酶正常時負責將活性皮質醇 (Cortisol) 轉為無活性的皮質素，以防止其與礦物皮質酮受體結合。當酶被抑制，皮質醇濃度上升，模擬醛固酮 (Aldosterone) 作用，啟動腎臟「保鈉排鉀」機制，造成鉀離子大量隨尿液流失、水分留滯。",
    interactions: [
      {
        westernClass: "排鉀利尿劑 (Diuretics)",
        westernExample: "福蘭 (Furosemide)、氫氯噻嗪 (Hydrochlorothiazide)",
        risk: "高風險",
        mechanism: "利尿劑本就會加速腎小管排泄鉀離子，併服甘草會因 11-beta-HSD2 受阻而產生「假性醛固酮增多症」，引發協同性排鉀，造成嚴重低血鉀症、肌肉無力，甚至心律不整。",
        suggestion: "服用利尿劑患者應避免食用含甘草的咳嗽糖漿、甘草錠。若有併服，建議多攝取香蕉、奇異果補鉀。"
      },
      {
        westernClass: "強心苷類藥物 (Cardiac Glycosides)",
        westernExample: "毛地黃毒苷 (Digoxin)",
        risk: "高風險",
        mechanism: "甘草引起的低血鉀會使心肌細胞膜上的 Na+/K+-ATPase 泵失去活性，使地高辛與該受體結合力暴增，誘發地高辛中毒，導致嚴重的室性心律不整甚至猝死。",
        suggestion: "服用 Digoxin 藥物之患者，絕對禁止服用任何含甘草之中藥、潤喉糖或甘草茶。"
      },
      {
        westernClass: "降血壓藥 (Antihypertensives)",
        westernExample: "脈優 (Amlodipine)、得安穩 (Diovan)",
        risk: "中風險",
        mechanism: "甘草造成的鈉水滯留會增加血管內血容量與外周阻力，直接拮抗降血壓西藥的藥效，導致原本穩定的血壓突然失控攀升。",
        suggestion: "高血壓患者在使用中藥複方 (常含甘草調和) 時，應定期量測血壓，確保血壓未因甘草而升高。"
      }
    ]
  },
  {
    id: "cm_4",
    name: "銀杏",
    pinyin: "Yinxing",
    scientificName: "Ginkgo biloba",
    category: "活血化瘀藥",
    activeComponents: "銀杏內酯 B (Ginkgolide B)、銀杏黃酮配糖體 (Ginkgo flavone glycosides)",
    description: "活血化瘀、通絡止痛、斂肺平喘。常被用於改善記憶力與末梢血液循環。",
    highSchoolBiochem: "銀杏內酯 B 是一種強效的血小板活化因子 (PAF) 競爭性受體拮抗劑。PAF 在體內負責刺激血小板聚集、血管收縮及趨化作用。銀杏內酯阻斷 PAF 受體後，會抑制鈣離子流入血小板細胞內，防止血小板骨架重組與去顆粒作用，從而達到抗凝血目的。",
    interactions: [
      {
        westernClass: "抗凝血與抗血小板藥",
        westernExample: "華法林 (Warfarin)、阿斯匹靈 (Aspirin)",
        risk: "高風險",
        mechanism: "雙重阻斷凝血級聯反應 (Coagulation Cascade) 與血小板凝集途徑。銀杏內酯與阿斯匹靈合用對一級與二級凝血皆有高度壓制，會呈幾何級數增加出血傾向，常見牙齦、視網膜出血，嚴重者可致顱內出血。",
        suggestion: "不可併服。進行侵入性手術或拔牙前，必須停用銀杏葉製劑至少 7-10 天。"
      },
      {
        westernClass: "抗癲癇藥 (Anticonvulsants)",
        westernExample: "癲能停 (Phenytoin)、卡巴胺 (Carbamazepine)",
        risk: "中風險",
        mechanism: "銀杏葉提取物中含有「銀杏毒素」 (Ginkgotoxin)，結構類似維生素 B6，會競爭性抑制谷氨酸脫羧酶，減少抑制性神經傳導物質 GABA 的合成，可能降低抗癲癇藥療效並誘發癲癇發作。",
        suggestion: "癲癇病史患者應避免服用銀杏葉相關產品。"
      }
    ]
  },
  {
    id: "cm_5",
    name: "黃耆",
    pinyin: "Huangqi",
    scientificName: "Astragalus membranaceus",
    category: "補氣藥",
    activeComponents: "黃耆多醣 (Astragalus Polysaccharides)、黃耆甲苷 (Astragaloside IV)",
    description: "補氣升陽、固表止汗、利水消腫、托毒生肌。廣泛用於增強人體防禦力和免疫力。",
    highSchoolBiochem: "黃耆多醣可與巨噬細胞、T細胞、B細胞表面的受體 (如 TLR4) 結合，激活 MAP 激酶與 NF-kB 生物訊息傳導途徑，促進多種細胞因子 (如白介素 IL-2、干擾素 IFN-gamma) 的轉錄與轉譯，具有強烈活化主動免疫應答的生化特性。",
    interactions: [
      {
        westernClass: "免疫抑制劑 (Immunosuppressants)",
        westernExample: "環孢素 (Cyclosporine)、他克莫司 (Tacrolimus)",
        risk: "高風險",
        mechanism: "西藥免疫抑制劑旨在降低器官移植患者的免疫排斥反應或控制自體免疫疾病。而黃耆的「黃耆多醣」是強效免疫興奮劑，會直接「中和」西藥之療效，加速引發排斥危險。",
        suggestion: "接受腎、肝、心臟移植或紅斑性狼瘡、類風濕性關節炎患者，絕對避免使用黃耆、人參等免疫促性中草藥。"
      },
      {
        westernClass: "降血糖藥 (Antidiabetics)",
        westernExample: "胰島素 (Insulin)、格列美脲 (Glimepiride)",
        risk: "低風險",
        mechanism: "黃耆具有提高周邊組織對胰島素敏感性的作用，可能與降糖西藥產生協同效果，使血糖降得略低於預期。",
        suggestion: "一般併用安全，但糖尿病患者剛開始服用黃耆時仍建議監測空腹血糖。"
      }
    ]
  },
  {
    id: "cm_6",
    name: "枸杞",
    pinyin: "Gouqizi",
    scientificName: "Lycium barbarum",
    category: "補陰藥",
    activeComponents: "枸杞多醣 (LBP)、類胡蘿蔔素 (Carotenoids)、甜菜鹼 (Betaine)",
    description: "滋補肝腎、益精明目。常用於泡茶或烹飪膳食。",
    highSchoolBiochem: "枸杞中的甜菜鹼 (Betaine) 在肝臟中可作為甲基供體，參與同半胱胺酸 (Homocysteine) 轉化為甲硫胺酸的生化反應，降低血管內皮之氧化壓力。然而其多醣體會干擾體內細胞色素 P450 系統，對部分藥物之代謝速率產生微調效應。",
    interactions: [
      {
        westernClass: "抗凝血藥 (Anticoagulants)",
        westernExample: "華法林 (Warfarin)",
        risk: "中風險",
        mechanism: "枸杞能抑制華法林在肝臟中的代謝清除率 (主要經由 CYP2C9 途徑)，進而提高血液中 Warfarin 的游離濃度，使凝血酶原時間延長，引發瘀斑或出血。",
        suggestion: "服用華法林患者不宜每日大劑量飲用枸杞茶，少量烹調用 (一日10粒以內) 則多屬安全。"
      }
    ]
  },
  {
    id: "cm_7",
    name: "紅花",
    pinyin: "Honghua",
    scientificName: "Carthamus tinctorius",
    category: "活血化瘀藥",
    activeComponents: "紅花黃素 A (Safflor Yellow A)、紅花苷 (Carthamin)",
    description: "活血通經、散瘀止痛。多用於經閉、痛經、跌打損傷之瘀血。",
    highSchoolBiochem: "紅花黃素 A 是一種黃酮類抗氧化物，能顯著抑制 ADP (腺苷二磷酸) 誘導的血小板聚集。它可藉由下調血小板膜 glycoprotein IIb/IIIa 受體的活性，阻斷纖維蛋白原 (Fibrinogen) 與其結合，使血小板之間無法透過纖維蛋白橋相互連結，強烈抑止一級凝血栓形成。",
    interactions: [
      {
        westernClass: "抗凝血與抗血小板藥",
        westernExample: "華法林 (Warfarin)、保栓通 (Clopidogrel)、阿斯匹靈 (Aspirin)",
        risk: "高風險",
        mechanism: "紅花黃素會強烈干擾血小板凝聚過程。若與抗凝血/抗血小板西藥合用，會引發極度危險之抗凝血加乘作用，使得機體在無外傷情況下發生臟器自發性出血或黏膜出血。",
        suggestion: "嚴重出血傾向者禁用。女性生理期、孕婦絕對禁用 (有流產風險)。若有服用抗凝血藥，切勿接觸紅花。"
      }
    ]
  },
  {
    id: "cm_8",
    name: "丹參",
    pinyin: "Danshen",
    scientificName: "Salvia miltiorrhiza",
    category: "活血化瘀藥",
    activeComponents: "丹參酮 IIA (Tanshinone IIA)、丹參素 (Danshensu)",
    description: "活血祛瘀、通經止痛、清心除煩、涼血消癰。是心血管中成藥 (如冠心丹參滴丸) 的靈魂成分。",
    highSchoolBiochem: "丹參酮 IIA 與 丹參素具有強烈的抗氧化活性，能保護血管內皮細胞。生化研究證實，丹參成分可干擾前列腺素環氧化酶活性，減少血栓烷 A2 (TXA2) 的生成；同時能與 L-型鈣離子通道結合，擴張冠狀動脈、降低外周血管阻力，阻斷鈣離子介導的神經肌肉興奮傳導。",
    interactions: [
      {
        westernClass: "抗凝血與抗血小板藥",
        westernExample: "華法林 (Warfarin)、新型口服抗凝血藥 (NOACs)",
        risk: "高風險",
        mechanism: "丹參多種活性成分能直接延長凝血酶時間 (TT) 與活化部分凝血活酶時間 (aPTT)。與華法林合用會引發高度協同作用，使 INR (抗凝血指數) 急劇暴增，引發肉眼可見之血尿、黑便或腦血管意外。",
        suggestion: "心血管疾病患者在西藥抗凝血劑療程中，切勿擅自併服丹參、冠心丸等藥物。中西醫師必須嚴格知會彼此。"
      },
      {
        westernClass: "乙型阻斷劑 (Beta-blockers)",
        westernExample: "康肯 (Concor/Bisoprolol)、心律整 (Propranolol)",
        risk: "中風險",
        mechanism: "丹參具有天然的鈣離子拮抗與血管舒張效能。若與乙型受體阻斷劑併服，會產生協同性的減慢心率與擴張血管作用，可能引發突發性直立性低血壓、頭暈甚至昏厥。",
        suggestion: "兩者合用時，患者應注意改變體位時慢一些 (防姿勢性低血壓)，並每日監測心率是否低於 55 次/分。"
      }
    ]
  },
  {
    id: "cm_9",
    name: "大黃",
    pinyin: "Dahuang",
    scientificName: "Rheum palmatum",
    category: "瀉下藥",
    activeComponents: "蒽醌衍生物 (Anthraquinones，如大黃素 Emodin、大黃酚 Chrysophanol)",
    description: "瀉熱通腸、涼血解毒、逐瘀通經。瀉下作用迅速而猛烈，被譽為「將軍」。",
    highSchoolBiochem: "大黃中的蒽醌苷類在小腸內不被吸收，到達大腸後被腸道細菌中的 beta-葡萄糖苷酶水解為活性蒽酮。蒽酮能刺激大腸黏膜之腸肌層神經叢，促進蠕動；更重要的是，它會抑制腸上皮細胞上的 Na+/K+-ATPase，使水分與鈉離子滯留腸腔，造成高滲透壓瀉下，同時帶走大量鉀離子。",
    interactions: [
      {
        westernClass: "排鉀利尿劑 (Diuretics)",
        westernExample: "福蘭 (Furosemide)、速尿",
        risk: "中風險",
        mechanism: "大黃引起的腹瀉和鈉鉀重吸收阻斷會加劇消化道排鉀。利尿劑則增加腎臟排鉀。兩者同時夾擊，會使體內鉀離子儲備迅速耗竭，產生低血鉀與脫水徵兆。",
        suggestion: "避免兩者長期聯用。如需導瀉，可諮詢藥師改用非滲透性、非排鉀之緩瀉劑。"
      },
      {
        westernClass: "強心苷類藥物 (Cardiac Glycosides)",
        westernExample: "地高辛 (Digoxin)",
        risk: "高風險",
        mechanism: "大黃導致腸道鉀流失，引發血鉀過低。在心肌細胞生化機制中，低鉀會阻礙細胞膜鈉鉀泵的活性，加劇地高辛對鈉鉀泵的毒性壓制，易引發危及生命的毛地黃中毒性心律不整。",
        suggestion: "服用強心藥地高辛者，若有便秘問題，禁用含大黃、番瀉葉等蒽醌類之強效瀉藥。"
      }
    ]
  },
  {
    id: "cm_10",
    name: "麻黃",
    pinyin: "Mahuang",
    scientificName: "Ephedra sinica",
    category: "解表藥",
    activeComponents: "麻黃鹼 (Ephedrine)、偽麻黃鹼 (Pseudoephedrine)",
    description: "發汗解表、宣肺平喘、利水消腫。感冒中藥複方 (如葛根湯、小青龍湯) 常見成分。",
    highSchoolBiochem: "麻黃鹼是一種生物鹼，結構與人體交感神經傳導物質 (腎上腺素與正腎上腺素) 極度相似。它能直接與交感神經突觸後膜的 alpha 和 beta 腎上腺素受體結合，並促進突觸前膜釋放內源性正腎上腺素。這會引起血管收縮 (血壓升高)、支氣管平滑肌舒張 (平喘) 以及心臟收縮力與心率暴增。",
    interactions: [
      {
        westernClass: "降血壓藥 (Antihypertensives)",
        westernExample: "脈優 (Amlodipine)、得安穩 (Diovan)",
        risk: "高風險",
        mechanism: "麻黃鹼強烈興奮 alpha/beta 受體，引發血管收縮與心跳加快，這與降血壓西藥的作用機制 (舒張血管、減緩心率) 完全相反。麻黃鹼會直接「中和」降壓西藥，令血壓失去控制劇烈上揚。",
        suggestion: "高血壓與心血管疾病患者感冒時，千萬不可服用含麻黃的葛根湯或麻黃湯，應向醫師藥師表明身份，選用不含麻黃的解熱鎮痛西藥。"
      },
      {
        westernClass: "中樞神經興奮劑 (CNS Stimulants)",
        westernExample: "咖啡因 (Caffeine)、利他能 (Ritalin)",
        risk: "高風險",
        mechanism: "麻黃鹼與咖啡因皆能提高突觸間隙去甲腎上腺素的活性。兩者併用會產生極強之中樞興奮加成，極易引發惡性高血壓、嚴重恐慌發作、幻覺、心悸與心室頻脈。",
        suggestion: "服用含麻黃感冒藥期間，絕對不要喝濃茶、咖啡或提神飲料。"
      },
      {
        westernClass: "單胺氧化酶抑制劑 (MAOIs)",
        westernExample: "部分抗憂鬱與巴金森氏症藥物",
        risk: "高風險",
        mechanism: "MAOIs 阻斷了正腎上腺素的降解。麻黃鹼此時若再刺激突觸前膜釋放正腎上腺素，會導致神經遞質在突觸間「大氾濫」，進而觸發極度致命之「高血壓危象」 (Hypertensive Crisis)。",
        suggestion: "此組合為絕對聯合禁忌。停用 MAOIs 後至少 14 天內亦不可服用麻黃製劑。"
      }
    ]
  },
  {
    id: "cm_11",
    name: "柴胡",
    pinyin: "Chaihu",
    scientificName: "Bupleurum chinense",
    category: "解表藥",
    activeComponents: "柴胡皂苷 (Saikosaponins A, C, D)",
    description: "和解表裡、疏肝解鬱、升陽舉陷。代表方為小柴胡湯、加味逍遙散。",
    highSchoolBiochem: "柴胡皂苷具有類似糖皮質激素的結構特徵，可展現強效的抗炎與膜穩定作用。然而，柴胡皂苷在特定高濃度下，對肝臟細胞之微膽管膜流動性有干擾現象，若與其他免疫活化因子的刺激疊加，可能觸發特定肝細胞的自噬或發炎應答反應。",
    interactions: [
      {
        westernClass: "干擾素 (Interferons)",
        westernExample: "Pegylated Interferon (用於B/C型肝炎治療)",
        risk: "高風險",
        mechanism: "臨床上，小柴胡湯/柴胡與干擾素合用，會產生難以預測的協同性免疫發炎機制，有極高機率誘發「急性間質性肺炎」 (Interstitial Pneumonitis)，導致嚴重肺纖維化、缺氧與生命危險。",
        suggestion: "接受肝炎干擾素療程的患者，嚴禁自行服用小柴胡湯或含柴胡成分之中草藥與藥膳。"
      }
    ]
  },
  {
    id: "cm_12",
    name: "細辛",
    pinyin: "Xixin",
    scientificName: "Asarum heterotropoides",
    category: "祛風散寒藥",
    activeComponents: "甲基丁香酚 (Methyleugenol)、黃樟素 (Safrole)",
    description: "祛風散寒、通竅止痛、溫肺化飲。中藥有「細辛不過錢，過錢神仙難挽」之說，極言其藥效猛烈。",
    highSchoolBiochem: "細辛中所含之黃樟素 (Safrole) 被歸類為二類致癌物與微量毒性成分。其甲基丁香酚能產生顯著的中樞神經抑制，與神經元上的 GABA_A 受體複合物產生變構結合，使氯離子通道開放時間延長，進而減緩中樞神經細胞的衝動發射效率。",
    interactions: [
      {
        westernClass: "中樞神經抑制劑 (CNS Depressants)",
        westernExample: "鎮靜安眠藥 (BZDs/Z-drugs)、酒精 (Alcohol)",
        risk: "中風險",
        mechanism: "細辛內的甲基丁香酚具有天然的麻醉與中樞抑制性質，併服安眠西藥會對大腦網狀結構產生重複抑制，顯著增強嗜睡、步態不穩、呼吸抑制與夢遊機率。",
        suggestion: "服用安眠藥或服用細辛期間，切勿飲酒或同時使用多種神經抑制藥品。"
      }
    ]
  },
  {
    id: "cm_13",
    name: "白芍",
    pinyin: "Baishao",
    scientificName: "Paeonia lactiflora",
    category: "補血藥",
    activeComponents: "芍藥苷 (Paeoniflorin)、白芍總苷 (TGP)",
    description: "養血調經、斂陰止汗、柔肝止痛、平抑肝陽。",
    highSchoolBiochem: "芍藥苷是一種單萜苷類化合物。在分子藥理上，它能顯著抑制細胞內鈣離子的超載，增強一氧化氮合酶 (NOS) 活性，促進 NO 釋放，從而放鬆血管平滑肌與胃腸平滑肌，達到解痙和保護內皮的作用。",
    interactions: [
      {
        westernClass: "抗凝血藥 (Anticoagulants)",
        westernExample: "華法林 (Warfarin)",
        risk: "低風險",
        mechanism: "芍藥苷可能有輕微擴血管與抑制血小板功能，但臨床干擾凝血機制之強度偏低，不需過度擔憂，按常規劑量服用即可。",
        suggestion: "正常配藥劑量下無須特別禁忌，但大劑量長期服用仍需注意凝血指標。"
      }
    ]
  },
  {
    id: "cm_14",
    name: "川芎",
    pinyin: "Chuanxiong",
    scientificName: "Ligusticum striatum",
    category: "活血化瘀藥",
    activeComponents: "川芎嗪 (Tetramethylpyrazine)、阿魏酸 (Ferulic acid)",
    description: "活血行氣、祛風止痛。為「血中之氣藥」，能上行頭目、下達血海。",
    highSchoolBiochem: "川芎嗪 (Ligustrazine/Tetramethylpyrazine) 具有天然鈣離子拮抗作用。它能阻斷平滑肌與血小板細胞膜之鈣通道，下調肌球蛋白輕鏈激酶 (MLCK) 活化，舒張血管並抑止膠原蛋白所引發的血小板聚集，具有優異的改善微循環功能。",
    interactions: [
      {
        westernClass: "抗凝血藥物",
        westernExample: "華法林 (Warfarin)、新型口服抗凝血藥 (NOACs)",
        risk: "高風險",
        mechanism: "川芎嗪具有明確的抑制血小板凝集、抗血栓形成與血管擴張效能。其與西藥抗凝血劑、溶栓劑在凝血路徑上具有強烈加乘性，大幅調高創傷後、牙齦或消化道等毛細血管自發性出血的機會。",
        suggestion: "凡是正在使用抗血栓、抗凝血西藥的慢性病患者，應避免長期服用川芎或飲用相關中藥補湯。"
      }
    ]
  },
  {
    id: "cm_15",
    name: "桃仁",
    pinyin: "Taoren",
    scientificName: "Prunus persica",
    category: "活血化瘀藥",
    activeComponents: "苦杏仁苷 (Amygdalin)、苦杏仁酶 (Emulsin)",
    description: "活血祛瘀、潤腸通便、止咳平喘。常用於跌打瘀腫、腸燥便秘。",
    highSchoolBiochem: "桃仁中所含的苦杏仁苷 (Amygdalin) 為一種氰苷。在植物體內被水解後會釋放出微量氰化氫 (HCN)。氰離子 (CN-) 能與線粒體呼吸鏈中的細胞色素氧化酶 (Complex IV) 之三價鐵離子高度親和，阻斷電子傳遞與氧化磷酸化，造成細胞內窒息。適度使用可輕微抑制呼吸中樞達到平喘，過量則有毒性。",
    interactions: [
      {
        westernClass: "中樞神經抑制劑 / 酒精",
        westernExample: "乙醇 (Alcohol)、安眠藥 (Zolpidem)",
        risk: "低風險",
        mechanism: "酒精可能促進腸胃黏膜的血液運行，加速苦杏仁苷的吸收與釋放，在極少數情況下可能加重其對中樞神經的抑制副作用。",
        suggestion: "用溫開水服藥，服藥當天切勿過量飲酒。"
      }
    ]
  },
  {
    id: "cm_16",
    name: "附子",
    pinyin: "Fuzi",
    scientificName: "Aconitum carmichaelii",
    category: "溫里藥",
    activeComponents: "烏頭鹼 (Aconitine)、次烏頭鹼 (Hypaconitine)",
    description: "回陽救逆、補火助陽、散寒止痛。其藥性極剛極烈，若未經過長時間煎煮去毒，有劇毒。",
    highSchoolBiochem: "烏頭鹼 (Aconitine) 是一種強烈的心臟與神經毒素。它能特異性結合心肌和神經纖維上的電壓敏感性鈉通道 (Voltage-gated Sodium Channels)，使其保持在開放狀態不關閉，導致細胞持續去極化，阻礙其正常復極化過程。這會引發嚴重的異位起搏點興奮，導致多源性早搏、心室顫動 (VF) 等惡性心律不整。",
    interactions: [
      {
        westernClass: "抗心律不整藥 (Antiarrhythmics)",
        westernExample: "心律平 (Amiodarone)、脈律循 (Mexiletine)",
        risk: "高風險",
        mechanism: "烏頭鹼本身是極強的心臟致心律不整毒素。若與西藥抗心律不整藥物合用，會引發電生理機制的混亂與對衝，使心臟極易墜入惡性心律不整、傳導阻滯或自律性崩潰，有猝死風險。",
        suggestion: "服用任何心臟病藥物、抗心律不整藥之患者，絕對禁止接觸未經合格中醫師調配之附子藥劑。服用附子複方必須煎煮 1-2 小時以上以使烏頭鹼水解為低毒性衍生物。"
      }
    ]
  },
  {
    id: "cm_17",
    name: "板藍根",
    pinyin: "Banlangen",
    scientificName: "Isatis tinctoria",
    category: "清熱藥",
    activeComponents: "芥子苷 (Sinigrin)、靛藍 (Indigo)、靛玉紅 (Indirubin)",
    description: "清熱解毒、涼血利咽。常在感冒流行季節被作為預防茶飲服用。",
    highSchoolBiochem: "板藍根中的靛玉紅 (Indirubin) 是一種環狀雙吲哚化合物，能與細胞內的細胞週期蛋白依賴性激酶 (CDKs) 結合，阻斷細胞週期的 S 期。其提取物對環氧化酶 (COX-2) 有微弱抑制作用，具有解熱抗發炎反應機制。",
    interactions: [
      {
        westernClass: "非類固醇消炎止痛藥 (NSAIDs)",
        westernExample: "阿斯匹靈 (Aspirin)、布洛芬 (Ibuprofen)",
        risk: "中風險",
        mechanism: "板藍根具有抗發炎及輕微消化道刺激特性。若與強效 NSAIDs 長期併用，可能疊加對胃黏膜前列腺素合成的抑制作用，使胃壁保護力下降，提高胃炎或消化道潰瘍機率。",
        suggestion: "感冒期間若已服用西藥止痛消炎藥，不宜再大量灌服板藍根沖劑，避免雙重負擔胃黏膜。"
      }
    ]
  },
  {
    id: "cm_18",
    name: "金銀花",
    pinyin: "Jinyinhua",
    scientificName: "Lonicera japonica",
    category: "清熱藥",
    activeComponents: "綠原酸 (Chlorogenic acid)、木犀草素 (Luteolin)",
    description: "清熱解毒、疏散風熱。治療感冒喉嚨痛常用之聖藥。",
    highSchoolBiochem: "金銀花中的核心成分綠原酸 (Chlorogenic acid) 是一分子咖啡酸與一分子奎尼酸脫水縮合而成的酚酸。其分子結構富含多個鄰二酚羥基 (Catechol structure)，在化學中屬於配位體，極易與多價金屬陽離子發生配位絡合 (螯合反應)，形成難溶性的高分子複合物。",
    interactions: [
      {
        westernClass: "金屬補充劑 (Mineral Supplements)",
        westernExample: "鐵劑 (Iron supplements)、鋅片 (Zinc supplements)",
        risk: "中風險",
        mechanism: "綠原酸會與鐵離子 (Fe2+/Fe3+) 或鋅離子 (Zn2+) 發生化學螯合反應，在中性與鹼性腸道環境中沉澱析出，導致鐵劑與鋅劑無法被腸壁細胞主動運輸吸收，令補充劑失效。",
        suggestion: "服用補鐵、補鋅西藥與飲用金銀花茶、銀花露時，兩者必須嚴格間隔 2-3 小時以上，以保障吸收效率。"
      }
    ]
  },
  {
    id: "cm_19",
    name: "半夏",
    pinyin: "Banxia",
    scientificName: "Pinellia ternata",
    category: "化痰止咳平喘藥",
    activeComponents: "針晶草酸鈣 (Calcium Oxalate Needle Crystals)、半夏生物鹼 (Pinellia Alkaloids)",
    description: "燥濕化痰、降逆止嘔、消痞散結。其生藥含有黏膜刺激成分，必須加工「法製」或「薑製」後方可入藥。",
    highSchoolBiochem: "生半夏的草酸鈣晶體呈極尖銳之針狀。在微觀下，這些草酸鈣晶體能刺穿動物之黏膜細胞，促使肥大細胞釋放組織胺 (Histamine) 與前列腺素，導致劇烈刺癢與水腫。其所含生物鹼則對延髓的嘔吐中樞具有調節作用，亦含有類似膽鹼能受體拮抗之效果。",
    interactions: [
      {
        westernClass: "抗膽鹼藥 (Anticholinergics)",
        westernExample: "阿托品 (Atropine)、副交感神經阻斷劑",
        risk: "中風險",
        mechanism: "半夏成分中含有部分可與 M-膽鹼受體結合的生物鹼，其生物效應可能與西藥抗膽鹼藥物疊加，導致排尿困難、嚴重口乾舌燥、視力模糊或大便秘結。",
        suggestion: "合併使用時應注意眼壓 (青光眼患者慎用) 及尿瀦留狀況。"
      }
    ]
  },
  {
    id: "cm_20",
    name: "茯苓",
    pinyin: "Fuling",
    scientificName: "Wolfiporia extensa",
    category: "利水滲濕藥",
    activeComponents: "茯苓聚糖 (Pachyman)、茯苓酸 (Pachymic acid)",
    description: "利水滲濕、健脾寧心。藥性極其平和，是四神湯、六君子湯的核心藥材。",
    highSchoolBiochem: "茯苓多醣體 Pachyman 具有優異的調節免疫吞噬活性。而其三萜類的茯苓酸 (Pachymic acid) 具有類似醛固酮拮抗劑的化學機制，能溫和阻斷遠端腎小管細胞膜上的鈉通道，增加鈉離子與水分的尿液排出量，屬於保鉀型溫和利尿劑。",
    interactions: [
      {
        westernClass: "利尿西藥 (Diuretics)",
        westernExample: "福蘭 (Furosemide)、心舒平 (Spironolactone)",
        risk: "中風險",
        mechanism: "茯苓具有天然利尿與排除多餘組織水分之能。若與西藥強效排尿利尿劑併服，會產生利尿加成作用，容易在夏季或飲水不足時造成輕度脫水、血容量下降以及電解質偏低。",
        suggestion: "兩者合用時注意水分補充。若出現站立時頭暈或皮膚乾燥、口乾，應諮詢醫師調減利尿西藥之用量。"
      }
    ]
  }
];

export default function ChineseInteractionsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCM, setSelectedCM] = useState<ChineseMedicine>(CHINESE_MEDICINES_DATA[0]);

  // Interactive Calculator State
  const [calcCMId, setCalcCMId] = useState(CHINESE_MEDICINES_DATA[0].id);
  const [calcWesternClass, setCalcWesternClass] = useState("Anticoagulants");

  // Filter Categories
  const categories = ["all", "補氣藥", "補血藥", "補陰藥", "活血化瘀藥", "瀉下藥", "解表藥", "祛風散寒藥", "清熱藥", "化痰止咳平喘藥", "利水滲濕藥", "溫里藥"];

  const filteredMedicines = useMemo(() => {
    return CHINESE_MEDICINES_DATA.filter(med => {
      const matchSearch = 
        med.name.includes(searchTerm) || 
        med.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) || 
        med.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        med.activeComponents.includes(searchTerm);
      const matchCat = selectedCategory === "all" || med.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCategory]);

  const calcResult = useMemo(() => {
    const med = CHINESE_MEDICINES_DATA.find(m => m.id === calcCMId);
    if (!med) return null;

    // Map Western classes to keywords
    const interaction = med.interactions.find(inter => {
      const lowerClass = inter.westernClass.toLowerCase();
      const query = calcWesternClass.toLowerCase();
      return lowerClass.includes(query) || (query === "anticoagulants" && lowerClass.includes("凝血")) || (query === "antidiabetics" && lowerClass.includes("血糖")) || (query === "antihypertensives" && lowerClass.includes("血壓"));
    });

    if (interaction) {
      return {
        hasRisk: true,
        risk: interaction.risk,
        medName: med.name,
        class: interaction.westernClass,
        example: interaction.westernExample,
        mechanism: interaction.mechanism,
        suggestion: interaction.suggestion
      };
    }

    return {
      hasRisk: false,
      risk: "低風險" as const,
      medName: med.name,
      class: calcWesternClass === "Anticoagulants" ? "抗凝血與抗血小板藥物" : calcWesternClass === "Antidiabetics" ? "降血糖藥物" : calcWesternClass === "Antihypertensives" ? "降血壓藥物" : "此類西藥",
      example: "無明顯干擾一線藥",
      mechanism: "目前臨床與分子生化上無確切證據表明兩者合併服用會產生直接對抗、毒性累積或拮抗作用。但中西藥服用仍建議間隔至少 2 小時以確保各自之吸收度。",
      suggestion: "可以安心服用。請遵醫囑以溫開水伴服。切勿在同一口水中同時吞服中西藥丸。"
    };
  }, [calcCMId, calcWesternClass]);

  const getRiskBadgeColor = (risk: "高風險" | "中風險" | "低風險") => {
    switch (risk) {
      case "高風險":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "中風險":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "低風險":
        return "bg-slate-100 text-slate-600 border-slate-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fade-in">
      
      {/* Intro Header Section */}
      <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Leaf className="h-5.5 w-5.5 text-blue-600 animate-pulse" />
            中藥與西藥臨床交互作用安全檢索
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            結合高中選修化學之有機配合物（螯合螯合）、生物內分泌系統假性醛固酮增多症等，科學化解碼 20 項常見中藥的臨床用藥禁忌與生化機制
          </p>
        </div>
        <div className="bg-blue-50/70 border border-blue-150 rounded-xl px-4 py-2.5 max-w-sm">
          <div className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider mb-0.5">專業審查校對</div>
          <p className="text-[11px] text-slate-600 font-medium leading-normal">
            臺北市立成功高中 馮柏翔作品學術研究組監製
          </p>
        </div>
      </div>

      {/* Main Interactive Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Search & 20 Med List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col h-[650px]">
          <div className="bg-white border border-slate-150 rounded-3xl p-5 shadow-xs flex-1 flex flex-col overflow-hidden">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5 shrink-0">
              <Search className="h-4.5 w-4.5 text-blue-600" />
              常見 20 味中藥字典檢索
            </h3>

            {/* Search Input */}
            <div className="relative shrink-0 mb-4">
              <input
                type="text"
                placeholder="搜尋中藥名稱、拼音或成分 (如: 甘草, Betaine)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-700"
              />
              <span className="absolute left-3.5 top-3.5 text-slate-400">
                <Search className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-3 shrink-0 scrollbar-none border-b border-slate-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#1a365d] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/60"
                  }`}
                >
                  {cat === "all" ? "全部類別" : cat}
                </button>
              ))}
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 mt-4">
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((med) => {
                  const isSelected = selectedCM.id === med.id;
                  const highRiskCount = med.interactions.filter(i => i.risk === "高風險").length;

                  return (
                    <button
                      key={med.id}
                      onClick={() => setSelectedCM(med)}
                      className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center justify-between cursor-pointer border ${
                        isSelected
                          ? "bg-blue-50/50 border-blue-200 shadow-2xs"
                          : "bg-white border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-800">{med.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono italic">{med.scientificName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200/70 rounded px-1.5 py-0.2">
                            {med.category}
                          </span>
                          {highRiskCount > 0 && (
                            <span className="text-[9px] font-extrabold text-rose-600 bg-rose-50 border border-rose-100 rounded px-1.5 py-0.2 flex items-center gap-0.5">
                              <ShieldAlert className="h-2.5 w-2.5" />
                              高危 {highRiskCount} 項
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-[11px] font-bold text-blue-600 hover:translate-x-0.5 transition-transform">
                        詳情
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  無符合關鍵字之中藥材
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Med Profile Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden space-y-6">
            {/* Upper dark navy colored indicator top line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#1a365d]"></div>

            {/* Profile Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">{selectedCM.name}</h3>
                  <span className="text-xs font-semibold text-slate-400 font-mono">({selectedCM.pinyin})</span>
                </div>
                <p className="text-xs text-slate-500">
                  學名：<span className="italic font-medium">{selectedCM.scientificName}</span> | 類別：<span className="font-bold text-slate-700">{selectedCM.category}</span>
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  功效：{selectedCM.description}
                </p>
              </div>

              <div className="bg-blue-50 text-blue-700 border border-blue-100 rounded-2xl px-4 py-2.5 text-center shrink-0">
                <div className="text-[9px] text-blue-500 uppercase font-black tracking-wider leading-tight">核心化學成分</div>
                <div className="text-xs font-black font-mono mt-1 max-w-[150px] truncate" title={selectedCM.activeComponents}>
                  {selectedCM.activeComponents.split(" (")[0]}
                </div>
              </div>
            </div>

            {/* Active Components & High School connection */}
            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-blue-600" />
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  高中學科銜接：活性分子生化作用
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedCM.highSchoolBiochem}
              </p>
            </div>

            {/* Western Drug Interaction Alerts */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-rose-500 animate-pulse" />
                西藥交互作用對照警告表
              </h4>

              <div className="space-y-3.5">
                {selectedCM.interactions.map((inter, idx) => (
                  <div 
                    key={idx} 
                    className="border border-slate-100 rounded-2xl p-4 space-y-2 hover:bg-slate-50/40 transition-all"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-800">{inter.westernClass}</span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          例：{inter.westernExample}
                        </span>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 border rounded-full ${getRiskBadgeColor(inter.risk)}`}>
                        {inter.risk}
                      </span>
                    </div>
                    <div className="text-xs leading-relaxed text-slate-600 bg-white/70 border border-slate-50/50 rounded-xl p-2.5">
                      <p className="font-semibold text-[11px] text-slate-800 mb-0.5 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />
                        分子干擾機制：
                      </p>
                      <span className="text-[11px] text-slate-600">{inter.mechanism}</span>
                    </div>
                    <div className="text-[11px] text-rose-800 font-semibold leading-relaxed border-l-2 border-rose-400 pl-2">
                      臨床防護指引：{inter.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Interactive Calculator Section: 中西藥交互作用快篩診斷器 */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 md:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Form Side */}
          <div className="space-y-4 lg:max-w-md">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5.5 w-5.5 text-blue-400 animate-pulse" />
              <h3 className="text-lg font-extrabold tracking-tight">中西藥併服：快篩安全評鑑器</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              擔心服用的中藥材和常規西藥藥箋相衝？在此選取一味中藥與您的一線西藥類別，系統將立即剖析其藥理拮抗或酵素干擾程度。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">選擇中藥材 (20味)</label>
                <select
                  value={calcCMId}
                  onChange={(e) => setCalcCMId(e.target.value)}
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-blue-500 outline-hidden cursor-pointer"
                >
                  {CHINESE_MEDICINES_DATA.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">選擇西藥類別</label>
                <select
                  value={calcWesternClass}
                  onChange={(e) => setCalcWesternClass(e.target.value)}
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-blue-500 outline-hidden cursor-pointer"
                >
                  <option value="Anticoagulants">抗凝血 / 抗血小板 (華法林、阿斯匹靈等)</option>
                  <option value="Antidiabetics">降血糖西藥 (美獲平、胰島素等)</option>
                  <option value="Antihypertensives">降血壓西藥 (脈優、得安穩、Beta阻斷劑)</option>
                  <option value="Diuretics">排水利尿劑 (福蘭、速尿等)</option>
                  <option value="Immunosuppressants">類固醇 / 免疫抑制劑</option>
                  <option value="Cardiac Glycosides">強心苷類藥物 (地高辛 Digoxin)</option>
                  <option value="MAOIs">單胺氧化酶抑制劑 (抗憂鬱、巴金森等)</option>
                  <option value="Interferons">干擾素治療</option>
                </select>
              </div>
            </div>
          </div>

          {/* Diagnosis Result Output Side */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[11px] font-bold text-slate-400">
                併用安全評估結果
              </span>
              {calcResult?.hasRisk ? (
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                  calcResult.risk === "高風險" 
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/30" 
                    : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`}>
                  {calcResult.risk}警告
                </span>
              ) : (
                <span className="text-[10px] font-bold px-3 py-1 rounded-full border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  安全無虞
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-blue-300">{calcResult?.medName}</span>
                <span className="text-xs text-slate-400">併服</span>
                <span className="text-sm font-extrabold text-blue-300">{calcResult?.class}</span>
              </div>

              <div className="bg-black/30 rounded-xl p-3 text-xs leading-relaxed space-y-1.5 border border-white/5">
                <p className="text-slate-300 text-[11px] font-semibold flex items-center gap-1">
                  <Info className="h-3.5 w-3.5 text-blue-400" />
                  分子藥理與代謝分析：
                </p>
                <p className="text-slate-400 text-[11px]">
                  {calcResult?.mechanism}
                </p>
              </div>

              <div className="text-xs leading-relaxed bg-blue-500/10 border border-blue-500/20 text-blue-200 rounded-xl p-3">
                <span className="font-extrabold text-white text-[11px] block mb-0.5">※ 藥師專業處置指引：</span>
                {calcResult?.suggestion}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
