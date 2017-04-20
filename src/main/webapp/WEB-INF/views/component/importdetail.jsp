<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
 <script src="${ctx}/static/libs/xlsx/upfileinfo.js"></script>
    <div class="ub ub-ver ub-f1 upad-8">
        <div class="ub ub-ver umar-t12">
            <div class="uatit">选择数据源</div>
            <div class="ub umar-t8">
                <div class="ub ub-ac uaselect">
                    <div class=" uw-50 ut-r umar-r10">数据源:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect " id="dataselect" name="select">
				            <option value="1" selected="selected">Microsoft Excel 97-2003工作表(*.xls)</option>
				            <option value="2">Microsoft Excel 工作表(*.xlsx)</option>
				            <option value="3">文本文件(*.txt)</option>
				        </select>
                </div>
            </div>
            
            <div class="uatit">连接设置</div>
             <form method="post" id="importjxls" enctype="multipart/form-data" accept='jxls,jxl' action=""> 
               <div class="ub ub-ver">
               		<div class="upcon">
               			<input class="uinp ub umar-r10" id="filelink" type="text">
	               		<label class="ualable">
	               		选择文件<input type="file" class="uafile"  name="xlfile" id="xlf" >
	               	<!-- 选择文件<input type="file" class="uafile"  name="choosefile" id="choosefile" > -->
	               		</label>
               		</div>	
               		
               </div>
             </form>
                <!--checkbox-->
               <div class="ub ub-ver umar-t12">
			   
			            <div class="ub ub-ac umar-l10">
                            <label>
                            <input type="checkbox" name="radio" checked="checked"/><span class="umar-l10">首行包含列名称</span>
                            </label>

			            </div>
		
		       </div>
         </div>    
    </div>
    


    