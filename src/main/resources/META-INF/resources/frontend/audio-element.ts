import { css, html, LitElement, TemplateResult, PropertyValueMap } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

@customElement('audio-element')
export class AudioElement extends LitElement {

	recordingTimeMS = 5000;

	@query('#preview')
	_preview;

	@query('#recording')
	_recording;

	@query('#visualizer')
	_visualizer

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

	async createVisualizer(stream,canvasCtx) {
		var WIDTH = 300;
		var HEIGHT = 53;
		var audioContext = new AudioContext();
		var analyserNode = audioContext.createAnalyser();
		var source = audioContext.createMediaStreamSource(stream);
		source.connect(analyserNode);
		analyserNode.fftSize = 2048;
		var bufferLength = analyserNode.frequencyBinCount;
		var dataArray = new Uint8Array(bufferLength);
		//var canvasCtx = this._viualizer.getContext("2d");
		//canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

		const draw = () => {
			requestAnimationFrame(draw);

        analyserNode.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i];

          canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
          canvasCtx.fillRect(
            x,
            HEIGHT - barHeight / 2,
            barWidth,
            barHeight / 2
          );

          x += barWidth + 1;
        }
		}


		draw();


	}
	
	startRecording() {
		navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		})
			.then((stream) => {
				this._preview.srcObject = stream;
				this.createVisualizer(stream,this._visualizer.getContext("2d"));
				// this._preview.captureStream = this._preview.captureStream || this._preview.mozCaptureStream;
				return new Promise((resolve) => (this._preview.onplaying = resolve));
			}).then(() => this.record(this._preview.captureStream(), this.recordingTimeMS))
			.then((recordedChunks) => {
				let recordedBlob = new Blob(recordedChunks, { type: "audio/ogg; codecs=opus" });
				const audioURL = URL.createObjectURL(recordedBlob)
				this._recording.src = audioURL;
				this.saveRecordedAudio(recordedBlob);
			}).catch((error) => {
				if (error.name === "NotFoundError") {
					console.log("Microphone not found. Can't record.");
				} else {
					console.log(error);
				}
			})
	}

	async saveRecordedAudio(recordedBlob) {
		let reader = new FileReader();
		let base64String;
		reader.onload = function () {
			base64String = reader.result;
		}
		reader.readAsDataURL(recordedBlob);
		setTimeout(() => {
			this.$server.saveRecordedAudio(base64String);
		}, 500);
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

	static get styles() {
		return css`

`
	}

	render(): TemplateResult {
		return html`
<vaadin-vertical-layout theme="spacing" class="items-center">
	<vaadin-horizontal-layout>
		<vaadin-button theme="tertiary" id="startButton" @click="${this.startRecording}">
			<vaadin-icon icon="vaadin:microphone"></vaadin-icon>
		</vaadin-button>
		<vaadin-button theme="tertiary" id="stopButton" style="color: red" @click="${this.stopRecording}">
			<vaadin-icon icon="vaadin:stop"></vaadin-icon>
		</vaadin-button>	
	<audio id="preview" width="160" height="120" autoplay muted></audio>
	<canvas id="visualizer" width="300" height="50"></canvas>
	<audio id="recording" width="160" height="120" controls></audio>
	</vaadin-horizontal-layout>
</vaadin-vertical-layout>
`;
	}
}

function log(arg0: string) {
	throw new Error('Function not implemented.');
}