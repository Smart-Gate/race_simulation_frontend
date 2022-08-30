<template>
    <div>
        <v-banner>
        <h3>Races Managment</h3>
    </v-banner>
    <v-divider></v-divider>
    
        <v-row>
            <v-col md="6"></v-col>
        
            <v-col md="5"></v-col>
        
        
            <v-col md="1">
                <v-btn
        @click="[
            (GetCarsAPI()),
            (GetTrackAPI()),
            (Race.open = true),
            (Race.data = {}),
        ]">
            <v-icon>mdi-pencil-plus-outline</v-icon>
        </v-btn>  
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-dialog v-model="Race.open" width="90vw">
   <v-container class="background pa-3" fluid>
    <v-form  >
      <v-card flat>
        <v-card-title>
           <v-row align="center" justify="start" class="my-0 mx-1 caption">
            <h1 class="font-weight-regular">
                <v-icon large >mdi-pencil-plus-outline</v-icon>
                Create Reace
            </h1>
            
           </v-row> 
           
           
        </v-card-title>
        <v-divider />
        <v-text-field
        label="Race Name"
                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Race.data.name"   
                    required
                  >
                </v-text-field>
                <v-select :items="Tracks" v-model="Race.data.path"   item-value="id" label="Track" rounded
                    prepend-inner-icon="mdi-star" >
                    <template slot="selection" slot-scope="data">
                        {{data.item.name}} - {{data.item.length}} m
                    </template>
                    <template slot="item" slot-scope="data">
                        {{data.item.name}} - {{data.item.length}} m
                    </template>
                </v-select>
                <v-select :items="Cars" v-model="Race.data.cars"   item-value="id" label="Cars" rounded
                    prepend-inner-icon="mdi-star" chips multiple attach solo item-text="name">
                    
                </v-select>
                  <v-divider />
                 

               <v-card-actions>
                <v-row align="center" justify="center" class="my-1">
                    <v-btn
                    large
                  class="mx-2 mt-3"
                  color="error"
                  @click="
                    [
                      
                      (Race.open = false),
                      (Race.data = {}),
                      (GetRaceAPI())
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
                  @click="Submit()"

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
        <v-dialog v-model="RaceDetails.open" width="90vw">
        <v-data-table :headers="RaceDetails.headers" :items="Race.data.cars"></v-data-table>
        </v-dialog>

        
<v-data-table :headers="Races.headers" :items="Races.data">
    <template v-slot:[`item.actions`]="{ item }">
        <v-icon
        small
        class="mr-2"
        @click="[
           (Race.data = item),
            (RaceDetails.open = true),
            
        ]"
      >
        mdi-car-info
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
   name:'RacesView',
   data(){
    return{
        GeneralClasses: GeneralClasses,
        Races:{
        data:[],
        headers:[
        {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Name', value: 'name' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]

    },
    RaceDetails:{
        open:false,
        headers:[
        {
            text: 'Car ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Car', value: 'name' },
          { text: 'Top Speed Km/h', value: 'top_speed' },
          { text: 'Acceleration', value: 'acceleration' },
          { text: 'Time Until Top Speed S', value: 'time_until_top_speed' },
          { text: 'Dist Until Top Speed M', value: 'dist_until_top_speed' },
          { text: 'Time With Top Speed S', value: 'time_with_top_speed' },
          { text: 'Dist With Top Speed', value: 'dist_with_top_speed' },
          { text: 'Total Time', value: 'total_time' },
          { text: 'Path Length', value: 'path_length' },
          { text: 'Total Dist', value: 'total_dist' },
        ]
    },
    Cars:[],
    Tracks:[],
    Race:
    {
      open:false,
      data:{},
        
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
    GetRaceAPI:function()
    {
        this.$http.get(this.GeneralClasses.Domain()+this.GeneralClasses.API3()).then((Result)=>{
            this.Races.data = Result.data.data
        }).catch((Error)=>{
                console.log(Error.response.data)
        })

    },
    GetCarsAPI:function()
    {
        this.$http.get(this.GeneralClasses.Domain()+this.GeneralClasses.API1()).then((Result)=>{
            this.Cars = Result.data.data
        }).catch((Error)=>{
                console.log(Error.response.data)
        })

    },
    GetTrackAPI:function()
    {
        this.$http.get(this.GeneralClasses.Domain()+this.GeneralClasses.API2()).then((Result)=>{
            this.Tracks = Result.data.data
            console.log(this.Tracks.data)
        }).catch((Error)=>{
            this.Snackbar.open = true
                this.Snackbar.text = Error.response.data
                console.log(Error.response.data)
        })

    },
    Submit()
    {
        this.$http.post(this.GeneralClasses.Domain()+this.GeneralClasses.API3(),this.Race.data).then((Result)=>
        {
           
                this.GetRaceAPI()
                this.Snackbar.open = true
                this.Snackbar.text = "number of errors:"+ Result.data.errors_number
            this.Race.open = false,
            this.Race.data = {}
            
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
            this.$http.delete(this.GeneralClasses.Domain()+this.GeneralClasses.API3()+data.id).then((Result)=>
        {
            this.Snackbar.open = true
                this.Snackbar.text = Result.data.status
                this.GetRaceAPI()
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
    this.GetRaceAPI()
}
}
</script>