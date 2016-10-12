<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>价签打印</title>
 <%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black" >

    <div class="ub ub-ver ub-f1 upad-8">
        <div class="ub ub-ac">
            <!--buttons-->
            <div class="ubtns">
                <div class="ubtns-item" onclick="chooseproduct()">商品选择</div>
                <div class="ubtns-item" onclick="importproduct();">导入货号</div>
                <div class="ubtns-item" onclick="printtable()">打印</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
                
            </div>
        </div>
         <div class="uabs uatk">

         	<div class="uatit">导入文件选择</div>
             <div class="uacon"><input class="uinp ub" id="filename" type="text"><label class="ualable">选择文件<input type="file" class="uafile" value=""  name="xlfile" id="xlf" /></label></div>
             
             <div class="uabtns ">
         	 	<button class="uabtn umar-r30" onclick="postelsx('pricePrint','/goods/goodsSelect')">导入</button>
         	 	<button class="uabtn" onclick="uaclose()" >取消</button>
         	 </div>

         </div>
        
      
        <div class="ub ub-ver umar-t12">
  
            <div class="ub umar-t8">
                <div class="ub ub-ac">
                    <div class="umar-r10 uw-100 ut-r">价签样式选择:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" id="optionseletc" name="optionseletc" data-options="editable:false" >
				            <option value="1" >正常（55*25mm有底 3*10）</option>
				            <option value="2">正常（85*40mm有底 2*7）</option>
				            <option value="3">正常（85*40mm无底 1*7）</option>
				            <option value="4">促销（85*40mm无底 1*7）</option>
				             <option value="5">标准价签(72*32.5mm 4*6)</option>
				             <option value="6">标准促销价签(72*32.5mm 4*6)</option>
				        </select>
                </div>
               <div class="ub ub-ac uw-200 umar-l20">
                    <div class="umar-r10 uw-100 ut-r">统一促销折扣:</div>
                    <input class="uinp ub ub-f1 deal" type="number" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" id="discount" >
                    <div class="umar-l10"> 折</div>
                </div>  
                
                  <div class="ub ub-ac uw-200 umar-l20">
                    <div class="umar-r10 uw-120 ut-r">批量设置打印数:</div>
                    <input class="uinp ub ub-f1 deal" type="number" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" id="printnum">
                </div>  
                
            </div>
            
         <div class="ub umar-t8 umar-b8">【价签打印】</div>
            <!--datagrid-->
            <table id="pricePrint"></table>
        </div>
    </div>
</body>
</html>
