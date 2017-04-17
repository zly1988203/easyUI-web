package com.okdeer.jxc.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.google.common.collect.Maps;
import com.okdeer.jxc.message.service.MessageService;
import com.okdeer.jxc.utils.UserUtil;

@Controller
//@RequestMapping()
public class IndexController {
	
    @Reference(version = "1.0.0", check = false)
    private MessageService messageService;

    @PostConstruct
    private void init() {
	permissions.put("JxcStockException:search", "JxcStockException");
	
	permissions.put("JxcPurchaseReceipt:search", "JxcPurchaseReceipt");
	
	permissions.put("JxcDeliverDI:search", "JxcDeliverDI");
	
	// 调价单审核权限
	permissions.put("JxcPriceAdjust:audit", "jxcPriceAdjust");
	// 领用单权限
	permissions.put("JxcStockLead:audit", "jxcStockLead");
	// 门店调价单
	permissions.put("JxcBranchPriceAdjust:audit", "jxcBranchPriceAdjust");
	// 组合拆分单
	permissions.put("JxcCombineSplit:audit", "jxcCombineSplit");
	// 采购订单
	permissions.put("JxcPurchaseOrder:audit", "jxcPurchaseOrder");
	// 活动管理
	permissions.put("activityList:audit", "activityList");
	// 采购收货
	permissions.put("JxcPurchaseReceipt:audit", "jxcPurchaseReceipt");
	// 新品审核
	permissions.put("JxcNewGoodsApply:audit", "jxcNewGoodsApply");
	// 采购退货
	permissions.put("JxcPurchaseRefund:audit", "jxcPurchaseRefund");
	// 要货申请
	permissions.put("JxcDeliverDA:audit", "jxcDeliverDA");
	// 成本调价单
	permissions.put("JxcCostAdjust:audit", "jxcCostAdjust");
	// 退货申请
	permissions.put("JxcDeliverDR:audit", "jxcDeliverDR");
	// 报损单
	permissions.put("JxcStockReimburse:audit", "jxcStockReimburse");
	// 配送入库
	permissions.put("JxcDeliverDI:audit", "jxcDeliverDI");
	// 配送出库
	permissions.put("JxcDeliverDO:audit", "jxcDeliverDO");
	// 商品调价单
	permissions.put("JxcOverdueApply:audit", "jxcOverdueApply");
	// 店间配送
	permissions.put("JxcDeliverDD:audit", "jxcDeliverDD");
	// 库存调整单
	permissions.put("JxcStockAdjust:audit", "jxcStockAdjust");

    }

    private static Map<String, String> permissions = Maps.newLinkedHashMap();

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView toReport() {
	Map<String, Object> map = Maps.newHashMap();
	for (Map.Entry<String, String> entry : permissions.entrySet()) {
	    if (isPermitted(entry.getKey())) {
		map.put(entry.getValue(), Boolean.TRUE);
	    } else {
		map.put(entry.getValue(), Boolean.FALSE);
	    }
	}
	map.put("branchId", UserUtil.getCurrBranchId());
	map.put("branchCompleCode", UserUtil.getCurrBranchCompleCode());
	int allCount = messageService.countAllMessage(map);

	return new ModelAndView("index", new HashMap<String, String>() {

	    private static final long serialVersionUID = 1L;
	    {
		put("allMessageCount", allCount + "");
	    }
	});
    }

    @RequestMapping(value = "/sessionKeeper", method = RequestMethod.GET)
    public String toKeepSession() {
	return "sessionKeeper";
    }

    private boolean isPermitted(String p) {
	boolean returnboolean = SecurityUtils.getSubject() != null && SecurityUtils.getSubject().isPermitted(p);
	return returnboolean;
    }
}
