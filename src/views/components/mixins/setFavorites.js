import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('careyshop/favorites', [
      'addToFavorites'
    ])
  }
}
