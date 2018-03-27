<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header>
         <Menu mode="horizontal" theme="dark" active-name="1">
           <div class="layout-logo">
             <h3>SCYZ NOI TEAM 比赛代码上传系统</h3>
           </div>
         </Menu>
        </Header>

        <princess> </princess>

        <Content>


          <div class="content-upload">

            <div class="input-name">
               <Input v-model="extra_data.name" placeholder="名字...">
                 <span slot="prepend">填写你的名字</span>
              </Input>
            </div>

            <Upload
              multiple
              type="drag"
              :data=extra_data
              :max-size=200
              accept=".cpp,.c,.pas,.py"
              :on-error=error
              :on-exceeded-size=on_exceeded_size
              :before-upload=checkName
              action="/upload">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或拖拽来上传你的代码</p>
              </div>
            </Upload>
          </div>
        </Content>
      </Layout>
    </div>
  </div>
</template>

<script>

import princess from './princess.vue'
export default {
  name: 'app',
  data () {
    return {
      extra_data:{
        name:''
      }
    }
  },
  components:{
    princess
  },
  methods:{
    error(error,file,fileList){
      alert("文件: "+file+ ' 上传失败!!') 
    },
    checkName(){
      if(this.extra_data.name.length == 0){
        alert("填写自己的名字")
        return false
      }
      return true;
    },
    on_exceeded_size(file,filelist){
      alert("文件大小超过限制!");
    }
  }
}
</script>

<style>
html,body {
  height:100%;
}
#app,.layout,.ivu-layout{
  height:100%;
}
.layout-logo {
    background: #5b6270;
    border-radius: 3px;
    padding:0 15px 0 15px;
    float: left;
    position: relative;
}

.layout-logo >h3{
  color:#fff;
  font-size:1.5em;
}
.content-upload {
  height:300px;
  width:600px;
  margin:0 auto;
}

.input-name {
  margin-top:50px;
  margin-bottom:50px;
}
.ivu-upload-drag {
  height:230px;
}

div.ivu-upload.ivu-upload-drag div{
  position:relative;
  top:50%;
  transform:translateY(-50%);
}

</style>
