/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Pill, Activity, ShieldAlert, BookOpen, HeartPulse, Sparkles } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navItems = [
    { id: "patterns", label: "字首字尾整理", icon: Pill, desc: "疾病與藥名比對" },
    { id: "catalog", label: "藥品查詢目錄", icon: HeartPulse, desc: "適應症與副作用" },
    { id: "lessons", label: "生化知識學堂", icon: BookOpen, desc: "高中微教案銜接" },
    { id: "interactions", label: "交互作用防護", icon: ShieldAlert, desc: "用藥安全與生活" },
    { id: "tips", label: "衛教知識十則", icon: Activity, desc: "日常用藥基本常識" },
    { id: "consultant", label: "AI 藥師在線", icon: Sparkles, desc: "對話與藥卡識別" }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Upper Dark Navy Bar matching Professional Polish design */}
      <div className="bg-[#1a365d] text-white py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-400/20 text-blue-300 p-2 rounded-xl border border-blue-400/30 shadow-inner">
              <Pill className="h-5.5 w-5.5 animate-pulse text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  AI 藥師助理
                  <span className="text-blue-300 font-normal text-xs bg-blue-900/50 px-2 py-0.5 rounded-md border border-blue-800">專業智慧版 v2.4</span>
                </h1>
              </div>
              <p className="text-[11px] text-blue-200 mt-0.5 font-light">
                高階生化教學、臨床用藥副作用對照與交互作用防禦系統
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-[#2d4a77] px-3 py-1 rounded-lg border border-[#3b5e94]">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
              <span className="font-semibold text-blue-100">系統在線</span>
            </div>
            <div className="text-blue-200/80 font-mono text-[11px] hidden md:block">
              108課綱生物/化學教材對接 • 國家藥品臨床指導
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 overflow-x-auto pb-px scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex gap-2.5 items-center py-3 px-4 border-b-2 font-medium text-xs transition-all whitespace-nowrap outline-hidden cursor-pointer ${
                  isActive
                    ? "border-[#1a365d] text-[#1a365d] bg-blue-50/40 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? "text-[#1a365d]" : "text-slate-400"}`} />
                <div className="text-left">
                  <div className={`font-semibold ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                    {item.label}
                  </div>
                  <div className="text-[9px] text-slate-400 font-normal leading-tight hidden lg:block">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
