import React from "react";
import { useRouter } from "next/router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function MyResume() {
  const router = useRouter();
  const data = router.query;

  const downloadPDF = async () => {
  const element = document.getElementById("resumeArea");

  if (!element) return;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("CareerBloom_Resume.pdf");
};

  return (
    <div id="resumeArea"className="max-w-3xl mx-auto p-8 border mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">{data.name}</h1>

      <p><b>Email:</b> {data.email}</p>
      <p><b>Qualification:</b> {data.qualification}</p>
      <p><b>Experience:</b> {data.experience}</p>

      <h2 className="text-xl font-bold mt-5">Personal Information</h2>
      <p>{data.personalInfo}</p>
      <div className="text-center mt-5">
  <button
    onClick={downloadPDF}
    className="bg-green-600 text-white px-6 py-3 rounded"
  >
    Download Resume PDF
  </button>
</div>
    </div>
    
  );
}