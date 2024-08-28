'use client';

import styles from './ParamsTable.module.scss';
import { VariableField } from '../AdditionalVariablesSection/RequestParamsSection';

export default function ParamsTable({ elements }: { elements: VariableField[] }) {
  const onParamChange = () => {};
  return (
    <div className={styles.paramsInputContainer}>
      <table className={styles.queryParamsTable}>
        <thead>
          <tr>
            <th className={`${styles.tableHead} ${styles.tableDataCenter}`}></th>
            <th className={styles.tableHead}>Key</th>
            <th className={styles.tableHead}>Value</th>
            <th className={styles.tableHead}></th>
          </tr>
        </thead>
        <tbody>
          {elements.length >= 1 ? (
            elements.map((element, index) => (
              <tr key={index}>
                <td className={`${styles.tableData} ${styles.tableDataCenter}`}>
                  <p>{`${index}`}</p>
                </td>
                <td className={styles.tableData}>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={element.paramKey}
                    onChange={() => onParamChange()}
                  />
                </td>
                <td className={styles.tableData}>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={element.paramValue}
                    onChange={() => onParamChange()}
                  />
                </td>
                <td className={`${styles.tableData}  ${styles.tableDataCenter}`}>
                  <button className={styles.deleteButton} onClick={() => onParamChange()}>
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr key={'Initial'}>
              <td className={`${styles.tableData} ${styles.tableDataCenter}`}>
                <p>1</p>
              </td>
              <td className={styles.tableData}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder={'Enter key'}
                  onChange={() => onParamChange()}
                />
              </td>
              <td className={styles.tableData}>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder={'Enter value'}
                  onChange={() => onParamChange()}
                />
              </td>
              <td className={`${styles.tableData}  ${styles.tableDataCenter}`}>
                <button className={styles.deleteButton} onClick={() => onParamChange()}>
                  X
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
