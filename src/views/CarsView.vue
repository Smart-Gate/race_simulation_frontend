<template>
    <div>
        <v-banner>
        <h3>Cars Managment</h3>
    </v-banner>
    <v-divider></v-divider>
    
        <v-row>
            <v-col md="6"></v-col>
        
            <v-col md="5"></v-col>
        
        
            <v-col md="1">
                <v-btn
        @click="[
            (Car.type = 'Create'),
            (Car.open = true),
            (Car.data = {}),
        ]">
            <v-icon>mdi-pencil-plus-outline</v-icon>
        </v-btn>  
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-dialog v-model="Car.open" width="90vw">
   <v-container class="background pa-3" fluid>
    <v-form  >
      <v-card flat>
        <v-card-title>
           <v-row align="center" justify="start" class="my-0 mx-1 caption">
            <h1 class="font-weight-regular">
                <v-icon large >mdi-pencil-plus-outline</v-icon>
                {{Car.type}}
            </h1>
           </v-row> 
        </v-card-title>
        <v-divider />
        <v-text-field
        label="Car Name"
                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Car.data.name"   
                    required
                  >
                </v-text-field>
                <v-text-field
        label="Top Speed"
                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Car.data.top_speed"   
                    required
                  >
                </v-text-field>
                  <v-divider />
                  <v-text-field
        label="Acceleration"
                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Car.data.acceleration"  
                    required 
                  >
                </v-text-field>
                  <v-divider />
                  <v-text-field
        label="Break Acceleration"

                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Car.data.break_acceleration" 
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
                      (Car.Type = ''),
                      (Car.open = false),
                      (Car.data = {}),
                      (GetCarsAPI())
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
                  @click="Submit(Car.data)"

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
        
<v-data-table :headers="Cars.headers" :items="Cars.data">
    <template v-slot:[`item.actions`]="{ item }">
        <v-icon
        small
        class="mr-2"
        @click="[
            (Car.type = 'Edit'),
            (Car.open = true),
            (Car.data = item),
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
   name:'CarsView',
   data(){
    return{
        GeneralClasses: GeneralClasses,
        Cars:{
        data:[],
        headers:[
        {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Name', value: 'name' },  
          { text: 'Top Speed (Km/h)', value: 'top_speed' },
          { text: 'Acceleration', value: 'acceleration' },
          { text: 'Break Acceleration', value: 'break_acceleration' },
          { text: 'Created_at', value: 'created_at' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]

    },
    Car:
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
    GetCarsAPI:function()
    {
        this.$http.get(this.GeneralClasses.Domain()+this.GeneralClasses.API1()).then((Result)=>{
            this.Cars.data = Result.data.data
        }).catch((Error)=>{
                console.log(Error.response.data)
        })

    },
    Submit(data)
    {
        var Source = this.Car.type == 'Edit'?this.GeneralClasses.Domain()+this.GeneralClasses.API1()+data.id:this.GeneralClasses.Domain()+this.GeneralClasses.API1()
        this.$http.post(Source,this.Car.data).then((Result)=>
        {
           
                this.GetCarsAPI()
                this.Snackbar.open = true
                this.Snackbar.text = Result.data.status
            this.Car.open = false,
            this.Car.data = {}
            this.Car.type = ''
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
            this.$http.delete(this.GeneralClasses.Domain()+this.GeneralClasses.API1()+data.id).then((Result)=>
        {
            this.Snackbar.open = true
                this.Snackbar.text = Result.data.status
                this.GetCarsAPI()
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
    this.GetCarsAPI()
}
}
</script>