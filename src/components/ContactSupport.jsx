import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, ChevronDown, ChevronUp, AlertTriangle, ShieldAlert, LifeBuoy, ExternalLink } from 'lucide-react';
import './ContactSupport.css';

const FAQS = [
  {
    q: 'FitMeal tính toán lượng calo như thế nào?',
    a: 'FitMeal sử dụng công thức Mifflin-St Jeor để tính toán BMR (Basal Metabolic Rate), sau đó nhân với Hệ số vận động (TDEE) để đưa ra mức năng lượng duy trì. Cuối cùng, tùy theo mục tiêu (giảm cân hay tăng cơ) hệ thống sẽ điều chỉnh tăng giảm lượng calo cho phù hợp.'
  },
  {
    q: 'Làm thế nào để thay đổi mục tiêu cá nhân đã thiết lập?',
    a: 'Bạn có thể truy cập vào Tab "Tài khoản" -> Phần "Hồ sơ cá nhân" và chọn chức năng chỉnh sửa. Ở đó bạn có thể chọn lại mục tiêu Giảm cân, Giữ dáng, hoặc Tăng cơ tuỳ ý.'
  },
  {
    q: 'Thực phẩm không có trong Tìm kiếm Phân tích calo thì sao?',
    a: 'Chúng tôi liên tục cập nhật thêm cơ sở dữ liệu (Local Data). Nếu ứng dụng không tìm thấy món ăn, bạn có thể tự tra cứu dinh dưỡng ngoài mạng và nhập trực tiếp khối lượng vào ứng dụng để tính.'
  }
];

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Tư vấn dinh dưỡng',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Giả lập gửi form
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', topic: 'Tư vấn dinh dưỡng', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="contact-container">
      {/* Floating stickers */}
      <div className="tab-stickers" aria-hidden="true">
        {['🎧','💬','📩','📞','💡','🤝','👋','✨'].map((s,i) => (
          <span key={i} className="tab-sticker" style={{
            left: `${8 + i*12}%`,
            animationDelay: `${i*0.6}s`,
            animationDuration: `${5+i%3}s`,
            fontSize: `${1.1+(i%3)*0.35}rem`
          }}>{s}</span>
        ))}
      </div>

      {/* Hero banner */}
      <div className="tab-hero contact-hero" style={{background: 'linear-gradient(135deg, rgba(119,85,55,0.06), rgba(217,119,6,0.1))'}}>
        <div className="tab-hero-content">
          <span className="tab-hero-tag" style={{color: '#d97706'}}>Hỗ trợ 24/7</span>
          <h1 className="page-title">Trợ Giúp & Liên Hệ</h1>
          <p>FitMeal luôn sẵn sàng lắng nghe và hỗ trợ bạn mọi lúc trên hành trình thiết lập thói quen ăn uống lành mạnh.</p>
        </div>
        <div className="tab-hero-emoji">🎧</div>
      </div>

      <div className="contact-layout">
        <div className="contact-left">
          <div className="card">
            <h3>Gửi yêu cầu hỗ trợ</h3>
            <p className="contact-subtitle">Chúng tôi sẽ phản hồi lại bạn trong vòng 24 giờ làm việc.</p>
            
            {success && <div className="alert-success">Gửi yêu cầu thành công! Chúng tôi sẽ sớm liên hệ lại.</div>}
            
            <form onSubmit={handleSubmit} className="contact-form mt-4">
              <div className="form-group">
                <label>Họ và tên</label>
                <input 
                  type="text" 
                  className="input-field" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ Email</label>
                <input 
                  type="email" 
                  className="input-field" 
                  required 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Chủ đề</label>
                <select 
                  className="input-field" 
                  value={formData.topic}
                  onChange={e => setFormData({...formData, topic: e.target.value})}
                >
                  <option value="Tư vấn dinh dưỡng">Tư vấn dinh dưỡng</option>
                  <option value="Hỗ trợ kỹ thuật ứng dụng">Hỗ trợ kỹ thuật ứng dụng</option>
                  <option value="Đóng góp ý kiến">Đóng góp ý kiến</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nội dung chi tiết</label>
                <textarea 
                  className="input-field" 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-100" disabled={loading}>
                {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-right">
          <div className="quick-actions-grid mt-0">
            <div className="card action-card text-center">
              <div className="action-icon"><Phone size={24} /></div>
              <h4>Hotline Hỗ Trợ</h4>
              <p>1900 123 456</p>
              <a href="tel:1900123456" className="btn-secondary w-100 mt-2 text-center" style={{display:'block',textDecoration:'none'}}>Gọi ngay</a>
            </div>
            
            <div className="card action-card text-center">
              <div className="action-icon"><Mail size={24} /></div>
              <h4>Email Hỗ Trợ</h4>
              <p>support@fitmeal.com</p>
              <a href="mailto:support@fitmeal.com" className="btn-secondary w-100 mt-2 text-center" style={{display:'block',textDecoration:'none'}}>Gửi email</a>
            </div>

            <div className="card discord-support-card full-width">
              <div className="discord-header">
                <div className="action-icon"><MessageSquare size={24} /></div>
                <div>
                  <h4>Hỗ trợ trực tuyến (Live Chat)</h4>
                  <p className="text-sm">Hệ thống Discord FitMeal</p>
                </div>
              </div>
              
              <div className="discord-body mt-3">
                <div className="discord-info-item">
                  <header>
                    <LifeBuoy size={16} />
                    <strong>Quy trình kết nối</strong>
                  </header>
                  <p>Sau khi truy cập vào máy chủ Discord, người dùng cần thực hiện xác minh tài khoản (Verify) để hiển thị đầy đủ các kênh hỗ trợ kỹ thuật.</p>
                </div>

                <div className="discord-info-item">
                  <header>
                    <ShieldAlert size={16} />
                    <strong>Chính sách bảo mật</strong>
                  </header>
                  <p>Tuyệt đối không cung cấp mật khẩu, số điện thoại hoặc thông tin cá nhân nhạy cảm trong kênh chat. Các yêu cầu quan trọng như khôi phục tài khoản phải được thực hiện qua hệ thống Discord Ticket.</p>
                </div>

                <div className="discord-info-item italic-note">
                  <header>
                    <AlertTriangle size={16} />
                    <strong>Xử lý sự cố</strong>
                  </header>
                  <p>Trong trường hợp liên kết không hoạt động, vui lòng tải lại trang (F5) hoặc kiểm tra lại Tab Liên hệ & Hỗ trợ trên thanh thực đơn chính.</p>
                </div>
              </div>

              <a 
                href="https://discord.gg/FWXja3zf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-discord w-100 mt-3"
              >
                <span>Kết nối Discord ngay</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          <div className="card mt-4">
            <h3 className="mb-4">Câu hỏi thường gặp (FAQ)</h3>
            <div className="faq-list">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <div 
                    className="faq-question" 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    {faq.q}
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {openFaq === idx && (
                     <div className="faq-answer">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
