Vue.component('account-card', {
  props: ['account'],
  template: '<div class="account-card">{{ account.name }}</div>'
})

let app = new Vue({
  el: '#app',
  data: {
    accounts: [
      {
        name: 'New',
        id: 0
      },
      {
        name: 'New2',
        id: 1
      }
    ]
  }
})

axios
  .get('http://localhost:8080/api/accounts')
  .then(accounts => {
    console.log(accounts)
  })
  .catch(error => {
    console.log(error)
  })
