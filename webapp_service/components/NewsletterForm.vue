<template>
  <div class="newsletter-form form">
    <h1 class="heading">{{ $t('newsletterForm.heading') }}</h1>
    <!--<p class="description">Wenn Sie sich für meinen Newsletter anmelden, erhalten Sie Benachrichtigungen über neue Materialien und andere Veröffentlichungen.</p>-->
    <!--<div class="form-line">
      <select class="select" v-model="gender">
        <option value="male">{{ $t('male') }}</option>
        <option value="female">{{ $t('female') }}</option>
      </select>
    </div>-->
    <div class="form-line">
      <div class="form-element">
        <label class="label" :for="id + '-firstName'">{{ $t('newsletterForm.firstName') }}</label>
        <input class="text-input" :id="id + '-firstName'" type="text" v-model="$v.firstName.$model" :placeholder="$t('newsletterForm.firstName')"/>
      </div>
      <div class="form-element">
        <label class="label" :for="id + '-email'">{{ $t('newsletterForm.email') }}</label>
        <input class="text-input" :id="id + '-email'" type="email" v-model="$v.email.$model" :placeholder="$t('newsletterForm.email')"/>
      </div>
      <div class="errors" v-if="$v.firstName.$anyError || $v.email.$anyError">
        <label class="error" v-if="!$v.firstName.required && $v.$dirty">{{ $t('newsletterForm.enterFirstName') }}</label>
        <label class="error" v-if="!$v.email.required && $v.$dirty">{{ $t('newsletterForm.enterEmail') }}</label>
        <label class="error" v-if="!$v.email.email && $v.email.required && $v.$dirty">{{ $t('newsletterForm.enterValidEmail') }}</label>
      </div>
      <!--<input class="text-input" type="text" v-model="$v.lastName.$model" :placeholder="$t('lastName')"/>-->
    </div>
    <div class="form-line">
      <div class="form-element checkbox-element">
        <checkbox type="checkbox" v-model="acceptsDataPrivacy"/>
        <label class="label">
          {{ $t('newsletterForm.privacyPolicyAcceptance.pre') }}<nuxt-link :to="localePath({ name: 'privacy-policy' })" target="_blank">{{ $t('newsletterForm.privacyPolicyAcceptance.link') }}</nuxt-link>{{ $t('newsletterForm.privacyPolicyAcceptance.end') }}
        </label>
      </div>
      <div class="errors" v-if="$v.acceptsDataPrivacy.$anyError">
        <label class="error" v-if="!$v.acceptsDataPrivacy.sameAs && $v.$dirty">{{ $t('newsletterForm.approvalRequired') }}</label>
      </div>
    </div>
    <div class="errors form-line" v-if="$v.$dirty && $v.$error">
      <label class="error">{{ $t('newsletterForm.checkInput') }}</label>
    </div>
    <div class="actions">
      <button class="primary-action-button button flat" @click="handleSubmit"><span>{{ $t('newsletterForm.subscribe') }}</span></button>
      <!--<button v-if="hideable" class="hide-button" @click="handleHide">{{ $t('dontShowAgain') }}</button>
      -->
    </div>
    <div class="status form-line" v-if="requestStatus">
      <label class="error" v-if="requestStatus === 'error'">{{ $t('newsletterForm.errorOccurred') }}</label>
      <label class="success" v-if="requestStatus === 'success'">{{ $t('newsletterForm.newsletterOptInEmailSent') }}</label>
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/Checkbox'
import { validationMixin } from 'vuelidate'
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  components: { Checkbox },
  props: {
    /*hideable: {
      type: Boolean,
      default: false
    }*/
  },
  data: () => ({
    gender: 'male',
    firstName: '',
    lastName: '',
    email: '',
    acceptsDataPrivacy: false,
    requestStatus: null,
    id: ''
  }),
  validations: {
    firstName: {
      required
    },
    /*lastName: {
      required
    },*/
    email: {
      required,
      email
    },
    acceptsDataPrivacy: {
      sameAs: sameAs(() => true)
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', process.env.BASE_URL + '/api/newsletter')
        xhr.onload = () => {
          if (xhr.status === 200) {
            console.log('20000')
            this.requestStatus = 'success'
          } else {
            this.requestStatus = 'error'
          }
        }
        xhr.onerror = () => {
          this.requestStatus = 'error'
        }
        xhr.send(JSON.stringify({
          firstName: this.firstName,
          email: this.email
        }))
      }
    },
    handleHide() {
      this.$store.dispatch('setUserHidNewsletter', true)
    }
  },
  mounted() {
    this.id = this._uid
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.newsletter-form {
  //border: 5px solid $primary-color;
  padding: 32px 16px 24px 16px;
  border-radius: 0px;
  border: 5px solid change-color($primary-color, $alpha: .1);
}

.heading {
  margin-bottom: 32px;
  text-transform: uppercase;
  font-size: 1.5rem;
}

.description {
  margin-bottom: 16px;
}

/*.hide-button {
  background: transparent;
  font-size: .7rem;
  color: white;
  text-transform: uppercase;
  border: 0;
  font-weight: bold;
  padding: 8px 16px;
  outline: 0;
  cursor: pointer;
  border-radius: 5px;
  transition: background .15s;

  &:hover {
    background: change-color($color: white, $alpha: .1);
  }

  &:active {
    background: change-color($color: white, $alpha: .2);
  }
}*/

.negative {
  background: linear-gradient(to bottom right, $primary-color 0%, darken($primary-color, 15%) 100%);
  color: white;
}

@media screen and (max-width: $breakpoint-small) {
  .heading {
    font-size: 1.2rem;
  }
}
</style>