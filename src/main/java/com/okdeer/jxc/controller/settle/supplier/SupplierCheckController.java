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
import com.okdeer.jxc.branch.vo.BranchSpecVo;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.enums.OperateTypeEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.settle.supplier.service.SupplierCheckService;
import com.okdeer.jxc.settle.supplier.vo.SupplierCheckDetailVo;
import com.okdeer.jxc.settle.supplier.vo.SupplierCheckVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 *<p></p>
 * ClassName: SupplierCheckController 
 * @Description: 供应商对账
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierCheck")
public class SupplierCheckController extends BasePrintController<SupplierCheckController, SupplierCheckDetailVo> {

    /**
     * SupplierCheckService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierCheckService supplierCheckService;

    /**
     * 
     * @Description: 供应商对账列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "checkList")
    public ModelAndView checkList(Model model) {
        return new ModelAndView("settle/supplier/check/checkList");
    }

    /**
     * 
     * @Description: 供应商对账新增页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "checkAdd")
    public ModelAndView checkAdd(Model model) {
        return new ModelAndView("settle/supplier/check/checkAdd");
    }

    /**
     * 
     * @Description: 供应商对账编辑页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "checkEdit")
    public ModelAndView checkEdit(Model model, String id) {
        SupplierCheckVo checkVo = supplierCheckService.getSupplierCheckVoById(id);
        model.addAttribute("checkVo", checkVo);
        return new ModelAndView("settle/supplier/check/checkEdit");
    }

    /**
     * 
     * @Description: 供应商对账详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "checkView")
    public ModelAndView checkView(Model model, String id) {
        SupplierCheckVo checkVo = supplierCheckService.getSupplierCheckVoById(id);
        model.addAttribute("checkVo", checkVo);
        return new ModelAndView("settle/supplier/check/checkView");
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
    @RequestMapping(value = "getCheckList", method = RequestMethod.POST)
    public PageUtils<SupplierCheckVo> getCheckList(SupplierCheckVo vo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            vo.setBranchCompleCode(getCurrBranchCompleCode());
            LOG.debug(LogConstant.OUT_PARAM, vo.toString());
            PageUtils<SupplierCheckVo> checkList = supplierCheckService.getCheckPageList(vo);
            LOG.debug(LogConstant.PAGE, checkList.toString());
            return checkList;
        } catch (Exception e) {
            LOG.error("供应商对账列表信息异常:{}", e);
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
    @RequestMapping(value = "/checkFormDetailList", method = RequestMethod.POST)
    public List<SupplierCheckDetailVo> checkFormDetailList(SupplierCheckVo vo) {
        LOG.debug(LogConstant.OUT_PARAM, vo);
        List<SupplierCheckDetailVo> detailList = new ArrayList<SupplierCheckDetailVo>();
        try {
            detailList = supplierCheckService.getCheckFormDetailList(vo);
        } catch (Exception e) {
            LOG.error("获取单据明细信息异常:{}", e);
        }
        return detailList;
    }

    /**
     * @Description: 保存供应商对账单
     * @param data 保存JSON数据
     * @return RespJson
     * @author xuyq
     * @date 2017年3月9日
     */
    @RequestMapping(value = "/saveCheckForm", method = RequestMethod.POST)
    public RespJson saveCheckForm(String data) {
        RespJson respJson = RespJson.success();
        LOG.debug("保存供应商对账单 ：data{}" + data);
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
            SupplierCheckVo vo = JSON.parseObject(data, SupplierCheckVo.class);
            if (OperateTypeEnum.ADD.getIndex().equals(vo.getOperateType())) {
                // 新增
                vo.setCreateUserId(user.getId());
                vo.setCreateTime(DateUtils.getCurrDate());
                vo.setUpdateUserId(user.getId());
                vo.setUpdateTime(DateUtils.getCurrDate());
                // 生成单号时，取当前登录账号机构编码
                vo.setBranchCode(getCurrBranchCode());
                return supplierCheckService.saveCheckForm(vo);
            } else {
                // 修改
                vo.setUpdateUserId(user.getId());
                vo.setUpdateTime(DateUtils.getCurrDate());
                return supplierCheckService.updateCheckForm(vo);
            }
        } catch (Exception e) {
            LOG.error("保存供应商对账单：{}", e);
            respJson = RespJson.error("保存供应商对账单异常!");
        }
        return respJson;
    }

    /**
     * @Description: 审核供应商对账单
     * @param data 保存JSON数据
     * @return RespJson
     * @author xuyq
     * @date 2017年3月11日
     */
    @RequestMapping(value = "/auditCheckForm", method = RequestMethod.POST)
    public RespJson auditCheckForm(String data) {
        RespJson respJson = RespJson.success();
        try {
            LOG.debug("审核供应商对账单详情 ：data{}" + data);
            SysUser user = UserUtil.getCurrentUser();
            if (user == null) {
                respJson = RespJson.error("用户不能为空！");
                return respJson;
            }
            if (StringUtils.isBlank(data)) {
                respJson = RespJson.error("审核数据不能为空！");
                return respJson;
            }
            SupplierCheckVo vo = JSON.parseObject(data, SupplierCheckVo.class);
            if (vo == null) {
                respJson = RespJson.error("审核数据不能为空！");
                return respJson;
            }
            vo.setAuditUserId(user.getId());
            vo.setAuditTime(DateUtils.getCurrDate());
            return supplierCheckService.auditCheckForm(vo);
        } catch (Exception e) {
            LOG.error("审核供应商对账单详情:{}", e);
            respJson = RespJson.error("账单审核异常！");
        }
        return respJson;
    }

    /**
     * 
     * @Description: 供应商对账删除
     * @param ids 记录IDS
     * @return RespJson
     * @author xuyq
     * @date 2017年2月19日
     */
    @RequestMapping(value = "deleteCheckForm", method = RequestMethod.POST)
    public RespJson deleteCheckForm(@RequestParam(value = "ids[]") List<String> ids) {
        RespJson resp;
        try {
            return supplierCheckService.deleteCheckForm(ids);
        } catch (Exception e) {
            LOG.error("删除账单异常:{}", e);
            resp = RespJson.error("删除账单失败");
        }
        return resp;
    }

    /***
     * 
     * @Description: 查询机构是否开启对账模式
     * @param branchId branchId
     * @return RespJson
     * @author xuyq
     * @date 2017年6月2日
     */
    @RequestMapping(value = "querySettleCheckMode", method = RequestMethod.POST)
    public RespJson querySettleCheckMode(String branchId) {
        RespJson resp = RespJson.success();
        // 默认不开启对账
        Integer checkMode = 0;
        try {
            BranchSpecVo spceVo = supplierCheckService.queryBranchSpecByBranchId(branchId);
            if (spceVo != null) {
                checkMode = spceVo.getSupplierSettleCheckMode();
            }
            resp.put("checkMode", checkMode);
        } catch (Exception e) {
            LOG.error("查询机构是否开启对账模式异常:{}", e);
            resp = RespJson.error("查询机构是否开启对账模式异常");
        }
        return resp;
    }
    
    /***
     * 
     * @Description: 查询机构是否存在未审核的对账单
     * @param vo vo
     * @return RespJson
     * @author xuyq
     * @date 2017年6月2日
     */
    @RequestMapping(value = "queryCheckStatusNum", method = RequestMethod.POST)
    public RespJson queryCheckStatusNum(SupplierCheckVo vo) {
        RespJson resp = RespJson.success();
        // 未审核对账单数
        int unChNum = 0;
        try {
            unChNum = supplierCheckService.queryCheckStatusNum(vo);
            resp.put("unChNum", unChNum);
        } catch (Exception e) {
            LOG.error("查询机构是否存在未审核的对账单异常:{}", e);
            resp = RespJson.error("查询机构是否存在未审核的对账单异常");
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
        SupplierCheckVo vo = supplierCheckService.getSupplierCheckVoById(formId);
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
            replaceMap.put("discountAmount", vo.getDiscountAmount());
            replaceMap.put("unpayAmount", vo.getUnpayAmount());
            replaceMap.put("remark", vo.getRemark());
            replaceMap.put("branchName", vo.getBranchName());
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
    protected List<SupplierCheckDetailVo> getPrintDetail(String formId) {
        SupplierCheckVo vo = new SupplierCheckVo();
        vo.setId(formId);
        vo.setOperateType(OperateTypeEnum.MID.getIndex());
        return supplierCheckService.getCheckFormDetailList(vo);
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