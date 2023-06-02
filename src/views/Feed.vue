<template>
  <div id="feed">
    
    <div class="group-list" v-if="!loading && !errorList">
      <header>
        <nav>
          <ul>
            <li>User: <span>{{ infoUser.name }}</span></li>
            <li>Email: <span>{{ infoUser.email }}</span></li>
          </ul>
        </nav>
        <div class="logout">
          <button @click="logout">Sair</button>
        </div> 
      </header>
      <h2>Listagem de usuários</h2>
      <div class="users-group">
        <div class="user" v-for="(user,index) in users" :key="index">
          <div class="row">
            <span>Nome:</span>
            <span>{{ user.name }}</span>
          </div>
          <div class="row">
            <span>Email:</span>
            <span>{{ user.email }}</span>
          </div>
          <div class="row">
            <span>Perfil:</span>
            <span>{{ user.perfil }}</span>
          </div>
          <div id="user_id">
            <span>Id:</span>
            <span>{{ user.user_id}}</span>
          </div>
        </div>
      </div>
       
    </div><!--group-list-->

    <div class="loading" v-if="loading && !errorList">
        <p>Estamos agora carregando seu Feed!</p>
        <div class="circle"></div>
    </div><!--loading-->

    <div class="errorList" v-show="errorList">
      <div class="title">
        <p>Não foi possível completar a requisição, tente novamente mais tarde!</p>
        <button @click="goFeed">Voltar para tela de Login</button>
      </div>
    </div>
  </div>
</template>
 
<script>

  import axios from 'axios'

  export default {
    name: 'Feed',

    data(){
      return{
        url:'https://dex-dev-app001.azurewebsites.net',
        users : [],
        infoUser: '',
        loading : false,
        errorList : false
      }
    },
    methods: {
      logout(){
        const res = window.confirm('Você deseja realmente sair?')
        if(res){
          localStorage.clear()
          this.$router.push('/')
        }
      },
      goFeed(){
        localStorage.clear()
        this.$router.push('/')
      }
    },
    async mounted(){
      const permission =  localStorage.getItem('authenticated')
      

      if(permission === 'true'){
        this.loading = true
        const url =  'https://dex-dev-app001.azurewebsites.net'
                const token = localStorage.getItem('token')
                
                const headers = {
                  "Content-Type":"application/json",
                  "Accept":"application/json",
                  "Authorization": `Bearer ${token}`
                }
                
                if(localStorage.getItem('user')){
                  this.infoUser = JSON.parse(localStorage.getItem('user')) 
                } 
  
                try {
                  
                  const response = await axios.get(`${url}/api/usuarios/getUsuarios`, {headers})
                  this.users = response.data.usuarios
                  this.loading = false
                  
                
                } catch(error){
  
                  console.log(error);
                  this.loading = false
                  this.errorList = true
                }
      } else {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  
  #feed{
    background-color:#1b4965;
    box-sizing: border-box;
    padding: 0px 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .errorList{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;

      .title{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;

        p{
          color: #fff;
          font-size: 30px;
          padding: 20px 0px;
        }

        button{
          width: 50%;
          max-width: 300px;
          background-color:rgb(216, 103, 103) ;
          border-radius: 5px;
          border: none;
          color: #fff;
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover{
            opacity: 0.9;
          }
        }
      }
    }

    

    .group-list{
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      flex-direction: column;

      header{
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      .logout{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0px;
      box-sizing: border-box;

      button{
        width: 100%;
        border: none;
        background-color: rgb(216, 103, 103);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 50px;
        transition: all 0.3s;

        &:hover{
          opacity: 0.9;
        }
      }
    }

      nav{
        display: flex;
        justify-content: center;
        align-items: center;
        

        ul{
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: row;
          list-style: none;
           
          li{
            color: #fff;
            padding: 5px 10px;
            margin-right: 10px;
            margin-left: 10px;
            font-weight: 600;

            span{
              font-weight: 400;
            }
          }
        }
      }
    }
    
      h2{
        color: #fff;
        padding: 20px 0px;
      }
    .users-group{
      margin: auto;
      padding: 30px 0px;
      width: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      flex-direction: row;

      .user{
        display: flex;
        justify-content: space-around;
        background-color: #f5f5f5;
        align-items: center;
        flex-direction: column;
        height: 200px;
        width: 400px;
        border-radius: 5px;
        margin: 10px 0px;
        transition: all 0.3s;

        &:hover{
          opacity: 0.9;
        }

        .row{
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: row;
          width: 80%;

          span:nth-child(1){
            text-align: left;
            font-weight: 600;
            width: 20%;
            color: #1b4965;
          }
          span:nth-child(2){
            width: 80%;
            text-align: left;
            color: #1b4965;
            font-weight: 400;
          }
        }

        #user_id{
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: row;
          width: 80%;
          box-sizing: border-box;
          padding: 5px;
          border-radius: 5px;
          background-color: #1b4965;

          span:nth-child(1){
            text-align: left;
            font-weight: 400;
            width: 20%;
            color: #ffffff;
          }
          span:nth-child(2){
            width: 80%;
            text-align: left;
            color: #ffffff;
            font-weight: 400;
            text-align: left;
          }

        }
        
      }
    }

    
    

  }
    .loading{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;

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
