<template lang="pug">
.clean-page
  slot
</template>

<style scoped>
.clean-page{
  display: flex;
  margin: 2% auto 0;
  max-width: 730px;
  width: 730px;
  height: 591px;
  background: #fff;
  color: #131313;
}
@media(max-width: 426px){
  .clean-page{
    display: flex;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
