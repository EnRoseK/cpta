import { marked } from 'marked';

export const parseMarkDown = (markdown: string) => {
  return marked.parse(markdown);
};
