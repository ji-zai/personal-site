import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import fs from 'fs'
import summary from '../content/get-interviews/SUMMARY.json'

const playbookDirectory = path.join(process.cwd(), 'content/get-interviews')

// Return JSON from SUMMARY.JSON from playbook directory
export function getSummary() {
    return summary
}

export function getAllChapterIds() {
    const fileNames = fs.readdirSync(playbookDirectory)
    let id = ''
    return fileNames.map(fileName => {
      if (!fileName.includes('SUMMARY'))
        id = fileName.replace(/\.md$/, '')
        return {
            params: {
              id
            }
        }
    }).filter(x => x)
  }

export async function getChapterData(id) {

    const summary = getSummary()

    // filter out all items that are capitalized:
    let sections = summary.sections.filter(x => x !== x.toUpperCase())

    // get previous and next positions of id in summary:
    let prev = null
    let next = null
    let current = null
    let i = 0
    for (let chapter of sections) {
        if (chapter === id) {
            current = i
            break
        }
        i++
    }
    if (current > 0) {
        prev = sections[current - 1]
    }
    if (current < sections.length - 1) {
        next = sections[current + 1]
    }
    
    let prevChapter = prev ? { title: summary.chapterMapping[prev], href: "/get-interviews/" + prev } : null
    let nextChapter = next ? { title: summary.chapterMapping[next], href: "/get-interviews/" + next } : null

    // Read markdown file as string
    const fullPath = path.join(playbookDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // // Use gray-matter to parse the post metadata section
    // const matterResult = matter(fileContents)
  
    // // Use remark to convert markdown into HTML string
    // const processedContent = await remark()
    //   .use(html)
    //   .process(matterResult.content)
    // const contentHtml = processedContent.toString()

    const contentHtml = fileContents

    // Just directly pass back the contentHTML since we're doing the MDX processing in ChapterView.tsx.
  
    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,

      previous: prevChapter,
      next: nextChapter
    }
  }





