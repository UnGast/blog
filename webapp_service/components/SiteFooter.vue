<template>
  <footer class="site-footer">
    <div class="center-column">
      <span class="copyright">&copy; engineeringbydoing</span>

      <div class="actions">
        <div class="links">
          <nuxt-link class="link negative" :to="localePath({ name: 'privacy-policy' })">{{ $t('navigation.privacyPolicy') }}</nuxt-link>
          <nuxt-link class="link negative" :to="localePath({ name: 'about' })">{{ $t('navigation.about') }}</nuxt-link>
        </div>
        
        <div class="tracking-settings">
          <button @click="toggleTracking" class="button flat negative"><template v-if="trackingEnabled">{{ $t('footerComponent.disableTracking') }}</template><template v-else>{{ $t('footerComponent.enableTracking') }}</template></button>
          <!--<label class="status"><template v-if="trackingEnabled">{{ $t('trackingEnabled') }}</template><template v-else>{{ $t('trackingDisabled') }}</template></label>-->
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    trackingEnabled() {
      return this.$store.state.allowCookies
    }
  },
  methods: {
    toggleTracking() {
      this.$store.dispatch('setAllowCookies', !this.trackingEnabled)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.site-footer {
  display: flex;
  flex-direction: column;
  //justify-content: center;
  position: relative;
  background: $primary-color;
}

.center-column {
  margin: 0 auto;
  display: flex;
  padding: $screen-spacing-normal;
  padding-bottom: $screen-spacing-normal * 0.75;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
}

.copyright {
  font-size: .8rem;
  color: white;
  padding-right: 16px;
  //left: 50%;
  //top: 50%;
  ///transform: translate(-50%, -50%);
}

/* &::before {
  content: "";
  display: block;
  position: absolute;
  width: 70vw;
  height: .5px;
  background: black;
  opacity: .4;
  top: 30px;
}*/

.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
}

.links {
  display: flex;
  align-items: center;
}

.link {
  font-size: .8rem;
  text-decoration: none;
  margin-right: 8px;
}

.tracking-settings {
  display: flex;
  align-items: center;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  .status {
    margin-right: 8px;
    font-size: .8rem;
    font-weight: normal;
    color: white;
  }
}

@media screen and (max-width: $breakpoint-small) {
  .center-column {
    flex-direction: column;
    padding: $screen-spacing-small * 1.1;
    padding-top: $screen-spacing-small * 1.3;
    align-items: stretch;
  }

  .copyright {
    border: none;
    margin-bottom: 8px;
    order: 1;
  }

  .actions {
    order: 0;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .links {
    flex-direction: column;
    align-items: flex-start;
    margin-right: 16px;
    flex-grow: 1;
  }

  .link {
    margin-right: 0;
    margin-bottom: 8px;
  }
}
</style>