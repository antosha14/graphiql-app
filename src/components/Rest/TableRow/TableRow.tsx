'use client';

import styles from '../ParamsTable/ParamsTable.module.scss';

export default function TableRow() {
  return (
    <tr key={'newOption'}>
      <td className={`${styles.tableData} ${styles.tableDataCenter}`}>
        <p>{`${params.length + 1}`}</p>
      </td>
      <td className={styles.tableData}>
        <input
          type="text"
          className={styles.inputField}
          value={''}
          onChange={event => handleParamChange({ index: params.length, key: event.target.value })}
        />
      </td>
      <td className={styles.tableData}>
        <input type="text" className={styles.inputField} value={''} onChange={() => handleParamChange()} />
      </td>
      <td className={`${styles.tableData}  ${styles.tableDataCenter}`}>
        <button className={styles.addButton} onClick={() => handleParamChange()}>
          Add {tableFor.slice(0, -1)}
        </button>
      </td>
      <td className={`${styles.tableData}  ${styles.tableDataCenter}`}>
        <img src="/rubbish.svg" className={styles.deleteButton} onClick={() => handleParamChange()}></img>
      </td>
    </tr>
  );
}
