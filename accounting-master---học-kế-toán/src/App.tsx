/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  BookOpen, 
  CreditCard, 
  BarChart3, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft,
  Trophy,
  Lightbulb,
  HelpCircle,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CHAPTERS, FLASHCARDS, Chapter, Lesson, QuizQuestion } from "./data/accountingData";
import { cn } from "@/lib/utils";

// --- Types ---
type Screen = "home" | "chapters" | "lesson" | "flashcards" | "progress" | "quiz";

// --- Components ---

const BottomNav = ({ active, onChange }: { active: Screen, onChange: (s: Screen) => void }) => {
  const items = [
    { id: "home", icon: Home, label: "Trang chủ" },
    { id: "chapters", icon: BookOpen, label: "Bài học" },
    { id: "flashcards", icon: CreditCard, label: "Thẻ ghi nhớ" },
    { id: "progress", icon: BarChart3, label: "Tiến độ" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 max-w-[480px] mx-auto">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id as Screen)}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            active === item.id ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
          )}
        >
          <item.icon size={20} strokeWidth={active === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

// --- Screens ---

const HomeScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  return (
    <div className="p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Chào bạn,</h1>
        <p className="text-slate-500">Hôm nay bạn muốn học gì?</p>
      </header>

      <Card className="bg-blue-600 text-white border-none shadow-lg shadow-blue-200">
        <CardHeader>
          <CardTitle className="text-xl">Tiến độ tổng quát</CardTitle>
          <CardDescription className="text-blue-100">Bạn đã hoàn thành 15% khóa học</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={15} className="h-2 bg-blue-400/30" />
        </CardContent>
        <CardFooter>
          <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50" onClick={() => onNavigate("chapters")}>
            Tiếp tục học
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center text-center space-y-2 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => onNavigate("flashcards")}>
          <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
            <CreditCard size={24} />
          </div>
          <h3 className="font-semibold">Flashcards</h3>
          <p className="text-xs text-slate-500">50+ thuật ngữ</p>
        </Card>
        <Card className="p-4 flex flex-col items-center text-center space-y-2 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => onNavigate("progress")}>
          <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
            <Trophy size={24} />
          </div>
          <h3 className="font-semibold">Thành tích</h3>
          <p className="text-xs text-slate-500">3 huy hiệu mới</p>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Chương học nổi bật</h2>
          <Button variant="link" className="text-blue-600 p-0" onClick={() => onNavigate("chapters")}>Xem tất cả</Button>
        </div>
        <Card className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => onNavigate("chapters")}>
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
            1
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">Nguyên lý kế toán</h4>
            <p className="text-xs text-slate-500">Khái niệm & Đối tượng</p>
          </div>
          <ChevronRight size={20} className="text-slate-300" />
        </Card>
      </section>
    </div>
  );
};

const ChapterListScreen = ({ onSelectLesson }: { onSelectLesson: (l: Lesson) => void }) => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Danh sách chương</h1>
      <div className="space-y-4">
        {CHAPTERS.map((chapter) => (
          <div key={chapter.id} className="space-y-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{chapter.title}</h2>
            {chapter.lessons.length > 0 ? (
              chapter.lessons.map((lesson) => (
                <Card key={lesson.id} className="p-4 cursor-pointer hover:border-blue-300 transition-all" onClick={() => onSelectLesson(lesson)}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-600 border-none">Lý thuyết</Badge>
                        <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-600 border-none">Trắc nghiệm</Badge>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300" />
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-4 border-dashed bg-slate-50">
                <p className="text-sm text-slate-400 text-center italic">Nội dung đang được cập nhật...</p>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const LessonDetailScreen = ({ lesson, onBack, onStartQuiz }: { lesson: Lesson, onBack: () => void, onStartQuiz: () => void }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 flex items-center gap-4 border-b bg-white sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold truncate">{lesson.title}</h1>
      </header>
      
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8 pb-10">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <Lightbulb size={20} /> Lý thuyết
            </h2>
            <div className="prose prose-slate max-w-none">
              {lesson.content.split('\n').map((line, i) => (
                <p key={i} className="text-slate-700 leading-relaxed">{line}</p>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-blue-600">Ví dụ minh họa</h2>
            <div className="space-y-3">
              {lesson.examples.map((ex, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border-l-4 border-blue-500 text-sm text-slate-600 italic">
                  {ex}
                </div>
              ))}
            </div>
          </section>

          <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200" onClick={onStartQuiz}>
            Bắt đầu Trắc nghiệm
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

const FlashcardsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const current = FLASHCARDS[currentIndex];

  const next = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
    }, 150);
  };

  const prev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
    }, 150);
  };

  return (
    <div className="p-6 space-y-8 flex flex-col h-full">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Thẻ ghi nhớ</h1>
        <p className="text-slate-500 text-sm">Chạm vào thẻ để xem định nghĩa</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div 
          className={cn(
            "relative w-full aspect-[3/4] max-h-[400px] cursor-pointer perspective-1000 transition-all duration-500",
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          )}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <Card className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white border-2 border-blue-100 shadow-xl [backface-visibility:hidden]">
            <Badge className="mb-4 bg-blue-50 text-blue-600 hover:bg-blue-50 border-none">{current.category}</Badge>
            <h2 className="text-2xl font-bold text-slate-800">{current.term}</h2>
          </Card>

          {/* Back */}
          <Card className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-blue-600 text-white border-none shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-lg leading-relaxed">{current.definition}</p>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" className="flex-1 h-12" onClick={prev}>Trước</Button>
        <span className="text-sm font-medium text-slate-400">{currentIndex + 1} / {FLASHCARDS.length}</span>
        <Button variant="outline" className="flex-1 h-12" onClick={next}>Tiếp theo</Button>
      </div>
    </div>
  );
};

const QuizScreen = ({ quiz, onFinish }: { quiz: QuizQuestion[], onFinish: (score: number) => void }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const current = quiz[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);
    if (idx === current.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const next = () => {
    if (currentIdx < quiz.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      onFinish(score);
    }
  };

  return (
    <div className="p-6 space-y-8 flex flex-col h-full">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm font-bold text-slate-400">
          <span>CÂU HỎI {currentIdx + 1}/{quiz.length}</span>
          <span>ĐÚNG: {score}</span>
        </div>
        <Progress value={((currentIdx + 1) / quiz.length) * 100} className="h-1.5 bg-slate-100" />
      </div>

      <div className="flex-1 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 leading-tight">
          {current.question}
        </h2>

        <div className="space-y-3">
          {current.options.map((option, i) => {
            let variant: "outline" | "default" | "destructive" = "outline";
            let className = "w-full h-auto py-4 px-6 justify-start text-left text-wrap font-medium border-2 transition-all";
            
            if (isAnswered) {
              if (i === current.correctAnswer) {
                className += " border-green-500 bg-green-50 text-green-700";
              } else if (i === selected) {
                className += " border-red-500 bg-red-50 text-red-700";
              } else {
                className += " opacity-50";
              }
            } else if (selected === i) {
              className += " border-blue-500 bg-blue-50 text-blue-700";
            }

            return (
              <Button 
                key={i} 
                variant={variant} 
                className={className}
                onClick={() => handleSelect(i)}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200"
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <HelpCircle size={16} className="text-blue-500" /> Giải thích:
            </div>
            <p className="text-sm text-slate-600">{current.explanation}</p>
          </motion.div>
        )}
      </div>

      <Button 
        className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700" 
        disabled={!isAnswered}
        onClick={next}
      >
        {currentIdx === quiz.length - 1 ? "Hoàn thành" : "Câu tiếp theo"}
      </Button>
    </div>
  );
};

const ProgressScreen = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Tiến độ học tập</h1>
      
      <div className="space-y-6">
        <Card className="p-6 bg-slate-900 text-white border-none">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">TỔNG ĐIỂM KINH NGHIỆM</p>
              <h2 className="text-4xl font-black">2,450 <span className="text-sm font-normal text-slate-500">XP</span></h2>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Trophy size={24} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>CẤP ĐỘ 5</span>
              <span className="text-slate-400">550 XP ĐỂ LÊN CẤP 6</span>
            </div>
            <Progress value={70} className="h-2 bg-slate-800" />
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">BÀI HỌC</p>
            <p className="text-xl font-bold">12 / 48</p>
          </Card>
          <Card className="p-4 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">TRẮC NGHIỆM</p>
            <p className="text-xl font-bold">85% <span className="text-xs font-normal text-green-500">+2%</span></p>
          </Card>
        </div>

        <section className="space-y-4">
          <h3 className="font-bold">Huy hiệu đã đạt được</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-shrink-0 w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
                <Badge className="bg-blue-100 text-blue-600 border-none">B{i}</Badge>
              </div>
            ))}
            <div className="flex-shrink-0 w-20 h-20 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300">
              +
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setScreen("lesson");
  };

  const handleQuizFinish = (score: number) => {
    setQuizScore(score);
    setScreen("progress");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="mobile-container flex flex-col shadow-2xl relative overflow-hidden">
        <main className="flex-1 overflow-y-auto safe-bottom bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen + (selectedLesson?.id || "")}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {screen === "home" && <HomeScreen onNavigate={setScreen} />}
              {screen === "chapters" && <ChapterListScreen onSelectLesson={handleLessonSelect} />}
              {screen === "lesson" && selectedLesson && (
                <LessonDetailScreen 
                  lesson={selectedLesson} 
                  onBack={() => setScreen("chapters")} 
                  onStartQuiz={() => setScreen("quiz")}
                />
              )}
              {screen === "quiz" && selectedLesson && (
                <QuizScreen 
                  quiz={selectedLesson.quiz} 
                  onFinish={handleQuizFinish} 
                />
              )}
              {screen === "flashcards" && <FlashcardsScreen />}
              {screen === "progress" && <ProgressScreen />}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav active={screen} onChange={setScreen} />
      </div>
    </div>
  );
}
