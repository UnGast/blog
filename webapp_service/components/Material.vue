<!--<template>
  <section class="material">
    <vue-markdown>{{ material.text }}</vue-markdown>
    <div v-html="text()">
    </div>
    <section class="downloads">
      <span>Downloads</span>
      <a v-for="download in material.downloads" :key="download.file" class="download" download :href="getDownloadUrl(download)">{{ download.file }}</a>
    </section>
  </section>
</template>-->

<script>
// might use https://github.com/jonschlinkert/remarkable for markdown
import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import MarkdownIt from 'markdown-it'
import Slider from '~/components/Slider'
import MaterialDownloads from '~/components/MaterialDownloads'

function makeAst(tokens) {
  const ast = []

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if (token.type === 'heading_open') {
      ast.push({ type: 'heading', level: tokens[i].tag.replace('h', ''), text: tokens[i + 1].content })
      i += 2
    } else if (token.type === 'paragraph_open') {
      let childTokens = tokens.slice(i + 1)
      childTokens = childTokens.slice(0, childTokens.findIndex(token => token.type === 'paragraph_close')) 
      const paragraph = {
        type: 'paragraph',
        children: makeAst(childTokens)
      }
      ast.push(paragraph)
      i += childTokens.length
    } else if (token.type === 'inline') {
      ast.push(...makeAst(token.children))
    } else if (token.type === 'text') {
      ast.push({ type: 'text', text: token.content })
    } else if (token.type === 'slider') {
      ast.push({ type: 'slider' })
    } else if (token.type === 'image') {
      ast.push({ type: 'image', src: token.attrGet('src'), alt: token.attrGet('alt') })
    } else if (token.type === 'blank') {
      ast.push({ type: 'blank' })
    } else if (token.type === 'em_open') {
      let childTokens = tokens.slice(i + 1)
      childTokens = childTokens.slice(0, childTokens.findIndex(token => token.type === 'em_close')) 
      ast.push({
        type: 'italic',
        children: makeAst(childTokens)
      })
      i += 2
    } else if (token.type === 'strong_open') {
      let childTokens = tokens.slice(i + 1)
      childTokens = childTokens.slice(0, childTokens.findIndex(token => token.type === 'strong_close')) 
      ast.push({
        type: 'bold',
        children: makeAst(childTokens)
      })
      i += 2
    } else if (token.type === 'downloads') {
      ast.push({
        type: 'downloads'
      })
    }
  }

  return ast
}

const md = MarkdownIt()
md.block.ruler.before('paragraph', 'slider', (state, startLine, endLine, silent) => {
  const nextLine = startLine + 1
  
  if (nextLine >= endLine) { return false }

  const start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine]

  console.log('START', start, max, state.src.substring(start, max))
  const blockContent = state.src.substring(start, max)

  if (blockContent === 'slider') {

    console.log('NOW TOEKN')
    state.tokens.push(new state.Token('slider', '', 0))
    state.line = nextLine
    return true
  }



  /*const start = state.pos
  const text = state.src
  console.log("HERE", state, start, text, "OTEHR", otherparam)*/
})

md.block.ruler.before('paragraph', 'blank', (state, startLine, endLine, slient) => {
  const nextLine = startLine + 1
  
  if (nextLine >= endLine) { return false }

  const start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine]

  const blockContent = state.src.substring(start, max)

  if (blockContent[0] === '/') {
    state.tokens.push(new state.Token('blank', '', 0))
    state.line = nextLine
    return true
  }
})

md.block.ruler.before('paragraph', 'downloads', (state, startLine, endLine, slient) => {
  const nextLine = startLine + 1
  
  if (nextLine >= endLine) { return false }

  const start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine]

  const blockContent = state.src.substring(start, max)

  if (blockContent === 'downloads') {
    state.tokens.push(new state.Token('downloads', '', 0))
    state.line = nextLine
    return true
  }
})

export default {
  components: { VueMarkdown },
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  methods: {
    getDownloadUrl (download) {
      return this.$store.getters.getDownloadUrl(this.material, download)
    },
    text () {
      return md.render(this.material.text)
    },
    renderDownloads(h) {
      return h(MaterialDownloads, { props: { material: this.material }}) /*h('div', { class: 'downloads' },
        this.material.downloads.map(download => {
          return h('a', { attrs: { href: this.getDownloadUrl(download), download: true } }, download.file)
        })
      )*/
    },
    renderAst(ast, h) {
      let vueNodes = []
      for (let i = 0; i < ast.length; i++) {
        let node = ast[i]
        if (node.type === 'heading') {
          vueNodes.push(h(`h${node.level}`, node.text))
        } else if (node.type === 'paragraph') {
          vueNodes.push(h('p', this.renderAst(node.children, h)))
        } else if (node.type === 'text') {
          // TODO: might do this using the vuejs _v text rendering function?
          vueNodes.push(h('span', node.text))
        } else if (node.type === 'slider') {
          vueNodes.push(h(Slider, {
            props: {
              material: this.material
            }
          }))
        } else if (node.type === 'image') {
          vueNodes.push(h('img', { class: 'image', attrs: { alt: node.alt, src: node.src } }))
        } else if (node.type === 'blank') {
          vueNodes.push(h('br'))
        } else if (node.type === 'italic') {
          vueNodes.push(h('span', { style: 'font-style: italic' }, this.renderAst(node.children, h)))
        } else if (node.type === 'bold') {
          vueNodes.push(h('span', { style: 'font-weight: bold' }, this.renderAst(node.children, h)))
        } else if (node.type === 'downloads') {
          vueNodes.push(this.renderDownloads(h))
        }
      }
      return vueNodes
    },
  },
  render (h) {
    const tokens = md.parse(this.material.text, {})
    console.log('TOKENS', tokens)
    const ast = makeAst(tokens)
    console.log('AST', ast)
    return h('div', { class: 'material' }, [h('div', { class: 'content running-text' }, this.renderAst(ast, h))])
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/style.scss';

.material {
  overflow-x: hidden;
}

.content {
  p {
    max-width: $max-text-column-width;
    margin-right: 16px;
  }
  
  .image {
    width: 100%;
    max-width: $max-text-column-width;
  }
}
</style>