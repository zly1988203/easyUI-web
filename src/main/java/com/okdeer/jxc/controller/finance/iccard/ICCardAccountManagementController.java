/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.finance.iccard
 *@Author: songwj
 *@Date: 2017年5月19日 上午9:49:28
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */

package com.okdeer.jxc.controller.finance.iccard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName: ICCardAccountManagementController
 * @Description:  一开通账户管理
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年5月19日 上午9:49:28
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.6         	2017年5月19日		  songwj		  一开通账户管理
 */
@Controller
@RestController
@RequestMapping("iccard/account/management")
public class ICCardAccountManagementController {

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView iccardSetting() {
		return new ModelAndView("finance/iccard/iccardAccountList");
	}
	
	@RequestMapping(value = "/icCardExtracted", method = RequestMethod.GET)
	public ModelAndView icCardExtracted() {
		return new ModelAndView("finance/iccard/iccardExtracted");
	}
	
	@RequestMapping(value = "/icCardRecharge", method = RequestMethod.GET)
	public ModelAndView icCardRecharge() {
		return new ModelAndView("finance/iccard/iccardRecharge");
	}
}