<template>
<!--부트스트랩 모달-->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog"> 
        <div class="modal-content"> 
            <div class="modal-header"> 
                <h3 class="modal-title" id="myModalLabel">회원가입</h3> 
            </div> 
            <div class="modal-body"> 
                <div class="explain">
            지금 가입하면 꿈꾸던 기업에 재직 중인 현직자와 <span class="highlight">익명</span>으로 대화할 수 있습니다.
                </div>
                <div class="register_way">
                    <button class="facebook">페이스북 계정으로 회원가입</button><br>
                    <button class="google">구글 계정으로 회원가입</button><br>
                    <button class="naver">네이버 계정으로 회원가입</button><br>
                </div>
            </div> 
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="later">나중에 하기</button>
            </div> 
        </div>
    </div>
</div>
</template>

<script>
export default{
    /*로딩될 때 모달 보이게*/ 
    created(){
       $(window).load(function(){
            $('#myModal').modal({backdrop: 'static', keyboard: false},'show');
        });
    },
    methods:{
        /*나중에 보기 누르면 상위 컴포넌트로 감*/ 
        later(){
            this.$emit('later');
        }
    }
}
</script>

<style lang="less">
@border:1.5px solid #eeeeee;
.modal fade{

}
#myModalLabel{
    font-weight:bold;
}
.modal-header{
    border-bottom:0px!important;
}
.modal-title{
    text-align:center!important;
}
.btn.btn-default{
    width:100%!important;
    border:0px!important;
}
.info{
    border-top:@border;
}
.explain{
    border:@border;
    padding:4.5%;
    margin-bottom:10%;
    font-size:12pt;
    overflow:hidden;
}
.modal-body{
    text-align:center!important;
    padding:10%;
}
.facebook{
    background-color:#3b5998;
    color:white;
    font-weight:bold;
    border:@border;
    width:100%;
    padding:3%;
    margin-bottom:3%;
}
.google{
    background-color:#ea4335;
    color:white;
    font-weight:bold;
    border:@border;
    width:100%;
    height:100%;
    padding:3%;
    margin-bottom:3%;
}
.naver{
    background-color:#00bd39;
    color:white;
    font-weight:bold;
    border:@border;
    padding:3%;
    width:100%;
}
.highlight{
    color:red;
}
</style>