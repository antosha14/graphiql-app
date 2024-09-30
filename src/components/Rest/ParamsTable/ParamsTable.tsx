'use client';

import styles from './ParamsTable.module.scss';
import { VariableField } from '../AdditionalVariablesSection/RequestParamsSection';
import { variablesActions } from '../AdditionalVariablesSection/RequestParamsSection';
import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

interface TableProps {
  tableFor: 'headers' | 'variables';
  elements: VariableField[];
  dispatcher: Dispatch<variablesActions>;
}

interface ParamsChangeInput {
  index: number;
  key?: string;
  value?: string;
}

export default function ParamsTable({ tableFor, elements, dispatcher }: TableProps) {
  const handleParamChange = ({ index, key, value }: ParamsChangeInput) => {
    if (index + 1 == elements.length) {
      dispatcher({
        type: 'added_option',
        index: index + 1,
        option: tableFor,
      });
    }

    if ((key == '' && elements[index].paramValue == '') || (value == '' && elements[index].paramKey == '')) {
      dispatcher({
        type: 'removed_option',
        option: tableFor,
        index: index,
      });
      return;
    }

    if (key || key == '') {
      dispatcher({
        type: 'edited_option',
        index: index,
        option: tableFor,
        key: key,
      });
    }

    if (value || value == '') {
      dispatcher({
        type: 'edited_option',
        index: index,
        option: tableFor,
        value: value,
      });
    }
  };

  const { t } = useTranslation();

  const handleOptionDeletion = (index: number) => {
    return dispatcher({ type: 'removed_option', option: tableFor, index: index });
  };

  return (
    <div className={styles.paramsInputContainer}>
      <table className={styles.queryParamsTable}>
        <thead>
          <tr>
            <th className={`${styles.tableHead} ${styles.tableDataCenter}`}></th>
            <th className={styles.tableHead}>{tableFor == 'headers' ? t('header') : t('varName')}</th>
            <th className={styles.tableHead}>{t('value')}</th>
            <th className={styles.tableHead}></th>
          </tr>
        </thead>
        <tbody>
          {elements.map((element, index) => (
            <tr key={index}>
              <td className={`${styles.tableData} ${styles.tableDataCenter}`}>
                <p>{`${index + 1}`}</p>
              </td>
              <td className={styles.tableData}>
                <input
                  type="text"
                  className={styles.inputField}
                  value={element.paramKey}
                  placeholder={t('keyPlaceholder')}
                  onChange={event => handleParamChange({ index: index, key: event.target.value })}
                />
              </td>
              <td className={styles.tableData}>
                <input
                  type="text"
                  className={styles.inputField}
                  value={element.paramValue}
                  placeholder={t('valuePlaceholder')}
                  onChange={event => handleParamChange({ index: index, value: event.target.value })}
                />
              </td>
              <td className={`${styles.tableData}  ${styles.tableDataCenter}`}>
                <img
                  src="/rubbish.svg"
                  className={styles.deleteButton}
                  onClick={() => handleOptionDeletion(index)}
                ></img>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
