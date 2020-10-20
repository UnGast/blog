<script>
import Vue from 'vue'
import CodeBlock from '@/components/CodeBlock'
import CodeSnippet from '@/components/CodeSnippet'
import Katex from '@/components/Katex'
import { convertMarkdownToAst } from '@/lib/markdown'

export default {
  props: {
    markdown: {
      type: String,
      required: true
    }
  },
  methods: {
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
          vueNodes.push(this._v(node.text))
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
        } else if (node.type === 'code_block') {
          vueNodes.push(h(CodeBlock, { props: { code: node.content } }))
        } else if (node.type === 'code_snippet') {
          vueNodes.push(h(CodeSnippet, { props: { code: node.content } }))
        } else if (node.type === 'link') {
          vueNodes.push(h('a', { attrs: { href: node.href, target: '_blank' } }, [this._v(node.text)]))
        } else if (node.type === 'katex-snippet') {
          vueNodes.push(h(Katex, { props: { inline: true } }, [this._v(node.content)]))
        } else if (node.type === 'katex-block') {
          vueNodes.push(h(Katex, { props: { inline: false } }, [this._v(node.content)]))
        } else {
          console.debug('No render implementation for node', node)
        }
      }
      return vueNodes
    },
  },
  render(h) {
    const ast = convertMarkdownToAst(this.markdown) 
    return h('div', { class: 'markdown-text running-text' }, [
      this.renderAst(ast, h)
    ])
  }
}
</script>