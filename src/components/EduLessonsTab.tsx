/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { highSchoolLessons } from "../data";
import { BookOpen, GraduationCap, Award, HelpCircle, CheckCircle } from "lucide-react";
import { HighSchoolLesson } from "../types";

export default function EduLessonsTab() {
  const [selectedLesson, setSelectedLesson] = useState<HighSchoolLesson>(highSchoolLessons[0]);
  const [activePathwayIndex, setActivePathwayIndex] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          藥物生物與化學知識學堂
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          本模組特別對標台灣普通高中下冊「基礎生物」與選修「有機生化」課程，將枯燥的考題與真實世界中的保命藥物理論結合
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: List of lesson capsules */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <GraduationCap className="h-4.5 w-4.5 text-blue-600" />
              高中學術核心教案目錄
            </h3>

            <div className="space-y-2.5">
              {highSchoolLessons.map((lesson) => {
                const isSelected = selectedLesson.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setActivePathwayIndex(null);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-800 border-slate-800 text-white shadow-xs"
                        : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="flex gap-2 items-center mb-1">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                        isSelected ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-800"
                      }`}>
                        {lesson.targetSubject}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? "bg-slate-700 text-slate-200" : "bg-slate-100 text-slate-500"
                      }`}>
                        難度: {lesson.difficulty}
                      </span>
                    </div>
                    <div className="text-xs font-black leading-snug line-clamp-2 mt-1">
                      {lesson.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Textbook Link Alert box */}
          <div className="bg-blue-50/50 border border-blue-150 rounded-3xl p-5">
            <h4 className="text-xs font-bold text-blue-850 flex items-center gap-1.5 mb-2">
              <Award className="h-4 w-4 text-blue-600" />
              考點銜接指引 (108課綱目標)
            </h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              高中生物的「主動運輸」、「內分泌醛固酮」以及選修基礎化學中的「酵素競爭性抑制」，常在各類升學與醫科考題中出現。本模組旨在協助高中學生與大眾建立最直觀的生醫應對思維。
            </p>
          </div>
        </div>

        {/* Right column: Active lesson detail container */}
        <div className="lg:col-span-8 bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-xs space-y-6 relative overflow-hidden">
          {/* Subheader design */}
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#1a365d] text-white font-extrabold px-2.5 py-0.5 rounded-md uppercase animate-none">
                {selectedLesson.targetSubject}學科
              </span>
              <span className="text-xs text-slate-400 font-medium">教科書課本聯結學程</span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-2">
              {selectedLesson.title}
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {selectedLesson.intro}
            </p>
          </div>

          {/* Graphical/Structured flow description */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              生化回饋與阻斷流程（機轉結構視圖）
            </h4>
            <pre className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs text-slate-700 overflow-x-auto font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
              {selectedLesson.mechanismDiagram}
            </pre>
          </div>

          {/* Interactive Step-by-Step Bio Pathway */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">
              循序漸進解構生理運作（點選各步驟探索）
            </h4>
            <div className="space-y-2.5">
              {selectedLesson.biochemPathway.map((step, idx) => {
                const isActive = activePathwayIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePathwayIndex(isActive ? null : idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3.5 ${
                      isActive
                        ? "bg-slate-50 border-blue-500"
                        : "bg-white border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className={`h-6 w-6 rounded-full font-mono text-xs font-black flex items-center justify-center shrink-0 ${
                      isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className={`text-xs leading-relaxed ${isActive ? "text-slate-800 font-medium" : "text-slate-600"}`}>
                        {step}
                      </p>
                      {isActive && (
                        <div className="mt-2 text-[10px] text-blue-700 font-semibold flex items-center gap-1 bg-blue-50 border border-blue-100/50 px-2 py-0.5 rounded-md inline-block">
                          <CheckCircle className="h-3 w-3" />
                          已點讀：當前生醫學程核心原理
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Chemical Structure Concept */}
          {selectedLesson.chemicalStructureConcept && (
            <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-5">
              <h5 className="text-xs font-extrabold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-amber-600" />
                科學分子結構考點：
              </h5>
              <p className="text-xs text-amber-950 leading-relaxed">
                {selectedLesson.chemicalStructureConcept}
              </p>
            </div>
          )}

          {/* High school Textbook Mapping footer banner */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex gap-2.5 items-center">
              <div className="h-2 w-2 rounded-full bg-[#1a365d]"></div>
              <span className="text-[11px] text-slate-500 font-medium">包含 108 課綱課堂主題：</span>
              <span className="text-[11px] text-slate-700 font-bold">{selectedLesson.highSchoolLink}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
