package org.vaadin.sudebi;

import org.junit.Assert;
import org.junit.Test;

/**
 * Integration test for the component.
 *
 */
public class ExampleViewIT extends AbstractTestBenchIntegrationTest {

	public ExampleViewIT() {
		super();
	}

	@Test
	public void componentIsPresent() {
		AudioElement elem = $(AudioElement.class).first();
		Assert.assertNotNull(elem);
	}
}