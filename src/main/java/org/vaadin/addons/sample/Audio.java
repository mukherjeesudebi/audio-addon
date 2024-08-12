package org.vaadin.addons.sample;

import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.littemplate.LitTemplate;
import com.vaadin.flow.component.template.Id;

@Tag("audio-element")
@JsModule("./audio-element.ts")
public class Audio extends LitTemplate{
	 
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
        System.out.println(audio.toString());
    }
}
