import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Use your actual API key — switch to env variable for security later
// const genAI = new GoogleGenerativeAI("AIzaSyCGKm_wwrWsG06CIlN2oVGWPeDRCS1j7w8");
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY);
const AIScanReceiptGemini = ({ onScanComplete }) => {
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // remove base64 prefix
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const base64Image = await fileToBase64(file);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const result = await model.generateContent([
        {
          text: `Extract the amount spent, date, and a short description from this receipt image.
          Respond ONLY with a valid JSON object like:
          {
            "amount": "123.45",
            "date": "YYYY-MM-DD",
            "description": "Your description"
          }`,
        },
        {
          inlineData: {
            mimeType: file.type,
            data: base64Image,
          },
        },
      ]);

      let textResponse = await result.response.text();

      // ✅ Handle markdown-wrapped JSON
      textResponse = textResponse.trim();
      if (textResponse.startsWith("```")) {
        textResponse = textResponse.replace(/```(?:json)?\n?/, "").replace(/```$/, "").trim();
      }

      let parsed = {};
      try {
        parsed = JSON.parse(textResponse);
      } catch {
        console.warn("Failed to parse JSON:", textResponse);
        alert("Failed to understand receipt. Try a clearer photo.");
        return;
      }

      onScanComplete({
        amount: parsed.amount || "",
        date: parsed.date || "",
        description: parsed.description || "",
      });
    } catch (err) {
      console.error("Gemini scan error:", err);
      alert("Something went wrong while scanning.");
    }

    setLoading(false);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <button
        type="button"
        className="AIScanReceiptGemini"
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
      >
        {loading ? "Scanning with Gemini..." : "Scan Receipt with Gemini AI"}
      </button>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default AIScanReceiptGemini;
