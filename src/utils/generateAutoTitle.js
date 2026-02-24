import apiClient from "../config/api";

const generateAutoTitle = async (id, initialText) => {
  try {
    await apiClient.post(`/conversations/${id}/generate-title`, {
      first_message: initialText
    });
    // Optional: Refresh sidebar history to show the new title immediately
    window.dispatchEvent(new CustomEvent("refresh-sidebar"));
  } catch (err) {
    console.error("Auto-titling failed", err);
  }
};