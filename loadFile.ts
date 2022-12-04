import * as fs from 'fs'
import * as path from 'path'

export const loadFile = (fileName: string) => {
  const filePath = path.join(__dirname, fileName)
  const input = fs.readFileSync(filePath, { encoding: 'utf-8' })
  return input
}
