<template>
  <v-app>
    <v-app-bar app color="primary" class="headline" dark>
      Tuiles algébriques
    </v-app-bar>
    <v-main>
      <mainDeck/>
    </v-main>
  </v-app>
</template>

<script>
import mainDeck from './components/mainDeck';

export default {
  name: 'App',

  components: {
    mainDeck,
  },

  data: () => ({
    //
  }),
};
</script>
