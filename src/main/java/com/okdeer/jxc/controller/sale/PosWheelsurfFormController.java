/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.sale
 * @author songwj
 * @date 2017年08月16 18:37
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.sale;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.google.common.collect.Maps;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.service.FileUploadService;
import com.okdeer.jxc.common.utils.JsonMapper;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.pos.service.PosWheelsurfServiceApi;
import com.okdeer.jxc.pos.vo.PosWheelsurfFormDetailVo;
import com.okdeer.jxc.pos.vo.PosWheelsurfFormVo;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 *
 * @ClassName: PosAdFormController
 * @Description: TODO
 * @project okdeer
 * @author songwj
 * @date 2017年08月16 18:37
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.8          2017年08月16   songwj             TODO
 */
@RestController
@RequestMapping("pos/wheelsurf/form")
public class PosWheelsurfFormController extends BaseController<PosWheelsurfFormController> {

	@Reference(version = "1.0.0", check = false)
	PosWheelsurfServiceApi posWheelsurfServiceApi;

	@Resource
	FileUploadService fileUploadService;


	/**
	 * @Fields filePrefix : 七牛文件路径前缀
	 */
	@Value("${filePrefix}")
	private String filePrefix;

	private static Map<String, String> images = Maps.newHashMap();

	@PostConstruct
	private void init() {
		images.put("png","png");
		images.put("jpg","jpg");
		images.put("bmp","bmp");
		images.put("gif","gif");
		images.put("jpeg","jpeg");
	}

	/**
	 * @Fields uploadToken : 文件上传命名空间
	 */
	@Value("${fileUploadToken}")
	private String uploadToken;


    @RequestMapping(value = "/list")
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/wheelsurf/wheelsurflist", model);
    }
    
	/**
	 * 跳转到新增页面
	 */
	@RequestMapping(value = "add")
	public ModelAndView add() {
		 Map<String, String> model = Maps.newHashMap();
		return new ModelAndView("sale/pos/wheelsurf/addWheelsurf",model);
	}

	@RequestMapping(value = "copy/{id}")
	public ModelAndView copy(@PathVariable(value = "id")String id) {
		Map<String, Object> model = Maps.newHashMap();
		model.put("form",posWheelsurfServiceApi.getPosWheelsurfByFormId(id));
		return new ModelAndView("sale/pos/wheelsurf/addWheelsurf",model);
	}

	/**
	 * 跳转到编辑页面
	 */
	@RequestMapping(value = "edit/{id}")
	public ModelAndView edit(@PathVariable(value = "id")String id) {
		try {
			Map<String, Object> model = Maps.newHashMap();
			model.put("form",posWheelsurfServiceApi.getPosWheelsurfByFormId(id));
			return new ModelAndView("sale/pos/wheelsurf/editWheelsurf",model);
		}catch (Exception e){
			LOG.error("编辑POS客屏活动失败!",e);
		}
		return new ModelAndView("sale/pos/wheelsurf/editWheelsurf");
	}

	@RequestMapping(value = "edit/detail/{id}")
	public Map<String, List<PosWheelsurfFormDetailVo>> editDetail(@PathVariable(value = "id")String id) {
		try {
			Map<String, List<PosWheelsurfFormDetailVo>> model = Maps.newHashMap();
			List<PosWheelsurfFormDetailVo> posGroupKeys = posWheelsurfServiceApi.getPosWheelsurfDetailList(id);
			for (int i = 0,length=posGroupKeys.size();i<length;++i){
				PosWheelsurfFormDetailVo vo = posGroupKeys.get(i);
				vo.setPicUrl(filePrefix+"/"+vo.getPicUrl());
				posGroupKeys.set(i,vo);
			}
			model.put("detail" ,posGroupKeys);
			return model;
		}catch (Exception e){
			LOG.error("编辑POS客屏活动失败!",e);
		}
		return Collections.emptyMap();
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public PageUtils<PosWheelsurfFormVo> list(PosWheelsurfFormVo vo,
						 @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
						 @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<PosWheelsurfFormVo> posWheelsurfFormVoPageUtils = this.posWheelsurfServiceApi.getPosWheelsurfList(vo);
			//return RespJson.success(posWheelsurfFormVoPageUtils);
			return posWheelsurfFormVoPageUtils;
		}catch (Exception e){
			LOG.error("获取POS客屏活动列表失败!" ,e);
			//return RespJson.error("获取POS客屏活动列表失败!" );
		}
		return PageUtils.emptyPage();
	}

	@RequestMapping(value = "/del/{id}", method = RequestMethod.POST)
	public RespJson del(@PathVariable(value = "id")String id) {
		try {
			posWheelsurfServiceApi.delPosWheelsurfFormAndDetail(id);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("删除POS客屏活动失败!" ,e);
			return RespJson.error("删除POS客屏活动失败!" );
		}
	}

	@RequestMapping(value = "/over", method = RequestMethod.POST)
	public RespJson over(String formId){
		try {
			PosWheelsurfFormVo vo = new PosWheelsurfFormVo();
			vo.setId(formId);
			vo.setAuditStatus(2);
			vo.setAuditTime(new Date());
			vo.setAuditUserId(getCurrUserId());
			vo.setAuditUerName(getCurrentUser().getUserName());
			posWheelsurfServiceApi.updatePosWheelsurfForm(vo);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("终止POS客屏活动失败!" ,e);
			return RespJson.error("终止POS客屏活动失败!" );
		}
	}

	@RequestMapping(value = "/audit", method = RequestMethod.POST)
	public RespJson audit(String formId){
		try {
			PosWheelsurfFormVo vo = new PosWheelsurfFormVo();
			vo.setId(formId);
			vo.setAuditStatus(1);
			vo.setAuditTime(new Date());
			vo.setAuditUserId(getCurrUserId());
			vo.setAuditUerName(getCurrentUser().getUserName());
			posWheelsurfServiceApi.updatePosWheelsurfForm(vo);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("审核POS客屏活动失败!" ,e);
			return RespJson.error("审核POS客屏活动失败!" );
		}
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public RespJson update(HttpServletRequest request) {
		try {

			List<PosWheelsurfFormDetailVo> posGroupKeys = JsonMapper.nonDefaultMapper().fromJson(request.getParameter("list"),JsonMapper.nonDefaultMapper().contructCollectionType(ArrayList.class, PosWheelsurfFormDetailVo.class));
			for (int i = 0,length=posGroupKeys.size();i<length;++i){
				PosWheelsurfFormDetailVo vo = posGroupKeys.get(i);
				vo.setPicUrl(StringUtils.replace(vo.getPicUrl(),filePrefix+"/",""));
				posGroupKeys.set(i,vo);
			}
			PosWheelsurfFormVo vo = JSON.parseObject(request.getParameter("formObj"),PosWheelsurfFormVo.class);
			vo.setUpdateTime(new Date());
			vo.setUpdateUserId(getCurrUserId());
			posWheelsurfServiceApi.updatePosWheelsurfFormAndDetail(vo,posGroupKeys);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("保存POS客屏活动失败!" ,e);
			return RespJson.error("保存POS客屏活动失败!" );
		}
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public RespJson save(HttpServletRequest request) {
		try {

			List<PosWheelsurfFormDetailVo> posGroupKeys = JsonMapper.nonDefaultMapper().fromJson(request.getParameter("list"),JsonMapper.nonDefaultMapper().contructCollectionType(ArrayList.class, PosWheelsurfFormDetailVo.class));
			for (int i = 0,length=posGroupKeys.size();i<length;++i){
				PosWheelsurfFormDetailVo vo = posGroupKeys.get(i);
				vo.setPicUrl(StringUtils.replace(vo.getPicUrl(),filePrefix+"/",""));
				posGroupKeys.set(i,vo);
			}
			PosWheelsurfFormVo vo = JSON.parseObject(request.getParameter("formObj"),PosWheelsurfFormVo.class);
			vo.setBranchCode(getCurrBranchCode());
			vo.setCreateUserId(getCurrUserId());
			vo.setCreateUserName(getCurrentUser().getUserName());
			String id = posWheelsurfServiceApi.insertPosWheelsurfFormAndDetail(vo,posGroupKeys);
			return RespJson.success(new HashMap<String,String>(){
				{
					put("id",id);
				}
			});
		}catch (Exception e){
			LOG.error("保存POS客屏活动失败!" ,e);
			return RespJson.error("保存POS客屏活动失败!" );
		}
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public RespJson upload(MultipartHttpServletRequest request) {
		RespJson respJson;
		try {
			// 最大文件大小
			long maxSize = 1000000;

			if (!ServletFileUpload.isMultipartContent(request)) {
				return RespJson.error("请选择文件。");
			}

			Iterator<String> itr = request.getFileNames();
			MultipartFile mpf = null;
			while (itr.hasNext()) {
				mpf = request.getFile(itr.next());
				if (mpf == null || StringUtils.isEmpty(mpf.getOriginalFilename())) {
					continue;
				}
				// 获取文件名
				String fileName = mpf.getOriginalFilename();
				// 检查文件大小
				if (mpf.getSize() > maxSize) {
					return RespJson.error("上传文件大小超过限制。");
				}
				// 检查扩展名
				String fileExt = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
				if (images.containsKey(StringUtils.lowerCase(fileExt))) {
					return RespJson.error("不支持该文件类型，请上传图片。");
				}
			}

			// 上传文件
			List<String> filePaths = fileUploadService.getFilePaths(request, uploadToken);
			if (CollectionUtils.isEmpty(filePaths)) {
				return RespJson.error("图片上传失败");
			}
			// 返回七牛文件路径
			respJson = RespJson.success();
			respJson.put("filePath", filePrefix + "/" + filePaths.get(0));
		} catch (Exception e) {
			LOG.error("图片上传异常:{}", e);
			respJson = RespJson.error("图片上传失败");
		}
		return respJson;
	}
}
