package org.vaadin.sudebi;

import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.template.Id;

@Tag("audio-element")
@JsModule("./audio-element.ts")
public class Audio extends LitTemplate{
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
        System.out.println(getRecordedAudio());
    }

	public String getRecordedAudio() {
		return recordedAudio;
	}

	public void setRecordedAudio(String recordedAudio) {
		this.recordedAudio = recordedAudio;
	}
}
