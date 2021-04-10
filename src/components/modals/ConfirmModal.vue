<template>
  <div class="modal__overlay">
    <div class="modal__container">
      <h3 class="modal__title">{{ confirmModalData.message }}</h3>
      <button
        class="modal__btn modal__btn--accept"
        @click="setConfirmModalAns(true)"
        ref="confirmButton"
      >
        Подтвердить
      </button>
      <button
        class="modal__btn modal__btn--decline"
        @click="setConfirmModalAns(false)"
      >
        Отменить
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ConfirmModal',
  computed: {
    ...mapGetters(['confirmModalData'])
  },
  methods: {
    ...mapActions(['setConfirmModalAns'])
  },
  mounted() {
    this.$refs.confirmButton.focus()
  }
}
</script>
