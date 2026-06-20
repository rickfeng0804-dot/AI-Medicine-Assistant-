/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { diseaseCategories } from "../data";
import { Search, GraduationCap, CheckCircle2, AlertCircle, HelpCircle, RefreshCw } from "lucide-react";
import { PrefixSuffixInfo } from "../types";

export default function PrefixSuffixTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"cards" | " quiz">("cards");

  // Quiz Game State
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Filter Patterns
  const filteredCategories = diseaseCategories.filter((cat) => {
    const matchesCategory = selectedCategory === "all" || cat.id === selectedCategory;
    return matchesCategory;
  });

  const allPatterns: Array<{ catName: string; catColor: string; pat: PrefixSuffixInfo }> = [];
  diseaseCategories.forEach((cat) => {
    cat.patterns.forEach((p) => {
      if (
        p.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.mechanism.includes(searchTerm)
      ) {
        allPatterns.push({ catName: cat.name, catColor: cat.color, pat: p });
      }
    });
  });

  // Simple static quiz bank matching the image prefix/suffixes
  const quizBank = [
    {
      question: "若在某新型藥物的包裝上，看到字尾是「-sartan」，根據命名規律，它最可能屬於哪一類心血管藥物？",
      options: ["ACEI (血管收縮素轉化酶抑制劑)", "ARB (血管收縮素受體阻斷劑)", "CCB (蓋離子通道阻斷劑)", "β-blocker (乙型受體阻斷劑)"],
      correct: "ARB (血管收縮素受體阻斷劑)",
      tip: "例如 Losartan、Valsartan，字尾都是 -sartan。"
    },
    {
      question: "胃潰瘍藥物中，若藥名字尾以「-prazole」結尾（例如 Omeprazole），其生化機轉是？",
      options: ["H2-blocker (拮抗組織胺二型受體)", "PPI (氫離子幫浦抑制劑 / 不可逆共價結合)", "調控保護性胃黏液分泌", "中和胃酸的弱鹼性無機鹽"],
      correct: "PPI (氫離子幫浦抑制劑 / 不可逆共價結合)",
      tip: "PPI 類藥物以 -prazole 結尾，是胃壁細胞 H+/K+-ATPase 的不可逆共價抑制劑。"
    },
    {
      question: "依據上傳圖表，第一代 Cephalosporin (頭孢菌素) 的字首多為 Cefa- 或 Ceph-，但有一個重要的二代例外藥品叫做？",
      options: ["Ceftriaxone", "Cefepime", "Cefaclor", "Cefazolin"],
      correct: "Cefaclor",
      tip: "Cefaclor 以 Cefa- 開頭，但藥理代數其實是『第二代』頭孢菌素。"
    },
    {
      question: "糖尿病用藥中，若字尾為「-gliflozin」，其核心生理機轉為阻斷腎臟哪一個部位的重吸收作用？",
      options: ["遠曲小管的鈉離子重吸收", "近曲小管的 SGLT2 (鈉-葡萄糖共同輸送器)", "集尿管的抗利尿激素受體", "亨耳氏套的髓質高滲透壓梯"],
      correct: "近曲小管的 SGLT2 (鈉-葡萄糖共同輸送器)",
      tip: "SGLT2 抑制劑 (-gliflozin) 促使多餘血糖隨尿液排出體外，具備降糖護心功效。"
    },
    {
      question: "抗病毒藥物中，若字尾是「-gravir」（例如 Raltegravir），它是抑制病毒的哪一種酵素活性？",
      options: ["NNRTI 反轉錄酶", "Protease 蛋白酶", "Integrase 整合酶（阻止 DNA 織入宿主基因組）", "聚化酶 NS5B"],
      correct: "Integrase 整合酶（阻止 DNA 織入宿主基因組）",
      tip: "字尾 -gravir 的藥品是病毒整合酶抑制劑（Integrase Inhibitor）。"
    },
    {
      question: "高血脂用藥中，用來抑制膽固醇合成限速酶 HMG-CoA reductase 的一線藥名字尾是？",
      options: ["-fibr- (纖維酸類)", "-statin (他汀類)", "-cumab (PCSK9單株抗體)", "-vastatin (非他汀)"],
      correct: "-statin (他汀類)",
      tip: "藥名以 -statin 結尾，競爭性抑制 HMG-CoA 還原酶，降低肝臟膽固醇。絕對不能配葡萄柚汁。"
    }
  ];

  const handleAnswerSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedAnswer(opt);
    setIsAnswered(true);
    if (opt === quizBank[currentQuizIndex].correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentQuizIndex < quizBank.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizStarted(false); // Finished
    }
  };

  const handleResetQuiz = () => {
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizStarted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Tab Switcher */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            藥品字字字首與字尾解碼
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            由上傳的臨床藥物記憶提示圖整理，幫助醫學、化學與大眾輕鬆辨識疾病分類
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("cards")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === "cards" ? "bg-white text-[#1a365d] shadow-xs" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            圖表卡片瀏覽
          </button>
          <button
            onClick={() => {
              setActiveTab(" quiz");
              setQuizStarted(true);
              setQuizScore(0);
              setCurrentQuizIndex(0);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === " quiz" ? "bg-white text-[#1a365d] shadow-xs" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            單字測驗挑戰
          </button>
        </div>
      </div>

      {activeTab === "cards" ? (
        <>
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Search Input */}
            <div className="relative md:col-span-1">
              <Search className="absolute left-3.5 top-3 text-slate-400 h-4.5 w-4.5" />
              <input
                type="text"
                placeholder="搜尋字首字尾、縮寫或機轉 (如：-pril)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-700"
              />
            </div>

            {/* Category selection tag badges */}
            <div className="md:col-span-2 flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-slate-400 font-medium mr-2">疾病群組：</span>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedCategory === "all"
                    ? "bg-slate-800 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                全部九大類
              </button>
              {diseaseCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#1a365d] text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Section */}
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              // Only filter inner patterns if search is used
              const patternsToRender = category.patterns.filter((p) => {
                if (!searchTerm) return true;
                return (
                  p.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p.mechanism.toLowerCase().includes(searchTerm.toLowerCase())
                );
              });

              if (patternsToRender.length === 0) return null;

              return (
                <div key={category.id} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-5 w-1 rounded-full bg-[#1a365d]"></span>
                    <h3 className="text-lg font-bold text-slate-800">
                      {category.name} <span className="font-mono text-xs text-slate-400">({category.englishName})</span>
                    </h3>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-medium">
                      含 {patternsToRender.length} 個命名規則
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6 max-w-3xl leading-relaxed">
                    {category.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {patternsToRender.map((pattern) => (
                      <div
                        key={pattern.id}
                        className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
                      >
                        {/* Visual accent top edge pill */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/20 group-hover:bg-[#1a365d] transition-colors font-sans"></div>

                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="font-mono text-base font-black text-blue-800 bg-blue-50/70 border border-blue-100 px-3 py-1 rounded-lg">
                              {pattern.pattern}
                            </span>
                            <span className="text-xs font-bold text-slate-600 bg-slate-100/85 px-2.5 py-1 rounded-md">
                              {pattern.categoryName}
                            </span>
                          </div>

                          <div className="mt-2.5">
                            <h4 className="text-xs font-bold text-slate-400 tracking-wider">藥物生化學名機轉</h4>
                            <p className="text-xs text-slate-600 leading-relaxed mt-1 line-clamp-4">
                              {pattern.mechanism}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-50">
                          <h4 className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">典型代表藥品 (化學名稱)</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {pattern.examples.map((ex, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 bg-slate-50 border border-slate-150 rounded-lg px-2.5 py-1 text-xs text-slate-700"
                              >
                                <span className="font-mono font-medium">{ex.name}</span>
                                <span className="text-[10px] text-slate-400">({ex.chinese})</span>
                              </span>
                            ))}
                          </div>

                          {pattern.exceptions && (
                            <div className="mt-3.5 bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                              <p className="text-[11px] text-amber-700 leading-relaxed">
                                <span className="font-extrabold">特殊例外：</span>
                                {pattern.exceptions}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Quiz Game Mode Dashboard */
        <div className="max-w-3xl mx-auto bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-sm">
          {quizStarted ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs text-slate-400 font-bold">
                  知識挑戰：第 {currentQuizIndex + 1} / {quizBank.length} 題
                </span>
                <span className="text-xs text-[#1a365d] font-bold bg-blue-50 px-3 py-1 rounded-full">
                  目前得分：{quizScore} 分
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuizIndex + 1) / quizBank.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 leading-relaxed">
                  {quizBank[currentQuizIndex].question}
                </h3>
              </div>

              {/* Answers Options Options List */}
              <div className="space-y-3.5 mb-8">
                {quizBank[currentQuizIndex].options.map((opt) => {
                  const isCurCorrect = opt === quizBank[currentQuizIndex].correct;
                  const isCurSelected = opt === selectedAnswer;

                  let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700";
                  if (isAnswered) {
                    if (isCurCorrect) {
                      btnStyle = "bg-blue-50 border-blue-450 text-blue-700 font-semibold";
                    } else if (isCurSelected) {
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-700";
                    } else {
                      btnStyle = "bg-slate-50 opacity-65 border-slate-100 text-slate-400";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswerSelect(opt)}
                      disabled={isAnswered}
                      className={`w-full text-left border rounded-2xl p-4 text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCurCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      )}
                      {isAnswered && isCurSelected && !isCurCorrect && (
                        <AlertCircle className="h-5 w-5 text-rose-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Answer Feedback / Next Button */}
              {isAnswered && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 mb-8">
                  <div className="flex gap-2 items-start">
                    <HelpCircle className="h-4.5 w-4.5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-blue-800 font-bold">藥師生理解說：</p>
                      <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                        {quizBank[currentQuizIndex].tip}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Controls */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setQuizStarted(false);
                    setActiveTab("cards");
                  }}
                  className="px-5 py-2.5 rounded-2xl text-xs font-semibold hover:bg-slate-100 text-slate-500 transition-all cursor-pointer"
                >
                  放棄測驗回到列表
                </button>

                {isAnswered ? (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold ml-auto px-6 py-2.5 rounded-2xl text-xs tracking-wide shadow-md cursor-pointer transition-all"
                  >
                    {currentQuizIndex < quizBank.length - 1 ? "下一題試題" : "查看最後分數"}
                  </button>
                ) : (
                  <span className="text-xs font-medium text-slate-400">請挑選一個答案選項作答</span>
                )}
              </div>
            </div>
          ) : (
            /* Results Hub */
            <div className="text-center py-6">
              <div className="inline-flex bg-blue-50 p-4.5 rounded-full text-blue-600 mb-6 shadow-xs border border-blue-100">
                <GraduationCap className="h-10 w-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800">
                挑戰完成！
              </h3>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                恭喜您完成藥物字首字尾的命名記憶大考驗！本學堂旨在幫高中學生 and 病患用簡單直觀的單字記憶掌握處方知識。
              </p>

              <div className="my-8 bg-slate-50 border border-slate-100 rounded-3xl p-6 inline-block min-w-[240px]">
                <div className="text-xs text-slate-400 font-medium tracking-wider uppercase mb-1">
                  答對題數得分率
                </div>
                <div className="text-3xl font-black text-slate-800">
                  {quizScore} <span className="text-base text-slate-400">/ {quizBank.length} 題</span>
                </div>
                <div className="text-xs font-extrabold text-blue-700 bg-blue-50 mt-3 py-1 px-3 rounded-full inline-block">
                  {quizScore === quizBank.length ? "太厲害了！完美的生化常識專家" : "繼續保持！再試一次記憶更深"}
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="bg-[#1a365d] hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                  重新開始挑戰
                </button>
                <button
                  onClick={() => setActiveTab("cards")}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-2xl text-xs transition-all cursor-pointer"
                >
                  瀏覽字首字尾圖表
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
