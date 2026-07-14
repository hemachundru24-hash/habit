// 1. Fix for Vite environment variables (or fallback to standard Create React App if that's what you use)
const API_BASE = 
  (typeof process !== "undefined" ? process.env.REACT_APP_API_URL : null) || 
  import.meta.env?.VITE_API_URL || 
  "https://habittracker-f4u6.onrender.com/api/habits";

const handleResponse = async (res) => {
  if (!res.ok) {
    // 2. Safe parsing in case the server returns HTML instead of JSON on errors (e.g., 404 or 500 crashes)
    let errorMsg = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) errorMsg = body.error;
    } catch (e) {
      // If it's not JSON, try reading as text to see the raw error
      try {
        const text = await res.text();
        if (text) errorMsg = text.slice(0, 100); // snippet of the error
      } catch (_) {}
    }
    throw new Error(errorMsg);
  }
  return res.json();
};

export const api = {
  // Returns: full array of habits
  getHabits: async () => {
    const res = await fetch(API_BASE);
    return handleResponse(res);
  },

  // Returns: the single newly created habit (same as original)
  addHabit: async (habitName, color, targetDays, isNegative) => {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habitName, color, targetDays, isNegative }),
    });
    return handleResponse(res);
  },

  // Returns: full updated array of habits (same as original)
  toggleComplete: async (id, dateStr) => {
    const res = await fetch(`${API_BASE}/${id}/toggle`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: dateStr }),
    });
    return handleResponse(res);
  },

  // Returns: full updated array of habits (same as original)
  deleteHabit: async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  },
};
