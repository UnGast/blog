import MarkdownIt from 'markdown-it'

const md = MarkdownIt()

md.inline.ruler.before('link', 'katex-snippet', (state, silent) => {
  let followingContent = state.src.substring(state.pos)
  let matches = /^\[tex:(.*?)\:tex]/.exec(followingContent)
  
  if (matches === null) return false
  
  if (!silent) {
    let token = state.push('katex-snippet', '', 0)
    token.content = matches[1]
  }
  state.pos += matches[0].length

  return true
})

md.block.ruler.before('paragraph', 'katex-block', (state, startLine, endLine, silent) => {
  const nextLine = startLine + 1
  
  if (nextLine >= endLine) return false

  const lineStart = state.bMarks[startLine] + state.tShift[startLine]
  const lineEnd = state.eMarks[startLine] + state.tShift[startLine]
        //max = state.eMarks[endLine]

  const blockContent = state.src.substring(lineStart, lineEnd)

  let matches = /^tex:(.*)/.exec(blockContent)

  if (matches === null) return false
  
  let token = state.push('katex-block', '', 0)
  token.content = matches[1]

  state.line = nextLine

  return true
})

md.block.ruler.before('paragraph', 'slider', (state, startLine, endLine, silent) => {
  const nextLine = startLine + 1
  
  if (nextLine >= endLine) return false

  const start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine]

  const blockContent = state.src.substring(start, max)

  if (blockContent === 'slider') {
    state.tokens.push(new state.Token('slider', '', 0))
    state.line = nextLine
    return true
  }
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

export function makeAst(tokens) {
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
      ast.push({ type: 'image', src: token.attrGet('src'), alt: token.content })
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
    } else if (token.type === 'code_block') {
      ast.push({
        type: 'code_block',
        content: token.content
      })
    } else if (token.type === 'code_inline') {
      ast.push({
        type: 'code_snippet',
        content: token.content
      })
    } else if (token.type === 'link_open') {
      let href = token.attrs.find(attr => attr[0] === 'href')[1]
      let text = tokens[i + 1].content
      ast.push({
        type: 'link',
        href,
        text
      })
      i+= 2
    } else if (token.type === 'katex-snippet') {
      ast.push({
        type: 'katex-snippet',
        content: token.content
      })
    } else if (token.type === 'katex-block') {
      ast.push({
        type: 'katex-block',
        content: token.content
      })
    } else {
      //console.debug('UNSUPPORTED TOKEN', token)
    }
  }

  return ast
}

export function convertMarkdownToAst(markdown: String) {
  const tokens = md.parse(markdown)
  return makeAst(tokens)
}