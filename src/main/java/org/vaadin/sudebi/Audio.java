package org.vaadin.sudebi;

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.ComponentUtil;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.FocusNotifier.FocusEvent;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.template.Id;
import com.vaadin.flow.dom.DomListenerRegistration;
import com.vaadin.flow.shared.Registration;

@Tag("audio-element")
@JsModule("./audio-element.ts")
public class Audio extends LitTemplate {
	private String recordedAudio;

	@Id("startButton")
	private Button startButton;

	@Id("stopButton")
	private Button stopButton;

	public Audio() {
		stopButton.setVisible(false);
		startButton.addClickListener(event -> {
			startButton.setVisible(false);
			stopButton.setVisible(true);
		});
		stopButton.addClickListener(event -> {
			startButton.setVisible(true);
			stopButton.setVisible(false);
		});

	}

	@ClientCallable
	public void saveRecordedAudio(String audio) {
		setRecordedAudio(audio);
	}

	public String getRecordedAudio() {
		return recordedAudio;
	}

	public void setRecordedAudio(String recordedAudio) {
		this.recordedAudio = recordedAudio;
	}

	public Registration addStartListener(ComponentEventListener<StartEvent> listener) {
		if (this instanceof Component) {
			return ComponentUtil.addListener((Component) this, StartEvent.class, (ComponentEventListener) listener);
		} else {
			throw new IllegalStateException(String.format(
					"The class '%s' doesn't extend '%s'. " + "Make your implementation for the method '%s'.",
					getClass().getName(), Component.class.getSimpleName(), "addStartListener"));
		}
	}

	public Registration addStopListener(ComponentEventListener<StopEvent> listener) {
		if (this instanceof Component) {
			return ComponentUtil.addListener((Component) this, StopEvent.class, (ComponentEventListener) listener);
		} else {
			throw new IllegalStateException(String.format(
					"The class '%s' doesn't extend '%s'. " + "Make your implementation for the method '%s'.",
					getClass().getName(), Component.class.getSimpleName(), "addStopListener"));
		}
	}
	
}
