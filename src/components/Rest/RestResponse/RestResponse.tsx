import styles from './RestResponse.module.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import { parseResnose } from '@utils/parseResponse';

const jsonExample = {
  errors: [
    {
      message: 'Cannot query field "field" on type "Root". Did you mean "film"?',
      locations: [
        {
          line: 2,
          column: 3,
        },
      ],
    },
  ],
};

export default function RestResponse() {
  return (
    <section className={styles.restResponseContainer}>
      <div className={styles.httpCodeContainer}>Response Status code: 200 ok</div>
      <div className={styles.syntaxHighlighterWrapper}>
        <SyntaxHighlighter
          language="json"
          style={atomOneDark}
          showLineNumbers={true}
          customStyle={{
            backgroundColor: 'rgb(46, 35, 108)',
            margin: '10px',
            font: 'Roboto',
          }}
          wrapLongLines={true}
          tabIndex={0}
        >
          {JSON.stringify(jsonExample, null, 2)}
        </SyntaxHighlighter>
      </div>
    </section>
  );
}
