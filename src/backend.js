const axios = require("axios");
const { apiKey, phoneNumberId, apiBaseUrl } = require("./config");

// Function to poll the call status until the listenUrl becomes available
async function pollCallStatus(callId) {
  const maxRetries = 30; // Maximum number of retries
  const delay = 2000; // Delay between retries (in milliseconds)

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios.get(`${apiBaseUrl}/call/${callId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const callData = response.data;
      console.log(`Polling attempt ${i + 1}: Status - ${callData.status}`);

      // Check if the listenUrl is available
      if (callData.status === "in-progress" && callData.monitor && callData.monitor.listenUrl) {
        console.log("Listen URL available:", callData.monitor.listenUrl);
        return callData.monitor.listenUrl;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      console.error("Error polling call status:", error.response?.data || error.message);
    }
  }

  throw new Error("Listen URL not available after polling.");
}

// Function to initiate an outbound call
async function initiateCall(phoneNumber, customerName) {
  try {
    const payload = {
      phoneNumberId,
      customer: {
        number: phoneNumber,
        name: customerName || "Unknown",
      },
      assistant: {
        name: "AI ASSSISTANT",
        voice: {
          provider: "11labs",
          voiceId: "p43fx6U8afP2xoq1Ai9f",
        },
      },
    };

    const response = await axios.post(`${apiBaseUrl}/call`, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const callId = response.data.id;
    console.log("Call initiated. Call ID:", callId);

    // Poll for the listenUrl
    const listenUrl = await pollCallStatus(callId);
    return listenUrl;
  } catch (error) {
    console.error("Error initiating call:", error.response?.data || error.message);
    throw error;
  }
}

// Function to control the call (inject messages)
async function controlCall(controlUrl, type, message) {
  try {
    const payload = { type, message };
    const response = await axios.post(controlUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Message injected successfully:", response.data);
  } catch (error) {
    console.error("Error controlling call:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { initiateCall, controlCall };
