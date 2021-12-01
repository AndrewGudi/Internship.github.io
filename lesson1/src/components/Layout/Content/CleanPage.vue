<template lang="pug">
.clean-page
  slot
</template>

<style lang="scss">
.clean-page{
  display: flex;
  position: relative;
  margin: 2% auto 0;
  max-width: 730px;
  height: 591px;
  background: #fff;
  padding-bottom: 10px;
  border-radius: 8px;
  color: #131313;
}
@media(max-width: 434px){
  .clean-page{
    display: flex;
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
