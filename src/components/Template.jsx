import React, { useRef } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import toast, { Toaster } from "react-hot-toast";

const Template = () => {
  const receiptRef = useRef();
  const handleDownloadPDF = () => {
    const input = receiptRef.current;

    html2canvas(input, {
      scale: 2, // 2 is a good balance for quality vs size
      useCORS: true,
      allowTaint: false,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.75); // JPEG reduces size significantly
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("booking-receipt.pdf");

      toast.success("Download Completed");
    });
  };

  return (
    <div className="w-4xl mx-auto ">
      <Toaster position="top-center" reverseOrder={false} />
      <div
        ref={receiptRef}
        className="mt-12 bg-white p-6 rounded shadow-md text-gray-800 font-sans"
        id="template-content"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-red-700">Xpeed</h1>
            <h2 className="text-xl font-semibold">
              XPEED HOLIDAY <span className="text-sm font-normal">Sdn.Bhd</span>
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
              <span>300, Jalan Pudu, Pudu-55100 Kuala Lumpur, Malaysia</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Expenditure Details</h3>
          <p className="text-sm font-medium mt-1">Month: __________</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left">SL No.</th>
                <th className="text-left">Date</th>
                <th className="text-left">Description</th>
                <th className="text-right">Amount (RM)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { desc: "Rent", date: "2025-06-01" },
                { desc: "Salary", date: "2025-06-02" },
                { desc: "Advance Salary", date: "2025-06-03" },
                { desc: "Icon Design", date: "2025-06-04" },
                { desc: "Social Media ads", date: "2025-06-05" },
                { desc: "Banner Design", date: "2025-06-06" },
              ].map((item, index) => (
                <tr key={index} className="border-t">
                  <td>1</td>
                  <td>{item.date}</td>
                  <td>{item.desc}</td>
                  <td className="text-right">$100.00</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t">
                <td colSpan="3" className="font-semibold text-right">
                  Total:
                </td>
                <td className="text-right font-bold text-lg">$660.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {/* Download Button */}
      <div className="mt-6 flex justify-center">
        <button onClick={handleDownloadPDF} className="btn btn-primary">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Template;
