<template>
    <section class="legal-contact-info">
        <p>{{ $config.LEGAL_NAME }}</p>
        <p>{{ $config.LEGAL_ADRESS_LINE_1 }}</p>
        <p>{{ $config.LEGAL_ADDRESS_LINE_2 }}</p>
        <p class="uppercase-first">{{ $t('phone') }}: {{ $config.LEGAL_TELEPHONE_NUMBER }}</p>
        <p class="uppercase-first">{{ $t('email') }}: <a :href="'mailto:' + $config.LEGAL_EMAIL_ADDRESS">{{ $config.LEGAL_EMAIL_ADDRESS }}</a></p>
        <p>{{ $t('legalContact.privacyPolicyNotice.pre') }}<nuxt-link :to="localePath({ name: 'privacy-policy' })">{{ $t('legalContact.privacyPolicyNotice.link') }}</nuxt-link>{{ $t('legalContact.privacyPolicyNotice.end') }}</p>
    </section>
</template>

<script>
export default {
    computed: {
        legal() {
            return this.$store.state.legal
        }
    }
}
</script>

<style lang="scss" scoped>
.uppercase-first::first-letter {
    text-transform: capitalize;
}
</style>