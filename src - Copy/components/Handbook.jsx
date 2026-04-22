import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './Handbook.css';

const articles = [
  {
    id: 1,
    title: 'Eat Clean cho người mới: hiểu đúng & bắt đầu đúng',
    summary: 'Tất cả những gì bạn cần biết trước khi bắt đầu',
    content: 'Eat Clean là cách ăn uống tập trung vào thực phẩm tự nhiên, ít chế biến nhằm cải thiện sức khỏe và kiểm soát cân nặng. Đối với người mới, không cần thay đổi quá đột ngột mà nên bắt đầu từ những bước đơn giản như giảm đồ chiên rán, tăng rau xanh và lựa chọn protein nạc như ức gà, trứng, cá. Một bữa ăn cơ bản nên có đủ protein, tinh bột tốt và chất béo lành mạnh. Khi duy trì đều đặn, cơ thể sẽ thích nghi và bạn sẽ thấy rõ sự thay đổi về năng lượng cũng như sức khỏe.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    title: '7 ngày Eat Clean: ăn gì cho đỡ nghĩ?',
    summary: 'Gợi ý thực đơn đơn giản để bạn dễ áp dụng mỗi ngày',
    content: 'Việc lên sẵn thực đơn giúp bạn tránh tình trạng "không biết ăn gì" khi mới bắt đầu. Một ngày có thể bắt đầu với yến mạch và trái cây, bữa trưa là ức gà + gạo lứt + rau, buổi tối là cá hấp và salad. Những ngày sau có thể thay đổi bằng thịt bò, trứng hoặc cá hồi để đa dạng dinh dưỡng. Ngoài ra, website Fitmeal có hỗ trợ gợi ý menu theo mức calo phù hợp, giúp bạn dễ dàng lựa chọn món ăn mà không cần tính toán quá nhiều, đảm bảo cân bằng và hiệu quả.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    title: 'Bắt đầu Eat Clean từ đâu?',
    summary: 'Bắt đầu như thế nào để không bị "ngợp"?',
    content: 'Thay đổi nhỏ: giảm đồ chiên rán, tăng rau xanh, thay cơm trắng bằng gạo lứt. Duy trì đều đặn để cơ thể thích nghi thay vì thay đổi toàn bộ ngay lập tức.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    title: 'Những sai lầm phổ biến khi Eat Clean',
    summary: 'Tránh những lỗi khiến Eat Clean kém hiệu quả',
    content: 'Một trong những sai lầm lớn nhất là nghĩ rằng ăn "healthy" thì không cần quan tâm lượng ăn. Thực tế, ăn quá ít khiến cơ thể thiếu năng lượng, còn ăn quá nhiều dù là thực phẩm tốt vẫn có thể tăng cân. Ngoài ra, việc cắt hoàn toàn tinh bột hoặc ăn thiếu protein cũng làm giảm hiệu quả rõ rệt. Eat Clean đúng cách là ăn cân bằng và phù hợp với nhu cầu cơ thể.',
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 5,
    title: 'Những thực phẩm "tưởng sạch mà không sạch"',
    summary: 'Đừng để bị đánh lừa bởi vẻ ngoài "healthy"',
    content: 'Không phải thực phẩm nào nhìn "healthy" cũng thực sự tốt. Một số loại như granola, nước ép đóng chai, sữa chua có đường hoặc các loại bánh "nguyên cám" đóng gói sẵn thường chứa khá nhiều đường và calo. Nếu không chú ý, bạn có thể ăn nhiều hơn mức cần thiết mà không nhận ra. Khi Eat Clean, bạn nên tập thói quen đọc bảng thành phần dinh dưỡng, ưu tiên sản phẩm ít đường, ít phụ gia và càng đơn giản càng tốt.',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 6,
    title: 'Meal Prep là gì?',
    summary: 'Giải pháp ăn uống lành mạnh khi không có nhiều thời gian',
    content: 'Meal Prep là cách chuẩn bị sẵn bữa ăn trong vài ngày để tiết kiệm thời gian và duy trì chế độ ăn uống lành mạnh.\n\n- Lên thực đơn trước: Xác định số ngày cần chuẩn bị (2-3 ngày hoặc cả tuần).\n- Mua nguyên liệu: Chọn thời điểm phù hợp (cuối tuần), ưu tiên chế biến ngay.\n- Sơ chế thực phẩm: Thịt, cá có thể cắt sẵn và tẩm ướp; rau củ phân loại.\n- Chia khẩu phần: Sau khi nấu, chia thức ăn thành từng phần vừa đủ cho mỗi bữa.\n- Bảo quản: Sắp xếp gọn trong tủ lạnh, ưu tiên dùng món đã chuẩn bị trước.',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 7,
    title: 'Bài Tập Thể Dục',
    summary: 'Tổng hợp các bài tập vận động giúp tối ưu hóa hiệu quả Eat Clean.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60',
    type: 'exercise',
    intro: 'Vận động là mảnh ghép còn lại để đạt được thân hình mơ ước. Dưới đây là các giáo trình được tuyển chọn dành riêng cho bạn.',
    sections: [
      {
        group: 'NHÓM GIẢM CÂN (Weight Loss)',
        description: 'Tập trung vào các bài tập Cardio và HIIT giúp đốt cháy Calo nhanh chóng, phù hợp để khởi động quá trình thay đổi vóc dáng.',
        videos: [
          { title: '20 Min Fat Burning HIIT Workout', id: '-hSma-BRzoo' },
          { title: '30 Min Intense HIIT Workout', id: '4nPKyvKmFi0' },
          { title: '12 Min Beginner HIIT Workout', id: 'T8o6ti9tbFA' }
        ]
      },
      {
        group: 'NHÓM GIẢM MỠ (Fat Burn)',
        description: 'Các bài tập cường độ cao kết hợp kháng lực, tập trung vào việc tiêu giảm mỡ thừa và tăng cường trao đổi chất sau khi tập.',
        videos: [
          { title: '20 Min Standing HIIT Fat Burn', id: 'BpIITVsh7WY' },
          { title: '30 Min HIIT With Weights', id: '23NzgeDI2i8' },
          { title: 'Full Body Dumbbell Workout', id: '5gauDZR78gc' }
        ]
      },
      {
        group: 'NHÓM TĂNG CƠ (Muscle Gain)',
        description: 'Chuyên sâu về Strength Training để xây dựng các nhóm cơ, giúp cơ thể săn chắc và cải thiện đường nét vóc dáng.',
        videos: [
          { title: '30 Minute Full Body Dumbbell Strength Workout (Muscle Building)', id: 'KJ0FX5B0t6E' },
          { title: '30 Minute Full Body Strength Training with Dumbbells', id: '0hYDDsRjwks' },
          { title: '30 Minute Traditional Full Body Strength Training Workout', id: '0MfKBouPSME' }
        ]
      }
    ]
  }
];

const Handbook = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (selectedArticle) {
    return (
      <div className="article-detail">
        <button className="btn-back" onClick={() => setSelectedArticle(null)}>
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
        <div className="card mt-4">
          <img src={selectedArticle.image} alt={selectedArticle.title} className="article-hero-img" />
          <h2 className="article-title">{selectedArticle.title}</h2>
          <p className="article-summary">{selectedArticle.summary}</p>
          
          <div className="article-content">
            {selectedArticle.type === 'exercise' ? (
              <div className="exercise-content">
                <p className="intro-text mb-4" style={{fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 500}}>{selectedArticle.intro}</p>
                {selectedArticle.sections.map((section, sIdx) => (
                  <div key={sIdx} className="exercise-group mb-5">
                    <h3 className="group-title" style={{color: 'var(--primary)', borderBottom: '2px solid var(--secondary)', paddingBottom: '8px', marginBottom: '12px'}}>{section.group}</h3>
                    <p className="group-desc text-muted mb-4">{section.description}</p>
                    <div className="video-grid">
                      {section.videos.map((v, vIdx) => (
                        <a 
                          key={vIdx} 
                          href={`https://www.youtube.com/watch?v=${v.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="video-card"
                        >
                          <div className="video-thumb-wrap">
                            <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} />
                            <div className="play-overlay">
                              <div className="play-icon">▶</div>
                            </div>
                          </div>
                          <div className="video-info p-3">
                            <h4 className="video-title">{v.title}</h4>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              selectedArticle.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="handbook-container">
      {/* Floating stickers */}
      <div className="tab-stickers" aria-hidden="true">
        {['📖','🥦','🌿','🍎','💪','🥗','✨','🌱'].map((s,i) => (
          <span key={i} className="tab-sticker" style={{
            left: `${8 + i*12}%`,
            animationDelay: `${i*0.6}s`,
            animationDuration: `${5+i%3}s`,
            fontSize: `${1.1+(i%3)*0.35}rem`
          }}>{s}</span>
        ))}
      </div>

      {/* Hero banner */}
      <div className="tab-hero handbook-hero">
        <div className="tab-hero-content">
          <span className="tab-hero-tag">Kiến Thức</span>
          <h1 className="page-title">Cẩm Nang Eat Clean</h1>
          <p>Khám phá lối sống lành mạnh qua các bài viết, video và hướng dẫn khoa học</p>
        </div>
        <div className="tab-hero-emoji">📚</div>
      </div>

      <div className="article-grid">
        {articles.map((article) => (
          <div key={article.id} className="article-card" onClick={() => setSelectedArticle(article)}>
            <img src={article.image} alt={article.title} className="article-img" />
            <div className="article-card-content">
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Handbook;
