'use client';

import { SchemaData, DocsState } from '../DocumentationSearchBar/DocumentationSearchBar';
import styles from './DocumentationPopup.module.scss';
import { useState, SetStateAction, Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

const DocumentationPopup = ({
  data,
  show,
  handleModalClick,
}: {
  data: SchemaData;
  show: boolean;
  handleModalClick: Dispatch<SetStateAction<DocsState>>;
}) => {
  const [expandedTypes, setExpandedTypes] = useState<string[]>([]);

  const toggleType = (typeName: string) => {
    setExpandedTypes(prev => (prev.includes(typeName) ? prev.filter(name => name !== typeName) : [...prev, typeName]));
  };
  const { t } = useTranslation();

  const handleDocsClose = () => {
    handleModalClick(state => {
      return { ...state, status: 'fetchedNonVisible' };
    });
  };

  return (
    <>
      <section className={`${styles.schemaExplorer} ${show && styles.show}`}>
        <div className={styles.docsHeader}>
          <h2>{t('documentation')}</h2>
          <img src="/close.svg" onClick={handleDocsClose} className={styles.docsCloseButton}></img>
        </div>
        <ul>
          {data.data.__schema.types.map(type => (
            <li key={type.name}>
              <div className={styles.typeHeader} onClick={() => toggleType(type.name)}>
                {type.name}
                {type.fields && (
                  <span className={styles.expandIcon}>{expandedTypes.includes(type.name) ? '-' : '+'}</span>
                )}
              </div>
              {expandedTypes.includes(type.name) && type.fields && (
                <ul className={styles.fields}>
                  {type.fields.map(field => (
                    <li key={field.name}>
                      {field.name}:{' '}
                      <span className={styles[`type-${field.type.kind.toLowerCase()}`]}>
                        {field.type.name} ({field.type.kind})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>
      {show && <div className={styles.appWrapper} onClick={handleDocsClose}></div>}
    </>
  );
};

export default DocumentationPopup;
