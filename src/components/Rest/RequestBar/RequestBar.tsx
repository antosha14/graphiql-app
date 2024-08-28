import styles from './RequestBar.module.scss';

const requestTypeOptions = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

export default function RequestBar() {
  return (
    <div className={styles['query-bar']}>
      <div className={styles['method-select']}>
        <select name="method" className={styles.methodSelector}>
          {requestTypeOptions.map(method => {
            return (
              <option key={method} value={method} className={styles.methodOption}>
                {method}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles['url-input']}>
        <input type="text" className={styles.urlInputField} placeholder="Enter URL or paste text" />
      </div>
      <button className={styles['send-button']}>Send</button>
    </div>
  );
}
