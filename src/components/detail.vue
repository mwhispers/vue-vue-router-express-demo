<template>
    <div>
        <mu-circular-progress color='orange500' size=36 v-if="loadingData"></mu-circular-progress>
        <div class="detail" v-else>
            <div class="detail-left">
                <img class="movie-poster" :src="movie.poster">
            </div>
            <div class="detail-right">
                <p class="movie-title">{{movie.title}}<span>{{movie.original_title}}</span></p>

                <mu-button @click="goBack" color='orange500'>返回</mu-button>
            </div>
        </div>
    </div>
</template>

<script>
import { loadavg } from 'os';
export default {
    created(){
        this.getMovie(this.$route.params.title)
    },
    data(){
        return {
            movie:{},
            loadingData: true
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        getMovie(title){
            this.$http.get('/api/movie/' + title)
            .then(res=>{
                this.movie = res.data;
                this.loadingData = false;
            })
            .catch(err=>{
                console.log(err);
                this.loadingData = false;
            })
        }
    }
}
</script>
<style lang="less" scoped>
.movie-poster{
    width: 100px;
}
</style>