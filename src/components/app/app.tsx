import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
  const [appSettings, setAppSettings] = useState<ArticleStateType>(defaultArticleState);

  const handleApply = (settings: ArticleStateType) => {
    setAppSettings(settings);
  };

  return (
    <main
      className={styles.main}
      style={
        {
          '--font-family': appSettings.fontFamilyOption.value,
          '--font-size': appSettings.fontSizeOption.value,
          '--font-color': appSettings.fontColor.value,
          '--container-width': appSettings.contentWidth.value,
          '--bg-color': appSettings.backgroundColor.value,
        } as CSSProperties
      }>
      <ArticleParamsForm onApply={handleApply} />
      <Article />
    </main>
  );
};