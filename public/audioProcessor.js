class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.buffer = new Float32Array();

        // Handle incoming audio data
        this.port.onmessage = (event) => {
            const incomingData = event.data.audioData;
            const newBuffer = new Float32Array(this.buffer.length + incomingData.length);
            newBuffer.set(this.buffer, 0);
            newBuffer.set(incomingData, this.buffer.length);
            this.buffer = newBuffer;
        };
    }

    process(inputs, outputs) {
        const output = outputs[0]; // Output channels array
        const leftChannel = output[0]; // Left audio channel
        const rightChannel = output[1]; // Right audio channel (if stereo)

        if (!leftChannel) return true; // No output channels available

        for (let i = 0; i < leftChannel.length; i++) {
            // Assign left channel samples
            leftChannel[i] = this.buffer[i * 2] || 0;

            // Assign right channel samples if available
            if (rightChannel) {
                rightChannel[i] = this.buffer[i * 2 + 1] || 0;
            }
        }

        // Remove processed samples from the buffer
        this.buffer = this.buffer.slice(leftChannel.length * 2);
        return true; // Keep the processor alive
    }
}

registerProcessor('audio-processor', AudioProcessor);