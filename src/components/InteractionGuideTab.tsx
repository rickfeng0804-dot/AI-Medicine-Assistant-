/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ALL_DRUGS } from "../data";
import { ShieldCheck, ShieldAlert, AlertTriangle, Salad, Milk, Wine, Info, Plus, Trash2, Zap, Activity } from "lucide-react";
import { DrugItem } from "../types";

export default function InteractionGuideTab() {
  const [prescriptionList, setPrescriptionList] = useState<DrugItem[]>([
    ALL_DRUGS[0], // Lovastatin
  ]);
  const [customFood, setCustomFood] = useState<string>("none");
  const [selectedDrugId, setSelectedDrugId] = useState<string>(ALL_DRUGS[4]?.id || ""); // default select
  const [interactionReport, setInteractionReport] = useState<Array<{
    severity: "danger" | "warning" | "info";
    title: string;
    description: string;
    advise: string;
  }>>([]);
  const [hasChecked, setHasChecked] = useState(false);

  const addDrugToPrescription = () => {
    const found = ALL_DRUGS.find((d) => d.id === selectedDrugId);
    if (!found) return;
    if (prescriptionList.some((d) => d.id === found.id)) {
      alert("此藥物多已在用藥藥單中，請勿重複添加！");
      return;
    }
    setPrescriptionList((prev) => [...prev, found]);
    setHasChecked(false);
  };

  const removeDrug = (id: string) => {
    setPrescriptionList((prev) => prev.filter((d) => d.id !== id));
    setHasChecked(false);
  };

  const runInteractionCheck = () => {
    const reports: typeof interactionReport = [];

    // Helper properties
    const hasStatin = prescriptionList.some(d => d.prefixSuffix === "-statin");
    const hasCCB = prescriptionList.some(d => d.prefixSuffix === "-dipine");
    const hasBZD = prescriptionList.some(d => d.prefixSuffix === "-azepam" || d.prefixSuffix === "-azolam");
    const hasBarbiturate = prescriptionList.some(d => d.prefixSuffix === "-barbital");
    const hasZDrug = prescriptionList.some(d => d.prefixSuffix === "Z-");
    const hasACEI = prescriptionList.some(d => d.prefixSuffix === "-pril");
    const hasARB = prescriptionList.some(d => d.prefixSuffix === "-sartan");
    const hasBetaBlocker = prescriptionList.some(d => d.prefixSuffix === "-olol, -lol");
    const hasHeparin = prescriptionList.some(d => d.prefixSuffix === "-parin");
    const hasXaInhibitor = prescriptionList.some(d => d.prefixSuffix === "-xaban");
    const hasThrombinInhibitor = prescriptionList.some(d => d.prefixSuffix === "-udin" || d.prefixSuffix === "-gatr-");
    const hasADPInhibitor = prescriptionList.some(d => d.prefixSuffix === "-grel-");
    const hasH2Blocker = prescriptionList.some(d => d.prefixSuffix === "-tidine");
    const hasPPI = prescriptionList.some(d => d.prefixSuffix === "-prazole");

    // 1. Drug - Food interactions
    if (customFood === "grapefruit") {
      if (hasStatin) {
        reports.push({
          severity: "danger",
          title: "Statin 他汀類降脂藥 ✕ 葡萄柚汁（極高風險）",
          description: "葡萄柚內富含『呋喃香豆素』，會強烈不可逆抑制肝臟 CYP3A4 代謝酶。降脂藥 Lovastatin/Simvastatin 的吸收血中濃度將猛增 5-10 倍！",
          advise: "絕對禁止共服葡萄柚、柚子！這會誘發橫紋肌溶解症，造成肌肉組織潰爛排出可樂色尿、甚至引發急性腎衰竭。"
        });
      }
      if (hasCCB) {
        reports.push({
          severity: "warning",
          title: "CCB 鈣通道降壓藥 ✕ 葡萄柚汁",
          description: "葡萄柚抑制 CYP3A4 代謝，會大幅減緩 Amlodipine/Nifedipine 的分解速度，促使血藥濃度增加，引發血壓過度急降。",
          advise: "避免兩者共食，否則易造成突發性心悸、劇烈頭暈、體位低血壓昏倒。"
        });
      }
    }

    if (customFood === "milk_calcium") {
      // Cefazolin / Cephalexin are cephalosporins, which have mild interaction with calcium but mostly antibiotics like quinolones/tetracyclines. Still, general calcium interactions for antibiotics:
      const hasAntiobiotics = prescriptionList.some(d => d.disease === "Cephalosporin類抗生素");
      if (hasAntiobiotics) {
        reports.push({
          severity: "warning",
          title: "頭孢菌素抗生素 ✕ 高鈣牛奶 / 鈣片",
          description: "牛奶與高強度鈣片中的游離多價鈣離子 (Ca2+)，常在胃腸小腸中與特定抗生分子發生螯合作用 (Chelation)，形成不可溶性的結晶或沉澱物。",
          advise: "這會使小腸無法吸收抗生素，嚴重降低藥劑殺菌浓度導致療程失敗。務必將兩者隔開至少 2 小時以上服用。"
        });
      }
      if (hasPPI) {
        reports.push({
          severity: "info",
          title: "PPI 胃藥 ✕ 牛奶鈣質吸收阻礙",
          description: "PPI (Omeprazole等) 與 H2 受體阻斷劑會大幅提高胃部 pH 值，即大幅減少胃酸分泌。許多碳酸鈣鈣片必須依靠高酸環境進行離子化才能被人體小腸吸收。",
          advise: "長期共食可能會減少日常鈣質和維生素B12的吸收比重，若需補鈣，建議考慮改用對酸度依賴較低的檸檬酸鈣劑型。"
        });
      }
    }

    if (customFood === "alcohol") {
      if (hasBZD || hasBarbiturate || hasZDrug) {
        reports.push({
          severity: "danger",
          title: "中樞鎮靜安眠藥 ✕ 酒精配酒（致命風險）",
          description: "酒精（乙醇）與苯二氮平類安眠藥、巴比妥類都是神經抑制劑，兩者共同別構調控大腦 GABA-A 受體的氯通道，產生致命的加乘相加作用。",
          advise: "極可能造成中樞神經完全抑制，引發呼吸中樞停止、睡眠中休克昏迷或窒息而死亡。服藥當天請絕對滴酒不沾！"
        });
      }
    }

    // 2. Drug-Drug combinations
    // Statin + Fibrates combined (HMG-CoA + Fibric acid)
    const hasFibrate = prescriptionList.some(d => d.prefixSuffix === "-fibr-");
    if (hasStatin && hasFibrate) {
      reports.push({
        severity: "warning",
        title: "Statin（HMG-CoA）✕ Fibric acid（纖維酸類降脂藥）",
        description: "兩者都是降血脂藥物，併用會使得骨骼肌疼痛和橫紋肌溶解(Rhabdomyolysis) 的發生機率顯著增加。",
        advise: "臨床上只有在患者甘油三脂與膽固醇皆極嚴重超標、且單藥治療不佳時才會考慮聯用，服用期間需密切監測肌酸激酶 (CK) 濃度。"
      });
    }

    // CCB + Beta blockers (Verapamil like -olol, -lol)
    if (hasCCB && hasBetaBlocker) {
      reports.push({
        severity: "warning",
        title: "CCB 鈣通道阻斷劑 ✕ β-blocker 乙型阻斷劑",
        description: "β-blocker 會減緩心率與收縮力；而鈣直通道阻斷劑也會擴張冠狀動脈、減慢心房房室傳導。併用時心跳可能過度緩慢。",
        advise: "特別是當長者或心功能不全者共服時，應定時量測居家血壓與心跳，若心率低於每分鐘 50 次或常感極度疲倦無力，需回診評估減量。"
      });
    }

    // ACEI + ARB (Renin inhibitors combined)
    if (hasACEI && hasARB) {
      reports.push({
        severity: "danger",
        title: "ACEI ✕ ARB 高度重疊阻斷（不建議併用）",
        description: "兩者都作用在 RAAS 系統，一個抑制 Angiotensin II 代謝，另一個卡住 AT1 受體，共同阻斷血管及遠曲小管的鈉水分泌。",
        advise: "併用不但沒有增加血壓控制，反而會極度加劇高血鉀症的危險、導致腎結石、急性腎損傷。臨床指引不建議兩者併用。"
      });
    }

    // Anti-coagulation cascade overlaps (Heparin + Xaban + Grel etc)
    const anticoagulantCount = [hasHeparin, hasXaInhibitor, hasThrombinInhibitor, hasADPInhibitor].filter(Boolean).length;
    if (anticoagulantCount >= 2) {
      reports.push({
        severity: "danger",
        title: "重疊口服抗凝血 ✕ 重點抗血小板藥物（出血高危險）",
        description: "您的藥單裡同時有兩種左右影響血液凝血瀑布機制的藥物（如抗血小板 Clopidogrel 與抗凝因子 Apixaban、Dabigatran）。這會劇烈縮減血凝原的聚合效能。",
        advise: "這會大幅拉高腦出血、自發性消化道穿孔出血等不可逆意外的風險。請務必密切留意膚況紫斑、解黑便，並使用超軟毛刷防止刷牙血流不止。"
      });
    }

    // Cimetidine drug engine inhib
    const hasCimetidine = prescriptionList.some(d => d.name === "Cimetidine");
    if (hasCimetidine && (hasStatin || hasBZD || hasBarbiturate)) {
      reports.push({
        severity: "warning",
        title: "Cimetidine（H2胃酸藥）✕ 肝臟 CYP450 抑制效應",
        description: "Cimetidine 是一代 H2 blocker，在分子結構上會與肝臟的微粒體細胞色素 P450 多組氧化酶系統緊結合，造成降血脂藥 or 安眠藥無法被分解清除。",
        advise: "會像垃圾堆積一樣造成血中藥物累積。若需長期胃部抗酸，建議諮詢藥師，換成較不干擾肝臟代謝的 Famotidine 或 PPI 藥劑。"
      });
    }

    // If nothing found
    if (reports.length === 0) {
      reports.push({
        severity: "info",
        title: "未偵測到明顯已知的一線物理/化學交互作用衝突",
        description: "目前藥單中包含：【" + prescriptionList.map(d => d.name).join("、") + "】配對生理機制良好，未見傳統的高風險致命加乘與螯合衝突。",
        advise: "提醒您：這僅涵蓋常見的高風險靶點重疊。服藥時一律搭配大量溫水(250ml)，避服茶、果汁、保健補骨食品，安全健康吃藥！"
      });
    }

    setInteractionReport(reports);
    setHasChecked(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          藥物交互作用、衛教分析與健康生活管理
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          整合一線臨床常見藥與危險食品對照（高鈣、葡萄柚、酒精等），點選加入您的臨時藥單，一鍵為您執行生化毒性預警。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left container: prescription bag constructor */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-1.5">
              <Plus className="h-5 w-5 text-emerald-500" />
              1. 建立您的模擬處方藥單袋
            </h3>

            {/* Selector drop-down */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-1.5">
                  選擇要模擬加入的常規藥品
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedDrugId}
                    onChange={(e) => setSelectedDrugId(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-2 px-3 text-xs focus:ring-1 focus:ring-blue-500 cursor-pointer text-slate-800"
                  >
                    {ALL_DRUGS.map((d) => (
                      <option key={d.id} value={d.id}>
                        [{d.disease}] {d.name} ({d.chineseName}) • {d.prefixSuffix}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addDrugToPrescription}
                    className="bg-[#1a365d] hover:bg-blue-900 text-white p-2.5 rounded-2xl shadow-md cursor-pointer shrink-0 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Food dropdown list */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase mb-1.5">
                  2. 選擇當期有接觸或共服的常備食品
                </label>
                <select
                  value={customFood}
                  onChange={(e) => {
                    setCustomFood(e.target.value);
                    setHasChecked(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-3 text-xs focus:ring-1 focus:ring-blue-500 cursor-pointer text-slate-800"
                >
                  <option value="none">無 (僅正常白開水伴服)</option>
                  <option value="grapefruit">葡萄柚 / 柚子 (Cytochrome P450 元功)</option>
                  <option value="milk_calcium">牛奶、豆奶、高劑量鈣片/鐵劑 (螯合結晶)</option>
                  <option value="alcohol">酒精、白酒、啤酒、威士忌 (GABA加乘抑制劑)</option>
                </select>
              </div>
            </div>

            {/* List box inside prescription */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                目前處方袋中的藥品 ({prescriptionList.length} 筆)
              </h4>

              {prescriptionList.length > 0 ? (
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {prescriptionList.map((drug) => (
                    <div
                      key={drug.id}
                      className="bg-slate-50 border border-slate-100/80 rounded-2xl px-4 py-2.5 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-xs font-black text-slate-800 font-mono">
                          {drug.name} <span className="font-sans text-[10px] text-slate-400">({drug.chineseName})</span>
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          {drug.disease} • 字尾 {drug.prefixSuffix}
                        </p>
                      </div>
                      <button
                        onClick={() => removeDrug(drug.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded-md transition-all cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 border border-dashed border-slate-200 rounded-2xl text-xs">
                  目前藥袋空空的，請選上方的藥品點『+』加入。
                </div>
              )}
            </div>

            {/* Trigger actions */}
            <div className="mt-6">
              <button
                onClick={runInteractionCheck}
                disabled={prescriptionList.length === 0}
                className="w-full bg-[#1a365d] hover:bg-blue-900 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-2xl text-xs transition-all tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="h-4.5 w-4.5 animate-pulse" />
                一鍵檢查藥物與食品交互作用
              </button>
            </div>
          </div>
        </div>

        {/* Right container: interactive clinical analysis reports */}
        <div className="lg:col-span-7">
          {hasChecked ? (
            <div className="space-y-5">
              <div className="bg-white border border-slate-150 rounded-3xl p-5 shadow-xs">
                <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <ShieldCheck className="h-5 w-5 text-blue-600 animate-pulse" />
                  AI 藥師物理/化學交互作用審查報告
                </h3>

                <div className="space-y-4">
                  {interactionReport.map((report, idx) => {
                    const isDanger = report.severity === "danger";
                    const isWarning = report.severity === "warning";

                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border p-4.5 ${
                          isDanger
                            ? "bg-rose-500/5 border-rose-200 text-rose-950"
                            : isWarning
                            ? "bg-amber-500/5 border-amber-200 text-amber-950"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex gap-3 items-start">
                          {isDanger ? (
                            <ShieldAlert className="h-5.5 w-5.5 text-rose-500 shrink-0 mt-0.5" />
                          ) : isWarning ? (
                            <AlertTriangle className="h-5.5 w-5.5 text-amber-500 shrink-0 mt-0.5" />
                          ) : (
                            <Info className="h-5.5 w-5.5 text-slate-500 shrink-0 mt-0.5" />
                          )}

                          <div className="space-y-2">
                            <h4 className="text-xs font-bold font-sans tracking-wide">
                              {report.title}
                            </h4>
                            <p className="text-[11px] leading-relaxed opacity-95">
                              {report.description}
                            </p>
                            <div className={`p-3 rounded-xl text-[11px] font-medium leading-relaxed ${
                              isDanger
                                ? "bg-rose-50/70 border border-rose-100/50 text-rose-800"
                                : isWarning
                                ? "bg-amber-100/50 border border-amber-200/50 text-amber-800"
                                : "bg-white border border-slate-200/50 text-slate-600"
                            }`}>
                              <span className="font-extrabold">藥師生活衛教指引：</span>
                              {report.advise}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* General Health reminder graphics card */}
              <div className="bg-slate-800 text-slate-300 rounded-3xl p-6 relative overflow-hidden shadow-xs">
                <div className="absolute right-[-10px] bottom-[-20px] opacity-10">
                  <Plus className="h-44 w-44" />
                </div>

                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                  <Wine className="h-4.5 w-4.5 text-blue-400" />
                  日常三種必知的高風險共服用藥殺手
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Wine className="h-4 w-4 text-rose-400 shrink-0" />
                      <span className="font-bold text-white">酒（咖啡乙醇）</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      強力加速鎮靜催眠 BZD 藥物，並使 H2 胃藥、胰島素產生心跳劇烈失衡與肝糖急性瓦解。
                    </p>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Milk className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="font-bold text-white">雙價陽離子（牛奶鈣片）</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      雙價鐵(Fe2+)、鈣(Ca2+)會卡死如頭孢類膠囊，在中部小腸形成不可溶螯合物，藥物一滴都無法被身體吸收。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 border-dashed rounded-3xl p-12 text-center text-slate-400 h-full flex flex-col justify-center items-center">
              <ShieldCheck className="h-10 w-10 text-slate-300 mb-3 animate-pulse" />
              <p className="text-sm font-bold text-slate-700">尚未執行安全檢查</p>
              <p className="text-xs mt-1.5 max-w-sm mx-auto leading-relaxed">
                組建左側藥單盒後，點選『一鍵檢查藥物與食品交互作用』，系統將快速為您評估生物配對和臨床生活衛教建議。
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Supplement Matrix Section */}
      <div className="mt-8 bg-white border border-slate-150 rounded-3xl p-6 shadow-xs overflow-hidden">
        <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-blue-600" />
          常見保健食品 ✕ 常規藥物：交互作用風險矩陣
        </h3>
        <div className="overflow-x-auto pb-2">
          <table className="w-full text-xs text-center border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-slate-200 text-slate-500 font-bold bg-slate-50 rounded-tl-xl">藥物類別 \ 保健食品</th>
                <th className="p-3 border-b-2 border-slate-200 text-slate-700 font-bold bg-slate-50">益生菌 (Probiotics)</th>
                <th className="p-3 border-b-2 border-slate-200 text-slate-700 font-bold bg-slate-50">維他命C (Vit C)</th>
                <th className="p-3 border-b-2 border-slate-200 text-slate-700 font-bold bg-slate-50">鈣片 / 鐵劑 (Ca/Fe)</th>
                <th className="p-3 border-b-2 border-slate-200 text-slate-700 font-bold bg-slate-50 rounded-tr-xl">魚油 (Fish Oil)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 border-b border-slate-100 font-bold text-slate-600 bg-slate-50/50">抗生素 (Antibiotics)</td>
                <td className="p-3 border-b border-slate-100 bg-amber-50/30 text-amber-700">
                  <span className="font-bold flex items-center justify-center gap-1"><AlertTriangle className="h-3 w-3"/> 需間隔2小時</span>
                  <span className="text-[10px] block mt-1 opacity-80">抗生素會殺死活菌</span>
                </td>
                <td className="p-3 border-b border-slate-100 text-slate-500">安全 (無明顯干擾)</td>
                <td className="p-3 border-b border-slate-100 bg-rose-50/40 text-rose-700">
                  <span className="font-bold flex items-center justify-center gap-1"><ShieldAlert className="h-3 w-3"/> 極高風險</span>
                  <span className="text-[10px] block mt-1 opacity-80">金屬離子螯合阻礙吸收</span>
                </td>
                <td className="p-3 border-b border-slate-100 text-slate-500">安全 (無明顯干擾)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 border-b border-slate-100 font-bold text-slate-600 bg-slate-50/50">降血脂藥 (Statins)</td>
                <td className="p-3 border-b border-slate-100 text-slate-500">安全 (無明顯干擾)</td>
                <td className="p-3 border-b border-slate-100 text-slate-500">安全 (無明顯干擾)</td>
                <td className="p-3 border-b border-slate-100 text-slate-500">安全 (無明顯干擾)</td>
                <td className="p-3 border-b border-slate-100 bg-amber-50/30 text-amber-700">
                  <span className="font-bold flex items-center justify-center gap-1"><AlertTriangle className="h-3 w-3"/> 注意劑量</span>
                  <span className="text-[10px] block mt-1 opacity-80">少數情況可能增加肌肉痠痛副作用</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 border-b border-slate-100 font-bold text-slate-600 bg-slate-50/50">降血壓藥 (CCB類)</td>
                <td className="p-3 border-b border-slate-100 text-slate-500">安全 (無明顯干擾)</td>
                <td className="p-3 border-b border-slate-100 text-slate-500">安全 (無明顯干擾)</td>
                <td className="p-3 border-b border-slate-100 bg-amber-50/30 text-amber-700">
                  <span className="font-bold flex items-center justify-center gap-1"><AlertTriangle className="h-3 w-3"/> 拮抗效應</span>
                  <span className="text-[10px] block mt-1 opacity-80">高劑量鈣可能降低藥物降壓效果</span>
                </td>
                <td className="p-3 border-b border-slate-100 text-slate-500">安全 (無明顯干擾)</td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3 font-bold text-slate-600 bg-slate-50/50 rounded-bl-xl">抗凝血藥 (Warfarin/Xaban)</td>
                <td className="p-3 text-slate-500">安全 (無明顯干擾)</td>
                <td className="p-3 bg-amber-50/30 text-amber-700">
                  <span className="font-bold flex items-center justify-center gap-1"><AlertTriangle className="h-3 w-3"/> 注意劑量</span>
                  <span className="text-[10px] block mt-1 opacity-80">高劑量維生素C可能降低藥效</span>
                </td>
                <td className="p-3 text-slate-500">安全 (無明顯干擾)</td>
                <td className="p-3 bg-rose-50/40 text-rose-700 rounded-br-xl">
                  <span className="font-bold flex items-center justify-center gap-1"><ShieldAlert className="h-3 w-3"/> 出血風險</span>
                  <span className="text-[10px] block mt-1 opacity-80">深海魚油具抗凝血加乘效果</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
