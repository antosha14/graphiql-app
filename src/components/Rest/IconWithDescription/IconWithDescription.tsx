'use client';

import styles from './IconWithDescription.module.scss';
import { useState, MouseEventHandler } from 'react';

export default function IconWithDescription({
  imageUrl,
  handleClickFunction,
  description,
}: {
  imageUrl: string;
  handleClickFunction: MouseEventHandler<HTMLImageElement>;
  description: string;
}) {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div>
      <img
        src={imageUrl}
        className={styles.bodyHelperButton}
        onClick={handleClickFunction}
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      ></img>
      {showDescription && <p className={styles.buttonDescription}>{description}</p>}
    </div>
  );
}
