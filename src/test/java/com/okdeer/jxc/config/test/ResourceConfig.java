
package com.okdeer.jxc.config.test;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.redis.core.RedisTemplate;

import com.okdeer.base.redis.RedisTemplateWrapperImpl;
import com.okdeer.base.redis.util.KryoRedisSerializer;

@Configuration
@ImportResource({ "classpath:/test/spring-jxc-dubbo.xml", "classpath:/test/spring-jxc-servlet.xml" ,"classpath:/test/spring-jxc-redis.xml"})
public class ResourceConfig {
    /**
	 * DESC: 初始化RedisTemplateWrapper
	 * @author LIU.W
	 * @param redisTemplate
	 * @return
	 */
	@Bean(name = "redisTemplateWrapper")
	public <K, V> RedisTemplateWrapperImpl<K, V> redisTemplateWrapper(RedisTemplate<K, V> redisTemplate) {
		RedisTemplateWrapperImpl<K, V> redisTemplateWrapper = new RedisTemplateWrapperImpl<K, V>();
		redisTemplateWrapper.setRedisTemplate(redisTemplate);
		redisTemplateWrapper.setValueSerializer(new KryoRedisSerializer<V>());
		return redisTemplateWrapper;
	}
}
