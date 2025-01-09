# API Live Call Control Framework  

This project demonstrates the use of **VAPI's live call control features** to monitor and interact with ongoing calls in real-time. With this framework, you can listen to live calls and send prompts to guide your agents without interrupting the flow of conversation.  

## ⚠️ Disclaimer  
This project is for **educational and internal use only**. Monitoring or recording calls without explicit or implied consent from both parties is illegal. Ensure you adhere to all legal and ethical standards when using this tool.  

---

## Features  
- **Live Call Monitoring**: Listen to ongoing calls in real time using WebSocket audio streaming.  
- **Call Control**: Inject messages or commands to guide agents during live calls.  
- **Audio Playback**: Low-latency audio processing in a browser environment using `AudioWorkletProcessor`.  
- **Interactive Web Interface**: A simple webpage to facilitate monitoring and call control.  

---

## Getting Started  

Follow these steps to set up and run the project:  

### 1. Clone the Repository  
`git clone https://github.com/your-repo-url.git`

### 2. Navigate to the Project Directory  
`cd your-project-folder`

### 3. Install Dependencies  
`npm install`

### 4. Configure the Project  
Open the `config.js` file and input your **VAPI API key** and **phone number ID**:  

```javascript
module.exports = {
  apiKey: "your-vapi-api-key",
  phoneNumberId: "your-vapi-phone-number-id",
  apiBaseUrl: "https://api.vapi.ai",
};
```
### 5. Configure the Server  
In src/server.js, specify the server URL. By default, it runs locally:

```javascript
const port = 8000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
```
### 6. Run the Server  

```bash
node src/server.js



