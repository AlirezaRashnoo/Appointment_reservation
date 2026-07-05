import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/stores/useUserStore";

const CSRF_COOKIE_NAME = "csrf_token";

const axiosClient = axios.create({
  baseURL: "https://dentist-reyn.onrender.com/api/v1",
  withCredentials: true, 
});

const MUTATING_METHODS = ["post", "patch", "put", "delete"];

axiosClient.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  if (method && MUTATING_METHODS.includes(method)) {
    const csrfToken = Cookies.get(CSRF_COOKIE_NAME);
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }
  }

  return config;
});


const getDentistProcedures = async (dentistUserId) => {
  const { data } = await axiosClient.get(
    `/dentist/procedure/${dentistUserId}`
  );

  const payload = data?.data ?? data;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.procedures)) return payload.procedures;
  if (payload && typeof payload === "object") return [payload];

  return [];
};

const createProcedureRequest = async (procedureData) => {
  const { data } = await axiosClient.post("/dentist/procedure", procedureData);
  return data?.data ?? data;
};

const updateProcedureRequest = async (procedureId, procedureData) => {
  const { data } = await axiosClient.patch(
    `/dentist/procedure/${procedureId}`,
    procedureData
  );
  return data?.data ?? data;
};

const deleteProcedureRequest = async (procedureId) => {
  const { data } = await axiosClient.delete(
    `/dentist/procedure/${procedureId}`
  );
  return data;
};



const procedureKeys = {
  all: (dentistUserId) => ["dentist-procedures", dentistUserId],
};

const useDentistProcedures = (dentistUserId) => {
  return useQuery({
    queryKey: procedureKeys.all(dentistUserId),
    queryFn: () => getDentistProcedures(dentistUserId),
    enabled: Boolean(dentistUserId),
  });
};

const useCreateProcedure = (dentistUserId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (procedureData) => createProcedureRequest(procedureData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: procedureKeys.all(dentistUserId),
      });
    },
  });
};

const useUpdateProcedure = (dentistUserId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ procedureId, procedureData }) =>
      updateProcedureRequest(procedureId, procedureData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: procedureKeys.all(dentistUserId),
      });
    },
  });
};

const useDeleteProcedure = (dentistUserId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (procedureId) => deleteProcedureRequest(procedureId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: procedureKeys.all(dentistUserId),
      });
    },
  });
};


const ProcedureForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  onCancel,
  submitLabel = "ذخیره",
}) => {
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    durationMinutes: initialData?.durationMinutes ?? "",
    bufferBeforeMinutes: initialData?.bufferBeforeMinutes ?? "",
    bufferAfterMinutes: initialData?.bufferAfterMinutes ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      durationMinutes: Number(form.durationMinutes),
      bufferBeforeMinutes: Number(form.bufferBeforeMinutes) || 0,
      bufferAfterMinutes: Number(form.bufferAfterMinutes) || 0,
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      dir="rtl"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">نام خدمت</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="مثلا: جرم‌گیری دندان"
          className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">توضیحات</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="توضیح مختصری از این خدمت"
          className="resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            مدت زمان (دقیقه)
          </label>
          <input
            type="number"
            min="1"
            name="durationMinutes"
            value={form.durationMinutes}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            فاصله قبل (دقیقه)
          </label>
          <input
            type="number"
            min="0"
            name="bufferBeforeMinutes"
            value={form.bufferBeforeMinutes}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            فاصله بعد (دقیقه)
          </label>
          <input
            type="number"
            min="0"
            name="bufferAfterMinutes"
            value={form.bufferAfterMinutes}
            onChange={handleChange}
            className="rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "در حال ذخیره..." : submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            انصراف
          </button>
        )}
      </div>
    </form>
  );
};


const ProcedureCard = ({ procedure, onUpdate, onDelete, isDeleting }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ProcedureForm
        initialData={procedure}
        submitLabel="بروزرسانی"
        onCancel={() => setIsEditing(false)}
        onSubmit={(payload) => {
          onUpdate(procedure.id, payload);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {procedure.name}
          </h3>
          {procedure.description && (
            <p className="mt-1 text-sm text-gray-500">
              {procedure.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            ویرایش
          </button>
          <button
            onClick={() => onDelete(procedure.id)}
            disabled={isDeleting}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            {isDeleting ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
        <span className="rounded-full bg-gray-100 px-3 py-1">
          مدت زمان: {procedure.durationMinutes} دقیقه
        </span>
        {!!procedure.bufferBeforeMinutes && (
          <span className="rounded-full bg-gray-100 px-3 py-1">
            فاصله قبل: {procedure.bufferBeforeMinutes} دقیقه
          </span>
        )}
        {!!procedure.bufferAfterMinutes && (
          <span className="rounded-full bg-gray-100 px-3 py-1">
            فاصله بعد: {procedure.bufferAfterMinutes} دقیقه
          </span>
        )}
      </div>
    </div>
  );
};


const DentistProceduresPage = () => {
  // dentistUserId از zustand، طبق ساختار خودت
  const profileDentist = useUserStore((state) => state.user);
  const dentistUserId = profileDentist?.id;

  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const {
    data: procedures,
    isLoading,
    isError,
  } = useDentistProcedures(dentistUserId);

  const createMutation = useCreateProcedure(dentistUserId);
  const updateMutation = useUpdateProcedure(dentistUserId);
  const deleteMutation = useDeleteProcedure(dentistUserId);

  const handleCreate = (payload) => {
    createMutation.mutate(payload, {
      onSuccess: () => setIsAdding(false),
    });
  };

  const handleUpdate = (procedureId, payload) => {
    updateMutation.mutate({ procedureId, procedureData: payload });
  };

  const handleDelete = (procedureId) => {
    if (!window.confirm("از حذف این خدمت مطمئنی؟")) return;

    setDeletingId(procedureId);
    deleteMutation.mutate(procedureId, {
      onSettled: () => setDeletingId(null),
    });
  };

  const hasProcedures = Array.isArray(procedures) && procedures.length > 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8" dir="rtl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">خدمات من</h1>

        {hasProcedures && !isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + افزودن خدمت جدید
          </button>
        )}
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
          در حال دریافت خدمات...
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
          مشکلی در دریافت خدمات پیش آمد. لطفا دوباره تلاش کن.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="flex flex-col gap-4">
          {hasProcedures ? (
            procedures.map((procedure) => (
              <ProcedureCard
                key={procedure.id}
                procedure={procedure}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                isDeleting={deletingId === procedure.id}
              />
            ))
          ) : !isAdding ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="text-sm text-gray-500">
                هنوز خدمتی ثبت نکردی. اولین خدمتت رو اضافه کن.
              </p>
              <button
                onClick={() => setIsAdding(true)}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                + افزودن خدمت
              </button>
            </div>
          ) : null}

          {isAdding && (
            <ProcedureForm
              submitLabel="ثبت خدمت"
              isSubmitting={createMutation.isPending}
              onCancel={() => setIsAdding(false)}
              onSubmit={handleCreate}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DentistProceduresPage;