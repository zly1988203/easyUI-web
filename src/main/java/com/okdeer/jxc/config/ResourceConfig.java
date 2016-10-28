
package com.okdeer.jxc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@ImportResource({ "classpath:/META-INF/spring-jxc-dubbo.xml", "classpath:/META-INF/spring-jxc-servlet.xml" })
public class ResourceConfig {
}
