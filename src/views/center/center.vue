<template>
    <div class="list">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-index-bar :sticky-offset-top='44' >
                
                <div  v-for="(item,index) in matchList" :key="index">
                    <van-index-anchor :index=index >
                        <div >标题{{item.title}}</div>
                    </van-index-anchor>
                    <template >
                        <div  class="card"> 
                            <a :href="item.href">{{item.href}}</a>
                        </div>
                    </template>
                </div>
                
            </van-index-bar>
            </van-pull-refresh>
            <div class="tabbar"> 
            </div>
            <div class="appbar" >
                <van-tabbar v-model="activeAppbar">
                    <van-tabbar-item icon="home-o">标签</van-tabbar-item>
                    <van-tabbar-item icon="search">标签</van-tabbar-item>
                    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
                    <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
                </van-tabbar>
            </div>
        
    </div>
</template>
<script lang="ts">

import { Component, Vue, Model, Emit, Watch } from "vue-property-decorator";
import { Toast, List } from "vant";
import axios from "../../axios/config";

@Component({
  components: {
    // HelloWorld,
  }
})
export default class Center extends Vue {
    matchList:Object[] = []
    
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
            }
        })
    }

}
</script>
<style lang="scss">
    .van-index-anchor{
        background: salmon;
    }
    .list{
        padding:44px 0 54px 0;
    }
    .card{
        height: 81px;
        /* border-radius: 18px; */
        background: plum;
        color: #fff;
        /* margin: 12px 0; */
    }
    .tabbar{
        height: 44px;
        width: 100%;
        background: #fff333;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .appbar{
        position: fixed;
        bottom: 0;
        height: 44px;
        background: #fff333;
        width: 100%;
    }
</style>