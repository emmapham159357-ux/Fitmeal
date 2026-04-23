import React, { useState, useEffect } from 'react';
import { Plus, Check, X, Search, Info } from 'lucide-react';
// Recharts removed to ensure maximum compatibility and fix white screen
import './CalorieAnalyzer.css';

const DATABASE = [
  // 1. RAW MEAT & SEAFOOD
  { name: 'Ức gà (sống)', cal: 165, p: 31, c: 0, f: 3.6 },
  { name: 'Ức gà xông khói', cal: 150, p: 28, c: 2, f: 3 },
  { name: 'Thịt bò thăn (sống)', cal: 250, p: 26, c: 0, f: 15 },
  { name: 'Thịt bò bắp (lõi rùa)', cal: 200, p: 28, c: 0, f: 9 },
  { name: 'Cá hồi (phi lê sống)', cal: 208, p: 20, c: 0, f: 13 },
  { name: 'Cá ngừ đóng ngâm nước', cal: 116, p: 26, c: 0, f: 0.8 },
  { name: 'Cá ba sa (sống)', cal: 130, p: 13, c: 0, f: 8 },
  { name: 'Tôm sú (sống)', cal: 99, p: 24, c: 0, f: 0.3 },
  { name: 'Mực ống hấp', cal: 92, p: 15.6, c: 3.1, f: 1.4 },
  { name: 'Thịt đùi ếch', cal: 73, p: 16, c: 0, f: 0.3 },
  { name: 'Thịt heo nạc thăn', cal: 143, p: 26, c: 0, f: 3.5 },
  { name: 'Thịt ba rọi heo (sống)', cal: 518, p: 9, c: 0, f: 53 },
  { name: 'Cua biển (sống)', cal: 87, p: 18, c: 0, f: 1.5 },
  { name: 'Nghêu (sống)', cal: 74, p: 13, c: 3, f: 1 },
  { name: 'Sò huyết', cal: 71, p: 12, c: 3, f: 1 },
  { name: 'Cá thác lác (sống)', cal: 84, p: 15, c: 0, f: 2.2 },

  // 2. EGGS & DAIRY
  { name: 'Trứng gà (cả quả)', cal: 155, p: 13, c: 1.1, f: 11 },
  { name: 'Lòng trắng trứng gà', cal: 52, p: 11, c: 0.7, f: 0.2 },
  { name: 'Lòng đỏ trứng gà', cal: 322, p: 16, c: 3.6, f: 27 },
  { name: 'Trứng cút', cal: 158, p: 13, c: 0.4, f: 11 },
  { name: 'Trứng vịt lộn', cal: 182, p: 14, c: 4, f: 12 },
  { name: 'Sữa tươi không đường', cal: 62, p: 3, c: 4.8, f: 3.5 },
  { name: 'Sữa tươi tách béo', cal: 35, p: 3.4, c: 4.8, f: 0.1 },
  { name: 'Sữa chua Hy Lạp (không đường)', cal: 59, p: 10, c: 3.6, f: 0.4 },
  { name: 'Phô mai con bò cười', cal: 257, p: 11.5, c: 5.5, f: 21 },
  { name: 'Phô mai Mozzarella', cal: 280, p: 28, c: 3.1, f: 17 },
  { name: 'Sữa đậu nành không đường', cal: 33, p: 3.3, c: 1.8, f: 1.8 },
  { name: 'Whey Protein (Bột isolate)', cal: 380, p: 80, c: 5, f: 3 },

  // 3. CARBS (RICE, NOODLES, GRAINS)
  { name: 'Cơm trắng', cal: 130, p: 2.7, c: 28, f: 0.3 },
  { name: 'Cơm gạo lứt', cal: 110, p: 2.6, c: 23, f: 0.9 },
  { name: 'Gạo tẻ (sống)', cal: 358, p: 7, c: 80, f: 1 },
  { name: 'Bún tươi', cal: 110, p: 1.7, c: 25, f: 0 },
  { name: 'Phở tươi', cal: 143, p: 3.2, c: 32, f: 0 },
  { name: 'Bánh mì trắng', cal: 265, p: 9, c: 49, f: 3.2 },
  { name: 'Bánh mì đen/nguyên cám', cal: 250, p: 12, c: 43, f: 3.4 },
  { name: 'Khoai lang luộc', cal: 86, p: 1.6, c: 20, f: 0.1 },
  { name: 'Khoai tây luộc', cal: 87, p: 1.9, c: 20, f: 0.1 },
  { name: 'Yến mạch sống', cal: 389, p: 16.9, c: 66, f: 6.9 },
  { name: 'Mì Quảng sợi', cal: 130, p: 2, c: 30, f: 0.2 },
  { name: 'Hủ tiếu sợi khô', cal: 360, p: 5, c: 83, f: 1 },
  { name: 'Miến dong sống', cal: 351, p: 0.5, c: 86, f: 0 },
  { name: 'Bánh cuốn (chỉ bánh)', cal: 130, p: 2.5, c: 29, f: 0.2 },

  // 4. VEGETABLES
  { name: 'Rau muống', cal: 19, p: 3, c: 3, f: 0 },
  { name: 'Bông cải xanh / Súp lơ', cal: 34, p: 2.8, c: 7, f: 0.4 },
  { name: 'Rau cải ngọt', cal: 16, p: 1.5, c: 3, f: 0 },
  { name: 'Bắp cải', cal: 25, p: 1.3, c: 6, f: 0.1 },
  { name: 'Rau dền', cal: 23, p: 2.5, c: 4, f: 0 },
  { name: 'Bí đỏ', cal: 26, p: 1, c: 6.5, f: 0.1 },
  { name: 'Bí xanh', cal: 19, p: 0.6, c: 4, f: 0 },
  { name: 'Cà chua bi', cal: 18, p: 0.9, c: 3.9, f: 0.2 },
  { name: 'Cà rốt', cal: 41, p: 0.9, c: 10, f: 0.2 },
  { name: 'Ớt chuông', cal: 20, p: 0.9, c: 4.6, f: 0.2 },
  { name: 'Dưa chuột (dưa leo)', cal: 15, p: 0.6, c: 3.6, f: 0.1 },
  { name: 'Hành tây', cal: 40, p: 1.1, c: 9, f: 0.1 },
  { name: 'Nấm kim châm', cal: 37, p: 2.7, c: 7.8, f: 0.2 },
  { name: 'Nấm rơm', cal: 32, p: 3.8, c: 4.6, f: 0.1 },
  { name: 'Đậu cove (đậu cô ve)', cal: 31, p: 1.8, c: 7, f: 0.2 },

  // 5. FRUITS
  { name: 'Bơ (trái)', cal: 160, p: 2, c: 9, f: 15 },
  { name: 'Chuối (chín)', cal: 89, p: 1.1, c: 23, f: 0.3 },
  { name: 'Táo tây', cal: 52, p: 0.3, c: 14, f: 0.2 },
  { name: 'Dưa hấu', cal: 30, p: 0.6, c: 8, f: 0.2 },
  { name: 'Đu đủ chín', cal: 43, p: 0.5, c: 11, f: 0.1 },
  { name: 'Thanh long', cal: 60, p: 1.2, c: 13, f: 0.1 },
  { name: 'Bưởi', cal: 38, p: 0.8, c: 10, f: 0 },
  { name: 'Cam', cal: 47, p: 0.9, c: 12, f: 0.1 },
  { name: 'Kiwi', cal: 61, p: 1.1, c: 15, f: 0.5 },
  { name: 'Xoài chín', cal: 60, p: 0.8, c: 15, f: 0.4 },
  { name: 'Nho', cal: 69, p: 0.7, c: 18, f: 0.2 },
  { name: 'Ổi', cal: 68, p: 2.6, c: 14, f: 1 },

  // 6. NUTS, SEEDS & FATS
  { name: 'Hạnh nhân', cal: 579, p: 21, c: 22, f: 50 },
  { name: 'Đậu phộng (lạc luộc)', cal: 318, p: 14, c: 21, f: 22 },
  { name: 'Hạt điều', cal: 553, p: 18, c: 30, f: 44 },
  { name: 'Hạt óc chó', cal: 654, p: 15, c: 14, f: 65 },
  { name: 'Hạt chia', cal: 486, p: 16, c: 42, f: 31 },
  { name: 'Mè đen (vừng)', cal: 573, p: 17, c: 23, f: 49 },
  { name: 'Bơ đậu phộng', cal: 588, p: 25, c: 20, f: 50 },
  { name: 'Dầu ô liu', cal: 884, p: 0, c: 0, f: 100 },
  { name: 'Mỡ heo', cal: 900, p: 0, c: 0, f: 100 },

  // 7. VIETNAMESE LOCAL DISHES
  { name: 'Phở bò tái (1 bát)', cal: 105, p: 8, c: 12, f: 3 }, // 100g = 1/4 bát
  { name: 'Bún chả Hà Nội', cal: 170, p: 8, c: 20, f: 7 }, // Tính trên tổng trọng lượng
  { name: 'Bánh mì thịt chả', cal: 280, p: 10, c: 35, f: 11 },
  { name: 'Bún bò Huế', cal: 125, p: 9, c: 15, f: 4 },
  { name: 'Bún riêu cua', cal: 105, p: 6, c: 13, f: 3 },
  { name: 'Cơm tấm sườn bì chả', cal: 215, p: 11, c: 25, f: 8 },
  { name: 'Mì Quảng', cal: 145, p: 8, c: 18, f: 5 },
  { name: 'Hủ tiếu Nam Vang', cal: 120, p: 8, c: 16, f: 3 },
  { name: 'Gỏi cuốn tôm thịt (1 cuốn ~ 80g)', cal: 140, p: 9, c: 20, f: 2.5 },
  { name: 'Bánh xèo (1 cái medium)', cal: 240, p: 7, c: 30, f: 10 },
  { name: 'Bột chiên', cal: 290, p: 6, c: 35, f: 14 },
  { name: 'Thịt kho tàu (có mỡ)', cal: 260, p: 15, c: 10, f: 18 },
  { name: 'Cá lóc kho tộ', cal: 150, p: 18, c: 5, f: 6 },
  { name: 'Canh chua cá lóc', cal: 45, p: 6, c: 3, f: 1 },
  { name: 'Canh rong biển đậu hũ', cal: 35, p: 4, c: 2, f: 1.5 },
  { name: 'Rau muống xào tỏi', cal: 65, p: 3, c: 5, f: 4 },
  { name: 'Đậu hũ dồn thịt sốt cà', cal: 145, p: 10, c: 6, f: 9 },
  { name: 'Bò lúc lắc rau củ', cal: 180, p: 18, c: 8, f: 8 },
  { name: 'Gà xào sả ớt', cal: 160, p: 20, c: 5, f: 7 },

  // 8. DESSERTS, SNACKS & SWEETS
  { name: 'Chè đậu đen (có đường)', cal: 110, p: 3, c: 24, f: 0.5 },
  { name: 'Chè bưởi', cal: 135, p: 1.5, c: 28, f: 2 },
  { name: 'Bánh flan / Caramen', cal: 145, p: 4.5, c: 22, f: 5 },
  { name: 'Trà sữa trân châu', cal: 180, p: 1.5, c: 35, f: 4 },
  { name: 'Cà phê đen (thêm chút đường)', cal: 15, p: 0.1, c: 3, f: 0 },
  { name: 'Bạc xỉu / Cà phê sữa', cal: 100, p: 1.5, c: 18, f: 2.5 },
  { name: 'Sương sáo hạt é', cal: 50, p: 0.5, c: 12, f: 0 },
  { name: 'Trà đào cam sả', cal: 85, p: 0.5, c: 20, f: 0 },
  { name: 'Nước mía', cal: 65, p: 0, c: 16, f: 0 },
  { name: 'Sinh tố bơ (có đường sữa)', cal: 165, p: 2.5, c: 20, f: 9 },
  { name: 'Sinh tố mãng cầu', cal: 95, p: 1, c: 22, f: 0.5 },
  { name: 'Sữa chua dẻo / kem', cal: 130, p: 3, c: 18, f: 5 },
  { name: 'Bánh chuối nướng', cal: 210, p: 3, c: 45, f: 2 },
  { name: 'Biscotti nguyên cám', cal: 400, p: 12, c: 55, f: 15 },
  { name: 'Kẹo lạc (đậu phộng)', cal: 450, p: 12, c: 60, f: 20 },
  { name: 'Mứt dừa', cal: 380, p: 1.5, c: 80, f: 8 },

  // 9. HEALTHY / EAT CLEAN RECIPES
  { name: 'Salad ức gà dầu giấm', cal: 95, p: 15, c: 4, f: 2.5 },
  { name: 'Cơm gạo lứt cuộn rong biển', cal: 130, p: 4, c: 25, f: 1.5 },
  { name: 'Miến trộn rau củ ức gà', cal: 115, p: 10, c: 16, f: 2 },
  { name: 'Súp bí đỏ kem sữa', cal: 55, p: 1.5, c: 9, f: 1.5 },
  { name: 'Ức gà nướng mật ong', cal: 175, p: 25, c: 6, f: 4 },
  { name: 'Bò beefsteak măng tây', cal: 190, p: 20, c: 3, f: 11 },
  { name: 'Sinh tố cải xoăn mít (Kale Smoothies)', cal: 55, p: 2, c: 12, f: 0.5 },
  { name: 'Sữa chua Hy Lạp mix hạt', cal: 175, p: 12, c: 10, f: 9 },
  { name: 'Bánh ngói hạnh nhân keto', cal: 480, p: 18, c: 25, f: 40 },
];

const COLORS = ['#775537', '#C0DDDA', '#FBE29D'];

const CalorieAnalyzer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [gramInput, setGramInput] = useState(100);
  const [calculated, setCalculated] = useState({ cal: 0, p: 0, c: 0, f: 0 });

  const [showAddModal, setShowAddModal] = useState(false);
  const [addFeedback, setAddFeedback] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const lower = searchTerm.toLowerCase();
      setSearchResults(DATABASE.filter(item => item.name.toLowerCase().includes(lower)));
    }
  }, [searchTerm]);

  const selectFood = (food) => {
    setSelectedFood(food);
    setSearchTerm('');
    setGramInput(100);
    calculateMacros(food, 100);
  };

  const calculateMacros = (food, grams) => {
    setCalculated({
      cal: Math.round((food.cal / 100) * grams),
      p: Number(((food.p / 100) * grams).toFixed(1)),
      c: Number(((food.c / 100) * grams).toFixed(1)),
      f: Number(((food.f / 100) * grams).toFixed(1)),
    });
  };

  const handleGramChange = (e) => {
    const val = e.target.value === '' ? 0 : Number(e.target.value);
    setGramInput(val);
    if (selectedFood) {
      calculateMacros(selectedFood, val);
    }
  };

  const addToJournal = (type) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem('fitmeal_journal');
      const stored = saved ? JSON.parse(saved) : {};
      
      const dayData = stored[today] || { meals: { breakfast: [], lunch: [], dinner: [] }, exercises: [] };
      const newItem = {
        id: Date.now(),
        name: selectedFood?.name || 'Món ăn',
        cal: calculated.cal,
        grams: gramInput
      };
      
      if (!dayData.meals) dayData.meals = { breakfast: [], lunch: [], dinner: [] };
      if (!dayData.meals[type]) dayData.meals[type] = [];
      
      dayData.meals[type].push(newItem);
      stored[today] = dayData;
      
      localStorage.setItem('fitmeal_journal', JSON.stringify(stored));
      
      setAddFeedback(true);
      setTimeout(() => setAddFeedback(false), 2000);
      setShowAddModal(false);
    } catch (e) {
      console.error("Error adding to journal:", e);
      alert("Có lỗi khi lưu vào nhật ký. Vui lòng thử lại!");
    }
  };

  const chartData = [
    { name: 'Protein', value: calculated.p * 4 || 0 },
    { name: 'Carbs', value: calculated.c * 4 || 0 },
    { name: 'Fat', value: calculated.f * 9 || 0 }
  ];

  const hasData = calculated.cal > 0;

  return (
    <div className="analyzer-container-pro">
      {/* Floating stickers */}
      <div className="tab-stickers" aria-hidden="true">
        {['🔬','🍎','📊','🔢','🥑','📈','🔥','💪'].map((s,i) => (
          <span key={i} className="tab-sticker" style={{
            left: `${8 + i*12}%`,
            animationDelay: `${i*0.6}s`,
            animationDuration: `${5+i%3}s`,
            fontSize: `${1.1+(i%3)*0.35}rem`
          }}>{s}</span>
        ))}
      </div>

      {/* Hero banner */}
      <div className="tab-hero calorie-hero" style={{background: 'linear-gradient(135deg, rgba(119,85,55,0.06), rgba(220,38,38,0.08))'}}>
        <div className="tab-hero-content">
          <span className="tab-hero-tag" style={{color: '#dc2626'}}>Dinh Dưỡng</span>
          <h1 className="page-title">Trung tâm Phân tích Calo</h1>
          <p>Phân tích chi tiết Macro (Đạm, Tinh bột, Béo) và đồng bộ hóa với nhật ký Eat Clean của bạn.</p>
        </div>
        <div className="tab-hero-emoji">🔬</div>
      </div>
      
      <div className="search-box-pro card">
        <div className="search-input-wrap">
          <Search size={20} className="search-icon"/>
          <input 
            type="text" 
            className="search-bar-clean" 
            placeholder="Tìm món ăn (vd: phở gà, ức gà, chuối...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchResults.length > 0 && (
          <div className="search-results-list">
            {searchResults.map((item, idx) => (
              <div key={idx} className="search-result-item" onClick={() => selectFood(item)}>
                <div className="item-name">
                  <span>{item.name}</span>
                  <small>{item.cal} kcal/100g</small>
                </div>
                <button className="btn-quick-add" onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFood(item);
                  calculateMacros(item, 100);
                  setShowAddModal(true);
                }}>
                  <Plus size={16}/>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="analyzer-detail-grid mt-4">
        <div className="macro-card card">
          <h3>Phân bổ Năng lượng</h3>
          <div className="recharts-pie-wrap">
            {hasData ? (
              <div className="pie-analyzer-container">
                <div 
                  className="macro-pie-unified" 
                  style={{
                    '--p': `${(calculated.p * 4 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100}%`,
                    '--c': `${(calculated.c * 4 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100}%`,
                    '--f': `${(calculated.f * 9 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100}%`,
                    '--p-stop': `${(calculated.p * 4 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100}%`,
                    '--c-stop': `${((calculated.p * 4 + calculated.c * 4) / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100}%`
                  }}
                >
                  <div className="pie-center">
                    <span className="total-cal-val">{calculated.cal}</span>
                    <span className="unit">kcal</span>
                  </div>
                </div>
                <div className="pie-legend-grid mt-4">
                  <div className="legend-item"><span className="dot protein"></span> Đạm: {Math.round((calculated.p * 4 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100)}%</div>
                  <div className="legend-item"><span className="dot carbs"></span> Tinh bột: {Math.round((calculated.c * 4 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100)}%</div>
                  <div className="legend-item"><span className="dot fat"></span> Béo: {Math.round((calculated.f * 9 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100)}%</div>
                </div>
              </div>
            ) : (
              <div className="empty-chart-pro">
                <Info size={40} />
                <p>Chưa có dữ liệu phân tích</p>
              </div>
            )}
          </div>
        </div>

        <div className="stats-card card">
          <div className="stats-header-pro">
            <h3>Chi tiết Macro</h3>
            {selectedFood && (
              <button className="btn-add-pro" onClick={() => setShowAddModal(true)}>
                <Plus size={18}/> Nhật ký
              </button>
            )}
          </div>
          
          {selectedFood ? (
            <div className="food-analysis mt-3">
              <div className="food-name-display">{selectedFood.name}</div>
              
              <div className="gram-slider-wrap mt-4">
                <label>Khối lượng: <strong>{gramInput}g</strong></label>
                <input 
                  type="range" 
                  min="0" max="1000" step="10"
                  className="range-input-pro"
                  value={gramInput} 
                  onChange={handleGramChange}
                />
                <input 
                  type="number" 
                  className="input-field-small" 
                  value={gramInput} 
                  onChange={handleGramChange}
                />
              </div>

              <div className="macro-detail-bars mt-4">
                <div className="macro-bar-row">
                  <div className="bar-label">Chất đạm (Protein) <span>{calculated.p}g</span></div>
                  <div className="bar-bg"><div className="bar-fill protein" style={{width: `${(calculated.p * 4 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100}%`}}></div></div>
                </div>
                <div className="macro-bar-row">
                  <div className="bar-label">Tinh bột (Carbs) <span>{calculated.c}g</span></div>
                  <div className="bar-bg"><div className="bar-fill carbs" style={{width: `${(calculated.c * 4 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100}%`}}></div></div>
                </div>
                <div className="macro-bar-row">
                  <div className="bar-label">Chất béo (Fat) <span>{calculated.f}g</span></div>
                  <div className="bar-bg"><div className="bar-fill fat" style={{width: `${(calculated.f * 9 / (calculated.p * 4 + calculated.c * 4 + calculated.f * 9)) * 100}%`}}></div></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-analysis-state">
              <p>Hãy tìm kiếm món ăn để khám phá các chỉ số dinh dưỡng ẩn giấu bên trong.</p>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay-pro animate-fade-in">
          <div className="modal-card-pro card shadow-2xl">
            <div className="modal-header-pro">
              <h3>Thêm vào Nhật ký</h3>
              <button className="btn-close-pro" onClick={() => setShowAddModal(false)}><X size={20}/></button>
            </div>
            <div className="modal-info-pro">
              <p>Bạn muốn thêm <strong>{selectedFood?.name}</strong> vào bữa nào?</p>
              <div className="cal-preview">{calculated.cal} kcal | {gramInput}g</div>
            </div>
            <div className="meal-grid-options">
               <button className="meal-btn-pro" onClick={() => addToJournal('breakfast')}>
                  <span className="icon">☀️</span> Bữa Sáng
               </button>
               <button className="meal-btn-pro" onClick={() => addToJournal('lunch')}>
                  <span className="icon">⛅</span> Bữa Trưa
               </button>
               <button className="meal-btn-pro" onClick={() => addToJournal('dinner')}>
                  <span className="icon">🌙</span> Bữa Tối
               </button>
            </div>
          </div>
        </div>
      )}

      {addFeedback && (
        <div className="feedback-toast-pro">
          <Check size={20} /> Đã đồng bộ với Nhật ký thành công!
        </div>
      )}
    </div>
  );
};

export default CalorieAnalyzer;
