const getFullImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"}/${path}`;
  };
  
  export default getFullImageUrl;