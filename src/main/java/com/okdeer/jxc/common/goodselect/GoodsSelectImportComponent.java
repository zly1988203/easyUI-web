/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.common.goodselect;

import static org.junit.Assert.*;

import java.io.InputStream;
import java.util.List;

import org.junit.Test;
import org.springframework.stereotype.Component;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.service.GoodsSelectServiceApi;
import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

import net.sf.json.JSONObject;


/**
 * ClassName: GoodsSelectCompent 
 * @Description: TODO
 * @author xiaoj02
 * @date 2016年10月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Component
public class GoodsSelectImportComponent {
	
	@Reference(version = "1.0.0", check = false)
	private GoodsSelectServiceApi goodsSelectServiceApi;
	
	//采购货号导入{货号,数量，是否赠品}
	public static final String[] purchase_sku_code = {"skuCode","num","isGift"};
	//采购条码导入{条码,数量，是否赠品}
	public static final String[] purchase_bar_code = {"skuCode","num","isGift"};

	/**
	 * @author xiaoj02
	 * @date 2016年10月13日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoods(String fileName, InputStream is, String[] fields, T entity, String branchId, GoodSelectImportBusinessValid businessValid) {
		//读取excel
		List<JSONObject> excelList = ExcelReaderUtil.readExcel(fileName, is, fields);
		
		//构建数据过滤对象
		GoodsSelectImportHandle goodsSelectImportHandle = new GoodsSelectImportHandle(excelList, fields, businessValid);
		
		//获取已验证成功的数据的货号
		List<String> list = goodsSelectImportHandle.getExcelSuccessSkuCode();
		
		//根据货号查询商品
		List<GoodsSelect> dbList = goodsSelectServiceApi.queryListBySkuCode(list.toArray(new String[list.size()]), branchId);
		
		//与数据库对比,标记处该店铺中未查询到的数据
		goodsSelectImportHandle.checkWithDataBase(dbList);
		
		Integer successNum = goodsSelectImportHandle.getExcelListSuccessData().size();
		
		Integer errorNum = goodsSelectImportHandle.getExcelListErrorData().size();
		
		StringBuffer message = new StringBuffer();
		message.append("成功：");
		message.append(successNum);
		message.append("条,");
		message.append("失败：");
		message.append(errorNum);
		message.append("条。");
		
		GoodsSelectImportVo goodsSelectImportVo = new GoodsSelectImportVo();
		
		goodsSelectImportVo.setList(dbList);
		
		goodsSelectImportVo.setMessage(message.toString());
		
		goodsSelectImportVo.setErrorFileUrl("http://功能还没实现，等我下午来写");
		
		return goodsSelectImportVo;
	}
	
	

}
