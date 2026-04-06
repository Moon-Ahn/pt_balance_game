import React, { useState, useEffect } from 'react';
import { Share2, RefreshCcw, Activity, Heart, Zap, Award, Users } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({ P: 0, E: 0, S: 0, T: 0 });

  const COMMUNITY_URL = "https://www.instagram.com/the.pt.map?igsh=MWIwOTV2OTY1Y2loaw==";

  // 카카오 광고 스크립트 로드 및 갱신
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, [step, currentIdx]); // 화면이 바뀌거나 문항이 바뀔 때 광고 호출 시도

  const questions = [
    { id: 1, title: "퇴근 조건", type: "PE", optionA: { text: "🏃‍♂️ 평생 점심 없이\n1시간 조기 퇴근", value: 'E' }, optionB: { text: "🍱 점심 2시간 보장받고\n1시간 야근", value: 'P' } },
    { id: 2, title: "환자 유형", type: "ST", optionA: { text: "😶 입 꾹 닫고\n한 마디도 안 하는 환자", value: 'T' }, optionB: { text: "🗣️ 1초도 안 쉬고\n자기 얘기만 하는 환자", value: 'S' } },
    { id: 3, title: "병원 조건", type: "PE", optionA: { text: "👿 연봉 5천만 원이지만\n매일 원장님한테 혼남", value: 'P' }, optionB: { text: "👼 연봉 3천만 원이지만\n원장님이 천사표", value: 'E' } },
    { id: 4, title: "치료 스타일", type: "ST", optionA: { text: "😁 치료 효과는 쏘쏘한데\n입담으로 환자가 짱 좋아함", value: 'S' }, optionB: { text: "⚡ 치료 효과는 엄청난데\n환자가 아프다고 욕함", value: 'T' } },
    { id: 5, title: "나의 인기도", type: "PE", optionA: { text: "🔥 모든 환자가 나만 찾아\n화장실 갈 시간도 없음", value: 'P' }, optionB: { text: "👻 내 환자가 한 명도 없어\n하루 종일 눈치 보기", value: 'E' } },
    { id: 6, title: "자기개발", type: "PE", optionA: { text: "📚 내 돈 100만 원 내고\n주말마다 학회 가서 교육 듣기", value: 'P' }, optionB: { text: "🛋️ 교육 절대 안 가고\n집에서 꿀 같은 주말 보내기", value: 'E' } },
    { id: 7, title: "동료 유형", type: "ST", optionA: { text: "👼 일은 못하는데 성격은\n천사여서 분위기 메이커", value: 'S' }, optionB: { text: "😈 일은 완벽하게 잘하는데\n성격이 파탄자인 동료", value: 'T' } },
    { id: 8, title: "보상", type: "PE", optionA: { text: "🤑 인센티브 팍팍 터져 월급 폭발\n(대신 매일 녹초됨)", value: 'P' }, optionB: { text: "🧘 인센티브 0원 기본급만\n(대신 업무 강도 최하)", value: 'E' } },
    { id: 9, title: "점심 시간", type: "ST", optionA: { text: "☕ 선생님들과 카페까지 가서\n시끌벅적 수다 떨기", value: 'S' }, optionB: { text: "🎧 치료실 구석에서 혼자\n조용히 유튜브 보며 먹기", value: 'T' } },
    { id: 10, title: "보호자", type: "ST", optionA: { text: "🕵️ 치료 내내 옆에서\n폭풍 질문하며 참견하는 보호자", value: 'S' }, optionB: { text: "🫥 병실에 환자만 던져두고\n얼굴 한 번 안 비치는 보호자", value: 'T' } }
  ];

  const resultData = {
    PS: { title: "임상의 열정 우먼/맨", type: "PS (Professional + Social)", desc: "실력 향상에 진심이고 환자와의 라포 형성을 즐기는 타입입니다. 늘 학회와 스터디로 바쁘면서도 환자들과 웃으며 소통하는 당신은 병원에서 가장 인기 많은 에이스 선생님입니다!", tags: ["#실력파인싸", "#열정물치사", "#라포달인", "#에이스"], icon: <Heart className="w-16 h-16 text-rose-500" />, color: "bg-rose-50" },
    PT: { title: "고독한 기술 장인", type: "PT (Professional + Technical)", desc: "화려한 말솜씨보다는 정확한 테크닉과 결과로 증명하는 타입입니다. 묵묵히 자신의 실력을 갈고닦으며, 환자들이 \"선생님 손은 약손\"이라고 부르는 진정한 실력파 치료사입니다.", tags: ["#기술의신", "#장인정신", "#묵묵한에이스", "#손맛"], icon: <Award className="w-16 h-16 text-indigo-600" />, color: "bg-indigo-50" },
    ES: { title: "치료실의 인간 비타민", type: "ES (Efficiency + Social)", desc: "복잡하고 힘든 치료보다 효율적인 업무 처리를 선호하며 동료들과의 관계를 중요시하는 타입입니다. 선생님 덕분에 치료실 분위기가 살아나요!", tags: ["#인간비타민", "#분위기메이커", "#워라밸수호자", "#소통왕"], icon: <Users className="w-16 h-16 text-emerald-500" />, color: "bg-emerald-50" },
    ET: { title: "AI급 효율 마스터", type: "ET (Efficiency + Technical)", desc: "불필요한 감정 소모나 야근을 극도로 싫어하며, 가장 깔끔하고 정확하게 할 일만 딱 끝내고 퇴근하는 칼퇴의 정석입니다. 기복 없이 안정적으로 환자를 치료하는 든든한 타입입니다.", tags: ["#칼퇴요정", "#AI물치사", "#효율마스터", "#정석"], icon: <Zap className="w-16 h-16 text-blue-500" />, color: "bg-blue-50" }
  };

  const handleAnswer = (value) => {
    setScores(prev => ({ ...prev, [value]: prev[value] + 1 }));
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setStep('result');
  };

  const getResult = () => (scores.P > scores.E ? 'P' : 'E') + (scores.S > scores.T ? 'S' : 'T');
  const restart = () => { setStep('start'); setCurrentIdx(0); setScores({ P: 0, E: 0, S: 0, T: 0 }); };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap'); * { font-family: 'Jua', sans-serif !important; word-break: keep-all; }`}</style>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 min-h-[600px] flex flex-col relative">

        {/* 시작 화면 광고 삽입 */}
        {step === 'start' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-sky-50 to-white">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] rotate-6 flex items-center justify-center mb-8 shadow-xl shadow-indigo-200"><Activity className="w-12 h-12 text-white -rotate-6" /></div>
            <h1 className="text-3xl font-black mb-3 text-slate-900 leading-tight">물리치료사<br/>성향 밸런스 게임</h1>
            <p className="text-slate-500 mb-8 font-medium">나의 임상 스타일은?<br/><span className="text-indigo-700 text-sm font-bold tracking-tight uppercase">PT MAP BALANCE GAME</span></p>
            <button onClick={() => setStep('quiz')} className="w-full py-5 bg-indigo-700 text-white rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-all mb-8">게임 시작하기</button>

            {/* 시작 페이지 광고 */}
            <div className="flex justify-center overflow-hidden w-full">
              <ins className="kakao_ad_area" style={{ display: 'none' }}
                data-ad-unit="DAN-sPwiKOrdKcuE7clt"
                data-ad-width="320"
                data-ad-height="50"></ins>
            </div>

            <p className="mt-6 text-sm text-slate-400 font-bold uppercase tracking-widest">10 Questions | @the.pt.map</p>
          </div>
        )}

        {/* 퀴즈 화면 광고 삽입 */}
        {step === 'quiz' && (
          <div className="flex-1 flex flex-col p-4 bg-slate-50 relative">
            <div className="mb-4 text-center px-2">
              <div className="flex justify-between items-end mb-2"><span className="text-indigo-600 font-black text-xl italic tracking-tighter uppercase">Question {currentIdx + 1}</span><span className="text-slate-400 text-sm font-bold">{currentIdx + 1} / {questions.length}</span></div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} /></div>
            </div>
            <div className="flex-1 flex flex-col relative gap-4 mb-4">
              <button onClick={() => handleAnswer(questions[currentIdx].optionA.value)} className="flex-1 bg-sky-100 hover:bg-sky-200 rounded-[2rem] p-6 flex items-center justify-center border-2 border-transparent hover:border-sky-300 transition-all active:scale-[0.98] shadow-sm"><span className="text-2xl font-black text-sky-900 text-center whitespace-pre-line leading-tight">{questions[currentIdx].optionA.text}</span></button>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-slate-50 font-black italic text-2xl text-slate-800">VS</div>
              <button onClick={() => handleAnswer(questions[currentIdx].optionB.value)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-[2rem] p-6 flex items-center justify-center border-2 border-transparent hover:border-indigo-500 transition-all active:scale-[0.98] shadow-sm"><span className="text-2xl font-black text-white text-center whitespace-pre-line leading-tight">{questions[currentIdx].optionB.text}</span></button>
            </div>

            {/* 퀴즈 페이지 하단 광고 */}
            <div className="flex justify-center overflow-hidden py-2">
              <ins className="kakao_ad_area" style={{ display: 'none' }}
                data-ad-unit="DAN-sPwiKOrdKcuE7clt"
                data-ad-width="320"
                data-ad-height="50"></ins>
            </div>
          </div>
        )}

        {/* 결과 화면 광고 삽입 */}
        {step === 'result' && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white">
            <div className="text-center mt-4 mb-6"><div className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black mb-4 uppercase tracking-widest">PT MAP 진단결과 🔍</div><h2 className="text-4xl font-black text-slate-900 break-keep">{resultData[getResult()].title}</h2></div>
            <div className={`rounded-[40px] ${resultData[getResult()].color} p-8 mb-8 flex flex-col items-center justify-center border border-white shadow-xl shadow-slate-200/50`}>
              <div className="mb-6 bg-white p-5 rounded-3xl shadow-md transform -rotate-3">{resultData[getResult()].icon}</div>
              <span className="inline-block px-6 py-2 bg-indigo-800 rounded-full text-xs font-black text-white shadow-md mb-6 uppercase tracking-widest">{resultData[getResult()].type}</span>
              <div className="flex flex-wrap justify-center gap-2 mb-8 px-2">{resultData[getResult()].tags.map((tag, i) => (<span key={i} className="text-indigo-700 font-bold text-sm bg-white/70 px-3 py-1 rounded-xl border border-indigo-100 shadow-sm">{tag}</span>))}</div>
              <p className="text-slate-700 leading-relaxed text-center font-bold text-lg px-2">{resultData[getResult()].desc}</p>
            </div>

            {/* 결과 페이지 광고 */}
            <div className="flex justify-center mb-10 overflow-hidden">
              <ins className="kakao_ad_area" style={{ display: 'none' }}
                data-ad-unit="DAN-sPwiKOrdKcuE7clt"
                data-ad-width="320"
                data-ad-height="50"></ins>
            </div>

            <div className="space-y-4 mb-10">
              <button onClick={() => { const dummy = document.createElement("textarea"); document.body.appendChild(dummy); dummy.value = window.location.href; dummy.select(); document.execCommand("copy"); document.body.removeChild(dummy); alert("링크가 복사되었습니다!"); }} className="w-full py-4 bg-indigo-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 text-lg"><Share2 className="w-6 h-6" /> 링크 복사하기</button>
              <button onClick={restart} className="w-full py-4 bg-white border-2 border-slate-200 text-slate-500 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95"><RefreshCcw className="w-5 h-5" /> 다시 테스트하기</button>
            </div>

            <div className="bg-slate-900 rounded-[36px] p-10 text-center shadow-2xl border border-slate-800">
              <p className="text-indigo-400 text-lg font-black mb-4 tracking-widest uppercase italic">💡 NEXT STEP</p>
              <div className="text-slate-200 text-base mb-8 leading-relaxed font-medium">놓치면 손해인 물리치료사들의 로드맵!<br /><span className="text-white text-3xl font-black block mt-3 mb-1 tracking-tighter italic font-serif leading-none">PT MAP</span><span className="text-slate-400 text-sm font-bold tracking-tight uppercase">에서 당신의 커리어를 완성하세요.</span></div>
              <button onClick={() => window.open(COMMUNITY_URL, '_blank')} className="w-full py-5 bg-indigo-600 text-white rounded-[20px] font-black text-xl hover:bg-indigo-500 transition-all active:scale-95 shadow-[0_10px_30px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2">커뮤니티 바로가기</button>
            </div>
          </div>
        )}
      </div>
      <div className="fixed -z-10 top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none"><div className="absolute top-[-25%] left-[-15%] w-[600px] h-[600px] bg-indigo-200 rounded-full blur-[140px]" /><div className="absolute bottom-[-15%] right-[-15%] w-[500px] h-[500px] bg-blue-200 rounded-full blur-[120px]" /></div>
    </div>
  );
};
export default App;