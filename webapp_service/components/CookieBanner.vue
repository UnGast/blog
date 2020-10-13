<template>
  <section class="cookie-banner negative">
    <p class="message">{{ $t('trackingBannerComponent.cookieMessage.pre') }}<nuxt-link :to="localePath({ name: 'privacy-policy' })">{{ $t('trackingBannerComponent.cookieMessage.link') }}</nuxt-link>{{ $t('trackingBannerComponent.cookieMessage.end') }}</p>
    <div class="buttons">
      <button class="button flat negative" @click="setAllowCookies(true)">{{ $t('allow') }}</button>
      <button class="button flat negative" @click="setAllowCookies(false)">{{ $t('dontAllow') }}</button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    setAllowCookies(allow) {
      this.$store.dispatch('setAllowCookies', allow)
      this.$store.dispatch('setCookieDecisionMade', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.cookie-banner {
  //background: linear-gradient(to top left, change-color($primary-color, $lightness: 86%) 0%, change-color($primary-color, 80%));
  background: change-color($primary-color, $alpha: 1);
  display: flex;
  padding: 16px;
  padding-bottom: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: white;
}

.message {
  font-size: .8rem;
  margin-bottom: 16px;
}

.buttons {
  margin-bottom: 16px;
  margin-left: 16px;
}

.button {
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
}
</style>