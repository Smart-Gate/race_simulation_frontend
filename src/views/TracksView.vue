<template>
    <div>
        <v-banner>
        <h3>Tracks Managment</h3>
    </v-banner>
    <v-divider></v-divider>
    
        <v-row>
            <v-col md="6"></v-col>
        
            <v-col md="5"></v-col>
        
        
            <v-col md="1">
                <v-btn
        @click="[
            (Track.type = 'Create'),
            (Track.open = true),
            (Track.data = {}),
        ]">
            <v-icon>mdi-pencil-plus-outline</v-icon>
        </v-btn>  
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-dialog v-model="Track.open" width="90vw">
   <v-container class="background pa-3" fluid>
    <v-form  >
      <v-card flat>
        <v-card-title>
           <v-row align="center" justify="start" class="my-0 mx-1 caption">
            <h1 class="font-weight-regular">
                <v-icon large >mdi-pencil-plus-outline</v-icon>
                {{Track.type}}
            </h1>
           </v-row> 
        </v-card-title>
        <v-divider />
        <v-text-field
        label="Track Name"
                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Track.data.name"   
                    required
                  >
                </v-text-field>
                <v-text-field
        label="Length"
                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Track.data.length"   
                    required
                  >
                </v-text-field>
                  <v-divider />
                 

               <v-card-actions>
                <v-row align="center" justify="center" class="my-1">
                    <v-btn
                    large
                  class="mx-2 mt-3"
                  color="error"
                  @click="
                    [
                      (Track.Type = ''),
                      (Track.open = false),
                      (Track.data = {}),
                      (GetTrackAPI())
                    ]
                  "
                  rounded>
                   <v-icon
                    color="white"
                    >mdi-close-circle-outline</v-icon
                  >
                  Cancle
                    </v-btn>
                    <v-btn
                  large
                  class="mx-2 mt-3"
                  color="success"
                  rounded
                  @click="Submit(Track.data)"

                >
                  <v-icon
                    color="white"
                    >mdi-content-save-all-outline</v-icon
                  >
                   Save 
                </v-btn>
                </v-row>
               </v-card-actions>   

      </v-card>  
    </v-form>
   </v-container>
        </v-dialog>       
        
<v-data-table :headers="Tracks.headers" :items="Tracks.data">
    <template v-slot:[`item.actions`]="{ item }">
        <v-icon
        small
        class="mr-2"
        @click="[
            (Track.type = 'Edit'),
            (Track.open = true),
            (Track.data = item),
        ]"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="Delete(item)"
      >
      mdi-delete
      </v-icon>
    </template>
</v-data-table>
<v-snackbar
      v-model="Snackbar.open"
      :multi-line=true
    >
    {{ Snackbar.text}}
</v-snackbar>
    </div>
</template>

<script>

import GeneralClasses from '@/SubClasses/GeneralClasses'
    export default {
   name:'TracksView',
   data(){
    return{
        GeneralClasses: GeneralClasses,
        Tracks:{
        data:[],
        headers:[
        {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Name', value: 'name' },  
          { text: 'Length (m)', value: 'length' },
          { text: 'Created_at', value: 'created_at' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]

    },
    Track:
    {
      open:false,
      data:{},
      type:""  
    },
    Snackbar:
    {
        open:false,
        text:''
    }
    }
    
   },
   methods:
   {
    GetTrackAPI:function()
    {
        this.$http.get(this.GeneralClasses.Domain()+this.GeneralClasses.API2()).then((Result)=>{
            this.Tracks.data = Result.data.data
        }).catch((Error)=>{
                console.log(Error.response.data)
        })

    },
    Submit(data)
    {
        var Source = this.Track.type == 'Edit'?this.GeneralClasses.Domain()+this.GeneralClasses.API2()+data.id:this.GeneralClasses.Domain()+this.GeneralClasses.API2()
        this.$http.post(Source,this.Track.data).then((Result)=>
        {
           
                this.GetTrackAPI()
                this.Snackbar.open = true
                this.Snackbar.text = Result.data.status
            this.Track.open = false,
            this.Track.data = {}
            this.Track.type = ''
        }).catch((Error)=>{

        
            this.Snackbar.open = true
                this.Snackbar.text = Error.response.data
                console.log(Error.response.data)
        } 
        )
    },
    Delete(data)
    {
     this.$swal.fire(
        {
            title:'Are you sure?',
            showCancelButton: true,
          confirmButtonText: 'delete',
          denyButtonText: 'cancle',
          icon: 'error',
        }
     ).then((SwalResult)=>{
        if(SwalResult.isConfirmed)
        {
            this.$http.delete(this.GeneralClasses.Domain()+this.GeneralClasses.API2()+data.id).then((Result)=>
        {
            this.Snackbar.open = true
                this.Snackbar.text = Result.data.status
                this.GetTrackAPI()
        }).catch((Error)=>{

        
            this.Snackbar.open = true
                this.Snackbar.text = Error.response.data
                console.log(Error.response.data)
        } 
        )   
        }
     })   
    }
   },
mounted()
{
    this.GetTrackAPI()
}
}
</script>