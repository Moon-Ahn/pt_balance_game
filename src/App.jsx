import React, { useState } from 'react';
import { Share2, RefreshCcw, Activity, Heart, Zap, Coffee, Award, Users, Crosshair, ClipboardCheck } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('start'); // start, quiz, result
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({
    P: 0, // 전문성/성취형
    E: 0, // 효율/워라밸형
    S: 0, // 소통/공감형
    T: 0  // 기술/정적형
  });

  // 총 10문항: P/E 5문항, S/T 5문항으로 배치하여 무조건 홀수(동점 방지)
  const questions = [
    {
      id: 1,
      title: "퇴근 조건",
      type: "PE",
      optionA: { text: "🏃‍♂️ 평생 점심 없이\n1시간 조기 퇴근", value: 'E' },
      optionB: { text: "🍱 점심 2시간 보장받고\n1시간 야근", value: 'P' }
    },
    {
      id: 2,
      title: "환자 유형",
      type: "ST",
      optionA: { text: "😶 입 꾹 닫고\n한 마디도 안 하는 환자", value: 'T' },
      optionB: { text: "🗣️ 1초도 안 쉬고\n자기 얘기만 하는 환자", value: 'S' }
    },
    {
      id: 3,
      title: "병원 조건",
      type: "PE",
      optionA: { text: "👿 연봉 5천만 원이지만\n매일 원장님한테 혼남", value: 'P' },
      optionB: { text: "👼 연봉 3천만 원이지만\n원장님이 천사표", value: 'E' }
    },
    {
      id: 4,
      title: "치료 스타일",
      type: "ST",
      optionA: { text: "😁 치료 효과는 쏘쏘한데\n입담으로 환자가 짱 좋아함", value: 'S' },
      optionB: { text: "⚡ 치료 효과는 엄청난데\n환자가 아프다고 욕함", value: 'T' }
    },
    {
      id: 5,
      title: "나의 인기도",
      type: "PE",
      optionA: { text: "🔥 모든 환자가 나만 찾아\n화장실 갈 시간도 없음", value: 'P' },
      optionB: { text: "👻 내 환자가 한 명도 없어\n하루 종일 눈치 보기", value: 'E' }
    },
    {
      id: 6,
      title: "자기개발",
      type: "PE",
      optionA: { text: "📚 내 돈 100만 원 내고\n주말마다 학회 가서 교육 듣기", value: 'P' },
      optionB: { text: "🛋️ 교육 절대 안 가고\n집에서 꿀 같은 주말 보내기", value: 'E' }
    },
    {
      id: 7,
      title: "동료 유형",
      type: "ST",
      optionA: { text: "👼 일은 못하는데 성격은\n천사여서 분위기 메이커", value: 'S' },
      optionB: { text: "😈 일은 완벽하게 잘하는데\n성격이 파탄자인 동료", value: 'T' }
    },
    {
      id: 8,
      title: "보상",
      type: "PE",
      optionA: { text: "🤑 인센티브 팍팍 터져 월급 폭발\n(대신 매일 녹초됨)", value: 'P' },
      optionB: { text: "🧘 인센티브 0원 기본급만\n(대신 업무 강도 최하)", value: 'E' }
    },
    {
      id: 9,
      title: "점심 시간",
      type: "ST",
      optionA: { text: "☕ 선생님들과 카페까지 가서\n시끌벅적 수다 떨기", value: 'S' },
      optionB: { text: "🎧 치료실 구석에서 혼자\n조용히 유튜브 보며 먹기", value: 'T' }
    },
    {
      id: 10,
      title: "보호자",
      type: "ST",
      optionA: { text: "🕵️ 치료 내내 옆에서\n폭풍 질문하며 참견하는 보호자", value: 'S' },
      optionB: { text: "🫥 병실에 환자만 던져두고\n얼굴 한 번 안 비치는 보호자", value: 'T' }
    }
  ];

  const resultData = {
    PS: {
      title: "임상의 열정 우먼/맨",
      type: "PS (Professional + Social)",
      desc: "실력 향상에 진심이고 환자와의 라포 형성을 즐기는 타입입니다. 늘 학회와 스터디로 바쁘면서도 환자들과 웃으며 소통하는 당신은 병원에서 가장 인기 많은 에이스 선생님입니다!",
      icon: <Heart className="w-16 h-16 text-rose-500" />,
      color: "bg-rose-50",
      textColor: "text-rose-700"
    },
    PT: {
      title: "고독한 기술 장인",
      type: "PT (Professional + Technical)",
      desc: "화려한 말솜씨보다는 정확한 테크닉과 결과로 증명하는 타입입니다. 묵묵히 자신의 실력을 갈고닦으며, 환자들이 \"선생님 손은 약손\"이라고 부르는 진정한 실력파 치료사입니다.",
      icon: <Award className="w-16 h-16 text-indigo-600" />,
      color: "bg-indigo-50",
      textColor: "text-indigo-700"
    },
    ES: {
      title: "치료실의 인간 비타민",
      type: "ES (Efficiency + Social)",
      desc: "복잡하고 힘든 치료보다 효율적인 업무 처리를 선호하며, 무엇보다 동료 및 환자와의 관계를 중요시합니다. 선생님 특유의 밝은 에너지 덕분에 치료실 분위기가 늘 화기애애합니다!",
      icon: <Users className="w-16 h-16 text-emerald-500" />,
      color: "bg-emerald-50",
      textColor: "text-emerald-700"
    },
    ET: {
      title: "AI급 효율 마스터",
      type: "ET (Efficiency + Technical)",
      desc: "불필요한 감정 소모나 야근을 극도로 싫어하며, 가장 깔끔하고 정확하게 할 일만 딱 끝내고 퇴근하는 칼퇴의 정석입니다. 기복 없이 안정적으로 환자를 치료하는 든든한 타입입니다.",
      icon: <Zap className="w-16 h-16 text-blue-500" />,
      color: "bg-blue-50",
      textColor: "text-blue-700"
    }
  };

  const handleAnswer = (value) => {
    setScores(prev => ({ ...prev, [value]: prev[value] + 1 }));

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const getResult = () => {
    const pe = scores.P > scores.E ? 'P' : 'E';
    const st = scores.S > scores.T ? 'S' : 'T';
    return pe + st;
  };

  const restart = () => {
    setStep('start');
    setCurrentIdx(0);
    setScores({ P: 0, E: 0, S: 0, T: 0 });
  };

  const copyToClipboard = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("테스트 링크가 복사되었습니다!");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-cute text-slate-800">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
          .font-cute {
            font-family: 'Jua', sans-serif;
          }
          .font-cute * {
            letter-spacing: 0.03em;
          }
        `}
      </style>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 h-[80vh] min-h-[600px] flex flex-col relative">

        {step === 'start' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-sky-50 to-white">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-200">
              <Activity className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-black mb-2 text-slate-900 break-keep leading-tight">물리치료사<br/>성향 밸런스 게임</h1>
            <p className="text-slate-500 mb-10 break-keep leading-relaxed font-medium">
              양보할 수 없는 최강 밸런스!<br />
              나의 물리치료사 성향(MBTI)은?
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="w-full py-5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-2xl font-black text-xl transition-all shadow-lg shadow-indigo-200 active:scale-95"
            >
              게임 시작하기
            </button>
            <p className="mt-6 text-sm text-slate-400 font-bold">총 10문항</p>
          </div>
        )}

        {step === 'quiz' && (
          <div className="flex-1 flex flex-col p-4 bg-slate-50 relative">
            {/* 상단 프로그레스 및 타이틀 */}
            <div className="mb-4 text-center z-10">
              <div className="text-indigo-600 font-black text-lg mb-1 tracking-wider">
                Q{currentIdx + 1}. {questions[currentIdx].title}
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* 밸런스 게임 대결 버튼 영역 */}
            <div className="flex-1 flex flex-col relative gap-4 mb-4">
              {/* 위쪽 버튼 (밝은 하늘색 톤) */}
              <button
                onClick={() => handleAnswer(questions[currentIdx].optionA.value)}
                className="flex-1 w-full bg-sky-100 hover:bg-sky-200 active:bg-sky-300 transition-colors rounded-[2rem] p-6 flex items-center justify-center shadow-sm group border-2 border-transparent hover:border-sky-300"
              >
                <span className="text-2xl font-black text-sky-900 text-center leading-snug break-keep group-active:scale-95 transition-transform whitespace-pre-line">
                  {questions[currentIdx].optionA.text}
                </span>
              </button>

              {/* 중앙 VS 뱃지 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-slate-50">
                <span className="font-black text-2xl text-slate-800 italic">VS</span>
              </div>

              {/* 아래쪽 버튼 (진한 남색 톤) */}
              <button
                onClick={() => handleAnswer(questions[currentIdx].optionB.value)}
                className="flex-1 w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors rounded-[2rem] p-6 flex items-center justify-center shadow-sm group border-2 border-transparent hover:border-indigo-500"
              >
                <span className="text-2xl font-black text-white text-center leading-snug break-keep group-active:scale-95 transition-transform whitespace-pre-line">
                  {questions[currentIdx].optionB.text}
                </span>
              </button>
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white">
            <div className="text-center mt-4 mb-6">
              <div className="inline-block px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-black mb-4 tracking-widest">
                나의 밸런스 게임 결과는?
              </div>
              <h2 className="text-4xl font-black text-slate-900 leading-tight break-keep mb-2">
                {resultData[getResult()].title}
              </h2>
            </div>

            <div className={`rounded-3xl ${resultData[getResult()].color} p-8 mb-8 flex flex-col items-center justify-center text-center`}>
              <div className="mb-4 bg-white p-4 rounded-full shadow-sm">
                {resultData[getResult()].icon}
              </div>
              <span className={`inline-block text-xl font-black ${resultData[getResult()].textColor} mb-4`}>
                TYPE: {resultData[getResult()].type.split(' ')[0]}
              </span>
              <p className="text-slate-700 leading-relaxed break-keep font-medium text-lg">
                {resultData[getResult()].desc}
              </p>
            </div>

            <div className="space-y-3 mt-auto">
              <button
                onClick={copyToClipboard}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
              >
                <Share2 className="w-5 h-5" /> 친구에게 결과 공유하기
              </button>
              <button
                onClick={restart}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-95"
              >
                <RefreshCcw className="w-5 h-5" /> 처음부터 다시하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;