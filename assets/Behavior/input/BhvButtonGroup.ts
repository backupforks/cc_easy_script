/*
 * @Author: wss
 * @Date: 2019-06-22 15:45:31
 * @LastEditTime: 2019-12-09 14:53:27
 * @LastEditors: wss
 */

const {ccclass, property, menu} = cc._decorator;

enum PARAM_TYPE {
    CHILDREN_INDEX,
    CHILDREN_NAME
}



/**
 * 群组按钮 [v1.0.0]
 * 群体事件，适合绑定节点组的回调信息
 * 将该组件的所处节点的 所有子节点，绑定相同的回调对象 
 */
@ccclass
@menu("添加特殊行为/Input/Button Group(一组按钮控制)")
export default class BhvButtonGroup extends cc.Component {

    @property({
        type:cc.Enum(cc.Button.Transition)
    })
    transition:cc.Button.Transition = cc.Button.Transition.NONE;


    @property({visible:function(){return this.transition === cc.Button.Transition.COLOR}})
    hoverColor:cc.Color = cc.color(255,255,255);

    @property({visible:function(){return this.transition === cc.Button.Transition.COLOR}})
    normalColor:cc.Color = cc.color(214,214,214);

    @property({visible:function(){return this.transition === cc.Button.Transition.COLOR}})
    pressedColor:cc.Color = cc.color(211,211,211);

    @property({visible:function(){return this.transition === cc.Button.Transition.COLOR}})
    disabledColor:cc.Color = cc.color(124,124,124);

    @property({
        type:cc.SpriteFrame,
        visible:function(){return this.transition === cc.Button.Transition.SPRITE}
    })
    normalSprite: cc.SpriteFrame = null;

    @property({
        type:cc.SpriteFrame,
        visible:function(){return this.transition === cc.Button.Transition.SPRITE}
    })
    pressedSprite: cc.SpriteFrame = null;	

    @property({
        type:cc.SpriteFrame,
        visible:function(){return this.transition === cc.Button.Transition.SPRITE}
    })
    hoverSprite: cc.SpriteFrame = null;		

    @property({
        type:cc.SpriteFrame,
        visible:function(){return this.transition === cc.Button.Transition.SPRITE}
    })
    disabledSprite: cc.SpriteFrame = null;	

    @property({visible:function(){return this.transition === cc.Button.Transition.SCALE||this.transition === cc.Button.Transition.COLOR}})
    duration:number = 1.0;

    @property({visible:function(){return this.transition === cc.Button.Transition.SCALE}})
    zoomScale:number = 1.1;

    @property({
        type:cc.Enum(PARAM_TYPE)
    })
    paramType:PARAM_TYPE = PARAM_TYPE.CHILDREN_INDEX;
    
    @property([cc.Component.EventHandler])
    touchEvents: cc.Component.EventHandler[] = [];


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
        this.node.children.forEach((node,nodeIndex) => {
            let comp = node.getComponent(cc.Button);
            if(comp == null)comp = node.addComponent(cc.Button);

            //同步属性

            comp.target = node;
            comp.transition = this.transition;
            comp.zoomScale = this.zoomScale;

            comp.disabledSprite  = this.disabledSprite;
            comp.hoverSprite = this.hoverSprite;
            comp.normalSprite = this.normalSprite;
            comp.pressedSprite = this.pressedSprite;

            comp.hoverColor = this.hoverColor;
            comp.normalColor = this.normalColor;
            comp.pressedColor = this.pressedColor;
            comp.disabledColor = this.disabledColor;

            //绑定回调事件

            this.touchEvents.forEach((event) => {
                //克隆数据，每个节点获取的都是不同的回调
                let hd = new cc.Component.EventHandler();//copy对象
                hd.component = event.component;
                hd.handler = event.handler;
                hd.target = event.target;
                if(this.paramType === PARAM_TYPE.CHILDREN_INDEX){
                    hd.customEventData = nodeIndex.toString();
                }else{
                    hd.customEventData = node.name;
                }
                comp.clickEvents.push(hd);
            })
        });

    }

    // update (dt) {}
}
