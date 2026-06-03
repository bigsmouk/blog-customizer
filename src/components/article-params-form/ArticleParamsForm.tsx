import { useState, useEffect, useRef, FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

import {
  ArticleStateType,
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formSettings, setFormSettings] = useState<ArticleStateType>(defaultArticleState);

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.arrow-button')
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onApply(formSettings);
  };

  const handleReset = () => {
    setFormSettings(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <Text as='h2' size={31} weight={800} uppercase>
              Задайте параметры
            </Text>
          </div>

          <div className={styles.field}>
            <Select
              title='Шрифт'
              options={fontFamilyOptions}
              selected={formSettings.fontFamilyOption}
              onChange={(option: OptionType) =>
                setFormSettings({ ...formSettings, fontFamilyOption: option })
              }
            />
          </div>

          <div className={styles.field}>
            <RadioGroup
              title='Размер шрифта'
              name='fontSize'
              options={fontSizeOptions}
              selected={formSettings.fontSizeOption}
              onChange={(option: OptionType) =>
                setFormSettings({ ...formSettings, fontSizeOption: option })
              }
            />
          </div>

          <div className={styles.field}>
            <Select
              title='Цвет шрифта'
              options={fontColors}
              selected={formSettings.fontColor}
              onChange={(option: OptionType) =>
                setFormSettings({ ...formSettings, fontColor: option })
              }
            />
          </div>

          <div className={styles.separatorWrapper}>
            <Separator />
          </div>

          <div className={styles.field}>
            <Select
              title='Цвет фона'
              options={backgroundColors}
              selected={formSettings.backgroundColor}
              onChange={(option: OptionType) =>
                setFormSettings({ ...formSettings, backgroundColor: option })
              }
            />
          </div>

          <div className={styles.field}>
            <Select
              title='Ширина контента'
              options={contentWidthArr}
              selected={formSettings.contentWidth}
              onChange={(option: OptionType) =>
                setFormSettings({ ...formSettings, contentWidth: option })
              }
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset} />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};