import commonEn from "@/public/locales/en/common.json";
import errorsEn from "@/public/locales/en/errors.json";
import navigationEn from "@/public/locales/en/navigation.json";
import validationEn from "@/public/locales/en/validation.json";
import commonZh from "@/public/locales/zh/common.json";
import errorsZh from "@/public/locales/zh/errors.json";
import navigationZh from "@/public/locales/zh/navigation.json";
import validationZh from "@/public/locales/zh/validation.json";
import type { Namespace } from "./config";

export type TranslationResources = Record<string, Record<Namespace, object>>;

/** Bundled translation resources, keyed by locale and namespace. */
export const resources: TranslationResources = {
  en: {
    common: commonEn,
    navigation: navigationEn,
    validation: validationEn,
    errors: errorsEn,
  },
  zh: {
    common: commonZh,
    navigation: navigationZh,
    validation: validationZh,
    errors: errorsZh,
  },
};
