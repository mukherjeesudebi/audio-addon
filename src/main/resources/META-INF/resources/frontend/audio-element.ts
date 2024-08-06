import { css, html, LitElement, TemplateResult, PropertyValueMap } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

@customElement('audio-element')
export class AudioElement extends LitElement {

    recordingTimeMS = 5000;

    @query('#preview')
    _preview;

    @query('#recording')
    _recording;

    record(stream, lengthInMS) {
        let recorder = new MediaRecorder(stream);
        let data: Blob[] = [];

        recorder.ondataavailable = (event) => data.push(event.data);
        recorder.start();

        let stopped = new Promise((resolve, reject) => {
            recorder.onstop = resolve;
            recorder.onerror = (event) => reject(event.currentTarget);
        });

        let recorded = this.wait(lengthInMS).then(() => {
            if (recorder.state === "recording") {
                recorder.stop();
            }
        });

        return Promise.all([stopped, recorded]).then(() => data);
    }

    startRecording() {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        })
            .then((stream) => {
                this._preview.srcObject = stream;
               // this._preview.captureStream = this._preview.captureStream || this._preview.mozCaptureStream;
                return new Promise((resolve) => (this._preview.onplaying = resolve));
            }).then(() => this.record(this._preview.captureStream(), this.recordingTimeMS))
            .then((recordedChunks) => {
                let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
                this._recording.src = URL.createObjectURL(recordedBlob);
            }).catch((error) => {
                if (error.name === "NotFoundError") {
                    console.log("Microphone not found. Can't record.");
                } else {
                    console.log(error);
                }
            })
    }

    stopRecording() {
        this.stop(this._preview.srcObject);
    }

    wait(delayInMS) {
        return new Promise((resolve) => setTimeout(resolve, delayInMS));
    }

    stop(stream) {
        stream.getTracks().forEach((track) => track.stop());
    }

    render(): TemplateResult {
        return html`
        <vaadin-horizontal-layout theme="spacing" class="items-center">
            <vaadin-button theme="icon" id="startButton" @click="${this.startRecording}">
                <vaadin-icon icon="vaadin:play-circle-o"></vaadin-icon>
            </vaadin-button>
            <audio id="preview" width="160" height="120" autoplay muted></audio>
            <vaadin-button theme="icon" id="stopButton" @click="${this.stopRecording}">
                <vaadin-icon icon="vaadin:stop"></vaadin-icon>
            </vaadin-button>
            <audio id="recording" width="160" height="120" controls></audio>	
        </vaadin-horizontal-layout>  
        `;
    }
}

function log(arg0: string) {
    throw new Error('Function not implemented.');
}
