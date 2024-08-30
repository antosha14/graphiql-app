import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

export const ApexTheme = createTheme({
  theme: 'ApexTheme',
  settings: {
    background: 'rgb(46, 35, 108)',
    foreground: '#a0b8ff',
    caret: '#b084eb',
    selection: '#44546a59',
    selectionMatch: '#44546a59',
    lineHighlight: '#8a91991a',
    gutterBackground: 'rgb(46, 35, 108)',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#6c757d' },
    { tag: t.propertyName, color: '#f1fa8c' },
    { tag: t.string, color: '#98c379' },
    { tag: t.number, color: '#d19a66' },
    { tag: t.bool, color: '#c586c0' },
    { tag: t.null, color: '#c586c0' },
  ],
});
