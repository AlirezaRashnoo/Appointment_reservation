import React, { useState } from 'react';
import {
  FaCheck,
  FaTimes,
  FaReply,
  FaTrash,
  FaComment,
  FaClock,
  FaStar,
  FaRegStar,
  FaExclamationTriangle,
  FaRedo,
} from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPendingReviews, acceptReview, rejectReview, deleteReview, replyToReview } from '@/features/reviewsapi';

// کمک‌تابع برای نمایش نام کاربر از ساختار داده‌ی بک‌اند واقعی
function getUserName(user) {
  const first = user?.profile?.firstName;
  const last = user?.profile?.lastName;
  if (first || last) return `${first ?? ''} ${last ?? ''}`.trim();
  return user?.phoneNumber || 'کاربر';
}

// حروف اول نام برای آواتار (جایگزین ایموجی ثابت)
function getInitials(name) {
  const parts = (name || '').trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '؟';
  if (parts.length === 1) return parts[0].slice(0, 1);
  return parts[0].slice(0, 1) + parts[1].slice(0, 1);
}

// رنگ آواتار بر اساس نام، هماهنگ با تم داسی‌یوآی پروژه
const AVATAR_PALETTES = [
  'bg-primary/15 text-primary',
  'bg-secondary/15 text-secondary',
  'bg-accent/15 text-accent',
  'bg-info/15 text-info',
  'bg-success/15 text-success',
  'bg-warning/15 text-warning',
];
function getAvatarPalette(name) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

function StarRating({ rating }) {
  if (typeof rating !== 'number') return null;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) =>
        s <= Math.round(rating) ? (
          <FaStar key={s} className="text-warning text-xs" />
        ) : (
          <FaRegStar key={s} className="text-base-content/20 text-xs" />
        )
      )}
      <span className="text-xs text-base-content/50 mr-1">{rating.toFixed ? rating.toFixed(1) : rating}</span>
    </div>
  );
}

const STATUS_CONFIG = {
  pending: { text: 'در انتظار', class: 'badge-warning', Icon: FaClock },
  accepted: { text: 'تایید شده', class: 'badge-success', Icon: FaCheck },
  rejected: { text: 'رد شده', class: 'badge-error', Icon: FaTimes },
};

function StatusBadge({ status }) {
  const c = STATUS_CONFIG[status] || { text: status, class: 'badge-neutral', Icon: FaComment };
  const Icon = c.Icon;
  return (
    <span className={`badge ${c.class} gap-1 font-normal whitespace-nowrap`}>
      <Icon className="text-[10px]" />
      {c.text}
    </span>
  );
}

export default function CommentsList() {
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const queryClient = useQueryClient();

  // نکته: بک‌اند فعلاً فقط لیست ریویوهای «در انتظار تایید» را به‌صورت سراسری
  // برمی‌گرداند (GET /dentists/reviews/pending)، بنابراین فیلتر تب «تایید شده»
  // فعلاً معنا ندارد مگر با انتخاب یک دندانپزشک خاص و getReviewsForDentist.
  const {
    data: rawReviews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-pending-reviews'],
    queryFn: () => getPendingReviews(),
  });

  const comments = rawReviews.map((review) => ({
    id: review.id,
    user: {
      name: getUserName(review.user),
    },
    content: review.comment,
    rating: review.rating,
    date: review.createdAt ? new Date(review.createdAt).toLocaleDateString('fa-IR') : '',
    time: review.createdAt
      ? new Date(review.createdAt).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      : '',
    status: review.status ? review.status.toLowerCase() : 'pending',
    reply: review.reply?.comment,
    replied_at: review.reply?.createdAt,
    dentistId: review.dentist?.userId,
  }));

  const acceptMutation = useMutation({
    mutationFn: (reviewId) => acceptReview(reviewId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-pending-reviews'] }),
    onError: (err) => {
      console.error('خطا در تایید ریویو:', err);
      alert(err?.response?.data?.message || 'خطا در تایید کامنت');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (reviewId) => rejectReview(reviewId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-pending-reviews'] }),
    onError: (err) => {
      console.error('خطا در رد ریویو:', err);
      alert(err?.response?.data?.message || 'خطا در رد کامنت');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pending-reviews'] });
    },
    onError: (err) => {
      console.error('خطا در حذف ریویو:', err);
      alert(err?.response?.data?.message || 'خطا در حذف کامنت');
    },
  });

  const replyMutation = useMutation({
    mutationFn: ({ dentistId, originalReviewId, replyText, rating }) =>
      replyToReview({ dentistId, originalReviewId, replyText, rating }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pending-reviews'] });
      setReplyingTo(null);
      setReplyContent('');
    },
    onError: (err) => {
      console.error('خطا در ارسال پاسخ:', err);
      alert(err?.response?.data?.message || 'خطا در ارسال پاسخ');
    },
  });

  const handleAction = (comment, action) => {
    switch (action) {
      case 'approve':
        acceptMutation.mutate(comment.id);
        break;
      case 'reject':
        rejectMutation.mutate(comment.id);
        break;
      case 'delete':
        setDeleteTarget(comment);
        break;
      case 'reply':
        setReplyingTo(comment.id);
        setReplyContent('');
        break;
      default:
        break;
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const handleSubmitReply = (comment) => {
    if (!replyContent.trim()) {
      alert('لطفا متن پاسخ را وارد کنید');
      return;
    }
    if (!comment.dentistId) {
      alert('شناسه دندانپزشک این کامنت مشخص نیست، امکان پاسخ وجود ندارد');
      return;
    }
    replyMutation.mutate({
      dentistId: comment.dentistId,
      originalReviewId: comment.id,
      replyText: replyContent,
      rating: comment.rating,
    });
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyContent('');
  };

  // --- حالت بارگذاری: اسکلتون به‌جای اسپینر تنها ---
  if (isLoading) {
    return (
      <div className="p-6 bg-base-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <div className="skeleton w-14 h-14 rounded-2xl shrink-0"></div>
            <div className="space-y-2">
              <div className="skeleton h-6 w-48"></div>
              <div className="skeleton h-4 w-64"></div>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card bg-base-100 border border-base-300/70 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                  <div className="space-y-2 flex-1">
                    <div className="skeleton h-4 w-32"></div>
                    <div className="skeleton h-3 w-24"></div>
                  </div>
                </div>
                <div className="skeleton h-16 w-full rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- حالت خطا ---
  if (error) {
    return (
      <div className="p-6 bg-base-100 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-error/10 text-error flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-2xl" />
          </div>
          <h3 className="font-bold text-lg text-base-content mb-2">خطا در بارگذاری کامنت‌ها</h3>
          <p className="text-base-content/60 text-sm mb-5">
            {error?.response?.data?.message || error.message}
          </p>
          <button className="btn btn-primary btn-sm gap-2" onClick={() => refetch()}>
            <FaRedo className="text-xs" />
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* هدر */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-content shadow-lg shadow-primary/20">
              <FaComment className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-base-content">مدیریت کامنت‌ها</h1>
              <p className="text-base-content/60 mt-1 text-sm">
                بررسی و تایید نظرات بیماران روی پروفایل دندانپزشکان
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-base-200 rounded-2xl px-5 py-3 self-start sm:self-auto">
            <div className="w-9 h-9 rounded-xl bg-warning/15 text-warning flex items-center justify-center shrink-0">
              <FaClock />
            </div>
            <div>
              <div className="text-xs text-base-content/50">در انتظار بررسی</div>
              <div className="text-xl font-bold text-base-content leading-tight">{comments.length}</div>
            </div>
          </div>
        </div>

        {/* لیست کامنت‌ها */}
        <div className="space-y-5">
          {comments.map((comment) => {
            const isAcceptingThis = acceptMutation.isPending && acceptMutation.variables === comment.id;
            const isRejectingThis = rejectMutation.isPending && rejectMutation.variables === comment.id;
            const isReplyingThis =
              replyMutation.isPending && replyMutation.variables?.originalReviewId === comment.id;

            return (
              <div
                key={comment.id}
                className="card bg-base-100 border border-base-300/70 shadow-sm hover:shadow-md hover:border-base-300 transition-all duration-200 rounded-2xl"
              >
                <div className="card-body p-5 md:p-6">
                  {/* هدر کارت: کاربر + وضعیت */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${getAvatarPalette(
                          comment.user.name
                        )}`}
                      >
                        {getInitials(comment.user.name)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base-content">{comment.user.name}</h3>
                          <span className="badge badge-sm badge-outline font-normal">بیمار</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-base-content/50">
                          <FaClock className="text-[10px]" />
                          <span>
                            {comment.date} · {comment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={comment.status} />
                  </div>

                  {typeof comment.rating === 'number' && (
                    <div className="mt-3">
                      <StarRating rating={comment.rating} />
                    </div>
                  )}

                  {/* متن کامنت */}
                  <p className="mt-4 text-base-content/90 leading-8 text-[15px] bg-base-200/60 rounded-xl p-4 border-r-4 border-primary">
                    {comment.content}
                  </p>

                  {/* پاسخ ثبت‌شده‌ی ادمین */}
                  {comment.reply && (
                    <div className="mt-4 bg-info/10 rounded-xl p-4 border-r-4 border-info">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FaReply className="text-info text-xs" />
                        <span className="font-semibold text-sm text-info">پاسخ ادمین</span>
                        {comment.replied_at && (
                          <span className="text-xs text-info/60 font-normal">
                            {new Date(comment.replied_at).toLocaleDateString('fa-IR')}
                          </span>
                        )}
                      </div>
                      <p className="text-base-content/80 leading-7 text-sm">{comment.reply}</p>
                    </div>
                  )}

                  {/* فرم پاسخ */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 bg-warning/10 rounded-xl p-4 border-r-4 border-warning">
                      <div className="font-semibold text-warning mb-2 text-sm flex items-center gap-2">
                        <FaReply className="text-xs" />
                        نوشتن پاسخ
                      </div>
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="textarea textarea-bordered w-full h-24 mb-3 bg-base-100"
                        placeholder="پاسخ خود را اینجا بنویسید..."
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          className="btn btn-warning btn-sm gap-2"
                          onClick={() => handleSubmitReply(comment)}
                          disabled={isReplyingThis}
                        >
                          {isReplyingThis ? (
                            <span className="loading loading-spinner loading-xs" />
                          ) : (
                            <FaCheck className="text-xs" />
                          )}
                          ارسال پاسخ
                        </button>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={handleCancelReply}
                          disabled={isReplyingThis}
                        >
                          انصراف
                        </button>
                      </div>
                    </div>
                  )}

                  {/* نوار عملیات */}
                  <div className="mt-5 pt-4 border-t border-base-300/70 flex flex-wrap items-center justify-between gap-3">
                    <span className="badge badge-ghost gap-1.5 text-xs font-normal">
                      👨‍⚕️ پروفایل دندانپزشک
                    </span>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        className="btn btn-sm btn-success gap-1.5"
                        onClick={() => handleAction(comment, 'approve')}
                        disabled={isAcceptingThis}
                      >
                        {isAcceptingThis ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <FaCheck className="text-xs" />
                        )}
                        تایید
                      </button>
                      <button
                        className="btn btn-sm btn-error gap-1.5"
                        onClick={() => handleAction(comment, 'reject')}
                        disabled={isRejectingThis}
                      >
                        {isRejectingThis ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <FaTimes className="text-xs" />
                        )}
                        رد
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-info gap-1.5"
                        onClick={() => handleAction(comment, 'reply')}
                        disabled={replyingTo === comment.id}
                      >
                        <FaReply className="text-xs" />
                        پاسخ
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                        onClick={() => handleAction(comment, 'delete')}
                        title="حذف کامنت"
                        aria-label="حذف کامنت"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {comments.length === 0 && (
            <div className="text-center py-16">
              <div className="p-8 bg-base-200 rounded-2xl max-w-md mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-base-content mb-2">کامنتی یافت نشد</h3>
                <p className="text-base-content/60">در حال حاضر کامنت در انتظار تاییدی وجود ندارد</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* مودال تایید حذف، به‌جای window.confirm */}
      {deleteTarget && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg flex items-center gap-2 text-error">
              <FaExclamationTriangle />
              حذف کامنت
            </h3>
            <p className="py-4 text-base-content/70 text-sm leading-7">
              آیا از حذف کامنت «{deleteTarget.user.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.
            </p>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)} disabled={deleteMutation.isPending}>
                انصراف
              </button>
              <button className="btn btn-error gap-2" onClick={confirmDelete} disabled={deleteMutation.isPending}>
                {deleteMutation.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <FaTrash className="text-xs" />
                )}
                حذف قطعی
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteTarget(null)}></div>
        </div>
      )}
    </div>
  );
}