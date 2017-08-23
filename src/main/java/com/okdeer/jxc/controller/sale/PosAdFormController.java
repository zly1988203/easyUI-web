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
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.pos.service.PosAdServiceApi;
import com.okdeer.jxc.pos.vo.PosAdFormDetailVo;
import com.okdeer.jxc.pos.vo.PosAdFormVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
@RequestMapping("pos/ad/form")
public class PosAdFormController extends BaseController<PosAdFormController> {

    @Reference(version = "1.0.0", check = false)
    private PosAdServiceApi posAdServiceApi;

    /**
     * @Fields uploadToken : 文件上传命名空间
     */
    @Value("${fileUploadToken}")
    private String uploadToken;

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

    @RequestMapping(value = "/list")
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/ad/adlist", model);
    }
    
    @RequestMapping(value = "/add")
    public ModelAndView add() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/ad/addAd", model);
    }

    @RequestMapping(value = "edit/{id}")
    public ModelAndView edit(@PathVariable(value = "id")String id) {
        Map<String, Object> model = Maps.newHashMap();
        model.put("form",posAdServiceApi.getPosAdByFormId(id));

        List<PosAdFormDetailVo> posGroupKeys = posAdServiceApi.getPosAdDetailList(id);
        for (int i = 0,length=posGroupKeys.size();i<length;++i){
            PosAdFormDetailVo vo = posGroupKeys.get(i);
            vo.setPicUrl(filePrefix+"/"+vo.getPicUrl());
            posGroupKeys.set(i,vo);
        }
        model.put("detail" ,posGroupKeys);
        return new ModelAndView("sale/pos/ad/editAd", model);
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public PageUtils<PosAdFormVo> list(PosAdFormVo vo,
                                       @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                       @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            PageUtils<PosAdFormVo> posWheelsurfFormVoPageUtils = this.posAdServiceApi.getPosAdList(vo);
            //return RespJson.success(posWheelsurfFormVoPageUtils);
            return posWheelsurfFormVoPageUtils;
        }catch (Exception e){
            LOG.error("获取POS客屏广告列表失败!" ,e);
            //return RespJson.error("获取POS客屏活动列表失败!" );
        }
        return PageUtils.emptyPage();
    }

    @RequestMapping(value = "/del/{id}", method = RequestMethod.POST)
    public RespJson del(@PathVariable(value = "id")String id) {
        try {
            posAdServiceApi.delPosAdFormAndDetail(id);
            return RespJson.success();
        }catch (Exception e){
            LOG.error("删除POS客屏广告失败!" ,e);
            return RespJson.error("删除POS客屏广告失败!" );
        }
    }

    @RequestMapping(value = "/over", method = RequestMethod.POST)
    public RespJson over(String formId){
        try {
            PosAdFormVo vo = new PosAdFormVo();
            vo.setId(formId);
            vo.setAuditStatus(2);
            vo.setAuditTime(new Date());
            vo.setAuditUserId(getCurrUserId());
            posAdServiceApi.updatePosAdForm(vo);
            return RespJson.success();
        }catch (Exception e){
            LOG.error("终止POS客屏广告失败!" ,e);
            return RespJson.error("终止POS客屏广告失败!" );
        }
    }

    @RequestMapping(value = "/audit", method = RequestMethod.POST)
    public RespJson audit(String formId){
        try {
            PosAdFormVo vo = new PosAdFormVo();
            vo.setId(formId);
            vo.setAuditStatus(1);
            vo.setAuditTime(new Date());
            vo.setAuditUserId(getCurrUserId());
            posAdServiceApi.updatePosAdForm(vo);
            return RespJson.success();
        }catch (Exception e){
            LOG.error("审核POS客屏广告失败!" ,e);
            return RespJson.error("审核POS客屏广告失败!" );
        }
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public RespJson save(HttpServletRequest request,String mainImg,@RequestParam(value = "imgs[]")  String[] imgs) {
        try {
            PosAdFormVo vo = JSON.parseObject(request.getParameter("formObj"),PosAdFormVo.class);
            vo.setBranchCode(getCurrBranchCode());
            vo.setCreateUserId(getCurrUserId());
            vo.setCreateUserName(getCurrentUser().getUserName());
            vo.setMainImg(StringUtils.replace(mainImg,filePrefix+"/",""));
            if(imgs!=null&&imgs.length>0) {
                String[] datas = new String[3];
                for (int i = 0; i < imgs.length; ++i) {
                    datas[i] = StringUtils.replace(imgs[i], filePrefix + "/", "");
                }
                vo.setImgs(datas);
            }
            String id = posAdServiceApi.insertPosAdFormAndDetail(vo);
            return RespJson.success(new HashMap<String,String>(){
                {
                    put("id",id);
                }
            });
        }catch (Exception e){
            LOG.error("保存POS客屏广告失败!" ,e);
            return RespJson.error("保存POS客屏广告失败!" );
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public RespJson update(HttpServletRequest request,String mainImg,@RequestParam(value = "imgs[]")  String[] imgs) {
        try {

            PosAdFormVo vo = JSON.parseObject(request.getParameter("formObj"),PosAdFormVo.class);
            vo.setUpdateTime(new Date());
            vo.setUpdateUserId(getCurrUserId());
            vo.setMainImg(StringUtils.replace(mainImg,filePrefix+"/",""));
            if(imgs!=null&&imgs.length>0) {
                String[] datas = new String[3];
                for (int i = 0; i < imgs.length; ++i) {
                    datas[i] = StringUtils.replace(imgs[i], filePrefix + "/", "");
                }
                vo.setImgs(datas);
            }
            posAdServiceApi.updatePosAdFormAndDetail(vo);
            return RespJson.success();
        }catch (Exception e){
            LOG.error("保存POS客屏广告失败!" ,e);
            return RespJson.error("保存POS客屏广告失败!" );
        }
    }

}
