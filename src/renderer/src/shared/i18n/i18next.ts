/* eslint-disable import/no-internal-modules */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { values } from "./locales/all.json";

let lang = navigator.language.split(/[-_]/)[0];
if (!values.includes(lang)) lang = "en";

const resources = await import(`./locales/${lang}.json`);

await i18next
    .use(initReactI18next)
    .init({
        lng: lang,
        resources: {
            [lang]: {
                translation: resources.default,
            },
        },
    });

export async function changeLocale(lang: string) {
    const resources = await import(`./locales/${lang}.json`);
    i18next.addResourceBundle(lang, "translation", resources.default, true);
    await i18next.changeLanguage(lang);
}

export const t = i18next.t.bind(i18next);
export { options as localesOptions } from "./locales/all.json";
