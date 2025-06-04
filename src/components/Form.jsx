import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [month, setMonth] = useState("");
  const [entries, setEntries] = useState([
    { date: "", description: "", amount: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { date: "", description: "", amount: "" }]);
  };

  const removeEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedEntries = entries.map((entry) => ({
      ...entry,
      amount: parseFloat(entry.amount),
    }));
    onSubmit({ month, entries: parsedEntries });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1" htmlFor="month">
          Month
        </label>
        <input
          type="text"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="e.g. June 2025"
          required
        />
      </div>

      {entries.map((entry, index) => (
        <div
          key={index}
          className="mb-4 border p-4 rounded bg-gray-50 space-y-2 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="date"
              value={entry.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={entry.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="number"
              placeholder="Amount (RM)"
              value={entry.amount}
              onChange={(e) => handleChange(index, "amount", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {entries.length > 1 && (
            <button
              type="button"
              onClick={() => removeEntry(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Remove entry"
            >
              &times;
            </button>
          )}
        </div>
      ))}

      <div className="mb-4">
        <button
          type="button"
          onClick={addEntry}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add another entry
        </button>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
