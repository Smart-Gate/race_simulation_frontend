<template>
    <div>
        <v-banner>
        <h3>Brake Simulator</h3>
    </v-banner>
    <v-divider></v-divider>
    
        <v-row>
            <v-col md="6"></v-col>
        
            <v-col md="5"></v-col>
        
        
            <v-col md="1">
                <v-btn
        @click="[
            (GetCarsAPI()),
            (Brake.open = true),
            (Brake.data = {}),
        ]">
            <v-icon>mdi-pencil-plus-outline</v-icon>
        </v-btn>  
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-dialog v-model="Brake.open" width="90vw">
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
        label="Brake Name"
                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Brake.data.name"   
                    required
                  >
                </v-text-field>
                <v-select :items="Cars" v-model="Brake.data.cars"   item-value="id" label="Cars" rounded
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
                      
                      (Brake.open = false),
                      (Brake.data = {}),
                      (GetBrakeAPI())
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
        <v-dialog v-model="BrakeDetails.open" width="90vw">
        <v-data-table :headers="BrakeDetails.headers" :items="Brake.data.cars"></v-data-table>
        </v-dialog>

        
<v-data-table :headers="Brakes.headers" :items="Brakes.data">
    <template v-slot:[`item.actions`]="{ item }">
        <v-icon
        small
        class="mr-2"
        @click="[
           (Brake.data = item),
            (BrakeDetails.open = true),
            
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
   name:'BrakesView',
   data(){
    return{
        GeneralClasses: GeneralClasses,
        Brakes:{
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
    BrakeDetails:{
        open:false,
        headers:[
        {
            text: 'Car ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Car', value: 'name' },
          { text: 'Top Speed Km/h', value: 'top_speed' },
          { text: 'Brake Acceleration', value: 'break_acceleration' },
          { text: 'Time Until Stop S', value: 'time_until_stop' },
          { text: 'Dist Until Stop M', value: 'dist_until_stop' },
        
        ]
    },
    Cars:[],
    Brake:
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
    GetBrakeAPI:function()
    {
        this.$http.get(this.GeneralClasses.Domain()+this.GeneralClasses.API4()).then((Result)=>{
            this.Brakes.data = Result.data.data
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
  
    Submit()
    {
        this.$http.post(this.GeneralClasses.Domain()+this.GeneralClasses.API4(),this.Brake.data).then((Result)=>
        {
           
                this.GetBrakeAPI()
                this.Snackbar.open = true
                this.Snackbar.text =  Result.data.status
            this.Brake.open = false,
            this.Brake.data = {}
            
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
            this.$http.delete(this.GeneralClasses.Domain()+this.GeneralClasses.API4()+data.id).then((Result)=>
        {
            this.Snackbar.open = true
                this.Snackbar.text = Result.data.status
                this.GetBrakeAPI()
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
    this.GetBrakeAPI()
}
}
</script>