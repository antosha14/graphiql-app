import styles from './RequestBar.module.scss';

const requestTypeOptions = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

export default function RequestBar() {
  return (
    <div className={styles.requestBarContainer}>
      <div className={styles['query-bar']}>
        <div className={styles['method-select']}>
          <select name="method" id="method">
            {requestTypeOptions.map(method => {
              return (
                <option key={method} value={method}>
                  {method}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles['url-input']}>
          <input type="text" placeholder="Enter URL or paste text" />
        </div>
        <button className={styles['send-button']}>Send</button>
      </div>

      <div className={styles['request-options']}>
        <ul>
          <li>
            <a href="#" className="active">
              Headers
            </a>
          </li>
          <li>
            <a href="#">Body</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
