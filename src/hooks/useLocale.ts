import { useTranslation } from 'react-i18next';

export const useLocale = () => {
  const { i18n } = useTranslation();

  const getLocalizedField = (obj: any, fieldName: string) => {
    if (!obj) return '' as any;
    const raw = (i18n.language || 'en').toLowerCase();
    const base = raw.split('-')[0];
    const candidates = [
      `${fieldName}_${raw}`,
      `${fieldName}_${base}`,
      `${fieldName}_en`,
      fieldName,
    ];
    for (const key of candidates) {
      const val = obj?.[key as keyof typeof obj];
      if (val !== undefined && val !== null && val !== '') return val as any;
    }
    return '' as any;
  };

  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(i18n.language, options).format(dateObj);
  };

  const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(i18n.language, options).format(num);
  };

  return {
    locale: i18n.language,
    getLocalizedField,
    formatDate,
    formatNumber,
  };
};
