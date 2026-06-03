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

  // Закрытие по клику вне сайдбара (только когда открыт)
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
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

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Обобщённая функция для обновления полей формы
  const updateFormField = (field: keyof ArticleStateType) => (option: OptionType) => {
    setFormSettings((prev) => ({ ...prev, [field]: option }));
  };

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, {
          [styles.container_open]: isSidebarOpen,
        })}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
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
              onChange={updateFormField('fontFamilyOption')}
            />
          </div>

          <div className={styles.field}>
            <RadioGroup
              title='Размер шрифта'
              name='fontSize'
              options={fontSizeOptions}
              selected={formSettings.fontSizeOption}
              onChange={updateFormField('fontSizeOption')}
            />
          </div>

          <div className={styles.field}>
            <Select
              title='Цвет шрифта'
              options={fontColors}
              selected={formSettings.fontColor}
              onChange={updateFormField('fontColor')}
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
              onChange={updateFormField('backgroundColor')}
            />
          </div>

          <div className={styles.field}>
            <Select
              title='Ширина контента'
              options={contentWidthArr}
              selected={formSettings.contentWidth}
              onChange={updateFormField('contentWidth')}
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};