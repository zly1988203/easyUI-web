/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    initMenuOne();      //初始化一级菜单
    initMenuTwo();      //初始化二级菜单
    //顶部右侧登录
    $(".header-load-link").on("click",function(){
        addActive("header-load");
    });

    //左侧大菜单关闭打开
    collapseLeftMenu();

    //左侧子菜单关闭打开
    collapseChildMenu();

    //默认隐藏三四级菜单面板
    $(".basic-right").addClass("basic-right-active");
    $("#component-content").tabs("resize");

    //默认隐藏三四级菜单折叠按钮
    hideCollapseIcon();

    //绑定tab页关闭
    tabClose();

    //绑定tab页右键菜单
    tabMenuEven();

    //加载首页
    //openNewTab('首页','purchase/paymentOrder/index','null');

});
function initMenuOne(){
    
	//加载菜单控件
    loadLeftMenu();
    
    $('.menu-one').bind('mouseenter',function(){
        var one = $(this);
        var childId = one.attr("childId");
        $("#"+childId).removeClass('uhide').css('top',one.offset().top);
        $("#"+childId).removeClass('uhide').css('left',one.width());
    });
}
function initMenuTwo(){
    //二级菜单-展开
    $('.menu-one,.menu-two').bind('mouseleave',function(){
        $('.menu-two').addClass('uhide');
    });
    $('.menu-two').bind('mouseenter',function(){
        $(this).removeClass('uhide');
    });
}

//一二级菜单面板收缩功能
function collapseLeftMenu(){
    $(".big-menu-switch").on("click",function(){
        addActive("basic-body");
        $("#component-content").tabs("resize");//内容区最外层的组件尺寸刷新
    });
}

//三级子菜单收缩功能
function collapseChildMenu(){
    $(".sma-menu-switch").on("click",function(){
        addActive("basic-right");
        $("#component-content").tabs("resize");//内容区最外层的组件尺寸刷新
    });
}

//显示 折叠按钮
function showCollapseIcon(){
    $("#collapseIcon").removeClass("none");
}

//隐藏 折叠按钮
function hideCollapseIcon(){
    $("#collapseIcon").addClass("none");
}

function addActive(name){
    var objName = "." + name;
    var activeName = name +"-active";
    if($(objName).hasClass(activeName)){
        $(objName).removeClass(activeName);
    }else{
        $(objName).addClass(activeName);
    }
}

var menuData;
function loadLeftMenu(){
    $.ajax({
        async:false,
        type:'get',
        url:contextPath+"/system/permission/i/json",
        success: function(data){
            if(data == null || data.length == 0){
                alert("您没有该系统的访问权限！");
                window.location=contextPath+'/system/logout';
                return ;
            }
            //data = initData;
            menuData = data;
            var menuHtml = "";
            var divHtml = "";

            //一、二级菜单折叠
            menuHtml += "<div class=\"big-menu-switch\"><i class=\"iconfont\"></i></div>";
            menuHtml += "<div class=\"menu-box\">";
            menuHtml +=		"<ul class=\"menu-trans\">";

            //循环一级菜单 begin
            $(data).each(function(i){
                var o = this;
                
                //加载一级菜单
                menuHtml +=	"<li class='menu-one' childId=\""+o.code+"\"><a href=\"javascript:void(0);\"><i class=\"iconfont\"></i><span>"+o.name+"</span></a></li>";

                divHtml += "<div id='"+o.code+"' class=\"uhide menu-two\">";
            	
                //循环二级菜单 begin
                $(o.children).each(function(j){
                    var p = this;
                    //二级菜单01，有子菜单，有三级菜单，即无URL的
                    if(!p.isleaf){
                    	divHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
                    	divHtml +=			"<div class=\"item-title\">"+p.name+"</div>";
                    	divHtml +=			"<div class=\"item-list ub ub-ver\">";
                    	divHtml +=				"<ul class=\"menu-two-ul\" >";
                    	
                    	//三级菜单，最后一级菜单
                    	$(p.children).each(function(m){
                    		var q = this;
                    		divHtml +=				"<li><a href=\"javascript:openNewTab('"+q.name+"','"+q.url+"');\">"+q.name+"</a></li>";
                    	});
                    	
                    	divHtml +=				"</ul>";
                    	divHtml +=			"</div>";
                    	divHtml +=		"</div>";
                    }

                });
                
                divHtml +=	"</div>";
                
                //加载二级菜单
                $("#left_menu_two").append(divHtml);
            });
            //循环一级菜单 end
            
            menuHtml +=		"</ul>"; //menu-trans END

            menuHtml +=	"</div>";	//big-menu-switch END

            $("#leftMenuContent").html(menuHtml);

        }
    });
}


function openNewTab(subtitle, url, icon){

    //隐藏三级菜单面板
    $(".basic-right").addClass("basic-right-active");

    //隐藏折叠按钮
    hideCollapseIcon();

    //新增tab页
    addTab(subtitle, url, icon);

    $("#component-content").tabs("resize");//内容区最外层的组件尺寸刷新
}

function addTab(subtitle, url, icon) {
    if (!$('#component-content').tabs('exists', subtitle)) {
        $('#component-content').tabs('add', {
            title : subtitle,
            content : createFrame(url),
            closable : true
            //icon : icon	tab图标暂时不用
        });
    } else {

        //刷新tab页
        $('#component-content').tabs('select', subtitle);
        var currTab = $('#component-content').tabs('getSelected');
        $('#component-content').tabs('update', {
            tab : currTab,
            options : {
                content : createFrame(url)
            }
        });
    }
    tabClose();
}

function selectTab(subtitle){
    $('#component-content').tabs('select', subtitle);
}

function createFrame(url) {
    var s = '<iframe scrolling="auto" id="' + url + '" frameborder="0"  src="' + url + '" style="width:100%;height:99%;"></iframe>';
    return s;
}

function tabClose() {
    /* 双击关闭TAB选项卡 */
    $(".tabs-inner").dblclick(function() {
        var subtitle = $(this).children(".tabs-closable").text();
        $('#component-content').tabs('close', subtitle);
    });
    /* 为选项卡绑定右键 */
    $(".tabs-inner").bind('contextmenu', function(e) {
        $('#mm').menu('show', {
            left : e.pageX,
            top : e.pageY
        });

        var subtitle = $(this).children(".tabs-closable").text();

        $('#mm').data("currtab", subtitle);
        $('#component-content').tabs('select', subtitle);
        return false;
    });
}

function refluseTabByTitle(subtitle){
    var selectTab = $('#component-content').tabs('getTab', subtitle);
    var url = $(selectTab.panel('options').content).attr('src');

    //刷新页面
    addTab(subtitle, url, null);
}

function getTabByTitle(subtitle){
    var tab = $('#component-content').tabs('getTab', subtitle);
    return tab;
}

function closeTab(subtitle){
    if(!subtitle){
        var currTab = $('#component-content').tabs('getSelected');
        subtitle = currTab.panel("options").title;
    }
    $('#component-content').tabs('close', subtitle);
}

// 绑定右键菜单事件
function tabMenuEven() {
    // 刷新
    $('#mm-tabupdate').click(function() {
        var currTab = $('#component-content').tabs('getSelected');
        var url = $(currTab.panel('options').content).attr('src');
        $('#component-content').tabs('update', {
            tab : currTab,
            options : {
                content : createFrame(url)
            }
        });
    });

    //复制subtitle, url, icon
    /* $('#mm-tabrepeat').click(function() {
     var currTab = $('#component-content').tabs('getSelected');
     var currTabPanel = currTab.panel('options');
     var url = $(currTab.panel('options').content).attr('src');
     var subtitle = currTabPanel.title;
     var icon = currTabPanel.iconCls;

     addTab(subtitle, url, icon);
     }); */

    // 关闭当前
    $('#mm-tabclose').click(function() {
        closeTab();
    });
    // 全部关闭
    $('#mm-tabcloseall').click(function() {
        $('.tabs-inner span').each(function(i, n) {
            var t = $(n).text();
            $('#component-content').tabs('close', t);
        });
    });
    // 关闭除当前之外的TAB
    $('#mm-tabcloseother').click(function() {
        $('#mm-tabcloseright').click();
        $('#mm-tabcloseleft').click();
    });
    // 关闭当前右侧的TAB
    $('#mm-tabcloseright').click(function() {
        var nextall = $('.tabs-selected').nextAll();
        if (nextall.length == 0) {
            // msgShow('系统提示','后边没有啦~~','error');
            alert('后边没有啦~~');
            return false;
        }
        nextall.each(function(i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#component-content').tabs('close', t);
        });
        return false;
    });
    // 关闭当前左侧的TAB
    $('#mm-tabcloseleft').click(function() {
        var prevall = $('.tabs-selected').prevAll();
        if (prevall.length == 0) {
            alert('到头了，前边没有啦~~');
            return false;
        }
        prevall.each(function(i, n) {
            var t = $('a:eq(0) span', $(n)).text();
            $('#component-content').tabs('close', t);
        });
        return false;
    });

    // 退出
    $("#mm-exit").click(function() {
        $('#mm').menu('hide');
    });
}

//新增Tab页
function addTabPrint(id,subtitle, url, icon) {
     if (!$('#component-content').tabs('exists', subtitle)) {
           $('#component-content').tabs('add', {
                title : subtitle,
                content : createFrame(url),
                closable : true,
                icon : icon,
                tabid:id
           });
     } else {
           $('#component-content').tabs('select', subtitle);
           $('#mm-tabupdate').click();
     }
     tabClose();
}
//关闭Tab页
function closeTabPrint(subtitle) {
     if (!$('#component-content').tabs('exists', subtitle)) {
           $('#component-content').tabs('close', subtitle);
     }
}

