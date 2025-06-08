import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import toast, { Toaster } from "react-hot-toast";
import { useFormData } from "../providers/FormProvider";

const Template = () => {
  const { formData } = useFormData();
  const navigate = useNavigate();
  const receiptRef = useRef();

  if (!formData) {
    navigate("/");
    return null;
  }

  const formatMonth = (monthStr) => {
    const date = new Date(`${monthStr}-01`);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const handleDownloadPDF = () => {
    const input = receiptRef.current;
    html2canvas(input, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.75);
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("receipt.pdf");
      toast.success("Download Completed");
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Toaster />
      <div ref={receiptRef} className="bg-white p-6 rounded shadow-md">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-red-700">Xpeed</h1>
            <h2 className="text-xl font-semibold">
              {formData.hotel} <span className="text-sm">Sdn.Bhd</span>
            </h2>
          </div>

          {formData.hotel === "ORKID HILLS" ? (
            <div className="text-right text-sm">
              <div className="flex items-center gap-1 justify-end">
                <MdPhone className="text-blue-600" />
                +60173004099, 0178988418
              </div>
              <div className="flex items-center gap-1 justify-end">
                <MdEmail className="text-green-600" />
                orkidhills@gmail.com
              </div>
              <div className="flex items-center gap-1 justify-end">
                <MdLocationOn className="text-red-600" />
                300, Jalan Pudu, Pudu-55100 Kuala Lumpur, Malaysia
              </div>
            </div>
          ) : (
            <div className="text-right text-sm">
              <div className="flex items-center gap-1 justify-end">
                <MdPhone className="text-blue-600" />
                +601116962002, 0178988418
              </div>
              <div className="flex items-center gap-1 justify-end">
                <MdEmail className="text-green-600" />
                ecohotel.bb@gmail.com
              </div>
              <div className="flex items-center gap-1 justify-end">
                <MdLocationOn className="text-red-600" />
                179, Jalan Pudu, Pudu-55100 Kuala Lumpur, Malaysia
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <h3 className="text-lg font-bold">{formData.type} Details</h3>
          <p className="font-semibold">Month: {formatMonth(formData.month)}</p>
        </div>

        <table className="w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-1">SL No.</th>
              <th className="p-1">Date</th>
              <th className="p-1">Description</th>
              <th className="p-1">Pay To</th>
              <th className="text-right p-1">Amount (RM)</th>
            </tr>
          </thead>
          <tbody>
            {formData.entries.map((entry, i) => (
              <tr key={i} className="border-t">
                <td className="p-1">{i + 1}</td>
                <td className="p-1">{entry.date}</td>
                <td className="p-1">{entry.description}</td>
                <td className="p-1">{entry.payTo}</td>
                <td className="text-right p-1">RM {entry.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t font-bold">
              <td colSpan="4" className="text-right p-1">
                Total:
              </td>
              <td className="text-right p-1">
                RM{" "}
                {formData.entries
                  .reduce((sum, e) => sum + e.amount, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Template;
