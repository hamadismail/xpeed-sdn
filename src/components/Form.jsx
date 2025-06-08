import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useFormData } from "../providers/FormProvider";

const hotels = ["ORKID HILLS", "ECO HOTEL"];

const Form = () => {
  const { setFormData } = useFormData();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    hotel: "",
    type: "Expenditure",
    month: "",
    entries: [{ date: "", description: "", payTo: "", amount: "" }],
  });

  const handleChange = (index, field, value) => {
    const updatedEntries = [...formState.entries];
    updatedEntries[index][field] = value;
    setFormState({ ...formState, entries: updatedEntries });
  };

  const addEntry = () => {
    setFormState({
      ...formState,
      entries: [
        ...formState.entries,
        { date: "", description: "", payTo: "", amount: "" },
      ],
    });
  };

  const removeEntry = (index) => {
    const updated = formState.entries.filter((_, i) => i !== index);
    setFormState({ ...formState, entries: updated });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const cleaned = formState.entries.map((entry) => ({
      ...entry,
      amount: parseFloat(entry.amount),
    }));
    setFormData({ ...formState, entries: cleaned });
    navigate("/template");
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Xpeed Group</h2>

      <div>
        <label className="block mb-1 font-medium">Hotel</label>
        <select
          required
          value={formState.hotel}
          onChange={(e) =>
            setFormState({ ...formState, hotel: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel} value={hotel}>
              {hotel}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Type</label>
        <select
          value={formState.type}
          onChange={(e) => setFormState({ ...formState, type: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="Expenditure">Expenditure</option>
          <option value="Income">Income</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Month</label>
        <input
          type="month"
          value={formState.month}
          onChange={(e) =>
            setFormState({ ...formState, month: e.target.value })
          }
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      {formState.entries.map((entry, index) => (
        <div
          key={index}
          className="border p-4 rounded space-y-2 relative bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="date"
              value={entry.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={entry.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Pay To"
              value={entry.payTo}
              onChange={(e) => handleChange(index, "payTo", e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={entry.amount}
              onChange={(e) => handleChange(index, "amount", e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {formState.entries.length > 1 && (
            <button
              type="button"
              onClick={() => removeEntry(index)}
              className="absolute top-2 right-2 text-red-500"
            >
              &times;
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="text-blue-600 hover:underline text-sm"
      >
        + Add another entry
      </button>

      <div>
        <button
          type="submit"
          className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Generate Receipt
        </button>
      </div>
    </form>
  );
};

export default Form;
