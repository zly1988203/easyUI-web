//区分时段销售分析 货类销售分析
var serviceType;
$(function(){
	//开始和结束时间
    $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    serviceType = $('#serviceType').val(); 
    //时段销售分析
    if(serviceType == 'timeSale'){
    	initDataTimeSaleReport();
    }else{
    	//货类销售分析
    	initDataCateSaleReport();
    }
    
    $('#branchSelect').branchSelect({
    	param:{
    		branchTypesStr:$_jxc.branchTypeEnum.OWN_STORES + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_B + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C
    	},
    	onShowBefore:function(arg){
    		console.log(this);
    		console.log('--------onShowBefore------');
    		return true;
    	},
    	loadFilter:function(data){
    		console.log('--------loadFilter------');
    		return data;
    	},
    	onAfterRender:function(data){
    		console.log('--------onAfterRender------');
    	}
    	
    	
    	
    });
});


var datagridId = 'saleReportList';
var gridHandel = new GridClass();
//初始化表格 没有成本价权限
function initDataTimeSaleReport(){
	gridHandel.setGridName(datagridId);
    dg = $("#"+datagridId).datagrid({
        align:'right',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        data:[
              {project:'销售额',times:'早班（07:00:00--15:00:00)',monthCount:3000,oneyue:10},
              {project:'销售额',times:'中班（15:00:00--23:00:00)',monthCount:6000,oneyue:20},
              {project:'销售额',times:'夜班（23:00:00--07:00:00)',monthCount:1200,oneyue:30},
              {project:'退货额',times:'早班（07:00:00--15:00:00)',monthCount:3000,oneyue:10},
              {project:'退货额',times:'中班（15:00:00--23:00:00)',monthCount:6000,oneyue:20},
              {project:'退货额',times:'夜班（23:00:00--07:00:00)',monthCount:1200,oneyue:30}
             ],
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
		columns:[[
			{field:'project',title:'项目',width: 90,align:'center',rowspan:2},
			{field:'times',title:'时段',width: '200px',align:'center',rowspan:2},
			{field:'monthCount',title:'月均销售',width: 90,align:'right',rowspan:2,
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
			},
			{field:'branchName2',title:'当年销售情况',width: 90,align:'center',colspan:12},
			{field:'branchName3',title:'上年销售情况',width: 90,align:'center',colspan:12}
        ],[ 
            {field:'oneyue',title:'1月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'twoyue',title:'2月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'threeyue',title:'3月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'fouryue',title:'4月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'fiveyue',title:'5月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'sixyue',title:'6月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'sevenyue',title:'7月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'eightyue',title:'8月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'nightyue',title:'9月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'tenyue',title:'10月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'elevenyue',title:'11月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'twelyue',title:'12月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'oneyuelast',title:'1月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'twoyuelast',title:'2月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'threeyuelast',title:'3月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'fouryuelast',title:'4月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'fiveyuelast',title:'5月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'sixyuelast',title:'6月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'sevenyuelast',title:'7月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'eightyuelast',title:'8月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'nightyuelast',title:'9月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'tenyuelast',title:'10月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'elevenyuelast',title:'11月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'twelyuelast',title:'12月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
        ]],
        onLoadSuccess:function(data){
        	var merges = getMergesData(data.rows);
			for(var i=0; i<merges.length; i++){
				$(this).datagrid('mergeCells',{
					index: merges[i].index,
					field: 'project',
					rowspan: merges[i].rowspan
				});
			}
            gridHandel.setDatagridHeader("center");
        }       
    });
}


//合并表格操作
function getMergesData(sc_data){
    var ne_data = []; //目标数组
    var no_Num = 0;  //游标
    var _currentObj; //当前统计小项 用于小小项合计
    console.time('s');
    if(sc_data.length > 0){
        sc_data.forEach(function(obj,ind){
            operateInData(obj);
        })
    }
    function operateInData(arg){
        var ne_item = {};
        if(ne_data.length <= 0){
            //跨行
            ne_item = {
                index:0,
                project:arg.project,
                rowspan:1
            };
            ne_data.push(ne_item);
            _currentObj = ne_item;
            return ;
        }

        //统计项
        
        var _flag = false; //标识符
        ne_data.forEach(function(obc,inc){
            if(obc.project === arg.project){
                _flag = true;
                obc.rowspan++; //跨行累计
                no_Num++;      //游标累计
            }
        });

        if(!_flag){
            //下一个统计项
            var nne_item = {
                index:++no_Num,
                project:arg.project,
                rowspan:1
            };
            _currentObj = nne_item;
            ne_data.push(nne_item);
        }
        

    }
    console.timeEnd('s');
    console.log(JSON.stringify(ne_data));
    return ne_data;
}


//初始化表格
function initDataCateSaleReport(){
	gridHandel.setGridName(datagridId);
	dg = $("#"+datagridId).datagrid({
        align:'right',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        data:[
              {categoryCode:'10201',categoryName:'生鲜',monthCount:3000,oneyue:10},
              {categoryCode:'10202',categoryName:'奶制品',monthCount:6000,oneyue:20},
              {categoryCode:'10202',categoryName:'饮料',monthCount:1200,oneyue:30}
             ],
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
		columns:[[
			{field:'categoryCode',title:'类别编码',width: 90,align:'center',rowspan:2},
			{field:'categoryName',title:'类别名称',width: '200px',align:'center',rowspan:2},
			{field:'monthCount',title:'月均销售',width: 90,align:'center',rowspan:2,
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
			},
			{field:'branchName2',title:'当年销售情况',width: 90,align:'center',colspan:12},
			{field:'branchName3',title:'上年销售情况',width: 90,align:'center',colspan:12}
        ],[ 
            {field:'oneyue',title:'1月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}	
            },
            {field:'twoyue',title:'2月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'threeyue',title:'3月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'fouryue',title:'4月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'fiveyue',title:'5月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'sixyue',title:'6月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'sevenyue',title:'7月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'eightyue',title:'8月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'nightyue',title:'9月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'tenyue',title:'10月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'elevenyue',title:'11月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'twelyue',title:'12月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'oneyuelast',title:'1月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'twoyuelast',title:'2月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'threeyuelast',title:'3月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'fouryuelast',title:'4月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'fiveyuelast',title:'5月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'sixyuelast',title:'6月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'sevenyuelast',title:'7月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'eightyuelast',title:'8月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'nightyuelast',title:'9月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'tenyuelast',title:'10月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'elevenyuelast',title:'11月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'twelyuelast',title:'12月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
        ]],
        onLoadSuccess:function(data){
        	gridHandel.setDatagridHeader("center");
        }       
    });
   // queryForm();
}
//查询入库单
function queryForm(){
	 if($("#branchName").val()==""){
	    $_jxc.alert("请选择店铺名称");
	    return;
	 } 
    $("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
	fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
	$("#"+datagridId).datagrid("options").method = "post";
	//时段
	if(serviceType == 'timeSale'){
		$("#"+datagridId).datagrid('options').url = contextPath + '/storeDaySale/report/getStoreDaySaleList';
	}else{
		$("#"+datagridId).datagrid('options').url = contextPath + '/storeDaySale/report/getStoreDaySaleList';
	}
	$("#"+datagridId).datagrid('load', fromObjStr);
}

/**
 * 导出
 */
function exportData(){
	var length = $('#storeDaySale').datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(dg.datagrid('getData').total);
	$("#exportWin").window("open");
}
/**
 * 导出
 */
function exportExcel(){
	var length = $("#"+datagridId).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$_jxc.alert("导出数据成功！");
			}else{
				$_jxc.alert(JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/storeDaySale/report/exportList?"+fromObjStr);
	$("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
};