import React, { useState, useEffect } from 'react';
import { Plus, Check, X, Search, Info } from 'lucide-react';
// Recharts removed to ensure maximum compatibility and fix white screen
import './CalorieAnalyzer.css';

const DATABASE = [
  // Thực phẩm cốt lõi
  { name: 'Ức gà', cal: 165, p: 31, c: 0, f: 3.6 },
  { name: 'Cơm trắng', cal: 130, p: 2.7, c: 28, f: 0.3 },
  { name: 'Cơm gạo lứt', cal: 110, p: 2.6, c: 23, f: 0.9 },
  { name: 'Trứng gà', cal: 155, p: 13, c: 1.1, f: 11 },
  { name: 'Thịt bò thăn', cal: 250, p: 26, c: 0, f: 15 },
  { name: 'Cá hồi', cal: 208, p: 20, c: 0, f: 13 },
  { name: 'Khoai lang', cal: 86, p: 1.6, c: 20, f: 0.1 },
  { name: 'Bơ (trái)', cal: 160, p: 2, c: 9, f: 15 },
  { name: 'Chuối', cal: 89, p: 1.1, c: 23, f: 0.3 },
  { name: 'Đậu phụ', cal: 76, p: 8, c: 1.9, f: 4.8 },
  { name: 'Súp lơ', cal: 34, p: 2.8, c: 7, f: 0.4 },
  { name: 'Yến mạch', cal: 389, p: 16.9, c: 66, f: 6.9 },
  { name: 'Sữa tươi', cal: 62, p: 3, c: 4.8, f: 3.5 },
  { name: 'Ức vịt', cal: 140, p: 20, c: 0, f: 6 },
  { name: 'Tôm luộc', cal: 99, p: 24, c: 0, f: 0.3 },
  { name: 'Bánh mì đen', cal: 259, p: 9, c: 48, f: 3.3 },
  { name: 'Hạnh nhân', cal: 579, p: 21, c: 22, f: 50 },
  { name: 'Rau muống', cal: 19, p: 3, c: 3, f: 0 },
  { name: 'Táo tây', cal: 52, p: 0.3, c: 14, f: 0.2 },
  { name: 'Thịt heo nạc', cal: 242, p: 27, c: 0, f: 14 },
  
  // Đồ nước / Soups
  { name: 'Phở bò gạo lứt (nước thanh)', cal: 120, p: 10, c: 15, f: 2.5 },
  { name: 'Bún chả cá gạo lứt', cal: 115, p: 8, c: 16, f: 2.0 },
  { name: 'Súp bí đỏ', cal: 45, p: 1.2, c: 9, f: 0.8 },
  { name: 'Súp ức gà ngô non', cal: 75, p: 9, c: 6, f: 1.5 },
  { name: 'Canh rong biển cốt đậu hũ', cal: 35, p: 4, c: 2, f: 1.5 },

  // Món Tráng miệng / Smoothies / Drinks
  { name: 'Smoothie bơ chuối', cal: 150, p: 2, c: 20, f: 7 },
  { name: 'Chè dưỡng nhan (ít đường phèn)', cal: 65, p: 1, c: 15, f: 0 },
  { name: 'Bánh chuối yến mạch', cal: 210, p: 6, c: 35, f: 5 },
  { name: 'Sữa chua Hy Lạp mix hạt', cal: 175, p: 12, c: 10, f: 9 },
  { name: 'Nước ép cần tây dứa', cal: 30, p: 0.5, c: 7, f: 0.1 },
  { name: 'Biscotti nguyên cám', cal: 400, p: 12, c: 55, f: 15 },

  // Món kết hợp / Khác
  { name: 'Salad ức gà dầu giấm', cal: 95, p: 15, c: 4, f: 2.5 },
  { name: 'Bò lúc lắc rau củ', cal: 180, p: 18, c: 8, f: 8 },
  { name: 'Cà chua bi', cal: 18, p: 0.9, c: 3.9, f: 0.2 },
  { name: 'Nấm đùi gà nướng', cal: 48, p: 3.3, c: 6.6, f: 0.5 },

  // Ẩm thực Việt Nam (Phiên bản Healthy/Giảm dầu mỡ)
  { name: 'Gỏi cuốn tôm thịt (bánh tráng gạo lứt)', cal: 140, p: 9, c: 20, f: 2.5 },
  { name: 'Phở gà xé (nước thanh)', cal: 110, p: 9, c: 15, f: 1.5 },
  { name: 'Bún bò Huế gạo lứt', cal: 135, p: 10, c: 18, f: 3.0 },
  { name: 'Cá kho tộ (ít đường)', cal: 150, p: 18, c: 5, f: 6 },
  { name: 'Canh chua cá lóc', cal: 45, p: 6, c: 3, f: 1 },
  { name: 'Gà xào sả ớt (ức gà)', cal: 160, p: 25, c: 4, f: 5 },
  { name: 'Nộm hoa chuối tôm thịt', cal: 85, p: 8, c: 9, f: 2 },
  { name: 'Thịt kho tiêu (thịt nạc)', cal: 190, p: 22, c: 5, f: 9 },

  // Thực phẩm siêu giàu chất đạm (High Protein)
  { name: 'Whey Protein (Bột)', cal: 380, p: 80, c: 5, f: 3 },
  { name: 'Cá ngừ đóng ngâm nước', cal: 116, p: 26, c: 0, f: 0.8 },
  { name: 'Lòng trắng trứng gà', cal: 52, p: 11, c: 0.7, f: 0.2 },
  { name: 'Mực ống hấp', cal: 92, p: 15.6, c: 3.1, f: 1.4 },
  { name: 'Thịt đùi ếch', cal: 73, p: 16, c: 0, f: 0.3 },
  { name: 'Tôm sú nướng', cal: 105, p: 20, c: 1, f: 1.7 },
  { name: 'Thịt bò bắp (lõi rùa)', cal: 200, p: 28, c: 0, f: 9 },
  { name: 'Ức gà xông khói', cal: 150, p: 28, c: 2, f: 3 },
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
