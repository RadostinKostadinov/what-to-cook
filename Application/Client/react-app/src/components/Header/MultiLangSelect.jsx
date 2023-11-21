import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../constants";

export default function MultiLangSelect() {
  const { i18n } = useTranslation();

  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  return (
    <select
      defaultValue={"bg"}
      onChange={onChangeLang}
      className="bg-white bg-opacity-50 border border-app-darkBlue text-app-darkBlue text-sm rounded-lg block w-auto p-1"
    >
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
