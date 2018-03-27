<template>
<div class="princess-content">
  <img src='./assets/princess.gif' height=80/>
  <h1>
    Princess angry !!!!
  </h1>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style>

.princess-content {
  background:#fff;
  border:1px solid #eee;
  position:relative;
}
.princess-content img {
  margin-left:20px;
  float:left;
}
.princess-content h1 {
  position: absolute;
  top:50%;
  transform:translateY(-50%);
  left:200px;
  font-size:3em;
}
</style>
