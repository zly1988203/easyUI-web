<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>月进销存报表</title> 
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryForm()">查询</div>
					<input type="hidden" id="startCount" name="startCount" /> 
					<input type="hidden" id="endCount" name="endCount" />
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub uline umar-t8"></div>
			
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300 " id="branchComponents">
					<div class="umar-r10 uw-70 ut-r">机构名称:</div>
					<input type="hidden" id="branchId" name="branchId" value="${branchId}" /> 
					<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" value="${branchName}" />
					<div class="uinp-more">...</div>
				</div>

				<div class="ub ub-ac  umar-l20">
					<div class="umar-r10 uw-70 ut-r">货号/条码:</div>
					<input class="uinp ub ub-f1" type="text" name="skuKeyword" id="skuKeyword">
				</div>
			</div>
		</form>


		<div class="ub ub-f1 umar-t20">
			<table id="monthSumReport"></table>
		</div>
	</div>

	<script type="text/javascript">
		$(function() {
			//初始化默认条件
			initConditionParams();
			initDatagridDay();
			
			//机构选择初始化
			$('#branchComponents').branchSelect({
				param:{
					formType:'BF'
				}
			});
			
		});

		//初始化默认条件
		function initConditionParams() {
			$("#txtStartDate").val(dateUtil.getPreMonthDate("prev", 1).format("yyyy-MM-dd"));
			$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
		}

		var gridHandel = new GridClass();
		var gridName = "monthSumReport";
		//初始化表格
		function initDatagridDay() {
			gridHandel.setGridName("monthSumReport");
			dg = $("#monthSumReport").datagrid({
				method : 'post',
				align : 'center',
				singleSelect : false, //单选  false多选
				rownumbers : true, // 序号
				pagination : true, // 分页
				fitColumns : true, // 每列占满
				showFooter : true,
				pageSize : 50,
				height : '100%',
				width : '100%',
				columns : [ [
					{
						field : 'skuCode',
						title : '商品货号',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'supplierId',
						title : '供应商ID',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'supplierRate',
						title : '供应商扣率',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'beginStockNum',
						title : '期初库存',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'beginCostPrice',
						title : '期初成本价',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'beginCostAmount',
						title : '期初成本金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'beginSaleAmount',
						title : '期初销售金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'endStockNum',
						title : '期末库存',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'endCostAmount',
						title : '期末成本金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'endSaleAmount',
						title : '期末销售金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'endCostPrice',
						title : '期末成本价',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'firstSalePrice',
						title : '首笔零售价',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'saleCostAmount',
						title : '销售成本金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'deliverCostAmount',
						title : '配送成本金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'saleProfitAmount',
						title : '销售毛利金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'deliverProfitAmount',
						title : '配送毛利金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'xsNum',
						title : '零售销售数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'xsAmount',
						title : '零售销售金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'xtNum',
						title : '零售退货数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'xtAmount',
						title : '零售退货金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'xsGiftNum',
						title : '零售销售赠送数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'xtGiftNum',
						title : '零售退货赠送数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'wsNum',
						title : '批发销售数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'wsAmount',
						title : '批发销售金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'wrNum',
						title : '批发退货数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'wrAmount',
						title : '批发退货金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'wsGiftNum',
						title : '批发销售赠送数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'wrGiftNum',
						title : '批发退货赠送数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'piNum',
						title : '采购收货数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'piAmount',
						title : '采购收货金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'prNum',
						title : '采购退货数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'prAmount',
						title : '采购退货金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'pmNum',
						title : '采购直送收货数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'pmAmount',
						title : '采购直送收货金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'piGiftNum',
						title : '采购收货赠送数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'prGiftNum',
						title : '采购退货赠送数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'diNum',
						title : '配送入库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'diAmount',
						title : '配送入库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'doNum',
						title : '配送出库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'doAmount',
						title : '配送出库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'diGiftNum',
						title : '配送入库赠送数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'doGiftNum',
						title : '配送出库赠送数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ioInNum',
						title : '库存调整入库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ioInAmount',
						title : '库存调整入库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ioOutNum',
						title : '库存调整出库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ioOutAmount',
						title : '库存调整出库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ppInNum',
						title : '盘点入库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ppInAmount',
						title : '盘点入库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ppOutNum',
						title : '盘点出库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ppOuntAmount',
						title : '盘点出库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'iuNum',
						title : '领用出库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'iuAmount',
						title : '领用出库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'idNum',
						title : '报损出库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'idAmount',
						title : '报损出库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ixNum',
						title : '组合拆分数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'ixAmount',
						title : '组合拆分金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'lpNum',
						title : '礼品兑换出库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'lpAmount',
						title : '礼品兑换出库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'otherInNum',
						title : '其他入库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'otherInAmount',
						title : '其他入库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'otherOutNum',
						title : '其他出库数量',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'otherOutAmount',
						title : '其他出库金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					},
					{
						field : 'costAdjustAmount',
						title : '成本调整金额',
						width : '130px',
						align : 'right',
						formatter : function(value, row, index) {
							if (value || value == 0) {
								return '<b>' + parseFloat(value).toFixed(2) + '</b>';
							}
						}
					}
				] ],
				onLoadSuccess : function() {
					gridHandel.setDatagridHeader("center");
				}
			});
			
			var param = {
					//期初成本价->beginCostPrice  期末成本价-->endCostPrice   销售成本金额->saleCostAmount  采购收货金额->piAmount 采购退货金额->prAmount	采购直送收货金额->pmAmount
					//库存调整出库金额->ioInAmount	库存调整入库金额->ioOutAmount	  盘点入库金额->ppInAmount 盘点出库金额->ppOutAmount 	领用出库金额->iuAmount	
					// 报损出库金额->idAmount	组合拆分出库金额->ixOutAmount	 组合拆分入库金额->ixInAmount	礼品兑换出库金额->lpAmount	其他入库金额->otherInAmount	其他出库金额->otherOutAmount
				costPrice:['beginCostPrice','beginCostAmount','endCostPrice','endCostAmount','saleCostAmount','piAmount','prAmount','pmAmount','ioInAmount','ioOutAmount',
				          	'ppInAmount','ppOutAmount','iuAmount','idAmount','ixOutAmount','ixInAmount','lpAmount','otherInAmount','otherOutAmount'
				          ],
				//配送成本金额	配送毛利金额  配送入库金额  配送出库金额
				distributionPrice:['deliverCostAmount','deliverProfitAmount','diAmount','doAmount'],
				//批发销售金额	批发退货金额
				wholesalePrice:['wsAmount','wrAmount']
					
			}
			
			priceGrantUtil.grantPrice(gridName,param);

		}

		function queryForm() {
			$("#startCount").attr("value", null);
			$("#endCount").attr("value", null);
			var fromObjStr =  $("#queryForm").serializeObject();
			fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1);
			
			$("#monthSumReport").datagrid("options").queryParams =fromObjStr;
			$("#monthSumReport").datagrid("options").method = "post";
			$("#monthSumReport").datagrid("options").url = contextPath + '/report/month/getMonthReportList';
			$("#monthSumReport").datagrid("load");

		}

// 		function selectBranches() {
// 			new publicAgencyService(function(data) {
// 				$("#branchId").val(data.branchesId);
// 				$("#branchName").val(data.branchName);
// 			}, 'BF', '');
// 		}

		var dg;
		/**
		 * 导出
		 */
		function exportData() {
			var length = $('#monthSumReport').datagrid('getData').total;
			if (length == 0) {
				$_jxc.alert("无数据可导");
				return;
			}
			$('#exportWin').window({
				top : ($(window).height() - 300) * 0.5,
				left : ($(window).width() - 500) * 0.5
			});
			$("#exportWin").show();
			$("#totalRows").html(dg.datagrid('getData').total);
			$("#exportWin").window("open");
		}

		/**
		 * 导出
		 */
		function exportExcel() {
			var length = $("#monthSumReport").datagrid('getData').total;
			if (length == 0) {
				$_jxc.alert("没有数据");
				return;
			}
			var fromObjStr = $('#queryForm').serializeObject();
			console.log(fromObjStr);
			$("#queryForm").form({
				success : function(data) {
					if (data == null) {
						$_jxc.alert("导出数据成功！");
					} else {
						$_jxc.alert(JSON.parse(data).message);
					}
				}
			});
			$("#queryForm").attr("action",
					contextPath + "/report/day/exportList?" + fromObjStr);

			$("#queryForm").submit();
		}
		/**
		 * 重置
		 */
		function resetForm() {
			$("#queryForm").form('clear');
		};
	</script>
</body>
</html>