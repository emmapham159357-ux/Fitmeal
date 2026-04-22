import React, { useState, useEffect } from 'react';
import { Calculator, Utensils, CheckCircle, AlertTriangle, TrendingDown } from 'lucide-react';
import './MenuSuggestion.css';

const MOCK_MEALS = {
  Sáng: [
    { name: 'Yến mạch trái cây tươi', cals: 350, baseWeight: 200, unit: 'g' },
    { name: 'Bánh mì đen trứng ốp la', cals: 300, baseWeight: 150, unit: 'g', tags: ['protein'] },
    { name: 'Phở gạo lứt bò tái', cals: 400, baseWeight: 400, unit: 'g', tags: ['protein'] },
    { name: 'Smoothie chuối bơ đậu phộng', cals: 380, baseWeight: 300, unit: 'ml' },
    { name: 'Bún gạo lứt chả cá', cals: 350, baseWeight: 400, unit: 'g', tags: ['protein'] },
    { name: 'Overnight Oats dâu tây', cals: 350, baseWeight: 250, unit: 'g' },
    { name: 'Pancake chuối yến mạch', cals: 320, baseWeight: 200, unit: 'g' },
    { name: 'Smoothie Bowl xanh', cals: 280, baseWeight: 300, unit: 'ml' },
    { name: 'Trứng chần & Bánh mì đen', cals: 310, baseWeight: 180, unit: 'g', tags: ['protein'] },
    { name: 'Pudding hạt chia xoài', cals: 250, baseWeight: 200, unit: 'g' },
    { name: 'Bánh mì đen phết bơ tôm', cals: 380, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Sữa chua Hy Lạp mix hạt', cals: 220, baseWeight: 150, unit: 'g', tags: ['protein'] },
    { name: 'Khoai lang tím luộc & Trứng', cals: 280, baseWeight: 200, unit: 'g', tags: ['protein'] },
    { name: 'Omelet rau củ', cals: 260, baseWeight: 150, unit: 'g', tags: ['protein'] },
    { name: 'Granola ngũ cốc & Sữa tươi', cals: 340, baseWeight: 250, unit: 'ml' },
  ],
  Chính: [ // Trưa, Tối
    { name: 'Ức gà áp chảo + Khoai lang', cals: 450, baseWeight: 250, unit: 'g', tags: ['protein'] },
    { name: 'Cá hồi nướng + Măng tây', cals: 500, baseWeight: 250, unit: 'g', tags: ['protein'] },
    { name: 'Đậu hũ sốt nấm + Cơm gạo lứt', cals: 400, baseWeight: 300, unit: 'g' },
    { name: 'Bò lúc lắc rau củ', cals: 550, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Tôm ram mặn ngọt + Bông cải', cals: 420, baseWeight: 250, unit: 'g' },
    { name: 'Salad gà áp chảo dầu giấm', cals: 350, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Miến xào ức gà nấm mèo', cals: 410, baseWeight: 350, unit: 'g', tags: ['protein'] },
    { name: 'Ức gà áp chảo sốt cam', cals: 420, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Salad cá hồi', cals: 450, baseWeight: 250, unit: 'g', tags: ['protein'] },
    { name: 'Bún gạo lứt trộn bò', cals: 480, baseWeight: 400, unit: 'g', tags: ['protein'] },
    { name: 'Cơm gạo lứt cá thu nướng', cals: 520, baseWeight: 350, unit: 'g', tags: ['protein'] },
    { name: 'Poke Bowl tôm tươi', cals: 460, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Đậu hũ sốt cà chua & Nấm', cals: 380, baseWeight: 350, unit: 'g' },
    { name: 'Salad gà nướng sốt mè rang', cals: 400, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Mì Ý nguyên cám sốt bò bằm', cals: 550, baseWeight: 400, unit: 'g', tags: ['protein'] },
    { name: 'Thăn lợn áp chảo lá mác mật', cals: 440, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Chả tôm bọc sả nướng', cals: 410, baseWeight: 250, unit: 'g', tags: ['protein'] },
    { name: 'Cá chẽm hấp xì dầu', cals: 390, baseWeight: 350, unit: 'g', tags: ['protein'] },
    { name: 'Soup súp lơ trắng & Gà', cals: 320, baseWeight: 400, unit: 'ml', tags: ['protein'] },
    { name: 'Canh rong biển đậu hũ', cals: 250, baseWeight: 350, unit: 'ml' },
    { name: 'Salad ức gà táo xanh', cals: 350, baseWeight: 300, unit: 'g', tags: ['protein'] },
    { name: 'Măng tây cuộn thịt bò', cals: 420, baseWeight: 250, unit: 'g', tags: ['protein'] },
    { name: 'Miến đậu xanh trộn hải sản', cals: 450, baseWeight: 400, unit: 'g', tags: ['protein'] },
    { name: 'Gỏi cuốn ngũ sắc', cals: 380, baseWeight: 300, unit: 'g' },
    { name: 'Nấm kho tiêu xanh', cals: 280, baseWeight: 200, unit: 'g' },
    { name: 'Bí ngòi xào tôm nõn', cals: 340, baseWeight: 250, unit: 'g', tags: ['protein'] },
    { name: 'Cá hồi nướng giấy bạc', cals: 480, baseWeight: 250, unit: 'g', tags: ['protein'] },
  ],
  Phụ: [
    { name: 'Sữa chua Hy Lạp', cals: 150, baseWeight: 150, unit: 'g', tags: ['protein'] },
    { name: 'Hạnh nhân', cals: 100, baseWeight: 20, unit: 'g' },
    { name: 'Táo xanh/đỏ', cals: 60, baseWeight: 150, unit: 'g' },
    { name: 'Trứng gà luộc', cals: 70, baseWeight: 50, unit: 'g', tags: ['protein'] },
    { name: 'Táo tây phết bơ đậu phộng', cals: 180, baseWeight: 200, unit: 'g' },
    { name: 'Hạt điều & Hạnh nhân rang', cals: 150, baseWeight: 30, unit: 'g' },
    { name: 'Thanh năng lượng (Energy Bar)', cals: 200, baseWeight: 50, unit: 'g' },
    { name: 'Trứng vịt lộn luộc', cals: 180, baseWeight: 70, unit: 'g', tags: ['protein'] },
    { name: 'Đậu nành Edamame luộc', cals: 120, baseWeight: 100, unit: 'g' },
    { name: 'Sinh tố bơ chuối ít ngọt', cals: 250, baseWeight: 250, unit: 'ml' },
    { name: 'Bánh quy yến mạch cacao', cals: 180, baseWeight: 50, unit: 'g' },
    { name: 'Trái cây musli', cals: 220, baseWeight: 200, unit: 'g' },
    { name: 'Khoai tây chiên nồi chiên không dầu', cals: 150, baseWeight: 100, unit: 'g' },
    { name: 'Rau củ luộc chấm kho quẹt Eat Clean', cals: 120, baseWeight: 200, unit: 'g' },
    { name: 'Sữa hạt sen tự làm', cals: 100, baseWeight: 200, unit: 'ml' },
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
                      <div className="meal-main-info">
                        <strong>{meal.name}</strong>
                        <div className="meal-specs">
                          <span className="spec-cal">{meal.adjustedCals} kcal</span>
                          <span className="spec-weight">Định lượng: <strong>{meal.adjustedWeight}{meal.unit}</strong></span>
                        </div>
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
