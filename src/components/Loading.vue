<template>
    <div id="loadingData">
        <div class="group">
            <p>Carregando dados...</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
    }
</script>

<style scoped lang="scss">
    #loadinData{
        height: 100vh;
        width: 100%;
        background-color: #1b4965;
        display: flex;
        justify-content: center;
        align-items: center;

        div{
            background-color:#BEE9E8;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 10px;
            width: 40%;
            min-width: 300px;

            p{
                color: #fff;
                font-size: 20px;
                text-align: center;
            }
        }
    }
</style>