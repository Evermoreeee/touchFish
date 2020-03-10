<template>
    <div class="list center">

            <div class="tabbar flex align-items"> 
                <div class="tb-icon flex flex-center" @click="popupShow = true"><van-icon name="wap-nav" /></div>
                <p>告你什么</p>
            </div>
            <div class="container flex align-items">
                <div class="center-box">
                    <div class="kb24">
                        <div class="cb-title">早就告诉你了吧</div>
                        <div class="description ">
                            A place to tell the truth, the whole truth and nothing but the truth.
                        </div>
                    </div>
                    
                    <div class="kb24 cover-btns">
                        <div class="kb-btn "> 
                            <img class="d-down" src="@/assets/center/d-down.png" alt="">
                         继续阅读</div>
                        <div class="kb-btn">
                            <img class="d-down github" src="@/assets/center/github.png" alt="">
                            GITHUB</div>
                    </div>

                    <div class="cover-link flex flex-center">
                        <img  src="@/assets/center/github.png" alt="">
                        <img src="@/assets/center/youxiang.png" alt="">
                        <img src="@/assets/center/qq.png" alt="">
                    </div>
                </div>
            </div>
            <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-index-bar :sticky-offset-top='44' >
                    
                    <div  v-for="(item,index) in matchList" :key="index">
                        <van-index-anchor :index=index >
                            <div class="match-title">标题{{item.title}}</div>
                        </van-index-anchor>
                        <template >
                            <div  class="card"> 
                                <a :href="item.href">{{item.href}}</a>
                            </div>
                        </template>
                    </div>
                    
                </van-index-bar>
            </van-pull-refresh> -->

            <van-popup
            v-model="popupShow"
            closeable
            position="left"
            :style="{ width: '60%',height: '100%' }"
            >
                <div class="yaoguo">
                    <!-- <img src="@/assets/center/yaoguo.png" alt=""> -->
                    <div>
                        <yaoguo></yaoguo>
                    </div>
                    <p>告你什么</p>
                </div>
            </van-popup>
            <!-- <div class="appbar" >
                <van-tabbar v-model="activeAppbar">
                    <van-tabbar-item icon="home-o">标签</van-tabbar-item>
                    <van-tabbar-item icon="search">标签</van-tabbar-item>
                    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
                </van-tabbar>
            </div> -->

            <div class="float-em"></div>
    </div>
</template>
<script lang="ts">

import { Component, Vue, Model, Emit, Watch } from "vue-property-decorator";
import { Toast, List } from "vant";
import axios from "../../axios/config";
import yaoguo from '../../icons/yaoguo.svg';
@Component({
  components: {
      yaoguo,
    // HelloWorld,
  }
})
export default class Center extends Vue {
    matchList:Object[] = []
    popupShow:boolean = false
    allShow:boolean = true
    isLoading:boolean = false
    active:number = 0
    activeAppbar:number = 0

    created() {
        // let matchArray:Object[] = []
        // for(let i:number = 0 ; i<50 ; i++){
        //     matchArray.push(
        //         {name:i,isShow:true}
        //     )
        // }
        // this.matchList = matchArray
        this.getNewlist()
    }

    async onRefresh(){
        setTimeout(() => {
            Toast('刷新成功');
            this.isLoading = false;
        }, 500);
    }
    hanldeClose(index:any){
        console.log(index);
        (this.matchList[index] as any).isShow = !(this.matchList[index] as any).isShow
    }
    handleOnRefresh(){
        console.log(this)
    }
    async getNewlist():Promise<any>{
        axios.get('newlist').then(res=> {
            if(res.status === 200 && res.data.code === 0){
                this.matchList = res.data.data
                console.log(res.data.data)
            }
        })
    }

}
</script>
<style lang="scss">
    @import url('../../scss/center.scss');
    .van-index-anchor{
    }
    .card{
        height: 81px;
       
    }

    .van-tabbar{
        background: #0f9d58;
        color: #fff;
    }
    .van-tabbar-item--active{
        color: #333;
    }
    .appbar{
        position: fixed;
        bottom: 0;
        height: 44px;
        background: #FF8CA4;
        width: 100%;
    }
</style>