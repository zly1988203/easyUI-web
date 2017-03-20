/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.util.ShiroTestUtils
 *@Author: songwj
 *@Date: 2017年3月17日 上午10:38:53
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.util;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.subject.support.SubjectThreadState;
import org.apache.shiro.util.ThreadState;
import org.mockito.Mockito;

/**
 * @ClassName: OverdueFormController
 * @Description: 在单元测试中的Shiro工具类
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年3月17日 上午10:38:53
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.3         	2017年3月17日	  songwj		                在单元测试中的Shiro工具类
 */
public class ShiroTestUtils {

	private static ThreadState threadState;

	/**
	 * 用Mockito快速創建一個已認證的用户.
	 */
	public static void mockSubject(Object principal) {
		Subject subject = Mockito.mock(Subject.class);
		Mockito.when(subject.isAuthenticated()).thenReturn(true);
		Mockito.when(subject.getPrincipal()).thenReturn(principal);

		bindSubject(subject);
	}

	/**
	 * 綁定Subject到當前線程.
	 */
	protected static void bindSubject(Subject subject) {
		clearSubject();
		threadState = new SubjectThreadState(subject);
		threadState.bind();
	}

	/**
	 * 清除當前線程中的Subject.
	 */
	public static void clearSubject() {
		if (threadState != null) {
			threadState.clear();
			threadState = null;
		}
	}
}
