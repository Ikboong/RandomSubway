
import React, { useState } from 'react';

const foodItems: string[] = [
  "터키 베이컨",
  "터키",
  "안창 비프",
  "스테이크 & 치즈",
  "이탈리안 비엠티",
  "로티세리 바비큐 치킨",
  "에그마요",
  "안창 비프",
  "스파이시 쉬림프",
  "쉬림프",
  "로스트 치킨",
  "풀드포크 바비큐",
  "써브웨이 클럽",
  "치킨 데리야끼",
  "스파이시 이탈리안",
  "비엘티",
  "머쉬룸",
  "참치",
  "햄",
  "에그 슬라이스",
  "베지"
];

const breadItems: string[] = [
  "화이트",
  "하티",
  "파마산 오레가노",
  "위트",
  "허니오트",
  "플랫브레드"
];

const cheeseItems: string[] = [
  "아메리칸 치즈",
  "슈레드 치즈",
  "모짜렐라 치즈"
];

const vegetableItems: string[] = [
  "양상추", "토마토", "오이", "피망", "양파", "피클", "올리브", "할라피뇨", "아보카도"
];

const sauceItems: string[] = [
  // 새콤한 맛
  "머스타드", "사우전 아일랜드", "이탈리안 드레싱", "레드와인 식초",
  // 달콤한 맛
  "스위트 어니언", "허니 머스타드", "스위트 칠리", "스모크 바베큐",
  // 고소한 맛
  "랜치", "마요네즈",
  // 매콤한 맛
  "핫칠리", "사우스 웨스트", "홀스레디쉬",
  // 기타
  "올리브 오일", "소금", "후추"
];


const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const handleRecommendClick = () => {
    const randomFoodIndex = Math.floor(Math.random() * foodItems.length);
    const randomBreadIndex = Math.floor(Math.random() * breadItems.length);
    const randomCheeseIndex = Math.floor(Math.random() * cheeseItems.length);
    
    const selectedFood = foodItems[randomFoodIndex];
    const selectedBread = breadItems[randomBreadIndex];
    const selectedCheese = cheeseItems[randomCheeseIndex];

    const selectedVegetables: string[] = vegetableItems.filter(() => Math.random() < 0.5);

    let recommendation = `오늘의 추천: ${selectedFood} + ${selectedBread} + ${selectedCheese}`;

    // 야채 추천 로직
    if (selectedVegetables.length === vegetableItems.length && vegetableItems.length > 0) {
      recommendation += ` + 야채: 다 넣어주세요`;
    } else if (selectedVegetables.length >= 5 && selectedVegetables.length <= 8) {
      const unselectedVegetables = vegetableItems.filter(veg => !selectedVegetables.includes(veg));
      if (unselectedVegetables.length > 0) {
        recommendation += ` + 야채: ${unselectedVegetables.join(', ')} 빼주세요`;
      }
    } else if (selectedVegetables.length > 0) { 
      recommendation += ` + 야채: ${selectedVegetables.join(', ')}`;
    }

    // 소스 추천 로직
    let initiallySelectedSauces: string[] = sauceItems.filter(() => Math.random() < 0.09);
    let finalSelectedSauces: string[] = [...initiallySelectedSauces];

    if (finalSelectedSauces.length > 3) {
      const numToRemove = finalSelectedSauces.length - 3;
      for (let i = 0; i < numToRemove; i++) {
        if (finalSelectedSauces.length === 0) break; // Should not happen if numToRemove is calculated correctly
        const randomIndex = Math.floor(Math.random() * finalSelectedSauces.length);
        finalSelectedSauces.splice(randomIndex, 1);
      }
    }

    if (finalSelectedSauces.length > 0) {
      recommendation += ` + 소스: ${finalSelectedSauces.join(', ')}`;
    }

    setMessage(recommendation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6 text-slate-100 font-sans">
      <div className="bg-slate-800/70 backdrop-blur-md shadow-2xl rounded-xl p-8 md:p-12 w-full max-w-lg text-center">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-400 mb-3">
            오늘 뭐 먹지?
          </h1>
          <p className="text-lg text-slate-400">
            버튼을 눌러 오늘의 메뉴, 빵, 치즈, 야채, 소스 조합을 추천받으세요!
          </p>
        </header>

        <div className="flex flex-col sm:flex-row justify-center mb-10">
          <button
            onClick={handleRecommendClick}
            aria-label="오늘의 메뉴, 빵, 치즈, 야채, 소스 조합 추천받기"
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-sky-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-300 focus:ring-opacity-50"
          >
            오늘의 메뉴 추천!
          </button>
        </div>

        {message && (
          <div
            className="mt-8 p-4 bg-slate-700/50 rounded-lg text-slate-300 text-xl md:text-2xl font-semibold transition-opacity duration-500 ease-in-out"
            role="status"
            aria-live="polite"
          >
            <p>{message}</p>
          </div>
        )}
      </div>
      <footer className="absolute bottom-4 text-slate-500 text-xs">
        Powered by React & Tailwind CSS
      </footer>
    </div>
  );
};

export default App;
