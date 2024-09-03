package org.vaadin.sudebi;

import org.vaadin.sudebi.Audio;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

/**
 * Test view for manual and automated testing of the component.
 *
 */
@Route("")
public class ExampleView extends VerticalLayout {

	public ExampleView() {
		Audio audio = new Audio();
		add(audio);
	}
}
