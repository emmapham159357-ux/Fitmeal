import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Camera, Edit2, LogOut, Check, X, Trash2, Calendar, Utensils, Activity, AlertCircle, TrendingDown, Scale, ChevronRight, User, Lock, Mail } from 'lucide-react';
import './Account.css';

const EXERCISES_DB = [
  { name: 'Chạy bộ', kcalPerMin: 10.5, icon: '🏃' },
  { name: 'Đi bộ', kcalPerMin: 4.5, icon: '🚶' },
  { name: 'Nhảy dây', kcalPerMin: 12.0, icon: '🪢' },
  { name: 'Yoga', kcalPerMin: 3.2, icon: '🧘' },
  { name: 'Bơi lội', kcalPerMin: 9.0, icon: '🏊' },
  { name: 'Gym/Strength', kcalPerMin: 6.5, icon: '💪' },
  { name: 'Đạp xe', kcalPerMin: 8.0, icon: '🚴' }
];

const MEAL_TYPES = {
  breakfast: { label: 'Bữa Sáng', icon: '☀️', img: 'https://images.unsplash.com/photo-149485981460c-3c0a9c6a5d73?w=400' },
  lunch: { label: 'Bữa Trưa', icon: '⛅', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
  dinner: { label: 'Bữa Tối', icon: '🌙', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' }
};

const Account = () => {
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('fitmeal_isLoggedIn') === 'true');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authForm, setAuthForm] = useState({ email: '', password: '', username: '' });
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('fitmeal_profile');
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed && typeof parsed === 'object') {
        return {
          username: parsed.username || 'Người dùng FitMeal',
          avatar: parsed.avatar || 'https://i.pravatar.cc/150?u=fituser',
          weight: parsed.weight || 65,
          height: parsed.height || 170,
          age: parsed.age || 28,
          targetCals: parsed.targetCals || 1800,
          goal: parsed.goal || 'Giảm cân',
          weightHistory: Array.isArray(parsed.weightHistory) ? parsed.weightHistory : [
            { date: new Date().toISOString().split('T')[0], weight: parsed.weight || 65 }
          ]
        };
      }
    } catch (e) { console.error(e); }
    return {
      username: 'Người dùng FitMeal',
      avatar: 'https://i.pravatar.cc/150?u=fituser',
      weight: 65, height: 170, age: 28, targetCals: 1800, goal: 'Giảm cân',
      weightHistory: [{ date: new Date().toISOString().split('T')[0], weight: 65 }]
    };
  });

  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [journal, setJournal] = useState(() => {
    try {
      const saved = localStorage.getItem('fitmeal_journal');
      return saved ? JSON.parse(saved) : {};
    } catch (e) { return {}; }
  });
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exerciseForm, setExerciseForm] = useState({ name: 'Chạy bộ', duration: 30 });
  
  const dateScrollRef = useRef(null);
  const fileInputRef = useRef(null);

  const dates = useMemo(() => {
    const list = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      list.push(d.toISOString().split('T')[0]);
    }
    return list;
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('fitmeal_profile', JSON.stringify(profile));
      localStorage.setItem('fitmeal_journal', JSON.stringify(journal));
    }
  }, [profile, journal, isLoggedIn]);

  useEffect(() => {
    const sync = () => {
      const storedJournal = localStorage.getItem('fitmeal_journal');
      const storedProfile = localStorage.getItem('fitmeal_profile');
      if (storedJournal) setJournal(JSON.parse(storedJournal));
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(prev => JSON.stringify(prev) !== storedProfile ? parsedProfile : prev);
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('fitmeal_isLoggedIn');
    setAuthForm({ email: '', password: '', username: '' });
    setAuthMode('login');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authForm.email)) {
      setAuthError('Vui lòng nhập địa chỉ email hợp lệ (ví dụ: user@example.com)');
      return;
    }

    if (authForm.password.length < 6) {
      setAuthError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('fitmeal_users') || '[]');

    if (authMode === 'signup') {
      if (users.some(u => u.email.toLowerCase() === authForm.email.toLowerCase())) {
        setAuthError('Email này đã tồn tại. Vui lòng đăng nhập.');
        return;
      }
      const newUser = { email: authForm.email, password: authForm.password, username: authForm.username || 'Người dùng mới' };
      users.push(newUser);
      localStorage.setItem('fitmeal_users', JSON.stringify(users));
      setAuthSuccess('Đăng ký thành công! Hãy đăng nhập.');
      setTimeout(() => setAuthMode('login'), 1500);
    } else {
      const user = users.find(u => u.email.toLowerCase() === authForm.email.toLowerCase() && u.password === authForm.password);
      if (!user) {
        setAuthError('Email hoặc mật khẩu không đúng.');
        return;
      }
      setIsLoggedIn(true);
      localStorage.setItem('fitmeal_isLoggedIn', 'true');
      if (profile.username === 'Người dùng FitMeal') {
        setProfile(prev => ({...prev, username: user.username}));
      }
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("Dung lượng ảnh quá lớn (vui lòng chọn ảnh < 1MB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfile(prev => ({ ...prev, avatar: base64String }));
      setEditProfile(prev => ({ ...prev, avatar: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    const today = new Date().toISOString().split('T')[0];
    const newWeight = Number(editProfile.weight);
    let newHistory = Array.isArray(profile.weightHistory) ? [...profile.weightHistory] : [];
    const todayIdx = newHistory.findIndex(h => h.date === today);
    if (todayIdx > -1) newHistory[todayIdx].weight = newWeight;
    else newHistory.push({ date: today, weight: newWeight });
    newHistory = newHistory.sort((a,b) => new Date(a.date) - new Date(b.date)).slice(-30);
    setProfile({ ...editProfile, weightHistory: newHistory });
    setIsEditing(false);
  };

  const addExercise = () => {
    const exData = EXERCISES_DB.find(e => e.name === exerciseForm.name);
    const durationNum = Number(exerciseForm.duration) || 0;
    const kcal = Math.round((exData?.kcalPerMin || 0) * durationNum);
    const dayData = journal[selectedDate] || { meals: { breakfast: [], lunch: [], dinner: [] }, exercises: [] };
    const newEx = { id: Date.now(), name: exerciseForm.name, duration: durationNum, cal: kcal };
    setJournal({ ...journal, [selectedDate]: { ...dayData, exercises: [...(dayData.exercises || []), newEx] } });
    setShowExerciseModal(false);
  };

  const removeItem = (type, category, id) => {
    const dayData = journal[selectedDate];
    if (!dayData) return;
    if (type === 'exercise') {
      const filtered = (dayData.exercises || []).filter(e => e.id !== id);
      setJournal({ ...journal, [selectedDate]: { ...dayData, exercises: filtered } });
    } else {
      const filtered = (dayData.meals?.[category] || []).filter(m => m.id !== id);
      setJournal({ ...journal, [selectedDate]: { ...dayData, meals: { ...(dayData.meals || {}), [category]: filtered } } });
    }
  };

  const reminder = useMemo(() => {
    const history = profile.weightHistory || [];
    if (profile.goal !== 'Giảm cân' || history.length < 5) return null;
    const sorted = [...history].sort((a,b) => new Date(b.date) - new Date(a.date));
    if (sorted[0].weight >= sorted[4].weight) {
      return { type: 'warning', text: 'Cố lên bạn ơi! FitMeal thấy cân nặng hơi đứng yên một chút nè. Chúng mình cùng cố gắng nha! ❤️' };
    }
    return null;
  }, [profile.goal, profile.weightHistory]);

  const rawDayData = journal[selectedDate] || {};
  const currentDay = {
    meals: rawDayData.meals || { breakfast: [], lunch: [], dinner: [] },
    exercises: rawDayData.exercises || []
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-wrapper">
        <div className="card auth-card animate-fade-in">
          <div className="auth-header-icon">
            <div className="icon-circle"><User size={32} /></div>
          </div>
          <h2>{authMode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</h2>
          <p className="auth-subtitle">Chào mừng bạn đến với FitMeal</p>
          
          {authError && <div className="auth-alert error">{authError}</div>}
          {authSuccess && <div className="auth-alert success">{authSuccess}</div>}

          <form onSubmit={handleAuthSubmit} className="mt-4">
            {authMode === 'signup' && (
              <div className="form-group">
                <label>Tên hiển thị</label>
                <div className="input-wrap">
                  <User size={18} />
                  <input type="text" placeholder="Nhập tên của bạn" required value={authForm.username} onChange={e=>setAuthForm({...authForm, username: e.target.value})} />
                </div>
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrap">
                <Mail size={18} />
                <input type="email" placeholder="example@mail.com" required value={authForm.email} onChange={e=>setAuthForm({...authForm, email: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-wrap">
                <Lock size={18} />
                <input type="password" placeholder="••••••••" required value={authForm.password} onChange={e=>setAuthForm({...authForm, password: e.target.value})} />
              </div>
            </div>
            <button className="btn-primary w-100 mt-4">{authMode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</button>
          </form>
          
          <p className="auth-footer mt-4">
            {authMode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'} 
            <span onClick={() => {setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); setAuthSuccess('');}}>
              {authMode === 'login' ? ' Đăng ký ngay' : ' Đăng nhập'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container animate-fade-in">
      {/* Floating stickers */}
      <div className="tab-stickers" aria-hidden="true">
        {['👤','🏅','🎯','💪','📈','⭐','🔥','🏆'].map((s,i) => (
          <span key={i} className="tab-sticker" style={{
            left: `${8 + i*12}%`,
            animationDelay: `${i*0.6}s`,
            animationDuration: `${5+i%3}s`,
            fontSize: `${1.1+(i%3)*0.35}rem`
          }}>{s}</span>
        ))}
      </div>

      {/* Hero banner */}
      <div className="tab-hero account-hero" style={{background: 'linear-gradient(135deg, rgba(119,85,55,0.06), rgba(5,150,105,0.1))'}}>
        <div className="tab-hero-content">
          <span className="tab-hero-tag" style={{color: '#059669'}}>Cá nhân</span>
          <h1 className="page-title">Nhật Ký & Tiến Trình</h1>
          <p>Quản lý hồ sơ dinh dưỡng, theo dõi cân nặng và ghi lại chi tiết các bữa ăn, bài tập mỗi ngày để đạt mục tiêu nhanh nhất.</p>
        </div>
        <div className="tab-hero-emoji">🎯</div>
      </div>

      <div className="calendar-bar">
        <div className="calendar-scroll" ref={dateScrollRef}>
          {dates.map(dateStr => {
            const d = new Date(dateStr);
            const active = selectedDate === dateStr;
            return (
              <div key={dateStr} className={`date-pill ${active ? 'active' : ''}`} onClick={() => setSelectedDate(dateStr)}>
                <span className="pill-day">{d.toLocaleDateString('vi-VN', { weekday: 'short' })}</span>
                <span className="pill-num">{d.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="account-main-layout mt-4">
        <div className="left-side">
          <div className="card profile-card-new">
            <div className="profile-header">
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{display: 'none'}} 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              <div className="avatar-big" onClick={handleAvatarClick} title="Nhấn để đổi ảnh">
                <img src={profile.avatar} alt="avatar" />
                <div className="camera-overlay"><Camera size={20} /></div>
              </div>
              <div className="profile-titles">
                {isEditing ? <input className="input-field-clean" value={editProfile.username} onChange={e=>setEditProfile({...editProfile, username:e.target.value})} /> : <h2>{profile.username}</h2>}
              </div>
              <div className="profile-top-actions">
                <button className="btn-action-circle" onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}>
                  {isEditing ? <Check size={18}/> : <Edit2 size={18}/>}
                </button>
                <button className="btn-action-circle logout" onClick={handleLogout} title="Đăng xuất">
                  <LogOut size={18}/>
                </button>
              </div>
            </div>

            <div className="profile-metrics mt-4">
              <div className="metric-box">
                <label><Scale size={14}/> Cân nặng</label>
                {isEditing ? <input type="number" value={editProfile.weight} onChange={e=>setEditProfile({...editProfile, weight:e.target.value})} /> : <strong>{profile.weight}<span>kg</span></strong>}
              </div>
              <div className="metric-box">
                <label><TrendingDown size={14}/> Chiều cao</label>
                {isEditing ? <input type="number" value={editProfile.height} onChange={e=>setEditProfile({...editProfile, height:e.target.value})} /> : <strong>{profile.height}<span>cm</span></strong>}
              </div>
              <div className="metric-box">
                <label><Calendar size={14}/> Tuổi</label>
                {isEditing ? <input type="number" value={editProfile.age} onChange={e=>setEditProfile({...editProfile, age:e.target.value})} /> : <strong>{profile.age}</strong>}
              </div>
            </div>

            <div className="profile-goals mt-4">
              <div className="goal-field">
                <label>Mục tiêu Calo</label>
                {isEditing ? <input type="number" value={editProfile.targetCals} onChange={e=>setEditProfile({...editProfile, targetCals:e.target.value})} /> : <span>{profile.targetCals} kcal</span>}
              </div>
              <div className="goal-field">
                <label>Chế độ</label>
                {isEditing ? (
                  <select value={editProfile.goal} onChange={e=>setEditProfile({...editProfile, goal:e.target.value})}>
                    <option>Giảm cân</option><option>Giữ dáng</option><option>Tăng cơ</option>
                  </select>
                ) : <span>{profile.goal}</span>}
              </div>
            </div>
            {reminder && <div className="smart-reminder mt-4"><AlertCircle size={18}/><p>{reminder.text}</p></div>}
          </div>
        </div>

        <div className="right-side">
          <div className="journal-container-pro">
            <div className="journal-header mb-3">
              <h3>Nhật ký ngày {(() => { try { return new Date(selectedDate).toLocaleDateString('vi-VN'); } catch(e) { return selectedDate; } })()}</h3>
            </div>

            {Object.entries(MEAL_TYPES).map(([key, meta]) => (
              <div key={key} className="journal-strip card mb-3">
                <div className="strip-header">
                  <div className="strip-title">
                    <span className="strip-icon">{meta.icon}</span>
                    <div>
                      <h4>{meta.label}</h4>
                      <small>{currentDay.meals[key]?.reduce((s,m)=>s+m.cal, 0) || 0} kcal</small>
                    </div>
                  </div>
                </div>
                <div className="strip-content">
                  {(currentDay.meals?.[key] || []).map(item => (
                    <div key={item.id} className="journal-item-pro">
                      <div className="item-txt"><strong>{item.name}</strong></div>
                      <button className="btn-item-del" onClick={() => removeItem('meal', key, item.id)}><Trash2 size={16}/></button>
                    </div>
                  ))}
                  {(!currentDay.meals?.[key] || currentDay.meals[key].length === 0) && <p className="empty-msg">Chưa có dữ liệu</p>}
                </div>
              </div>
            ))}

            <div className="journal-strip card exercise-strip">
              <div className="strip-header">
                <div className="strip-title">
                  <span className="strip-icon">🏃</span>
                  <div><h4>Bài tập</h4><small>- {currentDay.exercises?.reduce((s,e)=>s+e.cal, 0) || 0} kcal</small></div>
                </div>
                <button className="btn-add-ex" onClick={() => setShowExerciseModal(true)}>+</button>
              </div>
              <div className="strip-content">
                {(currentDay.exercises || []).map(ex => (
                  <div key={ex.id} className="journal-item-pro">
                    <div className="item-txt"><strong>{ex.name}</strong><span>{ex.duration} phút - <span className="text-burn">{ex.cal} kcal</span></span></div>
                    <button className="btn-item-del" onClick={() => removeItem('exercise', null, ex.id)}><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>

              {showExerciseModal && (
                <div className="ex-modal shadow-lg">
                  <div className="modal-top"><h4>Luyện tập</h4><button onClick={() => setShowExerciseModal(false)}><X size={16}/></button></div>
                  <div className="modal-body">
                    <div className="ex-select-grid">
                      {EXERCISES_DB.map(ex => (
                        <div key={ex.name} className={`ex-option ${exerciseForm.name === ex.name ? 'active' : ''}`} onClick={() => setExerciseForm({...exerciseForm, name: ex.name})}>{ex.name}</div>
                      ))}
                    </div>
                    <input type="number" className="input-field mt-3" value={exerciseForm.duration} onChange={e=>setExerciseForm({...exerciseForm, duration: e.target.value})} placeholder="Phút" />
                    <button className="btn-primary w-100 mt-4" onClick={addExercise}>Thêm</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
