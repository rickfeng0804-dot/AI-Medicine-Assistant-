/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { healthTips } from "../data";
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, ListChecks, Heart } from "lucide-react";
import { HealthTip } from "../types";

export default function HealthTipsTab() {
  const [expandedId, setExpandedId] = useState<string | null>("tip_1"); // open first by default

  const toggleTip = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "用藥安全":
        return "bg-rose-50 text-rose-700 border-rose-150";
      case "貯存常識":
        return "bg-amber-50 text-amber-700 border-amber-150";
      case "健康生活":
        return "bg-blue-50 text-blue-700 border-blue-150";
      default:
        return "bg-slate-50 text-slate-700 border-slate-150";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      <div className="border-b border-slate-200 pb-4 mb-8 text-center sm:text-left">
        <h2 className="text-xl font-bold text-slate-800">
          藥物日常安全衛教十強觀念
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          由執業藥師與毒物科名醫監修，十條攸關家庭安全的寶貴藥品保存、保存期限與不良反應防範手冊
        </p>
      </div>

      <div className="space-y-4">
        {healthTips.map((tip) => {
          const isExpanded = expandedId === tip.id;
          return (
            <div
              key={tip.id}
              className={`bg-white border rounded-2xl transition-all overflow-hidden ${
                isExpanded ? "border-blue-600 shadow-xs" : "border-slate-150 hover:border-slate-200"
              }`}
            >
              {/* Header block (Toggle Trigger) */}
              <button
                onClick={() => toggleTip(tip.id)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-xs font-black bg-slate-100 text-slate-500 h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                    {tip.id.toString().padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold border ${getCategoryBadgeColor(tip.category)}`}>
                        {tip.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">
                      {tip.title}
                    </h3>
                  </div>
                </div>

                <div className="text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-50 animate-fade-in bg-slate-50/20 text-slate-700">
                  <p className="text-xs leading-relaxed mt-2 text-slate-700">
                    {tip.content}
                  </p>

                  {/* Bullet tips or highlights */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tip.checklist && tip.checklist.length > 0 && (
                      <div className="bg-white border border-slate-100 rounded-xl p-4">
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <ListChecks className="h-4 w-4 text-blue-650" />
                          安全查核點 / 指標
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {tip.checklist.map((check, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                              <span>{check}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {tip.summary && (
                      <div className="bg-blue-500/5 border border-blue-100 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[11px] font-bold text-blue-705 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Heart className="h-3.5 w-3.5 text-blue-600" />
                            藥師貼心一言
                          </h4>
                          <p className="text-xs text-blue-950 font-medium leading-relaxed italic">
                            「{tip.summary}」
                          </p>
                        </div>
                        <div className="text-[10px] text-blue-600 mt-3 font-semibold">
                          ※ 預防重於治療，重視用藥細節生活更健康。
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
