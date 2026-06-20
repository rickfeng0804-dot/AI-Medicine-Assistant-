/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Send, Sparkles, FileImage, UploadCloud, AlertCircle, RefreshCw, Eye, Brain } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isImageAnalysis?: boolean;
}

export default function AiConsultantTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "您好！我是您的 **AI 藥師助理**。😊\n\n不論您有日常用藥疑問、想查詢慢性病藥理字首字尾、還是想要了解對標『高中生物與化學教材』中的 RAAS 血管調控、腎小管 SGLT2 葡萄糖主動運輸或 HMG-CoA 酵素競爭性抑制等機轉，我都可以為您詳細解碼！\n\n💡 **用藥貼心提醒：底下的「藥袋/處方讀取」能拍照大圖辨識藥學內容喔！**"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Suggested pre-populated prompt buttons for fast testing
  const promptSuggestions = [
    "什麼是 -statin 類藥物？它在高中生物/化學有什麼考點？",
    "抗生素 Cefaclor 明明是 Cefa- 開頭，為什麼不是第一代頭孢菌素？",
    "吃安眠藥（字尾為 -azepam）可以配紅酒或啤酒助眠嗎？會有什麼交互作用？",
    "高血壓 ARB（字尾 -sartan）用藥為什麼跟高血鉀（香蕉、楊桃）有關？"
  ];

  // Mock template prescriptions as robust fallback buttons to test image reading instantly
  const mockPrescriptionTemplates = [
    {
      id: "diabetic_bag",
      title: "【範例一】糖尿病配藥袋 (Empagliflozin)",
      sampleBase64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5CYII=", // tiny placeholder
      promptText: "請幫我分析：含 Empagliflozin、Metformin、SGLT2 抑制口服藥袋字尾與禁忌提醒。"
    },
    {
      id: "cardio_bag",
      title: "【範例二】三高血管處方箋 (Valsartan + Atorvastatin)",
      sampleBase64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5CYII=",
      promptText: "請幫我分析：Valsartan (-sartan)、Atorvastatin (-statin) 與鈣通道 CCB 在高血壓高血脂的機轉與副作用。"
    }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const rawMsg = textToSend || inputVal;
    if (!rawMsg.trim() || isSending) return;

    if (!textToSend) {
      setInputVal("");
    }

    setApiError(null);
    const newMsg: Message = { role: "user", content: rawMsg };
    setMessages((prev) => [...prev, newMsg]);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: rawMsg,
          history: [] // standard fast chat mode
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "連線至後端服務失敗。");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "伺服器請求發生錯誤，請確認您的 GEMINI_API_KEY 金鑰配置。");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ **助理連線失敗** \n\n似乎未能成功存取 Gemini AI 服務。這通常是因未在系統 Settings > Secrets 中配置 `GEMINI_API_KEY` 所致。請在該面板完成安裝後重試！"
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  // Convert uploaded image file to base64
  const handleImageUploadAndAnalyze = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("請選擇有效的圖片檔案！");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Str = reader.result as string;
      await analyzeReceiptBase64(base64Str, file.name);
    };
    reader.readAsDataURL(file);
  };

  // Common analysis gateway
  const analyzeReceiptBase64 = async (base64Str: string, fileName: string) => {
    setApiError(null);
    setIsScanning(true);

    // Render local user attachment notice
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: `📸 【上傳藥袋圖檔】 已送出對應照片名稱：「${fileName}」進行生體機轉與藥理辨識分析...`,
        isImageAnalysis: true
      }
    ]);

    try {
      const response = await fetch("/api/analyze-prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64Str })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "照片辨識連線失敗。");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "上傳分析出錯！請確認 API 狀態。");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ **圖片生醫辨識失敗**\n\n原因：${err.message || "可能大圖傳輸逾時或 API Key 尚未登錄。"}。請重試或改以文字諮詢。`
        }
      ]);
    } finally {
      setIsScanning(false);
    }
  };

  // Handle Drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUploadAndAnalyze(e.dataTransfer.files[0]);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        role: "assistant",
        content: "對話紀錄已清除！我很樂意回答您全新的用藥或 108 課綱生物/化學教材中的疑問。"
      }
    ]);
    setApiError(null);
  };

  const triggerMockAnalysis = (item: typeof mockPrescriptionTemplates[0]) => {
    // Simulating scanning the template with detailed descriptive prompt trigger
    handleSendMessage(item.promptText);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      <div className="border-b border-slate-200 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="h-5.5 w-5.5 text-blue-600" />
            AI 智慧藥師諮詢與臨床藥袋辨識室
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            由後端 Google Gemini 模型架聯，支援繁體中文醫學對話、生物阻斷機轉科普以及實體處方單據辨識。
          </p>
        </div>

        <button
          onClick={clearChatHistory}
          className="text-xs font-semibold py-1.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RefreshCw className="h-3 w-3" />
          重啟新對話
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Smart prescription scanner */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-150 rounded-3xl p-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-800 mb-3.5 flex items-center gap-1.5">
              <FileImage className="h-4.5 w-4.5 text-blue-600" />
              實體藥袋 / 處方箋大圖辨識
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              支援拍攝您的門診藥袋、藥品紙盒或醫院處方箋條碼，AI將自動析出成份與對應衛教。
            </p>

            {/* Drag & Drop zone */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[140px] ${
                dragActive
                  ? "border-blue-500 bg-blue-50/50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUploadAndAnalyze(e.target.files[0])}
                className="hidden"
              />
              <UploadCloud className="h-8 w-8 text-slate-400 mb-2.5 animate-bounce" />
              <p className="text-xs text-slate-700 font-extrabold">點選或拖曳藥袋圖片至此</p>
              <p className="text-[10px] text-slate-400 mt-1">支援 JPG、PNG，大小不超過 15MB</p>
            </div>

            {/* Quick Demonstration templates */}
            <div className="mt-5 border-t border-slate-100 pt-4">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Brain className="h-3.5 w-3.5 text-blue-700" />
                無照片？用以下精選臨床藥袋模擬：
              </h4>
              <div className="space-y-2">
                {mockPrescriptionTemplates.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => triggerMockAnalysis(item)}
                    className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-[11px] font-semibold text-slate-700 flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span className="line-clamp-1">{item.title}</span>
                    <Eye className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {Object.keys(process.env).includes("GEMINI_API_KEY") && (
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-4 flex gap-3 text-xs">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="text-amber-800 leading-relaxed">
                <span className="font-bold">金鑰提示：</span>
                後端已自動探查並載入您的 AI 服務密鑰！現在可以放心提出任何生物、化學生醫機制，體驗流暢、毫無死角的互動教學。
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Live AI Medical Chat Thread */}
        <div className="lg:col-span-8 flex flex-col bg-white border border-slate-150 rounded-3xl overflow-hidden shadow-xs h-[550px]">
          {/* Chat Bubble Scrollable Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed font-sans shadow-2xs whitespace-pre-wrap ${
                      isAssistant
                        ? "bg-white border border-slate-100 text-slate-850"
                        : "bg-slate-800 text-white font-medium"
                    }`}
                  >
                    {/* Render raw strings clearly */}
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {/* Interactive Loading animation indicator */}
            {(isSending || isScanning) && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs text-xs text-slate-500 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
                  <span>AI 藥師正在閱覽處方，解構高中生化模型中，請稍候...</span>
                </div>
              </div>
            )}

            {apiError && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">系統連線不順：</p>
                  <p className="opacity-90">{apiError}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick suggestions menu */}
          <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
            <span className="text-[10px] text-slate-400 font-bold shrink-0">建議問題：</span>
            {promptSuggestions.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200/70 px-2.5 py-1 rounded-full cursor-pointer transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input field panel */}
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="輸入您的疾病或用藥問題（例如：他汀類藥物為什麼不能吃葡萄柚？）..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isSending || !inputVal.trim()}
              className="bg-[#1a365d] hover:bg-blue-900 disabled:opacity-40 text-white font-bold p-3.5 rounded-2xl shadow-md cursor-pointer shrink-0 transition-all flex items-center justify-center cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
