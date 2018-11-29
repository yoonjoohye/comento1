<template>
  <div class="main">
    <component v-bind:is="component" v-on:save="filter"></component>
    <div class="filter">
    <!--필터-->
        <button class="btn btn-primary" v-on:click="component='modal'" data-toggle="modal" data-target=".bd-example-modal-lg">필터</button>
        <div class="sort">
            <a href="#" class='on' id="asc" @click="setAsc">오름차순</a>
            <a href="#" id="desc" @click="setDesc">내림차순</a>
        </div>
    </div>
   
<v-infinite-scroll :loading="loading" @top="prevPage" @bottom="nextPage" :offset='10'>
   <!--게시물-->
    <div class="list" v-for="(data,index) in board" >
        <a class="list_a" v-bind:href="'/#/detail/'+data.no">
        <div class="no">
            <div class="text-left">{{data.category_no}}</div> 
            <div class="text-right">{{data.no}}</div>
        </div>
        <div class="text-left">
            <span v-line-clamp:3="1">{{data.email}} | {{data.updated_at}}</span>
        </div>
        <div class="board">
            <p class="title" v-line-clamp:10="1">{{data.title}}</p>
            <p class="content" v-line-clamp:20="2">{{data.contents}}</p>
        </div>
        </a>
    </div>

    <!--광고-->
    <div v-if="adOK" v-for="(data,index) in advertise" class="advertise">
        <div class="ad_spr">Sponsored</div>
        <div class="ad_img1"><img class="ad_img2" v-bind:src="'http://comento.cafe24.com/public/images/'+data.img"></div>
        <div class="ad_word">
            <p class="ad_title" v-line-clamp:10="1">{{data.title}}</p>
            <p class="ad_content" v-line-clamp:20="5">{{data.contents}}}</p>
        </div>
    </div>
</v-infinite-scroll>
  </div>
</template>

<script>
const baseURI='http://comento.cafe24.com';
import Modal from './Modal.vue';

export default {
    name: 'Main',
    components:{
        'modal':Modal
    },
     created(){      
        for(var i=1; i<=this.pageCount; i++){
        if(i%4==0){
            this.adOK=true;
            console.log(this.adOK);

            this.$http.get(`${baseURI}/ads.php?page=${this.page}&limit=10`)
            .then((result)=>{
                this.advertise=result.data.list;
                console.log(this.advertise);
            })
        }
        }
        for(var i=1; i<=this.category_cnt; i++){
        this.$http.get(`${baseURI}/request.php?page=${this.page}&ord=asc&category=${i}`)
        .then((result)=>{
            this.board=[];
            this.board=result.data.list;
        })
        }
        console.log(this.board); 
    },
    data(){
        return{
            component:'modal',
            page: 1,
            loading: false, 
            category_cnt:3, // 카테고리 개수
            board:[], //게시물 API  
            pageCount:10, //한페이지당 개수
            advertise:[], //광고 API
            adOK:false, //광고 유무
        }
    },
    methods:{
        /*infinite scroll*/ 
       prevPage () {
            if (this.page == 1) return
            --this.page
            this.api()
        },
        nextPage () {
            ++this.page
            this.api()
        },
        api () {
            this.loading = true
            myApi.get({page: this.page}).then((response) => {
                this.items = response
                this.loading = false
            })
        },
        /*필터에 저장 누르면 발생*/
        filter(){

        },
        /*오름차순*/ 
        setAsc(){
            $(function(){
                $('a').removeClass();
                $('#asc').addClass('on');
            })
            for(var i=1; i<=this.category_cnt; i++){
            this.$http.get(`${baseURI}/request.php?page=${this.page}&ord=asc&category=${i}`)
            .then((result)=>{
                this.board=[];
                this.board=result.data.list;
            })
            }
            console.log(this.board);
        },
        /*내림차순*/
        setDesc(){
            $(function(){
                $('a').removeClass();
                $('#desc').addClass('on');
            })
            for(var i=1; i<=this.category_cnt; i++){
            this.$http.get(`${baseURI}/request.php?page=${this.page}&ord=desc&category=${i}`)
            .then((result)=>{
                this.board=[];
                this.board=result.data.list;
            })
            }
            console.log(this.board);
        }
    }
}
</script>
<style lang="less">
@color:#333333;
@border-color:#eeeeee;
@font-color:black;
@comento-color:#00c854;
.Main{
    margin:0;
    padding:0;
    margin:4%;
    color:@color;
}
.filter{
    margin-top:2%;
}
.btn.btn-primary{
    background-color:@comento-color!important;
    border:0px!important;
}
a{  
    color:@font-color!important;
    text-decoration:none!important;
}
a.on{  
   color:@comento-color!important;
}
.sort{
    text-align:center;
    float:right;
    color:@font-color;
}
.list{
    cursor:pointer;
    border:1px solid @border-color;
    padding:2em;
    margin-top:2%;
    margin-bottom:2%;
    box-shadow: 0 5px 20px rgba(133, 133, 133, 0.3), 0 2px 5px rgba(133, 133, 133,0.22);
}
.list_a{
    font-weight:normal;
    color:@color;
}
.text-left{
    float:left;
    text-overflow: ellipsis;
    color:@font-color;
}
.no{
    color:@font-color;
    border-bottom:1px solid @border-color;
}

.title{
    font-size:2em;
    color:@font-color;
}
.content{
    font-size:2rem;
    color:@font-color;
}
.board{
    clear:both;
}
.advertise{
    border:1px solid @border-color;
    padding:2em;
    margin-top:2%;
    margin-bottom:2%;
    box-shadow: 0 5px 10px rgba(133, 133, 133, 0.3), 0 2px 5px rgba(133, 133, 133,0.22);
}
.ad_img1{
    float:left;
    width:50%;
    text-align:left;
}
.ad_img2{
    width:80%;
    height:15rem;
}
.ad_title{
    font-weight:bold;
    font-size:2rem;
}
.ad_content{
    font-size:1.5rem;
}

@media screen and (max-width:480px){
    .main{
        width:100%;
    }
    .advertise{
        text-align:left;
    }
    .ad_img1{
        width:100%;
        clear:both;
        text-align:center;
    }
    .ad_img2{
        width:100%;
        height:40rem;
    }
    .ad_title{
        clear:both;
        font-weight:bold;
        text-align:left;
        font-size:2rem;
    }
    .ad_content{
        font-size:1.5rem;
    }
}
/*모바일 세로모드 portrait*/
@media screen and (max-width:480px) and (orientation: portrait){
    .main{
        width:100%;
        flex-direction: column;
    }
    
    .main{
        width:100%!important;
    }
}
</style>