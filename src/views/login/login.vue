<template>
    <div class="login">
        <img class='logo'  src="@/assets/bug.png" alt="">
        <div class="bug">.BUG</div>
        <div :class="['l_from',controllRegister?'open_register':'']">
            <div class="flex flex-center l_ipt">
               <div class="name">userName:</div>  <input class="flex-1" placeholder="please enter user name" type="text" v-model="userName">
            </div>
            <div class="flex flex-center l_ipt">
               <div class="name">passWord:</div> <input class="flex-1" placeholder="please enter the password" type="text" v-model="userPwd">
            </div>
            <template>
                <div class="flex flex-center l_ipt">
                    <div class="name">userPhone:</div> <input class="flex-1" placeholder="please enter the userPhone" type="text" v-model="userPhone">
                </div>
                <div class="flex flex-center l_ipt">
                    <div class="name">userHobby:</div> <input class="flex-1" placeholder="Please choose your hobby" type="text" v-model="userHobby" >
                </div>
            </template>
        </div>
        <div class="submit_but" @click="hendleButton">submit</div>
        <div class="r_box">
            No account <span @click="hendleOpenRegister">Go to register</span>
        </div> 
    </div>
</template>
<script lang="ts">
import { Component, Vue ,Model,Emit,Watch} from 'vue-property-decorator';
import axios from '../../axios/config';

@Component({
  components: {
    // HelloWorld,
  },
})
export default class Login extends Vue {
  controllRegister : boolean = false
  userName : String = ''
  userPwd : String = ''
  userPhone : String = ''
  userHobby : String = ''
  @Watch('name', { immediate: true, deep: true })
  onArrChanged1(newValue: number[], oldValue: number[]) {
      console.log('newValue'+ newValue)
  }

  async hendleButton():Promise<any>{
      const data = {
          user : this.userName,
          pwd : this.userPwd
      };
      (axios as any).post('/login',data)
      .then((res : any) => {
        if (res.status === 200 && res.data.code === 0) {

        } else {
        }
      })
  }
  hendleOpenRegister():void{
      this.controllRegister = !this.controllRegister
  }
}
</script>
<style lang="scss">
    .logo{
        width: 96px;
        height: 96px;
        padding: 80px 0 0 0;
    }
    .bug{
      font-weight: 500;
      color:  plum;
      font-size: 24px;
    }
    .l_from{
        width: 300px;
        margin: 0 auto;
        padding: 40px 0 0 0;
        max-height: 103px;
        overflow: hidden;
        transition: all .3s cubic-bezier(.17, .86, .73, .14);
        &.open_register{
            max-height: 226px;
        }

        .l_ipt{
            height: 50px;
            border-bottom: 1px solid plum;
            .name{
                width: 80px;
                text-align: right;
            }
            input{
                height: 94%;
                border: 0;
                margin-left: 12px;
            }
        }
    }
    .submit_but{
        height: 39px;
        width: 200px;
        margin: 44px auto 18px;
        border-radius: 5px;
        background: plum;
        color: #fff;
        line-height: 39px;
    }
    .r_box{
        span{
            color: plum;
            margin-left: 12px;
        }
    }
</style>