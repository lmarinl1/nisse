/** Escape HTML then apply a minimal Markdown subset (XSS-safe by construction). */
export function renderMarkdownToHtml(source: string): string {
  const text = source.replace(/\r\n/g, '\n').trim()
  if (!text) {
    return ''
  }

  const escaped = escapeHtml(text)
  const lines = escaped.split('\n')
  const html: string[] = []
  let i = 0
  let inUl = false
  let inOl = false

  const closeLists = () => {
    if (inUl) {
      html.push('</ul>')
      inUl = false
    }
    if (inOl) {
      html.push('</ol>')
      inOl = false
    }
  }

  while (i < lines.length) {
    const line = lines[i]

    if (/^###\s+/.test(line)) {
      closeLists()
      html.push(`<h3>${inlineMarkdown(line.replace(/^###\s+/, ''))}</h3>`)
      i += 1
      continue
    }
    if (/^##\s+/.test(line)) {
      closeLists()
      html.push(`<h2>${inlineMarkdown(line.replace(/^##\s+/, ''))}</h2>`)
      i += 1
      continue
    }
    if (/^#\s+/.test(line)) {
      closeLists()
      html.push(`<h1>${inlineMarkdown(line.replace(/^#\s+/, ''))}</h1>`)
      i += 1
      continue
    }
    if (/^&gt;\s?/.test(line)) {
      closeLists()
      html.push(`<blockquote><p>${inlineMarkdown(line.replace(/^&gt;\s?/, ''))}</p></blockquote>`)
      i += 1
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      if (inOl) {
        html.push('</ol>')
        inOl = false
      }
      if (!inUl) {
        html.push('<ul>')
        inUl = true
      }
      html.push(`<li>${inlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>`)
      i += 1
      continue
    }
    if (/^\d+\.\s+/.test(line)) {
      if (inUl) {
        html.push('</ul>')
        inUl = false
      }
      if (!inOl) {
        html.push('<ol>')
        inOl = true
      }
      html.push(`<li>${inlineMarkdown(line.replace(/^\d+\.\s+/, ''))}</li>`)
      i += 1
      continue
    }
    if (line.trim() === '') {
      closeLists()
      i += 1
      continue
    }
    closeLists()
    html.push(`<p>${inlineMarkdown(line)}</p>`)
    i += 1
  }
  closeLists()
  return html.join('')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function inlineMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" rel="noopener noreferrer" target="_blank">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
}
