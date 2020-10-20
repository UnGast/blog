<template>
  <header class="site-header">
    <div class="site-identification-container">
      <!--<button class="toggle-drawer" @click="emitDrawerToggle">W</button>-->
      <nuxt-link class="site-branding" :to="localePath({ name: 'index' })">
        <i class="site-logo" v-html="require('!raw-loader!~/assets/logo/symbol.svg').default"/>
        <!--<img class="site-logo" :src="require('~/assets/logo/logo.png')"/>-->
        <span class="site-name">engineering<br>by doing</span>
      </nuxt-link>
      <!--<nuxt-link :to="{ name: 'index' }" class="site-name">MATHEPRIMUS</nuxt-link>-->
    </div>

    <nav class="primary-nav">
      <nuxt-link class="link" :to="localePath({ name: 'index' })">{{ $t('navigation.articles') }}</nuxt-link>
      <!--<nuxt-link class="link" :to="localePath({ name: 'portfolio' })">{{ $t('navigation.portfolio') }}</nuxt-link>-->
      <nuxt-link class="link" :to="localePath({ name: 'tool-milling-parameters-calculator' })">{{ $t('navigation.millingParametersCalculator') }}</nuxt-link>
      <nuxt-link class="link" :to="localePath({ name: 'projects' })">{{ $t('navigation.projects') }}</nuxt-link>
    </nav>

    <nav class="secondary-nav">
      <icon name="more_vert"/>
      <div class="links">
        <!--<nuxt-link class="link" :to="{ name: 'newsletter' }">Newsletter</nuxt-link>-->

        <nuxt-link class="link" :to="localePath({ name: 'contact' })">{{ $t('navigation.contact') }}</nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  components: { Icon },
  /*methods: {
    emitDrawerToggle() {
      this.$emit('drawerToggle')
    }
  }*/
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.site-header {
  display: flex;
  align-items: center;
  padding: $screen-spacing-normal * 0.5 $screen-spacing-normal;
  box-sizing: content-box;
  //background: darken($primary-color, 20%);
}

.site-identification-container {
  display: flex;
  flex-grow: 0;
  //box-shadow: 0px 0px 12px 12px rgba(0, 0, 0, 0.1);
}

.site-branding {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 48px;

  &:hover {
    background: change-color($primary-color, $alpha: .1);

    /deep/ svg {
      //filter: saturate(0) brightness(10);
    }
  }

  &:active {
    background: change-color($primary-color, $alpha: .2);
  }
}

.site-logo {
  width: 60px;
  height: auto;
  margin-right: 16px;

  /deep/ svg {
    width: inherit;
    height: auto;
  }
}

.site-name {
  color: $primary-color;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
}

.primary-nav {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-start;

  .link {
    background: $primary-color;
    color: white;
    padding: 8px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
    border-right: 1px solid darken($primary-color, 10%);

    &:hover {
      background: darken($primary-color, 10%);
    }

    &:active {
      background: darken($primary-color, 20%);
    }
  }
}

.secondary-nav {
  //display: flex;
  //flex-direction: row;

  .icon {
    display: none;
  }

  .link {
    font-size: 1rem;
    text-decoration: none;
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: $breakpoint-small) {
  .site-header {
    flex-wrap: wrap;
    padding: 0;
  }

  .site-identification-container {
    flex-grow: 0;
    order: 0;
    flex-basis: calc(100% - 64px);
    margin: $screen-spacing-small;
    margin-right: 0;
  }

  .primary-nav {
    order: 2;
    width: 100%;
    background: $primary-color;
  }

  .secondary-nav {
    order: 1;
    flex-basis: 24px;
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: $screen-spacing-small;

    .icon {
      display: inline-block;
    }

    .links {
      position: absolute;
      display: flex;
      flex-direction: column;
      right: 0;
      background: white;
      padding: 16px;
      box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
      opacity: 0;
      pointer-events: none;
    }
    
    &:hover {
      .links {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
}
</style>
