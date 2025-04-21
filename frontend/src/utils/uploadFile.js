// utils/uploadFile.js
export async function handleFileUpload(event, setFieldValue, fieldName) {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      // 🔧 Ez itt csak helykitöltő, később cseréld ki a valódi endpointodra
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      // Várt válasz: { url: "https://..." }
      setFieldValue(fieldName, data.url);
    } catch (err) {
      console.error("Feltöltési hiba:", err);
      // Itt megjeleníthetsz hibaüzenetet a UI-on is, ha szükséges
    }
  }
  