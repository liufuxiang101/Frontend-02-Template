<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import http from '../service/http'

const getUser = () => {
  return new Promise((resolve, reject) => {
    http
      .get('/user', { UserId: '1000202280  ' })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {}
  },
  mounted() {
    getUser()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
