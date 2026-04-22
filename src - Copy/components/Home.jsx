import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const STATS = [
  { value: '10K+', label: 'Người dùng', icon: '👥' },
  { value: '200+', label: 'Thực đơn', icon: '🍽️' },
  { value: '500+', label: 'Món ăn', icon: '🥗' },
  { value: '100%', label: 'Miễn phí', icon: '💚' },
];

const FEATURES = [
  {
    icon: '📖',
    title: 'Cẩm Nang Eat Clean',
    desc: 'Kho kiến thức dinh dưỡng toàn diện: nguyên tắc Eat Clean, nhóm thực phẩm lành mạnh và hướng dẫn lập kế hoạch ăn uống khoa học.',
    color: '#2563EB',
    bg: '#EFF6FF',
    route: '/handbook',
  },
  {
    icon: '🍽️',
    title: 'Gợi Ý Thực Đơn',
    desc: 'AI tự động thiết kế thực đơn cân bằng dinh dưỡng dựa trên chỉ số TDEE, mục tiêu giảm cân hay tăng cơ của riêng bạn.',
    color: '#775537',
    bg: '#FDF6F0',
    route: '/menu',
  },
  {
    icon: '🔬',
    title: 'Phân Tích Calo',
    desc: 'Tra cứu và phân tích chi tiết Macro (Đạm · Tinh bột · Béo) của hơn 500 món ăn Việt Nam và quốc tế theo từng khẩu phần.',
    color: '#DC2626',
    bg: '#FFF5F5',
    route: '/calories',
  },
  {
    icon: '👥',
    title: 'Cộng Đồng',
    desc: 'Chia sẻ bữa ăn, đăng bài viết, bình luận và truyền cảm hứng cùng hàng nghìn người cùng hành trình sống khỏe.',
    color: '#7C3AED',
    bg: '#F5F3FF',
    route: '/community',
  },
  {
    icon: '🏋️',
    title: 'Nhật Ký Cá Nhân',
    desc: 'Theo dõi cân nặng, ghi nhật ký ăn uống mỗi ngày và quản lý mục tiêu sức khỏe cá nhân một cách khoa học và có hệ thống.',
    color: '#059669',
    bg: '#ECFDF5',
    route: '/account',
  },
  {
    icon: '💬',
    title: 'Liên Hệ & Hỗ Trợ',
    desc: 'Gặp vấn đề kỹ thuật hay cần tư vấn dinh dưỡng? Kết nối với đội ngũ FitMeal qua form hỗ trợ hoặc Discord Live Chat 24/7.',
    color: '#D97706',
    bg: '#FFFBEB',
    route: '/contact',
  },
];

const FLOATING_FOODS = ['🥑', '🥦', '🍎', '🥕', '🫐', '🍋', '🥝', '🌾', '🥗', '🍇'];

const Home = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(refs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    refs.current[id] = el;
    if (el) el.dataset.id = id;
  };

  return (
    <div className="home-container">

      {/* Floating Food Emojis */}
      <div className="floating-foods" aria-hidden="true">
        {FLOATING_FOODS.map((food, i) => (
          <span
            key={i}
            className="float-food"
            style={{
              left: `${(i * 10) + 2}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 4)}s`,
              fontSize: `${1.2 + (i % 3) * 0.4}rem`,
            }}
          >{food}</span>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-badge">🌿 Eat Clean · Sống Khỏe · Vóc Dáng Đẹp</div>

        <div className="hero-logo-wrap">
          <img src="/logo.png" alt="FitMeal Logo" className="hero-logo-img" />
          <h1 className="hero-brand">FitMeal</h1>
        </div>

        <p className="hero-subtitle">
          Người bạn đồng hành tận tâm trên hành trình chăm sóc sức khỏe.<br />
          <span className="hero-highlight">Cá nhân hóa · Khoa học · Dễ thực hiện</span>
        </p>

        <div className="hero-cta-group">
          <button className="btn-hero-primary" onClick={() => document.getElementById('intro-fitmeal')?.scrollIntoView({ behavior: 'smooth' })}>
            Khám phá ngay ✨
          </button>
          <button className="btn-hero-secondary" onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Tính năng 🚀
          </button>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual">
          <div className="hero-plate">
            <span className="plate-emoji">🥗</span>
            <div className="plate-ring ring-1"></div>
            <div className="plate-ring ring-2"></div>
            <div className="plate-ring ring-3"></div>
          </div>
          <div className="hero-card-float card-float-1">
            <span>🔥</span> <span>320 kcal</span>
          </div>
          <div className="hero-card-float card-float-2">
            <span>💪</span> <span>28g Protein</span>
          </div>
          <div className="hero-card-float card-float-3">
            <span>✅</span> <span>Đạt mục tiêu!</span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section" ref={setRef('stats')}>
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`stat-item ${visible['stats'] ? 'fade-in-up' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="stat-icon">{s.icon}</span>
            <strong className="stat-value">{s.value}</strong>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section id="features-section" className="features-section">
        <div className="section-header" ref={setRef('feat-title')}>
          <span className="section-tag">Tính năng nổi bật</span>
          <h2 className={`section-title ${visible['feat-title'] ? 'fade-in-up' : ''}`}>
            Mọi thứ bạn cần để <span className="text-primary">sống khỏe</span>
          </h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feature-card ${visible['feat-title'] ? 'fade-in-up' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s`, '--card-color': f.color, '--card-bg': f.bg }}
              onClick={() => navigate(f.route)}
            >
              <div className="feature-icon-wrap" style={{ background: f.bg }}>
                <span className="feature-icon">{f.icon}</span>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <div className="feature-arrow" style={{ color: f.color }}>Khám phá →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT & EAT CLEAN ── */}
      <div className="details-container">
        <section id="intro-fitmeal" className="detail-section card" ref={setRef('about')}>
          <div className={`detail-inner ${visible['about'] ? 'fade-in-up' : ''}`}>
            <div className="detail-text">
              <span className="section-tag">Về chúng tôi</span>
              <h2>Giới thiệu về FitMeal</h2>
              <p>
                FitMeal không chỉ là một ứng dụng tính toán calo, mà là người bạn đồng hành tận tâm trên hành trình chăm sóc sức khỏe của bạn.
                Chúng tôi tin rằng việc ăn uống lành mạnh không nên là một gánh nặng, mà là một niềm vui và sự tự thưởng cho bản thân.
              </p>
              <p>
                Đội ngũ FitMeal luôn nỗ lực không ngừng để cung cấp công cụ hỗ trợ chuẩn xác nhất, từ tính toán TDEE cá nhân đến gợi ý thực đơn đa dạng, ngon miệng và dễ thực hiện.
              </p>
            </div>
            <div className="detail-visual">
              <div className="about-emoji-cloud">
                <span className="cloud-item" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>🥗</span>
                <span className="cloud-item" style={{ top: '60%', left: '5%', animationDelay: '0.5s' }}>🍎</span>
                <span className="cloud-item" style={{ top: '20%', right: '10%', animationDelay: '1s' }}>💪</span>
                <span className="cloud-item" style={{ top: '70%', right: '15%', animationDelay: '1.5s' }}>🏃</span>
                <span className="cloud-item" style={{ top: '45%', left: '50%', animationDelay: '0.8s', fontSize: '3rem' }}>🌿</span>
              </div>
            </div>
          </div>
        </section>

        <section id="intro-eatclean" className="detail-section card" ref={setRef('eatclean')}>
          <div className={`detail-inner reverse ${visible['eatclean'] ? 'fade-in-up' : ''}`}>
            <div className="detail-text">
              <span className="section-tag">Triết lý</span>
              <h2>Eat Clean là gì?</h2>
              <p>
                Eat Clean — "Ăn Sạch" không phải là một chế độ ăn kiêng hà khắc, mà là một triết lý dinh dưỡng hiện đại.
                Nó tập trung vào việc ưu tiên thực phẩm ở dạng nguyên bản nhất, hạn chế tối đa các loại thực phẩm đã qua chế biến sẵn.
              </p>
              <div className="tips-box">
                <h4>⚡ Nguyên tắc cốt lõi</h4>
                <ul>
                  <li>🌱 Ưu tiên thực phẩm tươi sống, tự nhiên.</li>
                  <li>🚫 Giảm thiểu chất béo bão hòa và đường bổ sung.</li>
                  <li>⏰ Chia nhỏ bữa ăn để cung cấp năng lượng ổn định.</li>
                  <li>💧 Uống đủ nước và lắng nghe cơ thể.</li>
                </ul>
              </div>
            </div>
            <div className="detail-visual eatclean-visual">
              <div className="food-grid-visual">
                {['🥑', '🥦', '🍋', '🫐', '🥕', '🌾', '🍎', '🥝', '🥗'].map((f, i) => (
                  <span key={i} className="food-cell" style={{ animationDelay: `${i * 0.15}s` }}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="intro-benefits" className="detail-section benefits-section-new" ref={setRef('benefits')}>
          <div className="section-header">
            <span className="section-tag">Lợi ích</span>
            <h2 className={`section-title ${visible['benefits'] ? 'fade-in-up' : ''}`}>
              Tại sao chọn <span className="text-primary">FitMeal?</span>
            </h2>
          </div>
          <div className={`benefits-grid-new ${visible['benefits'] ? 'fade-in-up' : ''}`}>
            {[
              { icon: '🎯', title: 'Cá nhân hóa tuyệt đối', desc: 'Mọi gợi ý đều dựa trên chỉ số cơ thể thực tế (TDEE) của bạn.', color: '#775537' },
              { icon: '⏱️', title: 'Tiết kiệm thời gian', desc: 'Không còn đau đầu "Hôm nay ăn gì?" với kho thực đơn phong phú.', color: '#4ECDC4' },
              { icon: '📈', title: 'Theo dõi dễ dàng', desc: 'Ghi nhật ký ăn uống và theo dõi cân nặng chỉ vài thao tác.', color: '#FF6B6B' },
              { icon: '🤝', title: 'Cộng đồng tích cực', desc: 'Kết nối với những người cùng mục tiêu, chia sẻ kinh nghiệm và động lực.', color: '#A855F7' },
            ].map((b, i) => (
              <div key={i} className="benefit-card-new" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <div className="benefit-icon-new" style={{ background: b.color + '20', color: b.color }}>{b.icon}</div>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner" ref={setRef('cta')}>
        <div className={`cta-content ${visible['cta'] ? 'fade-in-up' : ''}`}>
          <h2>Sẵn sàng bắt đầu hành trình?</h2>
          <p>Hàng nghìn người Việt đã thay đổi lối sống với FitMeal. Đến lượt bạn.</p>
          <div className="cta-foods">
            {['🥗', '🍎', '💪', '🌿', '🔥'].map((f, i) => (
              <span key={i} className="cta-food-bouncing" style={{ animationDelay: `${i * 0.2}s` }}>{f}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
