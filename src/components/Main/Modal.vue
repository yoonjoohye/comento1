<template>
<!--부트스트랩 모달-->
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">필터</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <span class="modal-span" v-for="(data,index) in filter">
                    <input type="checkbox" v-bind:id="data.name" v-bind:value="data.no" v-model="isCheck"> 
                    <label v-bind:for="data.name">{{data.name}}</label>
                </span>
            </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="save">저장</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    const baseURI='http://comento.cafe24.com';
    export default{
        data(){
            return{
                filter:[],
                isCheck:[]
            }
        },
        mounted(){
            this.$http.get(`${baseURI}/category.php`)
            .then((result)=>{
                this.filter=result.data.list;
                console.log(this.filter);
            })
        },
        methods:{
            save(){
                alert(this.isCheck);
            }
        }
    }
</script>
<style lang="less">
@num:3%;
.modal-title{
    float:left;
}
.modal-body{
    text-align:center!important
}
.modal-span{
    margin-left:@num;
    margin-right:@num;
    text-overflow: ellipsis;
}
</style>