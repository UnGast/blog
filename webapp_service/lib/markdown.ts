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

md.inline.ruler.before('backticks', 'download', (state, silent) => {
  let followingContent = state.src.substring(state.pos)
  let matches = /^\[download (.*?)( (.*?))?\](\((.*?)\))?/.exec(followingContent)
  
  if (matches === null) return false
  
  if (!silent) {
    let token = state.push('download', '', 0)
    token.url = matches[1]
    token.downloadFilename = matches[3]
    token.text = matches[5]
  }
  state.pos += matches[0].length

  return true
})

md.inline.ruler.before('backticks', 'video', (state, silent) => {
  let followingContent = state.src.substring(state.pos)
  let matches = /^\[video (.*?)\]/.exec(followingContent)
  
  if (matches === null) return false
  
  if (!silent) {

    let token = state.push('video', '', 0)
    token.url = matches[1]
  }
  state.pos += matches[0].length

  return true
})

// replace image rule with custom image syntax
md.inline.ruler.before('backticks', 'image', (state, silent) => {
  let followingContent = state.src.substring(state.pos)
  let matches = /^\[image (.*?)\](\((.*?)(\|(.*?))?\))?/.exec(followingContent)
  
  if (matches === null) return false
  
  if (!silent) {
    let token = state.push('image', '', 0)
    token.url = matches[1]
    token.alt = matches[3]
    token.description = matches[5]
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
  const imagesContentStartLine = startLine + 1
  
  if (imagesContentStartLine >= endLine) return false

  const keywordStart = state.bMarks[startLine] + state.tShift[startLine],
        keywordMax = state.eMarks[startLine]

  const keywordContent = state.src.substring(keywordStart, keywordMax)

  if (keywordContent === 'slider') {

    let imagesContentEndLine = imagesContentStartLine
    

    while (imagesContentEndLine < endLine && !state.isEmpty(imagesContentEndLine)) {
      imagesContentEndLine += 1
    }

    const imagesContent = state.getLines(imagesContentStartLine, imagesContentEndLine, state.blkIndent, false).trim();

    let oldParentType = state.parentType
    state.parentType = 'slider'

    let token: typeof state.Token
    
    token = state.push('slider_open', '', 0)

    token = state.push('inline', '', 0)
    token.children = []
    token.content = imagesContent
    
    token = state.push('slider_close', '', 0)

    state.line = imagesContentEndLine
    state.parentType = oldParentType

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

function getChildTokens(args: { allTokens: any[], from: number, endTokenType: string, endTokenLevel: number }): any[] {
  let childTokens = args.allTokens.slice(args.from + 1)
  childTokens = childTokens.slice(0, childTokens.findIndex(token => 
    token.type === args.endTokenType && token.level === args.endTokenLevel)) 
  return childTokens
}

export function makeAst(tokens) {
  console.log('CALL MAKE AST WITH TOKENS', tokens)

  const ast = []

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if (token.type === 'heading_open') {
      ast.push({ type: 'heading', level: tokens[i].tag.replace('h', ''), text: tokens[i + 1].content })
      i += 2
    } else if (token.type === 'paragraph_open') {
    let childTokens = getChildTokens({ from: i, allTokens: tokens, endTokenLevel: token.level, endTokenType: 'paragraph_close' })
     const paragraph = {
        type: 'paragraph',
        children: makeAst(childTokens)
      }
      ast.push(paragraph)
      i += childTokens.length + 1
    } else if (token.type === 'list_item_open') {
      let childTokens = getChildTokens({ from: i, allTokens: tokens, endTokenLevel: token.level, endTokenType: 'list_item_close' })
      const listItem = {
        type: 'listItem',
        children: makeAst(childTokens)
      }
      ast.push(listItem)
      i += childTokens.length + 1
    } else if (token.type === 'bullet_list_open') {
    let childTokens = getChildTokens({ from: i, allTokens: tokens, endTokenLevel: token.level, endTokenType: 'bullet_list_close' })
     const bulletList = {
        type: 'bulletList',
        children: makeAst(childTokens)
      }
      ast.push(bulletList)
      i += childTokens.length + 1
    } else if (token.type === 'inline') {
      ast.push(...makeAst(token.children))
    } else if (token.type === 'text') {
      ast.push({ type: 'text', text: token.content })
    } else if (token.type === 'slider_open') {
      let childTokens = tokens.slice(i + 1)
      childTokens = childTokens.slice(0, childTokens.findIndex(token => token.type === 'slider_close'))
      ast.push({ type: 'slider', images: makeAst(childTokens) })
      i += childTokens.length
    } else if (token.type === 'image') {
      ast.push({ type: 'image', url: token.url, alt: token.alt, description: token.description })
    } else if (token.type === 'download') {
      ast.push({ type: 'download', url: token.url, downloadFilename: token.downloadFilename, text: token.text })
    } else if (token.type === 'blank') {
      ast.push({ type: 'blank' })
    } else if (token.type === 'em_open') {
      let childTokens = getChildTokens({ from: i, allTokens: tokens, endTokenLevel: token.level, endTokenType: 'em_close' })
      ast.push({
        type: 'italic',
        children: makeAst(childTokens)
      })
      i += childTokens.length + 1
    } else if (token.type === 'strong_open') {
      let childTokens = getChildTokens({ from: i, allTokens: tokens, endTokenLevel: token.level, endTokenType: 'strong_close' })
      ast.push({
        type: 'bold',
        children: makeAst(childTokens)
      })
      i += childTokens.length + 1
    } else if (token.type === 'video') {
      ast.push({
        type: 'video',
        url: token.url
      })
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