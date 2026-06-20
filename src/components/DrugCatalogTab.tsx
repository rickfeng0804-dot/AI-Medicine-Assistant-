/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ALL_DRUGS, diseaseCategories } from "../data";
import { Search, HeartPulse, ShieldAlert, AlertOctagon, HelpCircle, ArrowRight } from "lucide-react";
import { DrugItem } from "../types";

export default function DrugCatalogTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedDrug, setSelectedDrug] = useState<DrugItem | null>(ALL_DRUGS[0]);

  // Filter list of drugs
  const filteredDrugs = ALL_DRUGS.filter((drug) => {
    const matchesFilter = activeFilter === "all" || drug.disease === diseaseCategories.find((c) => c.id === activeFilter)?.name;
    const matchesSearch =
      drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.chineseName.includes(searchTerm) ||
      drug.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.indications.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          藥品適應症與用藥安全對照目錄
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          本檢索目錄包含九大慢性系統藥名，提供完整的用藥禁忌、最常見副作用、以及高中教材的生理機制連結
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: searchable directory drug list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-1.5">
              <Search className="h-4.5 w-4.5 text-blue-600" />
              快速檢索工具
            </h3>

            {/* Keyword Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-3 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="輸入英文、中文藥名或適應症..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-700"
              />
            </div>

            {/* Quick Category Tab Pills */}
            <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-all ${
                  activeFilter === "all"
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                全部類別 ({ALL_DRUGS.length})
              </button>
              {diseaseCategories.map((cat) => {
                const count = ALL_DRUGS.filter((d) => d.disease === cat.name).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-all ${
                      activeFilter === cat.id
                        ? "bg-[#1a365d] text-white"
                        : "bg-slate-100/85 text-slate-600 hover:bg-slate-200/60"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results List */}
          <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-xs h-[420px] overflow-y-auto space-y-1.5 pr-1">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 flex justify-between">
              <span>搜尋結果 / 藥物清單</span>
              <span>共 {filteredDrugs.length} 筆</span>
            </div>

            {filteredDrugs.length > 0 ? (
              filteredDrugs.map((drug) => {
                const isSelected = selectedDrug?.id === drug.id;
                return (
                  <button
                    key={drug.id}
                    onClick={() => setSelectedDrug(drug)}
                    className={`w-full text-left px-3.5 py-3 rounded-2xl transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? "bg-blue-50/50 border-blue-200 shadow-xs"
                        : "bg-white border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-800 font-mono">
                          {drug.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {drug.chineseName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[10px] font-extrabold text-blue-705 bg-blue-50 border border-blue-150 rounded-md px-1.5 py-0.5 font-mono">
                          字尾 {drug.prefixSuffix}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {drug.disease} • {drug.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`h-4.5 w-4.5 transition-transform ${isSelected ? "text-blue-600 translate-x-1" : "text-slate-300"}`} />
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm font-medium">查無符合搜尋條件的藥品</p>
                <p className="text-xs mt-1">您可以輸入「statin」、「血壓」或藥名英文...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: detail view of the currently selected medicine */}
        <div className="lg:col-span-7">
          {selectedDrug ? (
            <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden space-y-6">
              {/* Colored abstract top bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#1a365d]"></div>

              {/* Title & Classification banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {selectedDrug.disease} • 一線藥理分類
                  </div>
                  <div className="flex items-baseline gap-2.5 mt-1">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight font-mono">
                      {selectedDrug.name}
                    </h3>
                    <span className="text-base text-slate-500 font-semibold">
                      {selectedDrug.chineseName}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-700 border border-blue-100 rounded-2xl px-4 py-2.5 text-center shrink-0">
                  <div className="text-[10px] text-blue-500 uppercase font-black tracking-wider leading-tight">核心識別字尾</div>
                  <div className="text-base font-black font-mono mt-0.5">{selectedDrug.prefixSuffix}</div>
                </div>
              </div>

              {/* Grid detail blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Indications & Therapeutic Purpose */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <HeartPulse className="h-4 w-4 text-blue-600" />
                    適應症（療效與功用）
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-700">
                    {selectedDrug.indications}
                  </p>
                </div>

                {/* Common Side Effects */}
                <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100/50">
                  <h4 className="text-xs font-extrabold text-rose-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <AlertOctagon className="h-4 w-4 text-rose-500" />
                    臨床常見副作用提醒
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-700">
                    {selectedDrug.sideEffects}
                  </p>
                </div>
              </div>

              {/* Absolute Contraindications */}
              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5">
                <h4 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <ShieldAlert className="h-4.5 w-4.5 text-amber-600" />
                  絕對用藥警示與禁忌 (Contraindications)
                </h4>
                <p className="text-xs leading-relaxed text-amber-800">
                  {selectedDrug.contraindications}
                </p>
              </div>

              {/* High School Biology/Chemistry explanation linkage */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <div className="flex gap-3">
                  <HelpCircle className="h-5.5 w-5.5 text-blue-650 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider">
                      高中教材與學術聯接（藥理機轉科普）
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {selectedDrug.biochemKnowledge}
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Disclaimer */}
              <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-50">
                ※ 提醒您：本目錄僅作學術、通識與生理機轉教案參考。藥品實際使用方法與計量，應百分百遵從臨床主治醫師診斷處方與執業藥師配發。
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 border-dashed rounded-3xl p-12 text-center text-slate-400 h-full flex flex-col justify-center items-center">
              <HeartPulse className="h-12 w-12 text-slate-300 mb-3 animate-pulse" />
              <p className="text-sm font-semibold">請從左側點選藥品</p>
              <p className="text-xs mt-1">即可查看其臨床適應症、用藥禁忌、副作用以及高中連結課程細節。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
