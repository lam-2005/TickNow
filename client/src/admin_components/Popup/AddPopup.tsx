"use client";
import React, { useState } from "react";

type FieldType = "text" | "number" | "date" | "select" | "password" | "textarea";

type Field<T> = {
  label: string;
  key: keyof T;
  type?: FieldType;
  options?: { label: string; value: string }[];
  required?: boolean;
  rows?: number;
};

type AddFormProps<T> = {
  isOpen: boolean;
  onClose: () => void;
  fields: Field<T>[];
  onSubmit: (data: Partial<T>) => void;
};

const AddForm = <T extends Record<string, unknown>>({
  isOpen,
  onClose,
  fields,
  onSubmit,
}: AddFormProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: keyof T, value: string) => {
    setFormData({ ...formData, [key]: value });
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.key];
      const strVal = String(value ?? "").trim();

      if (field.required && !strVal) {
        newErrors[field.key as string] = `${field.label} là bắt buộc.`;
      } else if (field.type === "number" && isNaN(Number(strVal))) {
        newErrors[field.key as string] = `${field.label} phải là số.`;
      } else if (field.type === "date" && isNaN(Date.parse(strVal))) {
        newErrors[field.key as string] = `${field.label} không hợp lệ.`;
      } else if (
        field.type === "text" &&
        /email/i.test(String(field.key)) &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strVal)
      ) {
        newErrors[field.key as string] = `${field.label} không đúng định dạng email.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    onClose();
    setFormData({});
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center z-50 overflow-y-auto pt-24 px-4"
      id="add-popup-overlay"
      onClick={(e) => {
        if ((e.target as HTMLElement).id === "add-popup-overlay") onClose();
      }}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-black text-2xl font-bold z-10"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">➕ Thêm Mới</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {fields.map((field) => {
              const inputType = field.type || "text";
              const error = errors[field.key as string];

              return (
                <div
                  key={String(field.key)}
                  className={inputType === "textarea" ? "md:col-span-2" : ""}
                >
                  <label className="block text-gray-700 font-medium mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {inputType === "select" && field.options ? (
                    <select
                      className={`w-full border rounded-md px-3 py-2 ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      defaultValue=""
                    >
                      <option value="">-- Chọn --</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : inputType === "textarea" ? (
                    <textarea
                      rows={field.rows || 4}
                      className={`w-full border rounded-md px-3 py-2 resize-none ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  ) : (
                    <input
                      type={inputType}
                      className={`w-full border rounded-md px-3 py-2 ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                    />
                  )}

                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
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

export default AddForm;
