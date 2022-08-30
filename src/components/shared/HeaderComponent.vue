<template>
    <div>
        <v-app-bar color="blue" dark dense>
            
            <v-app-bar-nav-icon @click.stop="Drawer = !Drawer"></v-app-bar-nav-icon> 
            <v-toolbar-title>Racing simulation App</v-toolbar-title>
            
        </v-app-bar>
        <v-navigation-drawer v-model="Drawer" fixed temporary >
            <v-list nav dense>
                <v-list-item>
                    <v-list-item-title>
                        Racing simulation App
                    </v-list-item-title>
               
                </v-list-item>
                <v-divider />
                <v-list-item to='/cars'>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-car-cog
                        </v-icon>
                    </v-list-item-icon> 
                    <v-list-item-title>Cars Managment</v-list-item-title> 
                </v-list-item> 
                
                <v-list-item to='/tracks'>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-road
                        </v-icon>
                    </v-list-item-icon> 
                    <v-list-item-title>Tracks Managment</v-list-item-title> 
                </v-list-item> 
                <v-list-item to='/races'>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-windsock
                        </v-icon>
                    </v-list-item-icon> 
                    <v-list-item-title>Races Managment</v-list-item-title> 
                </v-list-item> 
                <v-list-item to='/brake'>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-car-brake-abs
                        </v-icon>
                    </v-list-item-icon> 
                    <v-list-item-title>Brake Simulator</v-list-item-title> 
                </v-list-item> 
            </v-list>
            
        </v-navigation-drawer> 
    </div>
</template>

<script>
    export default
    {
        name:'HeaderComponent',
        data()
        {
            return{
                Drawer:false
            }
        }
    }
</script>