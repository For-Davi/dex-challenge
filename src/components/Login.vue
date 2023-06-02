<template>
  <main>
      <div class="box-login" v-if="!loading">
          <h2>Login</h2>
          <form>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" v-model="emailInput" required>
              <label for="password">Senha</label>
              <input type="password" name="password" id="password"  v-model="passwordInput" required>
              <button type="submit" @click="checkLogin">Entrar</button>

              <div class="error" v-show="error">
                <p>{{ errorMsg }}</p>
              </div>
              <div class="invalid-email" v-show="invalidInput">
                <p>Corrija seus dados de login</p>
              </div>
              
          </form>
      </div>
      <div class="loading" v-if="loading">
        <p>Aguarde enquanto verificamos</p>
        <div class="circle"></div>
      </div>
  </main>
</template>

<script>

import axios from 'axios'

  export default{
      name:'Login',
      data(){
          return{
              emailInput: '',
              passwordInput: '',
              loading: false,
              error: false,
              errorMsg: '',
              invalidInput: false,
              url: 'https://dex-dev-app001.azurewebsites.net',
              user: {
                avatar : null,
                email: null,
                id: null,
                last_login: null,
                locale: null,
                name:null,
                perfil:null,
                token: null
              },
          }
      },
      methods:{
          async checkLogin(e){
             this.loading = false
              e.preventDefault();
              
              const headers = {
                "Content-Type":"applications/json",
                "Accept":"application/json"
              }

              const body = {
                email : this.emailInput,
                password: this.passwordInput,
                locale: 'pt-BR'
              }

              const posicaoArroba = this.emailInput.indexOf('@')
              const posicaoPonto = this.emailInput.indexOf('.',posicaoArroba)

              if( posicaoArroba > -1 && posicaoPonto > posicaoArroba && this.passwordInput.length > 5 ){
                try {
                    
                  this.loading = true
                  
                  const response = await axios.post(`${this.url}/api/login`, body, {headers})
                          
                      this.user.avatar = response.data.user.avatar
                      this.user.email = response.data.user.email
                      this.user.id = response.data.user.id
                      this.user.last_login = response.data.user.last_login
                      this.user.locale = response.data.user.locale
                      this.user.name = response.data.user.name
                      this.user.perfil = response.data.user.perfil
                      this.user.token = response.data.token
  
                      localStorage.setItem('token',this.user.token)
                      localStorage.setItem('user', JSON.stringify(this.user))
                      localStorage.setItem('authenticated', 'true')
                      
                      this.loading = false
                  this.goFeed()
                  
                } catch(error){
                  
                  if(error.response.data.message == 'Essas credenciais não correspondem aos nossos registros.'){
                    this.loading = false
                    this.error = true
                    this.errorMsg = 'Essas credenciais não correspondem aos nossos registros.'
                  } else {
                    this.loading = false
                    this.error = true
                    this.errorMsg = 'Ops! Algo deu errado. Por favor, tente novamente mais tarde.'
                  }
                  
  
                  setTimeout(()=>{
                    this.error = false
                  },3000)
                }
              } else {
                this.invalidInput = true

                setTimeout(()=>{
                  this.invalidInput = false
                },3000)
              }
          },
          goFeed(){
            this.$router.push('/feed')
          }
      }
  }
</script>

<style scoped lang="scss">

main{
  height: 100vh;
  width: 100%;
  background-color: #1b4965;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    p{
      color: #fff;
      font-size: 20px;
      margin-bottom: 30px;
    }

    .circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 4px dotted #fff;
      animation: spin 1.5s infinite linear;
    }

  }

  .box-login{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color:#BEE9E8 ;
      width: 40%;
      min-width: 300px;
      padding: 40px 0px;
      box-sizing: border-box;
      border-radius: 5px;

      h2{
          font-size: 35px;
          color: #1b4965;
          padding: 10px 0px;
      }

      form{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .error{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            padding: 5px 10px;
            background-color: rgb(211, 154, 154);
            border-radius: 5px;
            max-width: 80%;
            text-align: center;

            p{
              color: #fff;
            }
          }

          .invalid-email{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
            padding: 5px 10px;
            background-color: rgb(211, 154, 154);
            border-radius: 5px;
            max-width: 80%;
            text-align: center;

            p{
              color: #fff;
            }
          }

          label{
              font-size: 18px;
              color: #1b4965;
              padding: 10px 0px;
          }

          input{
              width: 300px;
              max-width: 80%;
              border: none;
              padding: 10px 5px;
              border-radius: 5px;
              outline: none;
              color: #1b4965;
              transition: all 0.3s;
              border: 1px solid transparent;
              margin-bottom: 10px;

              &:focus{
                  border: 1px solid #1b4965;
              }
          }

          button{
              width: 310px;
              max-width: 85%;
              margin-top: 20px;
              padding: 10px 0px;
              background-color: #1b4965;
              border: none;
              color: #fff;
              border-radius: 5px;
              cursor: pointer;
              transition: all 0.3s;

              &:hover{
                  opacity: 0.7;
              }
          }
      }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg) scale(1);
  }

  50%{
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
    
  }
}

</style>