import React, { useRef, useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import toast, { Toaster } from "react-hot-toast";

const Template = () => {
  const receiptRef = useRef();
  const [formData, setFormData] = useState(null);
  const [formState, setFormState] = useState({
    month: "",
    entries: [{ date: "", description: "", amount: "" }],
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
        { date: "", description: "", amount: "" },
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
    setFormData({
      month: formState.month,
      entries: cleaned,
    });
  };

  const handleDownloadPDF = () => {
    const input = receiptRef.current;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.75);
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("booking-receipt.pdf");

      toast.success("Download Completed");
    });
  };

  return (
    <div className="w-4xl mx-auto p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <p className="text-center font-semibold text-2xl">Xpeed Group</p>

      {!formData ? (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Month</label>
            <input
              type="text"
              value={formState.month}
              onChange={(e) =>
                setFormState({ ...formState, month: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. June 2025"
              required
            />
          </div>

          {formState.entries.map((entry, index) => (
            <div key={index} className="border p-4 rounded space-y-2 relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  type="number"
                  placeholder="Amount"
                  value={entry.amount}
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
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
      ) : (
        <div>
          <div
            ref={receiptRef}
            className="mt-12 bg-white p-6 rounded shadow-md text-gray-800 font-sans"
            id="template-content"
          >
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-red-700">Xpeed</h1>
                <h2 className="text-xl font-semibold">
                  XPEED HOLIDAY{" "}
                  <span className="text-sm font-normal">Sdn.Bhd</span>
                </h2>
              </div>
              <div className="text-sm space-y-1 text-right">
                <div className="flex items-center justify-end gap-1">
                  <MdPhone className="text-blue-600" />
                  <span>+601730064099, 0178988418</span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <MdEmail className="text-green-600" />
                  <span>orkidhills@gmail.com</span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <MdLocationOn className="text-red-600" />
                  <span>
                    300, Jalan Pudu, Pudu-55100 Kuala Lumpur, Malaysia
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold">Expenditure Details</h3>
              <p className="text-sm font-medium mt-1">
                Month: {formData.month}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-left">SL No.</th>
                    <th className="text-left">Date</th>
                    <th className="text-left">Description</th>
                    <th className="text-right">Amount (RM)</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.entries.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td>{index + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.description}</td>
                      <td className="text-right">
                        RM {item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td colSpan="3" className="font-semibold text-right">
                      Total:
                    </td>
                    <td className="text-right font-bold text-lg">
                      RM{" "}
                      {formData.entries
                        .reduce((sum, e) => sum + e.amount, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white cursor-pointer px-6 py-2 rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
