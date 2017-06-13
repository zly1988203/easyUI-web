package com.okdeer.jxc.controller.settle.supplier;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.enums.OperateTypeEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.settle.supplier.service.SupplierChainService;
import com.okdeer.jxc.settle.supplier.vo.SupplierChainDetailVo;
import com.okdeer.jxc.settle.supplier.vo.SupplierChainVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 *<p></p>
 * ClassName: SupplierChainController 
 * @Description: 供应商联营账单
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierChain")
public class SupplierChainController extends BasePrintController<SupplierChainController, SupplierChainDetailVo> {

    /**
     * SupplierChainService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierChainService supplierChainService;

    /**
     * 
     * @Description: 供应商联营账单列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chainList")
    public ModelAndView chainList(Model model) {
        return new ModelAndView("settle/supplier/chain/chainList");
    }

    /**
     * 
     * @Description: 供应商联营账单新增页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chainAdd")
    public ModelAndView chainAdd(Model model) {
        return new ModelAndView("settle/supplier/chain/chainAdd");
    }

    /**
     * 
     * @Description: 供应商联营账单编辑页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chainEdit")
    public ModelAndView chainEdit(Model model, String id) {
        SupplierChainVo chainVo = supplierChainService.getSupplierChainVoById(id);
        model.addAttribute("chainVo", chainVo);
        return new ModelAndView("settle/supplier/chain/chainEdit");
    }

    /**
     * 
     * @Description: 供应商联营账单详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chainView")
    public ModelAndView chainView(Model model, String id) {
        SupplierChainVo chainVo = supplierChainService.getSupplierChainVoById(id);
        model.addAttribute("chainVo", chainVo);
        return new ModelAndView("settle/supplier/chain/chainView");
    }

    /**
     * @Description: 查询列表
     * @param vo 参数VO
     * @param pageNumber 页码
     * @param pageSize 页数
     * @return PageUtils
     * @author xuyq
     * @date 2017年3月7日
     */
    @RequestMapping(value = "getChainList", method = RequestMethod.POST)
    public PageUtils<SupplierChainVo> getChainList(SupplierChainVo vo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            vo.setBranchCompleCode(getCurrBranchCompleCode());
            LOG.debug(LogConstant.OUT_PARAM, vo.toString());
            PageUtils<SupplierChainVo> chainList = supplierChainService.getChainPageList(vo);
            LOG.debug(LogConstant.PAGE, chainList.toString());
            return chainList;
        } catch (Exception e) {
            LOG.error("供应商联营账单列表信息异常:{}", e);
        }
        return PageUtils.emptyPage();
    }

    /***
     * 
     * @Description:  获取明细信息
     * @param vo vo
     * @return List
     * @author xuyq
     * @date 2017年2月19日
     */
    @RequestMapping(value = "/chainFormDetailList", method = RequestMethod.POST)
    public List<SupplierChainDetailVo> chainFormDetailList(SupplierChainVo vo) {
        LOG.debug(LogConstant.OUT_PARAM, vo);
        List<SupplierChainDetailVo> detailList = new ArrayList<SupplierChainDetailVo>();
        try {
            detailList = supplierChainService.getChainFormDetailList(vo);
        } catch (Exception e) {
            LOG.error("获取单据明细信息异常:{}", e);
        }
        return detailList;
    }

    /**
     * @Description: 保存供应商联营账单
     * @param data 保存JSON数据
     * @return RespJson
     * @author xuyq
     * @date 2017年3月9日
     */
    @RequestMapping(value = "/saveChainForm", method = RequestMethod.POST)
    public RespJson saveChainForm(String data) {
        RespJson respJson = RespJson.success();
        LOG.debug("保存供应商联营账单 ：data{}" + data);
        SysUser user = UserUtil.getCurrentUser();
        if (user == null) {
            respJson = RespJson.error("用户不能为空！");
            return respJson;
        }
        try {
            if (StringUtils.isBlank(data)) {
                respJson = RespJson.error("保存数据不能为空！");
                return respJson;
            }
            SupplierChainVo vo = JSON.parseObject(data, SupplierChainVo.class);
            if (OperateTypeEnum.ADD.getIndex().equals(vo.getOperateType())) {
                // 新增
                vo.setCreateUserId(user.getId());
                vo.setCreateTime(DateUtils.getCurrDate());
                vo.setUpdateUserId(user.getId());
                vo.setUpdateTime(DateUtils.getCurrDate());
                // 生成单号时，取当前登录账号机构编码
                vo.setBranchCode(getCurrBranchCode());
                return supplierChainService.saveChainForm(vo);
            } else {
                // 修改
                vo.setUpdateUserId(user.getId());
                vo.setUpdateTime(DateUtils.getCurrDate());
                return supplierChainService.updateChainForm(vo);
            }
        } catch (Exception e) {
            LOG.error("保存供应商联营账单：{}", e);
            respJson = RespJson.error("保存供应商联营账单异常!");
        }
        return respJson;
    }

    /**
     * @Description: 审核供应商联营账单
     * @param data 保存JSON数据
     * @return RespJson
     * @author xuyq
     * @date 2017年3月11日
     */
    @RequestMapping(value = "/auditChainForm", method = RequestMethod.POST)
    public RespJson auditChainForm(String data) {
        RespJson respJson = RespJson.success();
        try {
            LOG.debug("审核供应商联营账单详情 ：data{}" + data);
            SysUser user = UserUtil.getCurrentUser();
            if (user == null) {
                respJson = RespJson.error("用户不能为空！");
                return respJson;
            }
            if (StringUtils.isBlank(data)) {
                respJson = RespJson.error("审核数据不能为空！");
                return respJson;
            }
            SupplierChainVo vo = JSON.parseObject(data, SupplierChainVo.class);
            if (vo == null) {
                respJson = RespJson.error("审核数据不能为空！");
                return respJson;
            }
            vo.setAuditUserId(user.getId());
            vo.setAuditTime(DateUtils.getCurrDate());
            return supplierChainService.auditChainForm(vo);
        } catch (Exception e) {
            LOG.error("审核供应商联营账单详情:{}", e);
            respJson = RespJson.error("账单审核异常！");
        }
        return respJson;
    }

    /**
     * 
     * @Description: 供应商联营账单删除
     * @param ids 记录IDS
     * @return RespJson
     * @author xuyq
     * @date 2017年2月19日
     */
    @RequestMapping(value = "deleteChainForm", method = RequestMethod.POST)
    public RespJson deleteChainForm(@RequestParam(value = "ids[]") List<String> ids) {
        RespJson resp;
        try {
            return supplierChainService.deleteChainForm(ids);
        } catch (Exception e) {
            LOG.error("删除账单异常:{}", e);
            resp = RespJson.error("删除账单异常！");
        }
        return resp;
    }
    
    /***
     * 
     * @Description: 校验计算时间
     * @param data
     * @return RespJson
     * @author xuyq
     * @date 2017年6月3日
     */
    @RequestMapping(value = "/checkChainCalculateDate", method = RequestMethod.POST)
    public RespJson checkChainCalculateDate(SupplierChainVo vo) {
        RespJson resp = RespJson.success();
        if (supplierChainService.checkChainCalculateDate(vo)) {
            resp = RespJson.error("当前计算时间段已有机构存在联营账单，请重新选择机构或计算时间！");
        }
        return resp;
    }
    /**
     * 
     * (non-Javadoc)
     * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintReplace(java.lang.String)
     */
    @Override
    protected Map<String, Object> getPrintReplace(String formId) {
        Map<String, Object> replaceMap = new HashMap<String, Object>();
        SupplierChainVo vo = supplierChainService.getSupplierChainVoById(formId);
        if (null != vo) {
            replaceMap.put("_订单编号", vo.getFormNo());
            replaceMap.put("formNo", vo.getFormNo());
            replaceMap.put("supplierName", vo.getSupplierName());
            replaceMap.put("supplierContcat", vo.getSupplierContcat());
            replaceMap.put("supplierPhoneMobile",
                    vo.getSupplierMobile()
                            + ((StringUtils.isNotBlank(vo.getSupplierMobile())
                                    && StringUtils.isNotBlank(vo.getSupplierPhone())) ? "/" : "")
                            + vo.getSupplierPhone());
            replaceMap.put("sumSaleAmount", vo.getSumSaleAmount());
            replaceMap.put("sumSupplierAmount", vo.getSumSupplierAmount());
            replaceMap.put("supplierMinAmount", vo.getSupplierMinAmount());
            replaceMap.put("sumTaxAmount", vo.getSumTaxAmount());
            replaceMap.put("supplierRate", vo.getSupplierRate());
            replaceMap.put("supplierTaxAmount", vo.getSupplierTaxAmount());
            replaceMap.put("otherAmount", vo.getOtherAmount());
            replaceMap.put("actualAmount", vo.getActualAmount());
            replaceMap.put("remark", vo.getRemark());
            replaceMap.put("saleCount", vo.getSaleCount());
            replaceMap.put("divideAmount", vo.getDivideAmount());
            replaceMap.put("branchName", vo.getBranchName());
            replaceMap.put("createUserName", vo.getCreateUserName());
            replaceMap.put("createTime", vo.getCreateTime() != null ? DateUtils.getFullStr(vo.getCreateTime()) : "");
            replaceMap.put("updateUserName", vo.getUpdateUserName());
            replaceMap.put("updateTime", vo.getUpdateTime() != null ? DateUtils.getFullStr(vo.getUpdateTime()) : "");
            replaceMap.put("auditUserName", vo.getAuditUserName());
            replaceMap.put("auditTime", vo.getAuditTime() != null ? DateUtils.getFullStr(vo.getAuditTime()) : "");
            replaceMap.put("payTime", vo.getPayTime());
            replaceMap.put("beginDate", vo.getBeginDate());
            replaceMap.put("endDate", vo.getEndDate());
        }
        return replaceMap;
    }

    /**
     * 
     * (non-Javadoc)
     * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintDetail(java.lang.String)
     */
    @Override
    protected List<SupplierChainDetailVo> getPrintDetail(String formId) {
        SupplierChainVo vo = new SupplierChainVo();
        vo.setId(formId);
        vo.setOperateType(OperateTypeEnum.MID.getIndex());
        return supplierChainService.getChainFormDetailList(vo);
    }

    /**
     * 
     * (non-Javadoc)
     * @see com.okdeer.jxc.common.controller.BasePrintController#getBranchSpecService()
     */
    @Override
    protected BranchSpecServiceApi getBranchSpecService() {
        return null;
    }
}