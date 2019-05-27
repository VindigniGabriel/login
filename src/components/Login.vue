<template>
<v-container fill-height>
  <v-layout justify-center align-center wrap>
    <v-flex xs12 md6 class="text-xs-center">
      <svg
        height="200pt" 
        viewBox="0 0 512 512" 
        width="200" 
        fill="grey"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m404 148c0-81.605469-66.394531-148-148-148s-148 66.394531-148 148c0 50.546875 25.480469 95.25 64.261719 121.964844-36.210938 12.492187-69.398438 33.132812-97.28125 61.015625-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531h40c0-119.101562 96.898438-216 216-216 81.605469 0 148-66.394531 148-148zm-148 108c-59.550781 0-108-48.449219-108-108s48.449219-108 108-108 108 48.449219 108 108-48.449219 108-108 108zm66 135.980469h190v40h-190zm190-79.980469v40h-190v-40zm-190 160h190v40h-190zm0 0"/>
      </svg>
      <h3 class="headline">
        <span class="font-weight-thin">Registro de Usuarios <v-icon color="deep-orange lighten-1">add</v-icon> Requerimientos</span>
      </h3>
    </v-flex>
    <v-flex xs12 md6>
      <template>
        <form>
          <v-text-field
            prepend-icon="email"
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            color="blue"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            v-model="pass"
            :error-messages="passErrors"
            label="Contraseña"
            required
            @input="$v.pass.$touch()"
            @blur="$v.pass.$touch()"
            type="password"
            color="blue"
          ></v-text-field>
          <v-btn
            color="deep-orange darken-3"
            outline
            @click="submit"
          >
            Ingresar
          </v-btn>
          <v-btn 
            flat 
            icon 
            color="green"
            @click="clear"
          >
            <v-icon>
              cached
            </v-icon>
          </v-btn>
        </form>
      </template>
    </v-flex>
    <v-flex xs12 class="text-xs-center">
      <v-avatar
        size="60px"
      >
        <img src="https://pbs.twimg.com/profile_images/855250504464703490/mrIeA3nU_400x400.jpg" alt="avatar">
      </v-avatar>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import firebase from 'firebase'

  export default {
    mixins: [validationMixin],

    validations: {
      email: { required, email },
      pass: { required }
    },

    data: () => ({
      email: '',
      pass: '',
      submitStatus: ''
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('E-mail invalido')
        !this.$v.email.required && errors.push('E-mail es requerido')
        return errors
      },
      passErrors () {
        const errors = []
        if (!this.$v.pass.$dirty) return errors
        !this.$v.pass.required && errors.push('Contraseña es requerido')
        return errors
      }
    },

    methods: {
       clear () {
        this.$v.$reset()
        this.pass = ''
        this.email = ''
      },
      submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
          .then(user => {
            this.$router.replace('/home')
          })
      }
    }
    }
  }
</script>