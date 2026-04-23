import React, { useState, useEffect } from 'react';
import { Calculator, Utensils, CheckCircle, AlertTriangle, TrendingDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MenuSuggestion.css';

const MOCK_MEALS = {
  Sáng: [
    { name: 'Phở bò tái (1 bát)', cals: 420, baseWeight: 400, unit: 'g', tags: ['protein'] },
    { name: 'Bún bò Huế', cals: 500, baseWeight: 400, unit: 'g', tags: ['protein'] },
    { name: 'Mì Quảng', cals: 435, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Bún riêu cua', cals: 315, baseWeight: 300, unit: 'g' },
    { name: 'Bánh mì thịt chả', cals: 280, baseWeight: 100, unit: 'g', tags: ['protein'] },
    { name: 'Bánh cuốn (chỉ bánh)', cals: 130, baseWeight: 100, unit: 'g' },
    { name: 'Sữa chua Hy Lạp mix hạt', cals: 175, baseWeight: 100, unit: 'g', tags: ['protein'] },
    { name: 'Yến mạch sống', cals: 194, baseWeight: 50, unit: 'g' },
    { name: 'Sữa tươi không đường', cals: 124, baseWeight: 200, unit: 'ml' },
    { name: 'Trứng gà (cả quả)', cals: 155, baseWeight: 100, unit: 'g', tags: ['protein'] },
    { name: 'Trứng cút', cals: 158, baseWeight: 100, unit: 'g' },
    { name: 'Súp bí đỏ kem sữa', cals: 110, baseWeight: 200, unit: 'ml' },
    { name: 'Bún chả Hà Nội', cals: 510, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Cơm tấm sườn bì chả', cals: 430, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Phở tươi', cals: 143, baseWeight: 100, unit: 'g' },
    { name: 'Bánh mì đen/nguyên cám', cals: 250, baseWeight: 100, unit: 'g' },
    { name: 'Sữa tươi tách béo', cals: 70, baseWeight: 200, unit: 'ml' },
    { name: 'Sữa đậu nành không đường', cals: 66, baseWeight: 200, unit: 'ml' },
    { name: 'Cà phê đen (thêm chút đường)', cals: 15, baseWeight: 100, unit: 'ml' },
    { name: 'Bạc xỉu / Cà phê sữa', cals: 100, baseWeight: 100, unit: 'ml' },
    { name: 'Bánh xèo (1 cái medium)', cals: 240, baseWeight: 100, unit: 'g' },
    { name: 'Hủ tiếu Nam Vang', cals: 360, baseWeight: 300, unit: 'g', tags: ['protein'] },
  ],
  Chính: [
    { name: 'Ức gà nướng mật ong', cals: 350, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Cá hồi (phi lê sống)', cals: 416, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Gà xào sả ớt', cals: 320, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Cá lóc kho tộ', cals: 300, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Bò beefsteak măng tây', cals: 475, baseWeight: 250, unit: 'g', tags: ['protein'] },
    { name: 'Thịt kho tàu (có mỡ)', cals: 520, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Canh chua cá lóc', cals: 135, baseWeight: 300, unit: 'ml' },
    { name: 'Canh rong biển đậu hũ', cals: 105, baseWeight: 300, unit: 'ml' },
    { name: 'Đậu hũ dồn thịt sốt cà', cals: 290, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Bò lúc lắc rau củ', cals: 450, baseWeight: 250, unit: 'g', tags: ['protein'] },
    { name: 'Salad ức gà dầu giấm', cals: 285, baseWeight: 300, unit: 'g' },
    { name: 'Gỏi cuốn tôm thịt (1 cuốn ~ 80g)', cals: 140, baseWeight: 80, unit: 'g', tags: ['protein'] },
    { name: 'Cơm gạo lứt cuộn rong biển', cals: 260, baseWeight: 200, unit: 'g' },
    { name: 'Miến trộn rau củ ức gà', cals: 345, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Rau muống xào tỏi', cals: 130, baseWeight: 200, unit: 'g' },
    { name: 'Ức gà (sống)', cals: 330, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Ức gà xông khói', cals: 300, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Thịt bò thăn (sống)', cals: 500, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Thịt bò bắp (lõi rùa)', cals: 400, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Cá ngừ đóng ngâm nước', cals: 116, baseWeight: 100, unit: 'g', tags: ['protein'] },
    { name: 'Cá ba sa (sống)', cals: 260, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Tôm sú (sống)', cals: 198, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Mực ống hấp', cals: 184, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Thịt đùi ếch', cals: 146, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Thịt heo nạc thăn', cals: 286, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Thịt ba rọi heo (sống)', cals: 518, baseWeight: 100, unit: 'g' },
    { name: 'Cơm trắng', cals: 195, baseWeight: 150, unit: 'g' },
    { name: 'Cơm gạo lứt', cals: 165, baseWeight: 150, unit: 'g' },
    { name: 'Gạo tẻ (sống)', cals: 179, baseWeight: 50, unit: 'g' },
    { name: 'Miến dong sống', cals: 175, baseWeight: 50, unit: 'g' },
    { name: 'Bột chiên', cals: 290, baseWeight: 100, unit: 'g' },
  ],
  Phụ: [
    { name: 'Sữa chua Hy Lạp (không đường)', cals: 59, baseWeight: 100, unit: 'g', tags: ['protein'] },
    { name: 'Hạnh nhân', cals: 115, baseWeight: 20, unit: 'g' },
    { name: 'Táo tây', cals: 52, baseWeight: 100, unit: 'g' },
    { name: 'Chuối (chín)', cals: 89, baseWeight: 100, unit: 'g' },
    { name: 'Whey Protein (Bột isolate)', cals: 114, baseWeight: 30, unit: 'g', tags: ['protein'] },
    { name: 'Sinh tố cải xoăn mít (Kale Smoothies)', cals: 110, baseWeight: 200, unit: 'ml' },
    { name: 'Biscotti nguyên cám', cals: 200, baseWeight: 50, unit: 'g' },
    { name: 'Bánh ngói hạnh nhân keto', cals: 240, baseWeight: 50, unit: 'g' },
    { name: 'Hạt điều', cals: 165, baseWeight: 30, unit: 'g' },
    { name: 'Kẹo lạc (đậu phộng)', cals: 135, baseWeight: 30, unit: 'g' },
    { name: 'Mứt dừa', cals: 114, baseWeight: 30, unit: 'g' },
    { name: 'Trà đào cam sả', cals: 170, baseWeight: 200, unit: 'ml' },
    { name: 'Bánh flan / Caramen', cals: 145, baseWeight: 100, unit: 'g' },
    { name: 'Lòng trắng trứng gà', cals: 52, baseWeight: 100, unit: 'g', tags: ['protein'] },
    { name: 'Trứng vịt lộn', cals: 182, baseWeight: 100, unit: 'g', tags: ['protein'] },
    { name: 'Phô mai con bò cười', cals: 51, baseWeight: 20, unit: 'g' },
    { name: 'Khoai lang luộc', cals: 86, baseWeight: 100, unit: 'g' },
    { name: 'Khoai tây luộc', cals: 87, baseWeight: 100, unit: 'g' },
    { name: 'Bơ (trái)', cals: 160, baseWeight: 100, unit: 'g' },
    { name: 'Dưa hấu', cals: 60, baseWeight: 200, unit: 'g' },
    { name: 'Đu đủ chín', cals: 86, baseWeight: 200, unit: 'g' },
    { name: 'Thanh long', cals: 120, baseWeight: 200, unit: 'g' },
    { name: 'Bưởi', cals: 76, baseWeight: 200, unit: 'g' },
    { name: 'Cam', cals: 47, baseWeight: 100, unit: 'g' },
    { name: 'Kiwi', cals: 61, baseWeight: 100, unit: 'g' },
    { name: 'Xoài chín', cals: 120, baseWeight: 200, unit: 'g' },
    { name: 'Nho', cals: 69, baseWeight: 100, unit: 'g' },
    { name: 'Ổi', cals: 68, baseWeight: 100, unit: 'g' },
    { name: 'Đậu phộng (lạc luộc)', cals: 159, baseWeight: 50, unit: 'g' },
    { name: 'Hạt óc chó', cals: 130, baseWeight: 20, unit: 'g' },
    { name: 'Hạt chia', cals: 48, baseWeight: 10, unit: 'g' },
    { name: 'Bơ đậu phộng', cals: 588, baseWeight: 100, unit: 'g' },
    { name: 'Chè đậu đen (có đường)', cals: 220, baseWeight: 200, unit: 'g' },
    { name: 'Chè bưởi', cals: 270, baseWeight: 200, unit: 'g' },
    { name: 'Trà sữa trân châu', cals: 450, baseWeight: 250, unit: 'ml' },
    { name: 'Sương sáo hạt é', cals: 100, baseWeight: 200, unit: 'g' },
    { name: 'Nước mía', cals: 130, baseWeight: 200, unit: 'ml' },
    { name: 'Sinh tố bơ (có đường sữa)', cals: 330, baseWeight: 200, unit: 'ml' },
    { name: 'Sinh tố mãng cầu', cals: 190, baseWeight: 200, unit: 'ml' },
    { name: 'Sữa chua dẻo / kem', cals: 130, baseWeight: 100, unit: 'g' },
    { name: 'Bánh chuối nướng', cals: 210, baseWeight: 100, unit: 'g' },
    { name: 'Rau muống', cals: 19, baseWeight: 100, unit: 'g' },
    { name: 'Bông cải xanh / Súp lơ', cals: 34, baseWeight: 100, unit: 'g' },
    { name: 'Bí đỏ', cals: 26, baseWeight: 100, unit: 'g' },
    { name: 'Bí xanh', cals: 19, baseWeight: 100, unit: 'g' },
    { name: 'Cà rốt', cals: 41, baseWeight: 100, unit: 'g' },
    { name: 'Ớt chuông', cals: 20, baseWeight: 100, unit: 'g' },
    { name: 'Cà chua bi', cals: 18, baseWeight: 100, unit: 'g' },
    { name: 'Hành tây', cals: 40, baseWeight: 100, unit: 'g' },
  ]
};

const INGREDIENTS_GUIDE = [
  { group: 'Tinh bột', items: ['Gạo lứt', 'Yến mạch nguyên cám', 'Khoai lang', 'Quinoa', 'Bánh mì đen', 'Mì Ý nguyên cám'] },
  { group: 'Chất đạm', items: ['Ức gà', 'Thăn bò', 'Cá hồi', 'Cá thu', 'Tôm tươi', 'Trứng gà', 'Đậu hũ non'] },
  { group: 'Chất béo', items: ['Quả bơ', 'Hạt hạnh nhân', 'Hạt óc chó', 'Hạt chia', 'Dầu Olive TV', 'Dầu dừa'] },
  { group: 'Rau & Củ', items: ['Cải Kale', 'Bông cải xanh', 'Măng tây', 'Rau chân vịt', 'Ớt chuông', 'Cà rốt', 'Bí ngòi'] },
  { group: 'Trái cây', items: ['Táo xanh', 'Việt quất', 'Dâu tây', 'Bưởi', 'Cam', 'Ổi', 'Kiwi'] },
  { group: 'Gia vị', items: ['Mật ong', 'Đường cỏ ngọt', 'Muối hồng', 'Tiêu', 'Gừng', 'Tỏi', 'Giấm táo'] }
];

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725
};

const MenuSuggestion = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    gender: 'Nữ',
    age: '',
    height: '',
    weight: '',
    activity: 'moderate',
    goal: 'Giữ dáng'
  });

  const [calcResult, setCalcResult] = useState(null);
  const [menuResult, setMenuResult] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fitmeal_profile');
      const parsed = saved ? JSON.parse(saved) : { targetCals: 2000, goal: 'Giữ dáng', weight: 60, height: 165, age: 25 };
      setProfile(parsed);
      setFormData(prev => ({
        ...prev,
        age: parsed.age || '',
        height: parsed.height || '',
        weight: parsed.weight || '',
        goal: parsed.goal || 'Giữ dáng'
      }));
    } catch (e) {
      console.warn("Failed to load profile in MenuSuggestion", e);
      setProfile({ targetCals: 2000, goal: 'Giữ dáng', weight: 60, height: 165, age: 25 });
    }
  }, []);

  const calculateTDEE = (e) => {
    e.preventDefault();
    const { gender, age, height, weight, activity, goal } = formData;
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);
    
    const bmi = (w / ((h / 100) ** 2)).toFixed(1);
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Gầy';
    else if (bmi < 25) bmiCategory = 'Bình thường';
    else if (bmi < 30) bmiCategory = 'Thừa cân';
    else bmiCategory = 'Béo phì';

    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr += gender === 'Nam' ? 5 : -161;
    
    let tdee = bmr * activityMultipliers[activity];
    let suggestedCals = tdee;

    if (goal === 'Giảm cân') suggestedCals -= 500;
    else if (goal === 'Tăng cơ') suggestedCals += 300;
    else if (goal === 'Tăng cơ giảm mỡ') {
      if (Number(bmi) > 25) {
        suggestedCals = tdee * 0.92;
      } else {
        suggestedCals = tdee;
      }
    }

    suggestedCals = Math.round(suggestedCals);

    setCalcResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      bmi,
      bmiCategory,
      suggestedCals,
      goal
    });
  };

  const applyToProfile = () => {
    if (calcResult) {
      const updatedProfile = { 
        ...profile, 
        targetCals: calcResult.suggestedCals, 
        goal: calcResult.goal,
        weight: formData.weight,
        height: formData.height,
        age: formData.age
      };
      setProfile(updatedProfile);
      localStorage.setItem('fitmeal_profile', JSON.stringify(updatedProfile));
      alert('Đã cập nhật mục tiêu Calo vào Tài khoản!');
    }
  };

  const generateMenu = () => {
    if (!profile) return;
    const targetCals = profile.targetCals;
    const isRecomposition = profile.goal === 'Tăng cơ giảm mỡ';

    const proteinMains = MOCK_MEALS.Chính.filter(m => m.tags?.includes('protein'));
    const allMains = MOCK_MEALS.Chính;
    
    const sangBase = MOCK_MEALS.Sáng[Math.floor(Math.random() * MOCK_MEALS.Sáng.length)];
    const mainPool = isRecomposition ? proteinMains : allMains;
    
    const truaBase = mainPool[Math.floor(Math.random() * mainPool.length)];
    let toiBase = mainPool[Math.floor(Math.random() * mainPool.length)];
    while (toiBase === truaBase && mainPool.length > 1) {
      toiBase = mainPool[Math.floor(Math.random() * mainPool.length)];
    }
    
    const phuBase = MOCK_MEALS.Phụ[Math.floor(Math.random() * MOCK_MEALS.Phụ.length)];
    const baseTotalMains = sangBase.cals + truaBase.cals + toiBase.cals;
    
    const combinedSnack = targetCals > (baseTotalMains + 200) ? phuBase : null;
    const remainingCals = combinedSnack ? (targetCals - combinedSnack.cals) : targetCals;
    
    const multiplier = remainingCals / baseTotalMains;

    const scaleMeal = (meal) => ({
      ...meal,
      adjustedCals: Math.round(meal.cals * multiplier),
      adjustedWeight: Math.round(meal.baseWeight * multiplier)
    });

    const menu = {
      Sáng: scaleMeal(sangBase),
      Trưa: scaleMeal(truaBase),
      Tối: scaleMeal(toiBase)
    };
    if (combinedSnack) menu['Phụ'] = { ...combinedSnack, adjustedCals: combinedSnack.cals, adjustedWeight: combinedSnack.baseWeight };

    const menuTotal = Object.values(menu).reduce((sum, m) => sum + m.adjustedCals, 0);

    setMenuResult({ 
      menu, 
      menuTotal, 
      targetUsed: targetCals, 
      goalUsed: profile.goal
    });
  };

  return (
    <div className="menu-container">
      {/* Floating stickers */}
      <div className="tab-stickers" aria-hidden="true">
        {['🍽️','🥑','ข้าว','🥩','🥗','🐟','🥕','🍴'].map((s,i) => (
          <span key={i} className="tab-sticker" style={{
            left: `${8 + i*12}%`,
            animationDelay: `${i*0.6}s`,
            animationDuration: `${5+i%3}s`,
            fontSize: `${1.1+(i%3)*0.35}rem`
          }}>{s}</span>
        ))}
      </div>

      {/* Hero banner */}
      <div className="tab-hero menu-hero" style={{background: 'linear-gradient(135deg, rgba(119,85,55,0.06), rgba(245,158,11,0.1))'}}>
        <div className="tab-hero-content">
          <span className="tab-hero-tag" style={{color: '#d97706'}}>Thực đơn</span>
          <h1 className="page-title">Thiết Lập & Gợi Ý Thực Đơn</h1>
          <p>Thuật toán tự động tạo thực đơn dựa trên chỉ số cơ thể, mức độ vận động và mục tiêu của bạn.</p>
        </div>
        <div className="tab-hero-emoji">🍱</div>
      </div>

      
      <div className="menu-layout">
        <div className="calc-section">
          <form className="card menu-form" onSubmit={calculateTDEE}>
            <div className="flex-center mb-4">
              <Calculator size={24} className="text-primary mr-2" />
              <h3 className="mb-0">1. Tính toán Calo Gợi ý</h3>
            </div>

            <div className="form-group row">
              <label>Giới tính:</label>
              <div className="radio-group">
                <label className="radio-label"><input type="radio" name="gender" value="Nam" checked={formData.gender==='Nam'} onChange={(e)=>setFormData({...formData, gender: e.target.value})}/> Nam</label>
                <label className="radio-label"><input type="radio" name="gender" value="Nữ" checked={formData.gender==='Nữ'} onChange={(e)=>setFormData({...formData, gender: e.target.value})}/> Nữ</label>
              </div>
            </div>

            <div className="form-group">
              <label>Tuổi:</label>
              <input type="number" className="input-field" required value={formData.age} onChange={e=>setFormData({...formData,age:e.target.value})} />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Chiều cao (cm):</label>
                <input type="number" className="input-field" required value={formData.height} onChange={e=>setFormData({...formData,height:e.target.value})} />
              </div>
              <div className="form-group half">
                <label>Cân nặng (kg):</label>
                <input type="number" className="input-field" required value={formData.weight} onChange={e=>setFormData({...formData,weight:e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label>Mức độ vận động:</label>
              <select className="input-field" value={formData.activity} onChange={e=>setFormData({...formData,activity:e.target.value})}>
                <option value="sedentary">Ít vận động</option>
                <option value="light">Vận động nhẹ (1-3 ngày/tuần)</option>
                <option value="moderate">Vận động vừa (3-5 ngày/tuần)</option>
                <option value="active">Vận động nhiều (6-7 ngày/tuần)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 20 }}>
              <label>Mục tiêu của bạn:</label>
              <div className="goal-buttons">
                {['Giảm cân', 'Giữ dáng', 'Tăng cơ', 'Tăng cơ giảm mỡ'].map(g => (
                  <button
                    type="button"
                    key={g}
                    className={`btn-goal ${formData.goal === g ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, goal: g})}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-secondary w-100" type="submit">Phân tích & Tính gợi ý</button>
          </form>

          {calcResult && (
            <div className="card mt-4 result-calc-card animate-fade-in shadow-sm">
              <div className="bmi-badge mb-3">
                <span>BMI: <strong>{calcResult.bmi}</strong></span>
                <span className={`bmi-status ${calcResult.bmiCategory}`}>({calcResult.bmiCategory})</span>
              </div>
              
              <div className="result-details">
                <div className="res-item"><span>BMR:</span> <strong>{calcResult.bmr} kcal</strong></div>
                <div className="res-item"><span>TDEE:</span> <strong>{calcResult.tdee} kcal</strong></div>
                <div className="res-item highlighted">
                  <span>Mức Calo khuyên dùng:</span>
                  <div className="suggested-val">{calcResult.suggestedCals} kcal/ngày</div>
                </div>
              </div>

              {calcResult.bmiCategory === 'Thừa cân' && calcResult.goal === 'Tăng cơ giảm mỡ' && (
                <div className="bmi-warning mt-3">
                  <AlertTriangle size={16} /> 
                  <span>Mức Calo được giảm nhẹ (-8%) do thừa cân.</span>
                </div>
              )}

              <button className="btn-primary w-100 mt-3" onClick={applyToProfile}>Áp dụng vào Tài khoản</button>
            </div>
          )}

          <div className="card mt-4 ingredients-guide-card animate-fade-in">
            <div className="flex-center mb-3">
              <CheckCircle size={20} className="text-success mr-2" />
              <h4 className="mb-0">Nguyên liệu Ưu tiên (Eat Clean)</h4>
            </div>
            <div className="ingredients-grid">
              {INGREDIENTS_GUIDE.map(item => (
                <div key={item.group} className="ingredient-group">
                  <h6>{item.group}</h6>
                  <p>{item.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="menu-result-area">
          <div className="card generator-settings">
            <div className="flex-center mb-3">
              <Utensils size={24} className="text-primary mr-2" />
              <h3>2. Thiết kế Thực đơn</h3>
            </div>
            {profile ? (
              <div className="current-target-box mb-3">
                <div className="target-item">
                  <label>Mục tiêu Calo:</label>
                  <span>{profile.targetCals} kcal</span>
                </div>
                <div className="target-item">
                  <label>Chế độ:</label>
                  <span>{profile.goal}</span>
                </div>
              </div>
            ) : (
              <p>Vui lòng thiết lập hồ sơ trước...</p>
            )}
            <button className="btn-primary w-100 generate-btn" onClick={generateMenu}>
              Lên thực đơn
            </button>
          </div>

          {menuResult ? (
            <div className="card menu-result animate-fade-in">
              <div className="menu-header">
                <div className="total-summary">
                  <p>Mục tiêu: {menuResult.targetUsed} kcal</p>
                  <div className="total-actual">
                    Tổng Calo: <strong>{menuResult.menuTotal} kcal</strong>
                    {Math.abs(menuResult.menuTotal - menuResult.targetUsed) <= 50 && <CheckCircle size={18} className="text-success ml-2" />}
                  </div>
                </div>
              </div>
              
              <div className="meal-grid mt-4">
                {Object.entries(menuResult.menu).map(([mealName, meal]) => (
                  <div key={mealName} className="meal-card-new">
                    <div className="meal-type-label">{mealName}</div>
                    <div className="meal-content-wrap">
                      <div className="meal-main-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div>
                          <strong>{meal.name}</strong>
                          <div className="meal-specs">
                            <span className="spec-cal">{meal.adjustedCals} kcal</span>
                            <span className="spec-weight">Định lượng: <strong>{meal.adjustedWeight}{meal.unit}</strong></span>
                          </div>
                        </div>
                        <button 
                          className="btn-secondary" 
                          onClick={() => navigate('/calories', { state: { searchFood: meal.name } })}
                          style={{ padding: '6px 12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <Search size={14} /> Phân tích
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {menuResult.goalUsed === 'Tăng cơ giảm mỡ' && (
                <div className="advice-box mt-4">
                  <TrendingDown size={20} />
                  <div>
                    <strong>Tư vấn Tái cấu trúc:</strong>
                    <p>Ăn đủ đạm và giữ thâm hụt nhẹ để đốt mỡ.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card empty-menu-state">
              <div className="empty-content text-center py-5">
                <Utensils size={48} className="text-muted mb-3" />
                <p>Ấn nút để AI thiết kế thực đơn cho bạn.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSuggestion;
