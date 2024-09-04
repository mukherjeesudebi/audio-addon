package org.vaadin.sudebi;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DomEvent;

@DomEvent(value = "stop")
public class StopEvent extends ComponentEvent<Audio> {

	public StopEvent(Audio source, boolean fromClient) {
		super(source, fromClient);
	}

}
