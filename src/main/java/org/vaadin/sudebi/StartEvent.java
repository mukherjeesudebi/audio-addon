package org.vaadin.sudebi;

import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.DomEvent;

@DomEvent(value = "start")
public class StartEvent extends ComponentEvent<Audio> {

	public StartEvent(Audio source, boolean fromClient) {
		super(source, fromClient);
	}
}
