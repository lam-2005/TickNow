"use client";
import React, { useEffect, useState } from "react";

type FieldType = "text" | "number" | "date" | "select";

type Field<T> = {
  label: string;
  key: keyof T;
  type?: FieldType;
  options?: { label: string; value: string }[];
};

type PopupUpdateFormProps<T> = {
  isOpen: boolean;
  onClose: () => void;
  initialData: T | null;
  fields: Field<T>[];
  onSubmit?: (data: T) => void;
};

const PopupUpdateForm = <T extends Record<string, unknown>>({
  isOpen,
  onClose,
  initialData,
  fields,
  onSubmit,
}: PopupUpdateFormProps<T>) => {
  const [formData, setFormData] = useState<T | null>(null);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (key: keyof T, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && onSubmit) {
      onSubmit(formData);
    }
    console.log("Submit:", formData);
    onClose();
  };

  if (!isOpen || !formData) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center z-50 overflow-y-auto pt-24 px-4"
      id="popup-overlay"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "popup-overlay") onClose();
      }}
    >
      <div
        className="bg-white rounded-xl w-full max-w-3xl shadow-2xl relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-black text-2xl font-bold z-10"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ✏️ Cập nhật thông tin
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {fields.map((field) => {
              const value = formData[field.key];
              const inputType = field.type || "text";

              return (
                <div key={String(field.key)}>
                  <label className="block text-gray-700 font-medium mb-1">
                    {field.label}
                  </label>

                  {inputType === "select" && field.options ? (
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={String(value || "")}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    >
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={inputType}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={
                        inputType === "date" && typeof value === "string"
                          ? value.slice(0, 10)
                          : typeof value === "string" || typeof value === "number"
                          ? String(value)
                          : ""
                      }
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  )}
                </div>
              );
            })}

            <div className="col-span-full flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupUpdateForm;
