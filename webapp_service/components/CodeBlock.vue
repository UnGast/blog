<template>
  <client-only><vue-code-highlight class="code-block">{{ code }}</vue-code-highlight></client-only>
</template>

<script>
import { component as VueCodeHighlight } from 'vue-code-highlight'

export default {
  components: { VueCodeHighlight },
  props: {
    code: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/style/style.scss";

.code-block {
  display: block;
  background: adjust-color($primary-color, $lightness: -55%);
  //color: rgb(100, 255, 100);
  color: adjust-color($primary-color, $lightness: 25%);
  border-radius: 5px;
  //background: radial-gradient(ellipse at top, white 0%, white 60%, rgb(246, 246, 246) 100%);
  box-shadow: 0 0 4px 0px rgb(230, 230, 230);
  //font-family: FiraCode;
}

.code-block {
code[class*="language-"],
pre[class*="language-"] {
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	color: #eee;

	font-size: .8rem;
	line-height: 1.5em;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
  hyphens: none;
  
  * {
    font-family: FiraCode, Roboto Mono, monospace;
  }
}

code[class*="language-"]::-moz-selection,
pre[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection,
pre[class*="language-"] ::-moz-selection {
	background: adjust-color($primary-color, $lightness: -35%);
}

code[class*="language-"]::selection,
pre[class*="language-"]::selection,
code[class*="language-"] ::selection,
pre[class*="language-"] ::selection {
	background: adjust-color($primary-color, $lightness: -35%);

}

:not(pre) > code[class*="language-"] {
	white-space: normal;
	border-radius: 0.2em;
	padding: 0.1em;
}

pre[class*="language-"] {
	overflow: auto;
	position: relative;
	margin: 0.5em 0;
	padding: 1.25em 1em;
}

.language-css > code,
.language-sass > code,
.language-scss > code {
	color: #fd9170;
}

[class*="language-"] .namespace {
	opacity: 0.7;
}

.token.atrule {
	color: #c792ea;
}

.token.attr-name {
	color: #ffcb6b;
}

.token.attr-value {
	color: #a5e844;
}

.token.attribute {
	color: #a5e844;
}

.token.boolean {
	color: #c792ea;
}

.token.builtin {
	color: #ffcb6b;
}

.token.cdata {
	color: #80cbc4;
}

.token.char {
	color: #80cbc4;
}

.token.class {
	color: #ffcb6b;
}

.token.class-name {
	color: #f2ff00;
}

.token.comment {
	color: #616161;
}

.token.constant {
	color: #c792ea;
}

.token.deleted {
	color: #ff6666;
}

.token.doctype {
	color: #616161;
}

.token.entity {
	color: #ff6666;
}

.token.function {
	color: #c792ea;
}

.token.hexcode {
	color: #f2ff00;
}

.token.id {
	color: #c792ea;
	font-weight: bold;
}

.token.important {
	color: #c792ea;
	font-weight: bold;
}

.token.inserted {
	color: #80cbc4;
}

.token.keyword {
	color: #c792ea;
}

.token.number {
	color: #fd9170;
}

.token.operator {
	color: #89ddff;
}

.token.prolog {
	color: #616161;
}

.token.property {
	color: #80cbc4;
}

.token.pseudo-class {
	color: #a5e844;
}

.token.pseudo-element {
	color: #a5e844;
}

.token.punctuation {
	color: #89ddff;
}

.token.regex {
	color: #f2ff00;
}

.token.selector {
	color: #ff6666;
}

.token.string {
	color: #a5e844;
}

.token.symbol {
	color: #c792ea;
}

.token.tag {
	color: #ff6666;
}

.token.unit {
	color: #fd9170;
}

.token.url {
	color: #ff6666;
}

.token.variable {
	color: #ff6666;
}
}
</style>