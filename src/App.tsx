/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import PrefixSuffixTab from "./components/PrefixSuffixTab";
import DrugCatalogTab from "./components/DrugCatalogTab";
import EduLessonsTab from "./components/EduLessonsTab";
import InteractionGuideTab from "./components/InteractionGuideTab";
import HealthTipsTab from "./components/HealthTipsTab";
import AiConsultantTab from "./components/AiConsultantTab";

import { Activity, ShieldCheck, BookOpen, Sparkles, HeartPulse, Pill } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("patterns");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "patterns":
        return <PrefixSuffixTab />;
      case "catalog":
        return <DrugCatalogTab />;
      case "lessons":
        return <EduLessonsTab />;
      case "interactions":
        return <InteractionGuideTab />;
      case "tips":
        return <HealthTipsTab />;
      case "consultant":
        return <AiConsultantTab />;
      default:
        return <PrefixSuffixTab />;
    }
  };

  // Quick stats card details to display at the bottom of the main frame
  const quickStats = [
    { title: "收錄字首字尾", value: "22 類首尾", icon: Pill, desc: "覆蓋九大系統性疾病藥名" },
    { title: "慢性用藥品項", value: "32+ 一線藥", icon: HeartPulse, desc: "包含副作用與禁忌說明" },
    { title: "高中考點教材", value: "4 大專案", icon: BookOpen, desc: "對標108課綱生物與化學" },
    { title: "健康日常生活", value: "10 則衛教", icon: Activity, desc: "日常用藥基本常識" },
    { title: "AI 在線分析", value: "Gemini 3.5", icon: Sparkles, desc: "拍照藥袋辨識與對話解答" }
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col font-sans transition-all selection:bg-blue-600 selection:text-white">
      {/* 1. Main Navigation Block */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Primary Workspaces Stage Container */}
      <main className="flex-1">
        {renderActiveTab()}
      </main>

      {/* 3. Global Stats/Intro Ribbon */}
      <section className="bg-white border-t border-slate-200 py-6 mt-8 hidden sm:block shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {quickStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="border-r border-slate-100 last:border-0 pr-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Icon className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">{stat.title}</span>
                  </div>
                  <p className="text-lg font-black text-slate-800 mt-1 font-mono">{stat.value}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{stat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Elegant Footer with safety disclaimer */}
      <footer className="bg-slate-900 text-slate-400 text-[11px] py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 h-2 w-2 rounded-full"></span>
              <p className="font-extrabold tracking-wider">AI 藥師助理 — 108課綱生化微教案與臨床安全指引平台</p>
            </div>
            <p className="font-mono text-[10px] text-slate-400">
              系統版本: v2.4.0 (Powered by Google Gemini-3.5-Flash)
            </p>
          </div>

          <p className="text-slate-400/95 leading-relaxed max-w-4xl text-left border-l-2 border-blue-500 pl-3.5">
            <span className="font-bold text-slate-305">🚨 重要安全免責聲明：</span>
            本智慧應用程式所載之全部藥名命名規律、字尾對應、用藥禁忌、副作用指引、藥物與食物配對防禦檢索、和 AI 藥袋掃描辨識，均僅作一般通識教學、高中自然學科微教案銜接以及日常保健輔助参考。非等同、亦不能替代任何專業臨床診斷、藥師核發調劑或執業醫師診治。若您目前正處於服藥療程或有身體疾病症狀，應遵循各大教學醫院之實體主治醫方處方箋藥指示。
          </p>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
            <p>© 2026 AI 藥師助理 & 高中自然學程生化科普著作. All Rights Reserved.</p>
            <p className="flex items-center gap-1.5 justify-center">
              <ShieldCheck className="h-4.5 w-4.5 text-blue-500" />
              用藥不重疊，吃藥配溫水，守護您的生理循環與臟器安康
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
