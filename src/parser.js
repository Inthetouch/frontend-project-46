import fs from 'fs';
import path from 'path';

export default function parse(filepath) {

  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  
  return JSON.parse(content);
}
