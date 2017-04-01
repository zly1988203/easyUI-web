/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.message
 *@Author: songwj
 *@Date: 2017年3月31日 上午9:49:28
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.message;

import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Maps;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.utils.UserUtil;

/**
 * @ClassName: MessageController
 * @Description: 在线消息提醒
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年3月31日 上午9:49:28
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.5         	2017年3月31日		  songwj		在线消息提醒 
 */
@RestController
@RequestMapping("message")
public class MessageController {

    private static Map<String,String> permissions = Maps.newHashMap();
    
    @PostConstruct
    private void init(){
	//调价单审核权限
	permissions.put("JxcPriceAdjust:audit","jxcPriceAdjust");
	//领用单权限
	permissions.put("JxcStockLead:audit","jxcStockLead");
	//门店调价单
	permissions.put("JxcBranchPriceAdjust:audit","jxcBranchPriceAdjust");
	//组合拆分单          
	permissions.put("JxcCombineSplit:audit","jxcCombineSplit");
	//采购订单
	permissions.put("JxcPurchaseOrder:audit","jxcPurchaseOrder");
	//活动管理
	permissions.put("activityList:audit","activityList");
	//采购收货
	permissions.put("JxcPurchaseReceipt:audit","jxcPurchaseReceipt");
	//新品审核
	permissions.put("JxcNewGoodsApply:audit","jxcNewGoodsApply");
	//采购退货
	permissions.put("JxcPurchaseRefund:audit","jxcPurchaseRefund");
	//要货申请
	permissions.put("JxcDeliverDA:audit","jxcDeliverDA");
	//成本调价单
	permissions.put("JxcCostAdjust:audit","jxcCostAdjust");
	//退货申请
	permissions.put("JxcDeliverDR:audit","jxcDeliverDR");
	//报损单
	permissions.put("JxcStockReimburse:audit","jxcStockReimburse");
	//配送入库
	permissions.put("JxcDeliverDI:audit","jxcDeliverDI");
	//配送出库
	permissions.put("JxcDeliverDO:audit","jxcDeliverDO");
	//商品调价单
	permissions.put("JxcOverdueApply:audit","jxcOverdueApply");
	//店间配送
	permissions.put("JxcDeliverDD:audit","jxcDeliverDD");
	//库存调整单
	permissions.put("JxcStockAdjust:audit","jxcStockAdjust");
    }
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public RespJson allCount() {
	Map<String, Object> map = Maps.newHashMap();
	for (Map.Entry<String, String> entry : permissions.entrySet()) {
	    if(isPermitted(entry.getKey())){
		map.put(entry.getValue(), Boolean.TRUE);
	    }else{
		map.put(entry.getValue(), Boolean.FALSE);
	    }
	}
	map.put("branchId", UserUtil.getCurrBranchId());
	map.put("branchCompleCode", UserUtil.getCurrBranchCompleCode());
	return RespJson.success();
    }
	
    private Subject getSubject(){
	return SecurityUtils.getSubject();
    }
    
    private boolean isPermitted(String p) {
        return getSubject() != null && getSubject().isPermitted(p);
    }
}
