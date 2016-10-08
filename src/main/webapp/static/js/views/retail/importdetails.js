
function importdetail(tableid,url){
   var dlog = $("<div />").dialog({
	    title: '导入向导',    
	    width: 800,    
	    height: 600,    
	    closed: false,
	    cache: false, 
	    href: contextPath+'/goods/priceAdjust/importView',    
	    modal: true,
	    buttons:[{
				text:'完成',
				handler:function(){
					var branchId=$("#branchId").val();
					if(!branchId){
						$.messager.alert('提示','请先选择分店');
						return;
					}else{
						postelsx(tableid,url);
						//updateTables(tableid);
						dlog.panel('destroy');
					}
				}
			},{
				text:'取消',
				handler:function(){
				  dlog.panel('destroy');
				}
			}]

	}); 
}


