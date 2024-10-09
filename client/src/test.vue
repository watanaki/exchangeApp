<template>
  <div>
    ref01: {{ ref01 }} 
    <button @click="ref01+='s'">change ref01</button>
  </div>
  <br/>
<div>
  reactive01: {{ reactive01 }}
  <button @click="reactive01.age++">change 01.age</button>
  <button @click="reactive01.test.a++">change 01.age</button>
  <button @click="reactive01.test.b++">change 01.age</button>
</div>
<div>
  解构的name:{{ name01 }}
  <button @click="name01+='n'">change name01</button>
</div>
<div>
  解构的age:{{ age01 }}
  <button @click="age01++">change name01</button>
</div>
<div>
  解构的test:{{ test01 }}
  <button @click="test01.a++">change test01.a</button>
  <button @click="test01.b++">change test01.b</button>
</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const ref01=ref("TTT");

const reactive01=reactive({
  name:"A",
  age:13,
  test:{
    a:1,
    b:2,
  }
});

let {name:name01,age:age01,test:test01}=reactive01;


</script>

<style scoped>

</style>