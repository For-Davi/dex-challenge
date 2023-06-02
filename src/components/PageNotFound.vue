<template>
    <div id="notFound">
        <div class="title">
            <p>404: Página não encontrada</p>
            <p>Imagino que você esteja aqui pois procura : Mais usuários, mais gestão, mais resultados e menos gastos.</p>
            <p>Só com DEXBOARD</p>
        </div>
        <div class="redirect">
            <button @click="goLogin">Ir para tela de Login</button>
        </div>  
    </div>
</template>

<script>
    export default{
        name: 'PageNotFound',
        methods: {
            goLogin(){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped lang="scss">
    #notFound{
        height: 100vh;
        background-color: #1b4965;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0px 2%;

        .title{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;

            p:nth-child(1){
                font-size: 50px;
                text-align: center;
                color: #fff;
            }
            p:nth-child(2){
                font-size: 20px;
                text-align: center;
                background-color: #466e86;
                border-radius: 5px;
                padding: 20px;
                color: #fff;
            }
            p:nth-child(3){
                font-size: 20px;
                text-align: center;
                background-color: #466e86;
                border-radius: 5px;
                padding: 20px;
                color: #fff;
            }


        }

        .redirect{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;
            width: 50%;

            button{
                width: 30%;
                max-width: 250px;
                min-width: 200px;
                padding: 10px 5px;
                border: none;
                background-color: #fff;
                color: #1b4965;
                font-weight: 600;
                font-size: 16px;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
                
                &:hover{
                    opacity: 0.8;
                }
            }
        }
    }
</style>