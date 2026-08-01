import axios from "axios";

const BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let cachedCsrfToken = null;

async function fetchCsrfToken() {
  const { data } = await api.post("/auth/csrf-token");
  cachedCsrfToken = data?.data?.csrfToken;
  return cachedCsrfToken;
}

async function getCsrfToken() {
  if (cachedCsrfToken) return cachedCsrfToken;
  return fetchCsrfToken();
}

// wrapper برای درخواست‌های mutating که هدر csrf رو خودکار اضافه می‌کنه
// و اگه توکن نامعتبر شده بود (403) یک بار دیگه تلاش می‌کنه
async function mutatingRequest(config) {
  const token = await getCsrfToken();
  try {
    return await api.request({
      ...config,
      headers: { ...(config.headers || {}), "x-csrf-token": token },
    });
  } catch (err) {
    if (err?.response?.status === 403) {
      const freshToken = await fetchCsrfToken();
      return api.request({
        ...config,
        headers: { ...(config.headers || {}), "x-csrf-token": freshToken },
      });
    }
    throw err;
  }
}

export async function getPendingReviews(dentistId) {
  const { data } = await api.get("/dentists/reviews/pending", {
    params: dentistId ? { dentistId } : undefined,
  });
  return data?.data ?? [];
}

export async function getReviewsForDentist(dentistId) {
  const { data } = await api.get(`/dentists/reviews/${dentistId}`);
  return data?.data ?? [];
}

export async function acceptReview(reviewId) {
  const { data } = await mutatingRequest({
    method: "PATCH",
    url: `/dentists/reviews/accept/${reviewId}`,
  });
  return data;
}

// رد کردن یک ریویو
export async function rejectReview(reviewId) {
  const { data } = await mutatingRequest({
    method: "PATCH",
    url: `/dentists/reviews/reject/${reviewId}`,
  });
  return data;
}

export async function deleteReview(reviewId) {
  const { data } = await mutatingRequest({
    method: "DELETE",
    url: `/dentists/reviews/${reviewId}`,
  });
  return data;
}

export async function replyToReview({
  dentistId,
  originalReviewId,
  replyText,
  rating,
}) {
  const { data } = await mutatingRequest({
    method: "POST",
    url: `/dentists/reviews/${dentistId}`,
    data: {
      comment: replyText,
      rating: rating ?? 5,
      reply: originalReviewId,
    },
  });
  return data;
}
