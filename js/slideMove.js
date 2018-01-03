var I={
    'time':1000,
    /**
     *
     * @param $content
     * @param p[] p[0] p[1]
     * @param sport 0的话就是非队列运动
     * @param time 运动的间隔时间
     */
    'move':function($content,p,sport,time){
        sport = !sport && sport !=0 ? 150 : sport;
        time = time || 800;
        var __this__=this;
        $content.children(".p-rel").each(function(){
            __this__.get_p($(this),p[0]);
            $(this).css({
                'opacity':0
            });
        });

        var obj={};
        obj[p[1]]=0;
        obj.opacity= 1;

        this.time=time;
        $content.children(".p-rel").each(function(){

            $(this).animate(obj,__this__.time);
            __this__.time+=sport;


        });

    },
    'up':function($content){
        this.move($content,['up','top']);

    },
    'down':function($content){
        this.move($content,['down','top'],0);

    },
    'left':function($content){

        this.move($content,['left','left']);



    },
    'right':function($content){
        this.move($content,['right','left']);

    },
    //获取元素的位置
    'get_p':function($this,p){
        var num=0;
        switch(p)
        {
            case 'down':
                num=$this.offset().top;
                $this.css({'top':'-100px'});
                break;
            case 'up':
                num=$this.offset().top;
                $this.css({'top':'60px'});
                break;
            case 'left':
                num=$this.offset().left;
                $this.css({'left':'100px'});
                break;
            case 'right':
                num=$this.offset().left;
                $this.css({'left':'-100px'});
                break;

            default:

        }
    },
    'init':function(flag,node){
        if("undefined" === typeof node) return;
        switch (flag){
            case 'right' :
                this.right($(node));
                break;
            case 'up' :
                this.up($(node));
                break;
            case 'down' :
                this.down($(node));
                break;
            case 'left' :
                this.left($(node));
                break;

        }
    }
};




$(function(){
    var $active=$("#carousel-adv .item.active");
    if($active.hasClass("special")){
        $active.find(".toleft").css({"margin-left":"200px"});
        $active.find(".toright").css({"margin-left":"-200px"});
        $active.find(".sflash").animate({"marginLeft":0},500);
    }else{
        I.init($active.attr("flag"),$active.find("div[move='move']")[0]);
    }
    $('.carousel').on('slid.bs.carousel', function (obj) {

        var $div=$(obj.relatedTarget);
        if($div.hasClass("special")){
            $div.find(".toleft").css({"margin-left":"200px"});
            $div.find(".toright").css({"margin-left":"-200px"});
            $div.find(".sflash").animate({"marginLeft":0},500);
        }else{
            I.init($div.attr("flag"),$div.find("div[move='move']")[0]);
        }
    });
});








