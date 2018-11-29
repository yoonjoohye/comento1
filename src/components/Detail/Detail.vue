<template>
<div class="all">
<component v-bind:is="component" v-on:later="footer"></component>
<div class="detail">
    <!--선택한 게시물-->
    <h3>Detail</h3>
    <div class="details">
    <div class="no">
        <span class="c_no">{{this.board[0].category_no}}</span> 
        <span class="w_no">{{this.board[0].no}}</span>
    </div>
    <div>
        <span>{{this.board[0].email}} | {{this.board[0].updated_at}}</span>
    </div>
    <div class="board">    
        <p class="title">{{this.board[0].title}}</p>
        <p class="content">{{this.board[0].contents}}</p>
    </div>
    </div>
    <br>
    <!--댓글-->
    <div v-if="isOK">
        <h3>Replies</h3>
        <div class="reply" v-for="(data,index) in replies">
            <div class="num">No.{{data.no}}</div>
            <p>{{data.contents}}</p>
            <div class="info">{{data.email}} | {{data.updated_at}}</div>
        </div>
    </div>
    <div v-else>
        <h3>no replies:(</h3>
    </div>
</div>
<!--하단 팝업-->
<div class="popup" id="popup">
    <p class="word" v-line-clamp:20="2">지금 가입하면 꿈꾸던 기업에 재직 중인 현직자와 <span class="highlight">익명</span>으로 대화할 수 있습니다.</p>
    <button type="button" v-if="$mq.mobile" class="register"  data-backdrop="static" data-toggle="modal" data-target="#myModal">회원가입</button> 
    <button type="button" v-else class="register"  data-backdrop="static" data-toggle="modal" data-target="#myModal">SNS계정으로 빠른 회원가입</button>
    <span class="or">또는</span>
    <button type="button" class="login">로그인</button>
</div>
</div>
</template>

<script>
    import Register from './Register.vue';
    const baseURI='http://comento.cafe24.com';
    export default{
        name:'Detail',
        /*match media*/ 
        mq: {
            mobile: '(max-width: 480px)'
        },
        /*컴포넌트*/
        components:{
            'register':Register
        },
        /*선택한 게시물*/
        created(){
            this.$http.get(`${baseURI}/detail.php?req_no=${this.$route.params.id}`)
            .then((result)=>{
                this.board.push(result.data.detail.article);
                console.log(this.board);
                this.replies=result.data.detail.replies;
                /*댓글이 있다면 */
                if(this.replies.length>=1){
                    this.isOK=true;
                    console.log(this.replies);
                }
            })
        },
        data(){
            return{
                board:[], //상세게시물 API
                replies:[], //댓글 API
                isOK:false, //댓글 유무
                component:'register' 
            }
        },
        methods:{
            /*나중에 보기하면 하단에 뜸*/
            footer(){
                $(function(){
                    $("#popup").css("display","block");
                })
            }
        }
    }
</script>


<style lang="less">
@color:#dddddd;
@border:0px;
.all{
    margin:0;
    padding:0;
    width:100%;
}
.popup{
    display:none;
    padding:1.5%;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align:center;
    background-color:white;
    width:100%;
    border:1px solid #dddddd;
}
.register{
    background-color:#00c854;
    color:white;
    border:@border;
    padding:1.1em;
    content:"SNS계정으로 빠른 회원가입";
}
.login{
    background-color:#eeeeee;
    border:@border;
    padding:1.1em;
}
.highlight{
    color:red;
}
.w_no{
    float:right;
    clear:both;
}
.detail{
    margin:4%;
}
.details{
    width:100%;
    border:1px solid #eeeeee;
    padding:2em;
    margin-top:2%;
    margin-bottom:2%;
    box-shadow: 0 5px 10px rgba(133, 133, 133, 0.3), 0 5px 12px rgba(133, 133, 133,0.22);
}
.reply{
   .details
}
.no{
    color:black;
    border-bottom:1px solid #eeeeee;
}
.num{
    border-bottom:1px solid #eeeeee;
}

.title{
    font-size:2em;
    color:black;
}
.content{
    font-size:2rem;
    color:black;
}
.board{
    clear:both;
}
@media screen and (max-width:480px){
    .all{
        width:100%;
    }
    .login{
        display:none;
    }
    .register{
        width:80%;
    }
    .or{
        display:none;
    }
    .word{
       display:inline-block;
    }
    .popup{
        width:100%;
       text-align:center;
    }
}
/*모바일 세로모드 portrait*/
@media screen and (max-width:480px) and (orientation: portrait){
    .all{
        width:100%;
    }
    .login{
        display:none;
    }
    .register{
        width:80%;
    } 
    .or{
        display:none;
    }
     .word{
        display:inline-block;
    }
    .popup{
        width:100%;
       text-align:center;
    }
}
</style>