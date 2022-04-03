
String.prototype.replaceAll  = function(s1,s2){ return this.replace(new RegExp(s1,"gm"),s2); }
String.prototype.trim=function(){ return this.replace(/(^\s*)|(\s*$)/g, ""); }
var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64encode(str){var out,i,len;var c1,c2,c3;len=str.length;i=0;out="";while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+="==";break}c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt((c2&0xF)<<2);out+="=";break}c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));out+=base64EncodeChars.charAt(c3&0x3F)}return out}function base64decode(str){var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c1==-1);if(c1==-1)break;do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));do{c3=str.charCodeAt(i++)&0xff;if(c3==61)return out;c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));do{c4=str.charCodeAt(i++)&0xff;if(c4==61)return out;c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4)}return out}function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i)}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}}return out}function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break}}return out}

var MAC={
    'Url': document.URL,
    'Title': document.title,
    'UserAgent' : function(){
        var ua = navigator.userAgent;//navigator.appVersion
        return {
            'mobile': !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            'ios': !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或者uc浏览器
            'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            'iPad': ua.indexOf('iPad') > -1, //是否iPad
            'trident': ua.indexOf('Trident') > -1, //IE内核
            'presto': ua.indexOf('Presto') > -1, //opera内核
            'webKit': ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
            'weixin': ua.indexOf('MicroMessenger') > -1 //是否微信 ua.match(/MicroMessenger/i) == "micromessenger",
        };
    }(),
    'Copy': function(s){
        if (window.clipboardData){ window.clipboardData.setData("Text",s); }
        else{
            if( $("#mac_flash_copy").get(0) ==undefined ){ $('<div id="mac_flash_copy"></div>'); } else {$('#mac_flash_copy').html(''); }
            $('#mac_flash_copy').html('<embed src='+SitePath+'"images/_clipboard.swf" FlashVars="clipboard='+escape(s)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>');
        }
        layer.msg("复制成功")
    },
    'Home': function(o,u){
        try{
            o.style.behavior='url(#default#homepage)'; o.setHomePage(u);
        }
        catch(e){
            if(window.netscape){
                try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}
                catch(e){ layer.msg("此操作被浏览器拒绝！请手动设置");}
                var moz = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                moz.setCharPref('browser.startup.homepage',u);
            }
        }
    },
    'Fav': function(u,s){
        try{ window.external.addFavorite(u, s);}
        catch (e){
            try{window.sidebar.addPanel(s, u, "");}catch (e){ layer.msg("加入收藏出错，请使用键盘Ctrl+D进行添加"); }
        }
    },
    'Open': function(u,w,h){
        window.open(u,'macopen1','toolbars=0, scrollbars=0, location=0, statusbars=0,menubars=0,resizable=yes,width='+w+',height='+h+'');
    },
    'Cookie': {
        'Set': function(name,value,days){
            var exp = new Date();
            exp.setTime(exp.getTime() + days*24*60*60*1000);
            var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            document.cookie=name+"="+encodeURIComponent(value)+";path=/;expires="+exp.toUTCString();
        },
        'Get': function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null){ return decodeURIComponent(arr[2]); return null; }
        },
        'Del': function(name){
            var exp = new Date();
            exp.setTime(exp.getTime()-1);
            var cval = this.Get(name);
            if(cval != null){ document.cookie = name+"="+encodeURIComponent(cval)+";path=/;expires="+exp.toUTCString(); }
        }
    },
    'GoBack':function(){
        var ldghost=document.domain;
        if(document.referrer.indexOf(ldghost)>0) {
            history.back();
        }
        else{
            window.location ="http://"+ldghost;
        }
    },
    'Adaptive':function(){
        if(maccms.mob_status=='1'&& maccms.url != maccms.wapurl){
            if(document.domain ==maccms.url && MAC.UserAgent.mobile){
                    location.href = location.href.replace(maccms.url,maccms.wapurl);
            }
            else if(document.domain ==maccms.wapurl && !MAC.UserAgent.mobile){
                location.href = location.href.replace(maccms.wapurl,maccms.url);
            }
        }
    },
    'CheckBox':{
        'All':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = true;
            });
        },
        'Other':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = !this.checked;
            });
        },
        'Count':function(n){
            var res=0;
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res++; }
            });
            return res;
        },
        'Ids':function(n){
            var res=[];
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res.push(this.value); }
            });
            return res.join(",");
        }
    },
    'Qrcode':function(){
        $('.mac_qrcode').attr('src','//api.maccms.com/qrcode/?w=150&h=150&url=' + MAC.Url);
    },
    'Image':{
        'Lazyload':{
            'Show': function(){
                try { $("img.lazy").lazyload(); }catch(e){};
            },
            'Box': function($id){
                $("img.lazy").lazyload({
                    container: $("#"+$id)
                });
            }
        }
    },
    'Verify': {
        'Init': function(){
            MAC.Verify.Focus();
            MAC.Verify.Click();
        },
        'Focus': function(){//验证码框焦点
            $('body').on("focus", ".mac_verify", function(){
                $(this).removeClass('mac_verify').after(MAC.Verify.Show());
                $(this).unbind();
            });
        },
        'Click': function(){//点击刷新
            $('body').on('click', 'img.mac_verify_img', function(){
                $(this).attr('src', maccms.path +'/index.php/verify/index.html?');
            });
        },
        'Refresh':function(){
            $('.mac_verify_img').attr('src', maccms.path +'/index.php/verify/index.html?');
        },
        'Show':function(){
            return '<img class="mac_verify_img" src="'+ maccms.path +'/index.php/verify/index.html?"  title="看不清楚? 换一张！">';
        }
    },
    'PageGo':{
        'Init':function() {
            $('.mac_page_go').click(function () {
                var that =$(this);
                var url = that.attr('data-url');
                var total = that.attr('data-total');
                var sp = that.attr('data-sp');
                var page= $('#page').val();

                if(page>0&&(page<=total)){
                    url=url.replace(sp + 'PAGELINK',page).replace('PAGELINK',page);
                    location.href=url;
                }
                return false;
            });
        }
    },
    'Hits': {
        'Init':function() {
            if($('.mac_hits').length==0){
                return;
            }
            var $that = $(".mac_hits");
            $.ajax({
                type: 'get',
                url: maccms.path + '/index.php/ajax/hits?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type=update',
                timeout: 5000,
                dataType: 'json',
                error: function () {

                },
                success: function (json) {
                    if (json.code == 1) {
                        $(".mac_hits").each(function(i){
                            $type = $(".mac_hits").eq(i).attr('data-type');
                            if($type != 'insert'){
                                $('.'+$type).html(eval('(json.data.' + $type + ')'));
                            }
                        });
                    }
                }
            });

        }
    },
    'Score': {
        'Init':function(){
            if($('.mac_score').length==0){
                return;
            }
            $('body').on('click', '.score_btn', function(e){
                MAC.Score.Submit();
            });

            $.ajax({
                type: 'post',
                url: maccms.path+'/index.php/ajax/score?mid='+ $('.mac_score').attr('data-mid') +'&id=' +$('.mac_score').attr('data-id'),
                timeout: 5000,
                error: function(){
                    $(".mac_score").html('评分加载失败');
                },
                success: function($r){
                    MAC.Score.View($r);
                }
            });
        },
        'Submit':function(){
            var $s = $('.mac_score').find("input[name='score']").val();
            $.ajax({
                type: 'post',
                url: maccms.path+'/index.php/ajax/score?mid='+$('.mac_score').attr('data-mid')+'&id='+$('.mac_score').attr('data-id') + '&score='+ $s,
                timeout: 5000,
                error: function(){

                },
                success: function($r){
                	layer.msg($r.msg)
                    if($r.code==1){
                        MAC.Score.View($r);
                    }
                }
            });
        },
        'View':function($r){
            $(".rating"+Math.floor($r.data.score)).attr('checked',true);
            $(".score_num").text( $r.data.score_num );
            $(".score_all").text( $r.data.score_all );
            $(".score_pjf").text( $r.data.score );
        }
    },
    'Star': {
        'Init':function(){
            if($('.mac_star').length==0){
                return;
            }

            $('.mac_star').raty({
                starType: 'i',
                number: 5,
                numberMax : 5,
                half: true,
                score : function(){
                    return $(this).attr('data-score');
                },
                click: function(score, evt) {
                    $.ajax({
                        type: 'get',
                        url: maccms.path+'/index.php/ajax/score?mid='+$('.mac_star').attr('data-mid')+'&id='+$('.mac_star').attr('data-id')+'&score='+(score*2),
                        timeout: 5000,
                        dataType:'json',
                        error: function(){
                            $('.star_box').attr('title', '网络异常！');
                        },
                        success: function(json){
                            if(json.status == 1){
                                $('.star_tips').html(json.data.score);
                            }else{
                                $('.star_box').attr('title', json.msg);
                            }
                        }
                    });
                }
            });
        }
    },
    'Digg': {
        'Init':function(){
            $('body').on('click', '.digg_link', function(e){
                var $that = $(this);
                if($that.attr("data-id")){
                    $.ajax({
                        url: maccms.path + '/index.php/ajax/digg.html?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),
                        cache: false,
                        dataType: 'json',
                        success: function($r){
                            $that.addClass('disabled');
                            if($r.code == 1){
                                if($that.attr("data-type")=='up'){
                                    $that.find('.digg_num').html($r.data.up);
                                }
                                else{
                                    $that.find('.digg_num').html($r.data.down);
                                }
                            }
                            else{
                                $that.attr('title', $r.msg);
                            }
                        }
                    });
                }
            });
        }
    },
    'Gbook':{
        'Login':0,
        'Verify':0,
        'Init':function(){
            $('body').on('keyup', '.gbook_content', function(e){
                MAC.Remaining($(this),200,'.gbook_remaining')
            });
            $('body').on('focus', '.gbook_content', function(e){
                if(MAC.Gbook.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });
            $('body').on('click', '.gbook_submit', function(e){
                MAC.Gbook.Submit();
            });
        },
        'Show':function($page){
            $.ajax({
                type: 'post',
                url: maccms.path+'/index.php/gbook/index?page='+$page,
                timeout: 3000,
                error: function(){
                    $(".mac_gbook_box").html('留言加载失败，请刷新...');
                },
                success:function($html){
                    $(".mac_gbook_box").html($html);
                }
            });
        },
        'Submit':function(){
            if($(".gbook_content").val() == ''){
                layer.msg("请输入留言内容");
                return false;
            }
            $.ajax({
                type: 'post',
                url: maccms.path + '/index.php/gbook/saveData',
                data: $('.gbook_form').serialize(),
                success:function($r){
                	layer.msg($r.msg);
                    if($r.code == 1){
                        location.reload();
                    }
                    else{
                        if(MAC.Gbook.Verify==1){
                            MAC.Verify.Refresh();
                        }
                    }
                }
            });
        },
        'Report':function(name){
            MAC.Pop.Show('#modal-seport',maccms.path+'/index.php/gbook/report?name=' + encodeURIComponent(name),function($r){
                $('body').on('click', '#gbook_submit', function(e){
	            	MAC.Gbook.Submit();
		        });
            });
        }
    },
    'Search':{
        'Init':function(){
            $('.mac_search').click(function(){
                var that=$(this);
                var url = that.attr('data-href') ? that.attr('data-href') : maccms.path + '/index.php/vod/search.html';
                location.href = url + '?wd='+ encodeURIComponent($("#wd").val());
            });
        },
        'Submit':function(){

            return false;
        }
    },
    'Suggest':{
        'Init':function($obj,$mid,$jumpurl){
            try {
                $($obj).autocomplete(maccms.path + '/index.php/ajax/suggest?mid=' + $mid, {
                    inputClass: "mac_input",
                    resultsClass: "mac_results",
                    loadingClass: "mac_loading",
                    width: 175, scrollHeight: 300, minChars: 1, matchSubset: 1,
                    cacheLength: 10, multiple: false, matchContains: true, autoFill: false,
                    dataType: "json",
                    parse: function ($r) {
                        if ($r.code == 1) {
                            var parsed = [];
                            $.each($r['list'], function (index, row) {
                                row.url = $r.url;
                                parsed[index] = {
                                    data: row
                                };
                            });
                            return parsed;
                        } else {
                            return {data: ''};
                        }
                    },
                    formatItem: function (row, i, max) {
                        return row.name;
                    },
                    formatResult: function (row, i, max) {
                        return row.text;
                    }
                }).result(function (event, data, formatted) {
                    $($obj).val(data.name);
                    location.href = data.url.replace('mac_wd', encodeURIComponent(data.name));
                });
            }
            catch(e){}
        }
    },
    'Ulog':{
        'Init':function(){
            MAC.Ulog.Set();
            MAC.Ulog.Click();

        },
        'Get':function(){
            $.ajax({
                url: maccms.path+'/index.php/user/ajax_ulog/?ac=list',
                type:'GET',
                cache: false,
                dataType: 'json',
                success: function($r){
                    if($r.code == 1){
                        $.each($r['list'],function(index,row){
                            layer.msg(row.ulog_id);
                        });
                    }else{

                    }
                }
            });
        },
        'Set':function(){
            if($(".mac_ulog_set").attr('data-mid')){
                var $that = $(".mac_ulog_set");
                $.get(maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&sid='+$that.attr("data-sid")+'&nid='+$that.attr("data-nid")+'&type='+$that.attr("data-type"));
            }
        },
        'Click':function(){
            $('body').on('click', 'a.mac_ulog', function(e){
                //是否需要验证登录
                if(MAC.User.IsLogin == 0){
                    MAC.User.Login();
                    return;
                }

                var $that = $(this);
                if($that.attr("data-id")){
                    $.ajax({
                        url: maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),
                        cache: false,
                        dataType: 'json',
                        success: function($r){
                            layer.msg($r.msg);
                            if($r.code == 1){
                                $that.addClass('disabled');
                            }else{
                                $that.attr('title', $r.msg);
                            }
                        }
                    });
                }
            });
        }
    },
    'User':{
        'BoxShow':0,
        'IsLogin':0,
        'UserId':'',
        'UserName':'',
        'GroupId':'',
        'GroupName':'',
        'Portrait':'',
        'Init':function(){
            if($('.mac_user').length >0){
                $('body').on('click', '.mac_user', function(e){              	
                    MAC.User.Login();
                });              
            } 

            if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
                var url = maccms.path + '/index.php/user';
                MAC.User.UserId = MAC.Cookie.Get('user_id');
                MAC.User.UserName = MAC.Cookie.Get('user_name');
                MAC.User.GroupId = MAC.Cookie.Get('group_id');
                MAC.User.GroupName = MAC.Cookie.Get('group_name');
                MAC.User.Portrait = MAC.Cookie.Get('user_portrait');
                MAC.User.IsLogin = 1;
                
                $('.mac_user').removeClass('mac_user').attr('href',url);
                
                $('.user_name').show().find('.name').text(MAC.User.UserName);
                
                $('.user_url').show().attr('href',url);
                
                $('.user_img').show().attr('src',MAC.User.Portrait);
            }
            else{

            }

        },
        'CheckLogin':function(){
            if(MAC.User.IsLogin == 0){
                MAC.User.Login();
            }
        },
        'Login':function(){
            var ac='ajax_login';
            if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
                ac= 'ajax_info';
            }
            MAC.Pop.Show('#modal-login',maccms.path+'/index.php/user/'+ac,function($r){
                $('body').on('click', '#login_form_submit', function(e){
                    $.ajax({
                        type: 'POST',
                        url: maccms.path + '/index.php/user/login',
                        data: $('.mac_login_form').serialize(),
                        success:function($r){
                            if($r.code == 1){
                                location.reload();
                            }
                        }
                    });
                });
            });
        },
        'Logout':function(){
            $.ajax({
                type: 'post',
                url: maccms.path + '/index.php/user/logout',
                success:function($r){
                	layer.msg($r.msg)
                    if($r.code == 1){
                        location.reload();
                    }
                }
            });
        },
        'PopedomCallBack':function(trysee,h) {
            window.setTimeout(function(){
                $(window.frames["player_if"].document).find(".MacPlayer").html(h);
            },1000*60*trysee);
        },
        'BuyPopedom':function(o){
            var $that = $(o);
            if($that.attr("data-id")){
                if (confirm('您确认购买此条数据播放权限吗？')) {
                    $.ajax({
                        url: maccms.path + '/index.php/user/ajax_buy_popedom.html?id=' + $that.attr("data-id") + '&sid=' + $that.attr("data-sid") + '&nid=' + $that.attr("data-nid") + '&type=' + $that.attr("data-type"),
                        cache: false,
                        dataType: 'json',
                        success: function ($r) {
                            $that.addClass('disabled');
                            layer.msg($r.msg)
                            if ($r.code == 1) {
                                top.location.reload();
                            }
                        },
                        complete: function () {
                            $that.removeClass('disabled');
                        }
                    });
                }
            }
        }
    },
    'Pop':{
        'Show':function($modalid,$url,$callback) {          
            $.ajax({
                type: 'post',
                url: $url,
                timeout: 3000,
                error: function(){
                   $('body').append(layer.msg("加载失败，请刷新"));
                },
                success:function($r){
                    $('body').append($r);
                    $($modalid).modal('show');
                    $('.MacPlayer').hide();
                    $($modalid).on('hide.bs.modal', function () {
                    	$('.MacPlayer').show();
					})
                    $callback($r);
                }
            });
        }
    },
    'AdsWrap':function(w,h,n){
        document.writeln('<img width="'+w+'" height="'+h+'" alt="'+n+'" style="background-color: #CCCCCC" />');
    },
    'Css':function($url){
        $("<link>").attr({ rel: "stylesheet",type: "text/css",href: $url}).appendTo("head");
    },
    'Js':function($url){
        $.getScript($url, function(response, status) {

        });
    },
    'Desktop':function(s){
        location.href= maccms.path + '/index.php/ajax/desktop?name='+encodeURI(s)+'&url=' + encodeURI(location.href);
    },
    'Timming':function(){

    },
    'Error':function(tab,id,name){

    },
    'AddEm':function(obj,i){
        var oldtext = $(obj).val();
        $(obj).val( oldtext + '[em:' + i +']' );
    },
    'Remaining':function(obj,len,show){
        var count = len - $(obj).val().length;
        if(count < 0){
            count = 0;
            $(obj).val($(obj).val().substr(0,200));
        }
        $(show).text(count);
    },
    'Comment':{
        'Login':0,
        'Verify':0,
        'Init':function(){

            $('body').on('click', '.comment_face_box img', function(e){
                var obj = $(this).parent().parent().parent().find('.comment_content');
                MAC.AddEm(obj,$(this).attr('data-id'));
            });
            $('body').on('click', '.comment_face_panel', function(e){
                // $('.comment_face_box').toggle();
                $(this).parent().find('.comment_face_box').toggle();
            });
            $('body').on('keyup', '.comment_content', function(e){
                var obj = $(this).parent().parent().parent().parent().find('.comment_remaining');
                MAC.Remaining($(this),200,obj)
            });
            $('body').on('focus', '.comment_content', function(e){
                if(MAC.Comment.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });

            $('body').on('click', '.comment_report', function(e){
                var $that = $(this);
                if($(this).attr("data-id")){
                    $.ajax({
                        url: maccms.path + '/index.php/comment/report.html?id='+$that.attr("data-id"),
                        cache: false,
                        dataType: 'json',
                        success: function($r){
                            $that.addClass('disabled');
                            layer.msg($r.msg)
                            if($r.code == 1){
                            }
                        }
                    });
                }
            });

            $('body').on('click', '.comment_reply', function(e){
                var $that = $(this);
                if($that.attr("data-id")){
                    var str = $that.html();
                    $('.comment_reply_form').remove();
                    if (str == '取消回复') {
                        $that.html('回复');
                        return false;
                    }
                    if (str == '回复') {
                        $('.comment_reply').html('回复');
                    }
                    var html = $('.comment_form').prop("outerHTML");

                    var oo = $(html);
                    oo.addClass('comment_reply_form');
                    oo.find('input[name="comment_pid"]').val( $that.attr("data-id") );

                    $that.parent().after(oo);
                    $that.html('取消回复');
                }
            });

            $('body').on('click', '.comment_submit', function(e){
                var $that = $(this);
                MAC.Comment.Submit($that);
            });

        },
        'Show':function($page){
            if($(".mac_comment").length>0){
                $.ajax({
                    type: 'get',
                    url: maccms.path + '/index.php/comment/ajax.html?rid='+$('.mac_comment').attr('data-id')+'&mid='+ $('.mac_comment').attr('data-mid') +'&page='+$page,
                    timeout: 5000,
                    error: function(){
                        $(".mac_comment").html('评论加载失败，请刷新...');
                    },
                    success:function($r){
                        $(".mac_comment").html($r);
                    }
                });
            }
        },
        'Reply':function($o){

        },
        'Submit':function($o){
            var form = $o.parents('form');
            if($(form).find(".comment_content").val() == ''){
            	layer.msg("请输入您的评论！")
                return false;
            }
            if($('.mac_comment').attr('data-mid') == ''){
            	layer.msg("模块mid错误！")
                return false;
            }
            if($('.mac_comment').attr('data-id') == ''){
            	layer.msg("关联id错误！")
                return false;
            }

            $.ajax({
                type: 'post',
                url: maccms.path + '/index.php/comment/saveData',
                data: $(form).serialize() + '&comment_mid='+ $('.mac_comment').attr('data-mid') + '&comment_rid=' + $('.mac_comment').attr('data-id'),
                success:function($r){
                	layer.msg($r.msg)
                    if($r.code == 1){
                        MAC.Comment.Show(1);
                    }
                    else{
                        if(MAC.Comment.Verify==1){
                            MAC.Verify.Refresh();
                        }
                    }
                }
            });
        }
    }
}

$(function(){
     //异步加载图片初始化
    MAC.Image.Lazyload.Show();
    //自动跳转手机和pc网页地址
    MAC.Adaptive();
    //验证码初始化
    MAC.Verify.Init();
    //分页跳转初始化
    MAC.PageGo.Init();
    //用户部分初始化
    MAC.User.Init();
    //顶和踩初始化
    MAC.Digg.Init();
    //评分初始化
    MAC.Score.Init();
    //星星评分初始化
    MAC.Star.Init();
    //点击数量
    MAC.Hits.Init();
    //历史记录初始化
    MAC.Ulog.Init();
    //联想搜索初始化
    MAC.Suggest.Init('.mac_wd',1,'');
    //定时任务初始化
    MAC.Timming();
});
