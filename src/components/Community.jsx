import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Image as ImageIcon, X, Send, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '../supabase';
import './Community.css';

const MOCK_POSTS = [
  {
    id: 1,
    user: 'Anh Thư',
    avatar: 'https://i.pravatar.cc/150?u=Anh Thu',
    time: '2 giờ trước',
    content: 'Mọi người có thể cho mình nhận xét về thực đơn hôm nay được không ạ?',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
    likes: 10,
    comments: [
      { id: 1, user: 'Minh', text: 'Nhìn ngon đấy bạn ơi!' },
      { id: 2, user: 'Hoa', text: 'Thực đơn này rất phù hợp với nhân viên văn phòng như tôi. Cảm ơn bạn đã chia sẻ thực đơn này.' },
      { id: 3, user: 'Bình', text: 'Bạn có thể up thêm nhiều thực đơn khác nhau trong tuần được không. Mình rất thích những bài đăng của bạn.' }
    ]
  },
  {
    id: 2,
    user: 'Linh Giang',
    avatar: 'https://i.pravatar.cc/150?u=Linh Giang',
    time: '5 giờ trước',
    content: 'Đây là buổi tối hôm nay của mình, mọi người thấy sao về món cơm ức gà xào này ạ?',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60',
    likes: 5,
    comments: [
      { id: 1, user: 'Tuấn', text: 'Bạn không nên ăn quá nhiều tinh bột vào buổi tối nhé.' },
      { id: 2, user: 'Hà', text: 'Món ức gà này bạn nấu như nào vậy?' }
    ]
  },
  {
    id: 3,
    user: 'Quỳnh Anh',
    avatar: 'https://i.pravatar.cc/150?u=Quynh Anh',
    time: '1 ngày trước',
    content: 'Mọi người cho em xin nhận xét món nui xào rau củ này với ạ, em cảm ơn!',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=60',
    likes: 12,
    comments: [
      { id: 1, user: 'Mai', text: 'Bạn có thể chỉ mình chế biến món này được không. Mình đã theo dõi những bài đăng của bạn từ rất lâu và thấy những món bạn nấu rất bắt mắt.' }
    ]
  }
];

const Community = () => {
  const [dbPosts, setDbPosts] = useState([]);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const fileInputRef = useRef(null);

  const isLoggedIn = localStorage.getItem('fitmeal_isLoggedIn') === 'true';
  const profileString = localStorage.getItem('fitmeal_profile');
  const profile = profileString ? JSON.parse(profileString) : { username: 'Người dùng FitMeal', avatar: null };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    let dbData = [];
    
    // Chỉ fetch từ DB nếu đã cấu hình
    if (supabase.isConfigured) {
      try {
        const { data: remoteData, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error) {
          dbData = remoteData || [];
        }
      } catch (e) {
        console.warn('Fetch from DB failed, using local only');
      }
    }

    const localPosts = JSON.parse(localStorage.getItem('fitmeal_local_posts') || '[]');
    
    // Gộp 3 nguồn: DB + Local + MOCK
    setPosts([...dbData, ...localPosts, ...MOCK_POSTS]);
    setLoading(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ảnh quá lớn, vui lòng chọn ảnh < 2MB');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveLocalPost = (newPost) => {
    const localPosts = JSON.parse(localStorage.getItem('fitmeal_local_posts') || '[]');
    const updatedLocal = [{ ...newPost, id: 'local-' + Date.now(), isLocal: true }, ...localPosts];
    localStorage.setItem('fitmeal_local_posts', JSON.stringify(updatedLocal));
  };

  const handlePostSubmit = async () => {
    if (!newPostContent.trim() && !selectedFile) {
      alert('Vui lòng nhập nội dung hoặc chọn ảnh!');
      return;
    }

    setIsSubmitting(true);
    let uploadedImageUrl = imagePreview; 

    try {
      // Chỉ thử Supabase nếu đã cấu hình và có session
      if (supabase.isConfigured) {
        const { data: authData } = await supabase.auth.getSession();
        const userId = authData.session?.user?.id;

        if (userId) {
          if (selectedFile) {
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
            const filePath = `posts/${fileName}`;
            const { error: uploadError } = await supabase.storage.from('community_images').upload(filePath, selectedFile);
            if (!uploadError) {
              const { data: urlData } = supabase.storage.from('community_images').getPublicUrl(filePath);
              uploadedImageUrl = urlData.publicUrl;
            }
          }

          const { error: postError } = await supabase.from('posts').insert([{
            user_id: userId,
            content: newPostContent,
            image_url: uploadedImageUrl,
            author_name: profile.username,
            author_avatar: profile.avatar
          }]);

          if (postError) throw postError;
          setNewPostContent('');
          setSelectedFile(null);
          setImagePreview(null);
          return fetchPosts();
        }
      }
      
      // Nếu không có Supabase hoặc chưa Login Supabase thực tế -> Dùng Local
      throw new Error('Use local');
    } catch (error) {
      const newLocalPost = {
        author_name: profile.username,
        author_avatar: profile.avatar,
        content: newPostContent,
        image_url: imagePreview, 
        created_at: new Date().toISOString(),
        likes: 0,
        comments: []
      };
      saveLocalPost(newLocalPost);
    } finally {
      setNewPostContent('');
      setSelectedFile(null);
      setImagePreview(null);
      fetchPosts();
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      if (postToDelete.isLocal) {
        // Xóa khỏi localStorage cho các bài viết cục bộ
        const localPosts = JSON.parse(localStorage.getItem('fitmeal_local_posts') || '[]');
        const filtered = localPosts.filter(p => p.id !== postToDelete.id);
        localStorage.setItem('fitmeal_local_posts', JSON.stringify(filtered));
      } else {
        // Thử xóa từ Supabase
        const { error } = await supabase
          .from('posts')
          .delete()
          .eq('id', postToDelete.id);
        
        if (error) {
          // Xử lý báo lỗi nhẹ nhàng nếu chưa có bảng
          if (!supabase.isConfigured || error.message.includes('does not exist')) {
            alert('Lưu ý: Database chưa được thiết lập. Hãy thiết lập trong Supabase để tính năng Xóa hoạt động.');
            return;
          }
          throw error;
        }
      }
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error.message);
      alert('Không thể xóa bài viết: ' + error.message);
    } finally {
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const toggleLike = (postId) => {
    // Tạm thời giữ logic UI like cho đến khi có bảng likes thực tế
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, isLiked: !post.isLiked, likes: (post.likes || 0) + (post.isLiked ? -1 : 1) };
      }
      return post;
    }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const submitComment = (e, postId) => {
    e.preventDefault();
    // Tương tự, logic comment sẽ cần bảng database thực tế để bền vững
    const text = commentInputs[postId];
    if (!text || text.trim() === '') return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          user: profile.username,
          avatar: profile.avatar,
          text: text
        };
        const oldComments = post.comments || [];
        return { ...post, comments: [...oldComments, newComment] };
      }
      return post;
    }));
    
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="community-container">
      {/* Floating stickers */}
      <div className="tab-stickers" aria-hidden="true">
        {['👥','💬','❤️','✨','🙌','🔥','👏','🌟'].map((s,i) => (
          <span key={i} className="tab-sticker" style={{
            left: `${8 + i*12}%`,
            animationDelay: `${i*0.6}s`,
            animationDuration: `${5+i%3}s`,
            fontSize: `${1.1+(i%3)*0.35}rem`
          }}>{s}</span>
        ))}
      </div>

      {/* Hero banner */}
      <div className="tab-hero community-hero" style={{background: 'linear-gradient(135deg, rgba(119,85,55,0.06), rgba(124,58,237,0.08))'}}>
        <div className="tab-hero-content">
          <span className="tab-hero-tag" style={{color: '#7c3aed'}}>Kết nối</span>
          <h1 className="page-title">Cộng Đồng Chăm Sóc Sức Khỏe</h1>
          <p>Chia sẻ hành trình, nhận lời khuyên và truyền cảm hứng cùng hàng ngàn thành viên trong gia đình FitMeal.</p>
        </div>
        <div className="tab-hero-emoji">🙌</div>
      </div>

      <div className="feed-header">

        <div className="create-post card">
          {isLoggedIn ? (
            <>
              <div className="create-post-input">
                <img src={profile.avatar || 'https://via.placeholder.com/150'} alt="My avatar" className="post-avatar" />
                <textarea 
                  placeholder="Chia sẻ bữa ăn eat clean của bạn..." 
                  className="input-field mb-0 post-textarea"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>

              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="post-image-preview" />
                  <button className="remove-image-btn" onClick={() => { setSelectedFile(null); setImagePreview(null); }}>
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="create-post-actions">
                <input 
                  type="file" 
                  accept="image/*" 
                  hidden 
                  ref={fileInputRef} 
                  onChange={handleFileSelect}
                />
                <button className="btn-action" onClick={() => fileInputRef.current.click()}>
                  <ImageIcon size={18} /> Thêm ảnh
                </button>
                <button className="btn-action"># Hashtag</button>
                <button 
                  className="btn-primary post-submit-btn" 
                  onClick={handlePostSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  <span>{isSubmitting ? 'Đang đăng...' : 'Đăng bài'}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-3 text-muted">Vui lòng đăng nhập hoặc đăng ký ở tab Tài khoản để đăng bài.</div>
          )}
        </div>
      </div>

      <div className="post-feed">
        {loading ? (
          <div className="loading-state text-center py-5">
            <Loader2 className="animate-spin text-primary mx-auto" size={40} />
            <p className="mt-2 text-muted">Đang tải bảng tin cộng đồng...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state text-center py-5 card">
            <p className="text-muted">Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-card card">
              <div className="post-header">
                <img 
                  src={(post.author_avatar || post.avatar) || 'https://via.placeholder.com/150'} 
                  alt={post.author_name || post.user} 
                  className="post-avatar" 
                />
                <div className="post-meta">
                  <h4>{post.author_name || post.user}</h4>
                  <span>{post.created_at ? new Date(post.created_at).toLocaleString('vi-VN') : (post.time || 'Vừa xong')}</span>
                </div>
                {(isLoggedIn && post.author_name === profile.username) && (
                  <button className="delete-post-btn ml-auto" onClick={() => handleDeletePost(post)}>
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              
              <p className="post-content">{post.content}</p>
              
              {(post.image_url || post.image) && (
                <img src={post.image_url || post.image} alt="Post image" className="post-image" />
              )}
              
              <div className="post-actions">
                <button 
                  className={`action-btn ${post.isLiked ? 'liked' : ''}`} 
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart fill={post.isLiked ? 'currentColor' : 'none'} size={20} />
                  <span>{post.likes || 0} Yêu thích</span>
                </button>
                <button className="action-btn">
                  <MessageCircle size={20} />
                  <span>{(post.comments?.length) || 0} Bình luận</span>
                </button>
                <button className="action-btn">
                  <Share2 size={20} />
                  <span>Chia sẻ</span>
                </button>
                <button className="action-btn ml-auto">
                  <Bookmark size={20} />
                </button>
              </div>

              <div className="post-comments">
                {(post.comments || []).map((comment, index) => (
                  <div key={comment.id || index} className="comment-item" style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px'}}>
                    <img src={comment.avatar || `https://i.pravatar.cc/150?u=${comment.user}`} alt={comment.user} style={{width: 30, height: 30, borderRadius: '50%', objectFit: 'cover'}} />
                    <div style={{background: '#f1f1f1', padding: '8px 12px', borderRadius: '15px'}}>
                      <strong style={{color: 'var(--primary)', marginRight: 5}}>{comment.user}</strong>
                      <span>{comment.text}</span>
                    </div>
                  </div>
                ))}
                
                {isLoggedIn ? (
                  <form className="add-comment mt-3" style={{display: 'flex', gap: '10px'}} onSubmit={(e) => submitComment(e, post.id)}>
                    <img src={profile.avatar || 'https://via.placeholder.com/150'} alt={profile.username} style={{width: 30, height: 30, borderRadius: '50%', objectFit: 'cover'}} />
                    <input 
                      type="text" 
                      placeholder="Viết bình luận..." 
                      className="input-field mb-0" 
                      style={{flex: 1, borderRadius: '20px', padding: '8px 15px'}}
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    />
                    <button type="submit" style={{display:'none'}}>Gửi</button>
                  </form>
                ) : (
                  <div className="text-center mt-3 text-muted" style={{fontSize: '0.9rem', fontStyle: 'italic', padding: '10px', background: '#f9f9f9', borderRadius: '8px'}}>Bạn cần đăng nhập hoặc đăng ký để bình luận.</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-card animate-zoom-in">
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc muốn xoá bài viết này không?</p>
            <div className="modal-footer-actions">
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>Không</button>
              <button className="btn-danger" onClick={confirmDelete}>Có, xóa bài</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
