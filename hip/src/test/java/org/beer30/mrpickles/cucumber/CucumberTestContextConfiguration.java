package org.beer30.mrpickles.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import org.beer30.mrpickles.IntegrationTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@IntegrationTest
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
