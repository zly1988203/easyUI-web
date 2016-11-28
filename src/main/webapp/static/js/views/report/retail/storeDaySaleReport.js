$(function(){
	//开始和结束时间
    $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
    dg = $("#storeDaySale").datagrid({
        method:'post',
        align:'right',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
       // fit:true,            //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
			{field:'branchName',title:'店铺名称',width: '220px',align:'left', rowspan:2},
            {field:'oneflag',title:'1号',width: '200px',align:'left',colspan:2},
            {field:'oneflag',title:'2号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'3号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'4号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'5号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'6号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'7号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'8号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'9号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'10号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'11号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'12号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'13号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'14号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'15号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'16号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'17号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'18号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'19号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'20号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'21号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'22号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'23号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'24号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'25号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'26号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'27号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'28号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'29号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'30号',width:'200px',align:'left',colspan:2},
            {field:'oneflag',title:'31号',width:'200px',align:'left',colspan:2}
        ],[ 
            {field:'saleAmount1',title:'销售额',width: '100px',align:'right',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount1',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount2',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount2',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount3',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount3',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount4',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount4',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount5',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount5',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount6',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount6',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount7',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount7',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount8',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount8',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount9',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount9',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount10',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount10',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount11',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount11',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount12',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount12',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount13',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount13',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount14',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount14',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount15',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount15',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount16',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount16',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount17',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount17',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
             
            },
            {field:'saleAmount18',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            
            },
            {field:'profitAmount18',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount19',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount19',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount20',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount20',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount21',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount21',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount22',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount22',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount23',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount23',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount24',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount24',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount25',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount25',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount26',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            
            },
            {field:'profitAmount26',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount27',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount27',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount28',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount28',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount29',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount29',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount30',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount30',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'saleAmount31',title:'销售额',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            },
            {field:'profitAmount31',title:'毛利',align:'right',width: '100px',rowspan:1,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         precision:2
                     }
                 }
            }
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
	        messager("请选择店铺名称");
	        return;
	    } 
 $("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	$("#storeDaySale").datagrid("options").method = "post";
	$("#storeDaySale").datagrid('options').url = contextPath + '/storeDaySale/report/getStoreDaySaleList';
	$("#storeDaySale").datagrid('load', fromObjStr);
}

/**
 * 店铺名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}
var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#storeDaySale').datagrid('getData').total;
	if(length == 0){
		successTip("无数据可导");
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
	var length = $("#storeDaySale").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
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