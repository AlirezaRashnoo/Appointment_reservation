// components/FormField.jsx

export default function FormField({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder = "",
}) {
  return (
    <div className="space-y-2">
      <label className="font-semibold">
        {label}
      </label>

      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="
          h-11
          pt-1.5
          px-3
          rounded-lg
          text-sm
          w-full
          outline-none
          bg-white
        "
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
}