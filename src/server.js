const express = require("express");
const cors = require("cors");
const path = require("path");
const { initiateCall, controlCall } = require("./backend");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Endpoint to initiate a call
app.post("/initiate-call", async (req, res) => {
  try {
    const listenUrl = await initiateCall(req.body.phoneNumber, req.body.customerName);
    res.status(200).json({ success: true, listenUrl });
  } catch (error) {
    console.error("Error initiating call:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to control the call
app.post("/control-call", async (req, res) => {
  const { controlUrl, type, message } = req.body;
  console.log("Received controlUrl:", controlUrl); // Log controlUrl for debugging
  console.log("Message Type:", type, "Message:", message); // Log message details

  try {
    await controlCall(controlUrl, type, message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error controlling call:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fallback route for unmatched requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start the server
const port = 5000; // Change if needed
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));