import styles from './GqlCodeMirror.module.scss';
import { basicSetup, EditorView } from 'codemirror';
import { graphql } from 'cm6-graphql';
import { useRef, useEffect, useState } from 'react';
import { ApexTheme } from '@models/codeMirrorTheme';

export default function GqlCodeMirror({
  queryBody,
  onBodyChange,
  onBodyBlur,
  wasPrettified,
}: {
  queryBody: string;
  onBodyChange: (value: string) => void;
  onBodyBlur: (value: string) => void;
  wasPrettified: number;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const view = new EditorView({
        doc: queryBody,
        extensions: [
          basicSetup,
          graphql(),
          ApexTheme,
          EditorView.updateListener.of(update => {
            if (update.focusChanged && !update.view.hasFocus) {
              onBodyBlur(view.state.doc.toString());
            }
          }),
        ],
        parent: editorRef.current,
        dispatch: tr => {
          if (tr.changes) {
            view.update([tr]);
            onBodyChange(view.state.doc.toString());
          }
        },
      });
      view.dom.style.width = '100%';
      setView(view);
      return () => {
        view.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (view) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: queryBody } });
    }
  }, [wasPrettified]);

  return <div ref={editorRef} className={styles.queryEditorContainer}></div>;
}
