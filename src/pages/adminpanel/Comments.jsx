import React, { useState, useEffect } from 'react';
import { 
  FaCheck, 
  FaTimes, 
  FaReply, 
  FaEye, 
  FaTrash,
  FaComment,
  FaClock
} from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import supabase from '@/api/supabase';

export default function CommentsList() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const queryClient = useQueryClient();

  // دریافت کامنت‌ها از سوپابیس
  const { data: comments = [], isLoading, error } = useQuery({
    queryKey: ['admin-comments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // تبدیل داده‌ها به فرمت مناسب
      return data.map(comment => ({
        id: comment.id,
        user: {
          name: comment.user_name || 'کاربر',
          avatar: comment.user_avatar || '👤',
          role: comment.dentist_id ? 'dentist' : 'patient'
        },
        content: comment.content,
        post: comment.source === 'blog' ? 'مقاله وبلاگ' : 'پروفایل دندانپزشک',
        date: new Date(comment.created_at).toLocaleDateString('fa-IR'),
        time: new Date(comment.created_at).toLocaleTimeString('fa-IR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: comment.status || 'pending',
        source: comment.source || 'blog',
        reply: comment.reply,
        replied_at: comment.replied_at,
        dentist_id: comment.dentist_id,
        patient_id: comment.patient_id
      }));
    }
  });

  // Mutation برای آپدیت وضعیت کامنت
  const updateCommentStatus = useMutation({
    mutationFn: async ({ commentId, status }) => {
      const updateData = { 
        status: status
      };

      // اگر وضعیت replied است، تاریخ رو هم آپدیت کن
      // if (status === 'replied') {
      //   updateData.replied_at = new Date().toISOString();
      // }

      const { error } = await supabase
        .from('comments')
        .update(updateData)
        .eq('id', commentId);

      if (error) throw new Error(`خطا در آپدیت وضعیت: ${error.message}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
    },
    onError: (error) => {
      console.error('خطا در آپدیت وضعیت:', error);
      alert(error.message);
    }
  });

  // Mutation برای پاسخ به کامنت
  const replyToComment = useMutation({
    mutationFn: async ({ commentId, replyContent }) => {
      const updateData = { 
        reply: replyContent,
        replied_at: new Date().toISOString(),
        // status: 'replied'
      };

      console.log('در حال ارسال داده‌ها:', { commentId, updateData });

      const { data, error } = await supabase
        .from('comments')
        .update(updateData)
        .eq('id', commentId)
        .select(); // اضافه کردن select برای دیباگ

      if (error) {
        console.error('خطای سوپابیس:', error);
        throw new Error(`خطا در ارسال پاسخ: ${error.message}`);
      }

      console.log('پاسخ با موفقیت ارسال شد:', data);
      return data;
    },
    onSuccess: (data) => {
      // console.log('پاسخ با موفقیت ذخیره شد:', data);
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
      setReplyingTo(null);
      setReplyContent('');
      alert('پاسخ با موفقیت ارسال شد');
    },
    onError: (error) => {
      console.error('خطا در ارسال پاسخ:', error);
      alert(error.message);
    }
  });

  // Mutation برای حذف کامنت
  const deleteComment = useMutation({
    mutationFn: async (commentId) => {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw new Error(`خطا در حذف کامنت: ${error.message}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
      alert('کامنت با موفقیت حذف شد');
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const statusFilters = [
    { 
      id: 'all', 
      label: 'همه کامنت‌ها', 
      count: comments.length, 
      icon: FaComment 
    },
    { 
      id: 'pending', 
      label: 'در انتظار تایید', 
      count: comments.filter(c => c.status === 'pending').length, 
      icon: FaClock 
    },
    { 
      id: 'approved', 
      label: 'تایید شده', 
      count: comments.filter(c => c.status === 'approved').length, 
      icon: FaCheck 
    },
    // { 
    //   id: 'replied', 
    //   label: 'پاسخ داده شده', 
    //   count: comments.filter(c => c.status === 'replied').length, 
    //   icon: FaReply 
    // }
  ];

  const getStatusBadge = (status) => {
    const config = {
      pending: { text: 'در انتظار', class: 'badge-warning' },
      approved: { text: 'تایید شده', class: 'badge-success' },
      // replied: { text: 'پاسخ داده شده', class: 'badge-info' },
      rejected: { text: 'رد شده', class: 'badge-error' }
    };
    
    return (
      <span className={`badge ${config[status]?.class || 'badge-neutral'}`}>
        {config[status]?.text || status}
      </span>
    );
  };

  const getUserRoleBadge = (role) => {
    return (
      <span className={`badge badge-outline ${role === 'dentist' ? 'badge-info' : 'badge-primary'}`}>
        {role === 'dentist' ? 'دندانپزشک' : 'بیمار'}
      </span>
    );
  };

  const getSourceBadge = (source) => {
    const config = {
      blog: { text: 'مقاله وبلاگ', class: 'badge-ghost', icon: '📝' },
      profile: { text: 'پروفایل دکتر', class: 'badge-accent', icon: '👨‍⚕️' },
      DentistProfile: { text: 'پروفایل دندانپزشک', class: 'badge-accent', icon: '👨‍⚕️' }
    };
    
    const sourceConfig = config[source] || config.blog;
    
    return (
      <span className={`badge ${sourceConfig.class}`}>
        {sourceConfig.icon} {sourceConfig.text}
      </span>
    );
  };

  const filteredComments = comments.filter(comment => 
    selectedStatus === 'all' || comment.status === selectedStatus
  );

  const handleAction = (commentId, action) => {
    switch (action) {
      case 'approve':
        updateCommentStatus.mutate({ commentId, status: 'approved' });
        break;
      case 'reject':
        updateCommentStatus.mutate({ commentId, status: 'rejected' });
        break;
      case 'delete':
        if (window.confirm('آیا از حذف این کامنت مطمئن هستید؟')) {
          deleteComment.mutate(commentId);
        }
        break;
      case 'reply':
        setReplyingTo(commentId);
        break;
      default:
        // console.log(`Action: ${action} on comment ${commentId}`);
    }
  };

  const handleSubmitReply = (commentId) => {
    if (!replyContent.trim()) {
      alert('لطفا متن پاسخ را وارد کنید');
      return;
    }
    
    replyToComment.mutate({ commentId, replyContent });
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyContent('');
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-base-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-base-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="alert alert-error">
            <span>خطا در بارگذاری کامنت‌ها: {error.message}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* هدر */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary/20 text-primary">
              <FaComment className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">مدیریت کامنت‌ها</h1>
              <p className="text-base-content/60 mt-1">نظرات کاربران را مدیریت و بررسی کنید</p>
            </div>
          </div>
        </div>

        {/* فیلترهای وضعیت */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {statusFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedStatus(filter.id)}
              className={`card compact transition-all duration-200 ${
                selectedStatus === filter.id 
                  ? 'bg-primary text-primary-content shadow-lg transform -translate-y-1' 
                  : 'bg-base-200 hover:bg-base-300'
              }`}
            >
              <div className="card-body items-center text-center p-4">
                <filter.icon className={`text-2xl mb-2 ${selectedStatus === filter.id ? 'text-primary-content' : 'text-primary'}`} />
                <h3 className="font-semibold text-sm">{filter.label}</h3>
                <div className={`text-lg font-bold ${selectedStatus === filter.id ? 'text-primary-content' : 'text-base-content'}`}>
                  {filter.count}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* لیست کامنت‌ها */}
        <div className="space-y-6">
          {filteredComments.map(comment => (
            <div key={comment.id} className="card bg-base-100 shadow-lg border border-base-300 transition-all hover:shadow-xl">
              <div className="card-body p-6">
                
                {/* هدر کامنت */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-14 h-14 shadow">
                        <span className="text-xl">{comment.user.avatar}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-base-content">{comment.user.name}</h3>
                        {getUserRoleBadge(comment.user.role)}
                        {getStatusBadge(comment.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-base-content/60">
                        <span>{comment.date}</span>
                        <span className="text-base-content/40">•</span>
                        <span>{comment.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* متن کامنت */}
                <div className="mb-4">
                  <p className="text-base-content leading-7 text-justify bg-base-200 rounded-lg p-4 border-r-4 border-primary">
                    {comment.content}
                  </p>
                </div>

                {/* پاسخ ادمین (اگر وجود دارد) */}
                {comment.reply && (
                  <div className="mb-4 bg-info/20 rounded-lg p-4 border-r-4 border-info">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-info">پاسخ ادمین:</span>
                      {comment.replied_at && (
                        <span className="text-sm text-info/70">
                          {new Date(comment.replied_at).toLocaleDateString('fa-IR')}
                        </span>
                      )}
                    </div>
                    <p className="text-info-content leading-7">{comment.reply}</p>
                  </div>
                )}

                {/* فرم پاسخ دادن */}
                {replyingTo === comment.id && (
                  <div className="mb-4 bg-warning/20 rounded-lg p-4 border-r-4 border-warning">
                    <div className="font-semibold text-warning mb-2">پاسخ شما:</div>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="textarea textarea-bordered w-full h-24 mb-3"
                      placeholder="پاسخ خود را اینجا بنویسید..."
                    />
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={replyToComment.isPending}
                      >
                        {replyToComment.isPending ? 'در حال ارسال...' : 'ارسال پاسخ'}
                      </button>
                      <button 
                        className="btn btn-ghost btn-sm"
                        onClick={handleCancelReply}
                        disabled={replyToComment.isPending}
                      >
                        انصراف
                      </button>
                    </div>
                  </div>
                )}

                {/* اطلاعات پست و منبع */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-3 bg-base-200 rounded-lg">
                  <div className="text-base-content/70">
                    منبع: {getSourceBadge(comment.source)}
                  </div>
                </div>

                {/* اقدامات */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-base-300">
                  <div className="flex items-center gap-1 text-sm text-base-content/60">
                    <span>عملیات سریع:</span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <button 
                      className="btn btn-success btn-sm gap-2"
                      onClick={() => handleAction(comment.id, 'approve')}
                      disabled={updateCommentStatus.isPending}
                    >
                      <FaCheck />
                      تایید
                    </button>
                    {/* <button 
                      className="btn btn-error btn-sm gap-2"
                      onClick={() => handleAction(comment.id, 'reject')}
                      disabled={updateCommentStatus.isPending}
                    >
                      <FaTimes />
                      رد
                    </button> */}
                    <button 
                      className="btn btn-info btn-sm gap-2"
                      onClick={() => handleAction(comment.id, 'reply')}
                      disabled={replyingTo === comment.id || replyToComment.isPending}
                    >
                      <FaReply />
                      پاسخ
                    </button>
                    {/* <button 
                      className="btn btn-ghost btn-sm gap-2"
                      onClick={() => handleAction(comment.id, 'view')}
                    >
                      <FaEye />
                    </button> */}
                    <button 
                      className="btn btn-ghost btn-sm gap-2 text-error hover:bg-error/20"
                      onClick={() => handleAction(comment.id, 'delete')}
                      disabled={deleteComment.isPending}
                    >
                      <FaTrash className='size-4'/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* پیام زمانی که کامنتی وجود ندارد */}
          {filteredComments.length === 0 && (
            <div className="text-center py-16">
              <div className="p-8 bg-base-200 rounded-2xl max-w-md mx-auto">
                <FaComment className="text-6xl text-base-content/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-base-content mb-2">کامنتی یافت نشد</h3>
                <p className="text-base-content/60">
                  هیچ کامنتی با فیلتر انتخاب شده مطابقت ندارد
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}