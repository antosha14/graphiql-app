import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

export const ApexTheme = createTheme({
  theme: 'ApexTheme',
  settings: {
    background: 'rgb(46, 35, 108)',
    foreground: '#e0e0e0',
    caret: '#ffffff',
    selection: 'rgba(255, 255, 255, 0.2)',
    selectionMatch: 'rgba(255, 255, 255, 0.3)',
    lineHighlight: 'rgba(255, 255, 255, 0.1)',
    gutterBackground: 'rgb(46, 35, 108)',
    gutterForeground: '#b0b0b0',
  },
  styles: [
    { tag: t.comment, color: '#6c757d' },
    { tag: t.propertyName, color: '#f8c74d' },
    { tag: t.string, color: '#98c379' },
    { tag: t.number, color: '#d19a66' },
    { tag: t.bool, color: '#c586c0' },
    { tag: t.null, color: '#c586c0' },
  ],
});
