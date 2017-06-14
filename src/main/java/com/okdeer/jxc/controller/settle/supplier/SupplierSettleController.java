package com.okdeer.jxc.controller.settle.supplier;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
import com.okdeer.jxc.form.enums.FormStatus;
import com.okdeer.jxc.settle.supplier.service.SupplierSettleService;
import com.okdeer.jxc.settle.supplier.vo.SupplierSettleDetailVo;
import com.okdeer.jxc.settle.supplier.vo.SupplierSettleVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 *<p></p>
 * ClassName: SupplierSettleController 
 * @Description: 供应商结算
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierSettle")
public class SupplierSettleController extends BasePrintController<SupplierSettleController, SupplierSettleDetailVo> {

    /**
     * SupplierSettleService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierSettleService supplierSettleService;

    /**
     * 
     * @Description: 供应商结算列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleList")
    public ModelAndView settleList(Model model) {
        return new ModelAndView("settle/supplier/settle/settleList");
    }

    /**
     * 
     * @Description: 供应商结算新增页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleAdd")
    public ModelAndView settleAdd(Model model) {
        return new ModelAndView("settle/supplier/settle/settleAdd");
    }

    /**
     * 
     * @Description: 供应商结算编辑页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleEdit")
    public ModelAndView settleEdit(Model model, String id) {
        SupplierSettleVo settleVo = supplierSettleService.getSupplierSettleVoById(id);
        model.addAttribute("settleVo", settleVo);
        if (FormStatus.CHECK_SUCCESS.getValue().equals(settleVo.getAuditStatus())) {
            return new ModelAndView("settle/supplier/settle/settleView");
        }
        return new ModelAndView("settle/supplier/settle/settleEdit");
    }

    /**
     * 
     * @Description: 供应商结算详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleView")
    public ModelAndView settleView(Model model, String id) {
        SupplierSettleVo settleVo = supplierSettleService.getSupplierSettleVoById(id);
        model.addAttribute("settleVo", settleVo);
        return new ModelAndView("settle/supplier/settle/settleView");
    }
    
    /**
     * 
     * @Description: 供应商结算详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleViewByNo")
    public ModelAndView settleViewByNo(Model model, String formNo) {
        SupplierSettleVo settleVo = supplierSettleService.getSupplierSettleVoByFormNo(formNo);
        model.addAttribute("settleVo", settleVo);
        return new ModelAndView("settle/supplier/settle/settleView");
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
    @RequestMapping(value = "getSettleList", method = RequestMethod.POST)
    @ResponseBody
    public PageUtils<SupplierSettleVo> getSettleList(SupplierSettleVo vo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            vo.setBranchCompleCode(getCurrBranchCompleCode());
            LOG.debug(LogConstant.OUT_PARAM, vo.toString());
            PageUtils<SupplierSettleVo> settleList = supplierSettleService.getSettlePageList(vo);
            LOG.debug(LogConstant.PAGE, settleList.toString());
            return settleList;
        } catch (Exception e) {
            LOG.error("供应商结算列表信息异常:{}", e);
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
    @RequestMapping(value = "/settleFormDetailList", method = RequestMethod.POST)
    @ResponseBody
    public List<SupplierSettleDetailVo> settleFormDetailList(SupplierSettleVo vo) {
        LOG.debug(LogConstant.OUT_PARAM, vo);
        List<SupplierSettleDetailVo> detailList = new ArrayList<SupplierSettleDetailVo>();
        try {
            detailList = supplierSettleService.getSettleFormDetailList(vo);
        } catch (Exception e) {
            LOG.error("获取单据明细信息异常:{}", e);
        }
        return detailList;
    }

    /**
     * @Description: 保存供应商结算单
     * @param data 保存JSON数据
     * @return RespJson
     * @author xuyq
     * @date 2017年3月9日
     */
    @RequestMapping(value = "/saveSettleForm", method = RequestMethod.POST)
    @ResponseBody
    public RespJson saveSettleForm(String data) {
        RespJson respJson = RespJson.success();
        LOG.debug("保存供应商结算单 ：data{}" + data);
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
            SupplierSettleVo vo = JSON.parseObject(data, SupplierSettleVo.class);
            if (OperateTypeEnum.ADD.getIndex().equals(vo.getOperateType())) {
                // 新增
                vo.setCreateUserId(user.getId());
                vo.setCreateTime(DateUtils.getCurrDate());
                vo.setUpdateUserId(user.getId());
                vo.setUpdateTime(DateUtils.getCurrDate());
                // 生成单号时，取当前登录账号机构编码
                vo.setBranchCode(getCurrBranchCode());
                return supplierSettleService.saveSettleForm(vo);
            } else {
                // 修改
                vo.setUpdateUserId(user.getId());
                vo.setUpdateTime(DateUtils.getCurrDate());
                return supplierSettleService.updateSettleForm(vo);
            }
        } catch (Exception e) {
            LOG.error("保存供应商结算单：{}", e);
            respJson = RespJson.error("保存供应商结算单异常!");
        }
        return respJson;
    }

    /**
     * @Description: 审核供应商结算单
     * @param data 保存JSON数据
     * @return RespJson
     * @author xuyq
     * @date 2017年3月11日
     */
    @RequestMapping(value = "/auditSettleForm", method = RequestMethod.POST)
    @ResponseBody
    public RespJson auditSettleForm(String data) {
        RespJson respJson = RespJson.success();
        try {
            LOG.debug("审核供应商结算单详情 ：data{}" + data);
            SysUser user = UserUtil.getCurrentUser();
            if (user == null) {
                respJson = RespJson.error("用户不能为空！");
                return respJson;
            }
            if (StringUtils.isBlank(data)) {
                respJson = RespJson.error("审核数据不能为空！");
                return respJson;
            }
            SupplierSettleVo vo = JSON.parseObject(data, SupplierSettleVo.class);
            if (vo == null) {
                respJson = RespJson.error("审核数据不能为空！");
                return respJson;
            }
            vo.setAuditUserId(user.getId());
            vo.setAuditTime(DateUtils.getCurrDate());
            return supplierSettleService.auditSettleForm(vo);
        } catch (Exception e) {
            LOG.error("审核供应商结算单详情:{}", e);
            respJson = RespJson.error("账单审核异常！");
        }
        return respJson;
    }

    /**
     * 
     * @Description: 供应商结算删除
     * @param ids 记录IDS
     * @return RespJson
     * @author xuyq
     * @date 2017年2月19日
     */
    @RequestMapping(value = "deleteSettleForm", method = RequestMethod.POST)
    @ResponseBody
    public RespJson deleteSettleForm(@RequestParam(value = "ids[]") List<String> ids) {
        RespJson resp;
        try {
            return supplierSettleService.deleteSettleForm(ids);
        } catch (Exception e) {
            LOG.error("删除账单异常:{}", e);
            resp = RespJson.error("删除账单失败");
        }
        return resp;
    }

    /***
     * 
     * @Description: 查询机构是否存在未审核的结算单
     * @param vo vo
     * @return RespJson
     * @author xuyq
     * @date 2017年6月2日
     */
    @RequestMapping(value = "querySettleStatusNum", method = RequestMethod.POST)
    public RespJson querySettleStatusNum(SupplierSettleVo vo) {
        RespJson resp = RespJson.success();
        // 未审核结算单数
        int unChNum = 0;
        try {
            unChNum = supplierSettleService.querySettleStatusNum(vo);
            resp.put("unChNum", unChNum);
        } catch (Exception e) {
            LOG.error("查询机构是否存在未审核的结算单异常:{}", e);
            resp = RespJson.error("查询机构是否存在未审核的结算单异常");
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
        SupplierSettleVo vo = supplierSettleService.getSupplierSettleVoById(formId);
        if (null != vo) {
            replaceMap.put("_订单编号", vo.getFormNo());
            replaceMap.put("formNo", vo.getFormNo());
            replaceMap.put("supplierName", vo.getSupplierName());
            replaceMap.put("phoneMobile", vo.getPhone()
                    + ((StringUtils.isNotBlank(vo.getPhone()) && StringUtils.isNotBlank(vo.getMobile())) ? "/" : "")
                    + vo.getMobile());
            replaceMap.put("officeAddress", vo.getOfficeAddress());
            replaceMap.put("openAccountBank", vo.getOpenAccountBank());
            replaceMap.put("bankAccount", vo.getBankAccount());
            replaceMap.put("nationalTaxRegNum", vo.getNationalTaxRegNum());
            replaceMap.put("payTypeString", vo.getPayTypeString());

            replaceMap.put("payableAmount", vo.getPayableAmount());
            replaceMap.put("payedAmount", vo.getPayedAmount());
            replaceMap.put("discountAmount", vo.getDiscountAmount());
            replaceMap.put("unpayAmount", vo.getUnpayAmount());
            replaceMap.put("actualAmount", vo.getActualAmount());
            replaceMap.put("remark", vo.getRemark());

            replaceMap.put("branchName", vo.getBranchNameFull());
            replaceMap.put("createUserName", vo.getCreateUserName());
            replaceMap.put("createTime", vo.getCreateTime() != null ? DateUtils.getFullStr(vo.getCreateTime()) : "");
            replaceMap.put("updateUserName", vo.getUpdateUserName());
            replaceMap.put("updateTime", vo.getUpdateTime() != null ? DateUtils.getFullStr(vo.getUpdateTime()) : "");
            replaceMap.put("auditUserName", vo.getAuditUserName());
            replaceMap.put("auditTime", vo.getAuditTime() != null ? DateUtils.getFullStr(vo.getAuditTime()) : "");
        }
        return replaceMap;
    }

    /**
     * 
     * (non-Javadoc)
     * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintDetail(java.lang.String)
     */
    @Override
    protected List<SupplierSettleDetailVo> getPrintDetail(String formId) {
        SupplierSettleVo vo = new SupplierSettleVo();
        vo.setId(formId);
        vo.setOperateType(OperateTypeEnum.MID.getIndex());
        return supplierSettleService.getSettleFormDetailList(vo);
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