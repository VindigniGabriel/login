<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
      :temporary="true"
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="url(item.url)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
            >
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
              @click="logout"
            >
              Salir
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="#f48342"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" app></v-toolbar-side-icon>
     
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">GerenciaPCG</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar
        size="40px"
      >
        <img src="https://pbs.twimg.com/profile_images/855250504464703490/mrIeA3nU_400x400.jpg" alt="avatar">
      </v-avatar>
    </v-toolbar>
    <v-content>
      <router-view/>
      <v-footer 
        class="pa-3" 
        fixed
        color="grey lighten-1"
      >
        <span>
          SICO Sistema de Contingencia 
        </span>
        <v-spacer></v-spacer>
        <v-btn>
          <div @click="copyright = true">&copy; {{ new Date().getFullYear() }}</div>
        </v-btn>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'App',
    data() {
      return {
        copyright: false,
        drawer: false,
      items: [
        { icon: 'home', text: 'Registrar', url: '/' },
        { icon: 'group', text: 'Historial de la OC', url: '/list' },
        { icon: 'insert_chart', text: 'Gráficos', url: '/chart' },
        { icon: 'settings', text: 'Configuraciones', url: '/settings' },
        { icon: 'help', text: 'Ayuda', url: '/help' }
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' }
      ]
      }
    },
    methods: {
      url(url){
        this.$router.push(url)
      },
      logout(){
        firebase.auth().signOut()
          .then(() => this.$router.replace('/'))
      }
    },
    computed: {
      
      }
  }
</script>