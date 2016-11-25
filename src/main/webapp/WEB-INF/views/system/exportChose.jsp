<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="exportWin" hidden="true" class="easyui-window"  data-options="closed:true,collapsible:false,minimizable:false" title="导出选项" style="width:500px;height:300px;" >
	<div  style="padding:20px 20px 10px 100px;">
		<form id="exportDataForm" method="post">
			<table id="radioTable">
				<tr style="height: 30px;"><td class="panel-title">请选择导出选项</td></tr>
				<tr style="height: 30px;"><td><input type="radio" name="chose" value="0" />导出当前页</td></tr>
				<tr style="height: 30px;"><td><input type="radio" name="chose" value="1" />全部页面（本次最大可导出条数为20000条）</td></tr>
				<tr style="height: 30px;"><td><input type="radio" name="chose" value="2" />自定义页面（手动填写条数，最大20000条）当前搜索结果共<span id="totalRows"></span>条</td></tr>
				<tr style="height: 20px;">
					<td>
						<input type="text" id="startRow" style="width: 60px;" onkeyup="checkNumber(this);"  onafterpaste="checkNumber(this);">条&nbsp;-&nbsp;
						<input type="text" id="endRow" style="width: 60px;" onkeyup="checkNumber(this);"  onafterpaste="checkNumber(this);">条
					</td>
				</tr>
				<tr style="height: 60px;">
					<td>
						<a href="javascript:void(0)" class="easyui-linkbutton" icon="icon-ok" onclick = "sureExportExcel();">确认</a>  &nbsp;&nbsp;
						<a href="javascript:void(0)" class="easyui-linkbutton" icon="icon-cancel"  onclick="$('#exportWin').window('close')">取消</a>  
					</td>
				</tr>
			</table>
		</form>
	</div>
</div>

<script type="text/javascript">
	$(function(){
		$("#radioTable tbody tr").click(function(){
			$(this).find(":radio").prop("checked",true);
		});
	});

	function sureExportExcel(){
		var choose = $('input[name="chose"]:checked').val();
		if(choose == null){
			successTip("请选择导出项");
			return;
		}
		var stratRow = 1;
		var endRow = dg.datagrid('getData').endRow;
		//当前页
		if(choose=="0"){
			stratRow = dg.datagrid('getData').startRow ;
			endRow = dg.datagrid('getData').endRow;
		}
		//全部页面
		if(choose=="1"){
			stratRow = 1;
			endRow = dg.datagrid('getData').total;
			if (endRow > 20000) {
				successTip("最大导出20000条");
				return;
			}
		}
		//手动填写范围
		if(choose=="2"){
			stratRow = $("#startRow").val();
			endRow = $("#endRow").val();
			if ((endRow - stratRow + 1) > 20000) {
				successTip("最大导出20000条");
				return;
			}
			if(!stratRow || !endRow ){
				successTip("请填写页面范围");
				return;
			}else if(parseInt(endRow) < parseInt(stratRow)){
				successTip("请输入正确的页面范围");
				return;
			}
		}
		if (stratRow === null || stratRow === 0) {
			stratRow = 1;
		} 
		$("#startCount").attr("value",(stratRow - 1));
		$("#endCount").attr("value",endRow);
	    // 调用导出
		exportExcel();
		$("#startCount").attr("value",null);
		$("#endCount").attr("value",null);
	}
	function checkNumber(obj){
		if(obj.value.length == 1){
			obj.value=obj.value.replace(/[^1-9]/g,'');
		}else{
			obj.value=obj.value.replace(/\D/g,'');
		}
		return obj.value;
	}
</script>
		