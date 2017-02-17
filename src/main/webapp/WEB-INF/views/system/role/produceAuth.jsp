<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>分配权限</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script type="text/javascript" src="http://aui.github.io/artTemplate/dist/template.js"></script>
	<script  src="${ctx}/static/js/views/system/role/produceAuth.js"></script>
	<style>
		.table-tree{width:1000px;margin-top:10px;}
		.table-tree *{box-sizing:border-box !important;}
		.bor-left{border-left: 1px solid #c9c9c9;}
        .bor-right{border-right: 1px solid #c9c9c9;}
        .bor-top{border-top: 1px solid #c9c9c9;}
        .bor-bottom{border-bottom: 1px solid #c9c9c9;}
        .bor-rb{border-bottom: 1px solid #c9c9c9;border-right: 1px solid #c9c9c9;}
        .bor-lt{border-left: 1px solid #c9c9c9;border-top: 1px solid #c9c9c9;}
	</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver  ub-f1 umar-4 upad-4">
	    <div class="ub ub-ac">
            <div class="ubtns">
                <div class="ubtns-item" onclick="saveRole()">保存</div>
                <div class="ubtns-item" onclick="resetRole()" >重置</div>
                <div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
		</div>
		<div class="ub uline umar-t8"></div>
		<div class="ub ub-f1 ub-ver table-tree"> 
		    <div class="ub ub-ac  uh-30 font-14">
		        <span class="ub uh ub-ac ub-pc uw-104 bor-lt bor-rb">一级</span>
		        <span class="ub uh ub-ac ub-pc uw-104 bor-top bor-rb">二级</span>
		        <span class="ub uh ub-ac ub-pc uw-104 bor-top bor-rb">三级</span>
		        <span class="ub uh ub-ac ub-pc uw-500 bor-top bor-rb">权限配置细则</span>
		    </div>
		    <!--一级start-->
		    <ul class="uw ub ub-ver" id="content">
		    </ul><!--一级 end-->
		</div>
	</div>
	<script id="tempDom" type="text/html">
    {{each data as item}}
        <li class="ub">
            <div class="ub level">
                <div class="ub ub-ac ub-pc uw-104 bor-rb bor-left">
                    <label for="" id="{{item.id}}"  >
                        {{if item.checked}}
                            <input type="checkbox" id="{{item.id}}" level="{{item.level}}" checked class="parentNode"/>{{item.name}}
                        {{else}}
                            <input type="checkbox" id="{{item.id}}" level="{{item.level}}" class="parentNode" />{{item.name}}
                        {{/if}}
                    </label>
                </div>
            </div>
            <ul class="ub ub-ver levelContent">
                {{each item.child as childItem}}
                <li class="ub ">
                    <div class="ub level">
                        <div class="ub ub-ac ub-pc uw-104 bor-rb">
                            <label for="">
                                {{if childItem.checked}}
                                    <input type="checkbox" id="{{childItem.id}}" parentId="{{item.id}}" level="{{childItem.level}}" checked class="parentNode"/>{{childItem.name}}
                                {{else}}
                                    <input type="checkbox" id="{{childItem.id}}" parentId="{{item.id}}" level="{{childItem.level}}" class="parentNode" />{{childItem.name}}
                                {{/if}}
                            </label>
                        </div>
                    </div>
                    <ul class="ub ub-ver levelContent three">
                        {{each childItem.child as childrenItem}}
                        <li class="ub">
                            <div class="ub ub-ac ub-pc uw-104 bor-rb level">
                                <label for="">
                                    {{if childrenItem.checked}}
                                    <input type="checkbox" id="{{childrenItem.id}}" parentId="{{item.id}},{{childItem.id}}" level="{{childrenItem.level}}" checked class="parentNode threeNode"/>{{childrenItem.name}}
                                    {{else}}
                                    <input type="checkbox" id="{{childrenItem.id}}" parentId="{{item.id}},{{childItem.id}}" level="{{childrenItem.level}}" class="parentNode threeNode"/>{{childrenItem.name}}
                                    {{/if}}
                                </label>
                            </div>
                            <div class="ub bor-rb uw-500 upad-l10 upad-t10 upad-r10 levelContent">
                                <div>
                                    {{each childrenItem.child as childrensItem}}
                                        <label class="umar-r10 umar-b10" for="">
                                            {{if childrensItem.checked}}
                                            <input type="checkbox" id="{{childrensItem.id}}" parentId="{{item.id}},{{childItem.id}},{{childrenItem.id}}" level="{{childrensItem.level}}" checked class="treeItem"/>{{childrensItem.name}}
                                            {{else}}
                                            <input type="checkbox" id="{{childrensItem.id}}" parentId="{{item.id}},{{childItem.id}},{{childrenItem.id}}" level="{{childrensItem.level}}" class="treeItem" />{{childrensItem.name}}
                                            {{/if}}
                                        </label>
                                    {{/each}}
                                </div>
                            </div>
                        </li>
                        {{/each}}
                    </ul>
                </li>
                {{/each}}
            </ul>
        </li>
    {{/each}}
	</script>
	<script>
		var tableTreeData;
		$(function(){
			tableTreeData = [{"name":"档案","id":"12","level":"1","parentId":"","checked":true,"child":[{"name":"基础信息1201","id":"1201","level":"2","parentId":"12","checked":true,"child":[{"name":"商品档案120101","id":"120101","level":"3","parentId":"1201","checked":true,"child":[{"name":"新增12010101","id":"12010101","level":"4","parentId":"120101","checked":true},{"name":"复制12010102","id":"12010102","level":"4","parentId":"120101","checked":false},{"name":"导出12010103","id":"12010103","level":"4","parentId":"120101","checked":false},{"name":"查询12010104","id":"12010104","level":"4","parentId":"120101","checked":false}]},{"name":"组合商品120102","id":"120102","checked":true,"level":"3","parentId":"1201","child":[{"name":"新增12010201","id":"12010201","level":"4","parentId":"120102","checked":false},{"name":"复制12010202","id":"12010202","level":"4","parentId":"120102","checked":false},{"name":"导出12010203","id":"12010203","level":"4","parentId":"120102","checked":false},{"name":"查询12010204","id":"12010204","level":"4","parentId":"120102","checked":false}]}]},{"name":"商品维护1202","id":"1202","checked":false,"level":"2","parentId":"12","child":[{"name":"商品档案120201","id":"120201","checked":false,"level":"3","parentId":"1202","child":[{"name":"新增12020101","id":"12020101","level":"4","parentId":"120201","checked":false},{"name":"复制12020102","id":"12020102","level":"4","parentId":"120201","checked":false},{"name":"导出12020103","id":"12020103","level":"4","parentId":"120201","checked":false},{"name":"查询12020104","id":"12020104","level":"4","parentId":"120201","checked":false}]},{"name":"组合商品120202","id":"120202","checked":false,"level":"3","parentId":"1202","child":[{"name":"新增12020201","id":"12020201","level":"4","parentId":"120202","checked":false},{"name":"复制12020202","id":"12020202","level":"4","parentId":"120202","checked":false},{"name":"导出12020203","id":"12020203","level":"4","parentId":"120202","checked":false},{"name":"查询12020204","id":"12020204","level":"4","parentId":"120202","checked":false}]}]},{"name":"商品查询1203","id":"1203","checked":false,"level":"2","parentId":"12","child":[{"name":"商品档案120301","id":"120301","checked":false,"level":"3","parentId":"1203","child":[{"name":"新增12030101","id":"12030101","level":"4","parentId":"12030101","checked":false},{"name":"复制12030102","id":"12030102","level":"4","parentId":"12030101","checked":false},{"name":"导出12030102","id":"12030102","level":"4","parentId":"12030101","checked":false},{"name":"查询12030102","id":"12030102","level":"4","parentId":"12030101","checked":false}]},{"name":"组合商品120302","id":"120302","checked":false,"level":"3","parentId":"1203","child":[{"name":"新增12030201","id":"12030201","level":"4","parentId":"120302","checked":false},{"name":"复制12030202","id":"12030202","level":"4","parentId":"120302","checked":false},{"name":"导出12030203","id":"12030203","level":"4","parentId":"120302","checked":false},{"name":"查询12030204","id":"12030204","level":"4","parentId":"120302","checked":false}]}]}]},{"name":"采购","id":"13","checked":false,"level":"1","parentId":"","child":[{"name":"基础信息1301","id":"1301","checked":false,"level":"2","parentId":"13","child":[{"name":"商品档案130101","id":"130101","checked":false,"level":"3","parentId":"1301","child":[{"name":"新增13010101","id":"13010101","level":"4","parentId":"130101","checked":false},{"name":"复制13010102","id":"13010102","level":"4","parentId":"130101","checked":false},{"name":"导出13010103","id":"13010103","level":"4","parentId":"130101","checked":false},{"name":"查询13010104","id":"13010104","level":"4","parentId":"130101","checked":false}]},{"name":"组合商品130102","id":"130102","checked":false,"level":"3","parentId":"1301","child":[{"name":"新增13010201","id":"13010201","level":"4","parentId":"130102","checked":false},{"name":"复制13010202","id":"13010202","level":"4","parentId":"130102","checked":false},{"name":"导出13010203","id":"13010203","level":"4","parentId":"130102","checked":false},{"name":"查询13010204","id":"13010204","level":"4","parentId":"130102","checked":false}]}]}]}]
			render(document.getElementById('content'),tableTreeData);
		})
		
	</script>
</body>
</html>