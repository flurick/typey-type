import Zipper from "../../../../../utils/zipper";
import fallbackLesson from "../../../../../constant/fallbackLesson";
import ruleFunctions from "./ruleFunctions";
import maxItems from "../constants/maxItems";

import type {
  CustomLesson,
  LookupDictWithNamespacedDicts,
  Outline,
  Translation,
} from "../../../../../types";

import type {
  FilterAndExpectation,
  Rules,
  RuleStatus,
  RuleFunctionsTypes,
} from "../types";

export type RegexRules = {
  outlineRule: RuleStatus;
  outlineRegexText: string;
  translationRule: RuleStatus;
  translationRegexText: string;
};

const translationExclusions = ["pos", "sol", "spas", "pros"];

function generateCustomLesson(
  globalLookupDictionary: LookupDictWithNamespacedDicts,
  rules: Rules,
  regexRules: RegexRules
) {
  const filters: FilterAndExpectation[] = [];

  const validRules = Object.keys(rules).filter(
    (ruleName) => ruleName in ruleFunctions
  );

  for (let i = 0; i < validRules.length; i++) {
    const rule = validRules[i] as keyof RuleFunctionsTypes;
    if (ruleFunctions[rule]) {
      if (rules[rule] === "on") {
        filters.push([ruleFunctions[rule], true]);
      } else if (rules[rule] === "off") {
        filters.push([ruleFunctions[rule], false]);
      }
    } else {
      throw new Error(`Invalid rule name used: ${rule}`);
    }
  }

  const ruleFilters = (entry: [string, string]) =>
    filters.every(([rule, expected]) => rule(...entry) === expected);

  const entriesList = [];
  for (const [
    translation,
    strokesAndNamespacedDicts,
  ] of globalLookupDictionary) {
    const bestOutline = strokesAndNamespacedDicts[0][0];
    const entry: [Outline, Translation] = [bestOutline, translation];

    const passesAllRules = ruleFilters(entry);
    const isNotExcludedTranslation =
      !translationExclusions.includes(translation);

    if (passesAllRules && isNotExcludedTranslation) {
      entriesList.push(entry);
    }
  }

  const rulesFilteredVocab = [...entriesList.slice(0, maxItems)]
    .filter((materialItem) => ruleFilters(materialItem))
    .filter((materialItem) => {
      if (
        regexRules?.outlineRule === "ignored" ||
        !regexRules?.outlineRegexText
      ) {
        return true;
      }

      const regexp = new RegExp(regexRules.outlineRegexText, "g");

      if (regexRules?.outlineRule === "on") {
        return materialItem[0].match(regexp);
      }

      if (regexRules?.outlineRule === "off") {
        return !materialItem[0].match(regexp);
      }

      return true;
    })
    .filter((materialItem) => {
      if (
        regexRules?.translationRule === "ignored" ||
        !regexRules?.translationRegexText
      ) {
        return true;
      }

      const regexp = new RegExp(regexRules.translationRegexText, "g");

      if (regexRules?.translationRule === "on") {
        return materialItem[1].match(regexp);
      }

      if (regexRules?.translationRule === "off") {
        return !materialItem[1].match(regexp);
      }

      return true;
    });

  const rulesFilteredMaterial = rulesFilteredVocab.map(
    ([outline, translation]) => ({ phrase: translation, stroke: outline })
  );

  const customLesson: CustomLesson = {
    sourceMaterial: rulesFilteredMaterial,
    presentedMaterial: rulesFilteredMaterial,
    settings: { ignoredChars: "" },
    title: "Generated lesson",
    subtitle: "Generated lesson",
    // @ts-ignore FIXME: might be a Zipper typing issue
    newPresentedMaterial: new Zipper(rulesFilteredMaterial),
    path: process.env.PUBLIC_URL + "/lessons/custom",
  };

  const validGeneratedLesson = customLesson.presentedMaterial.length > 0;

  const newCustomLesson = validGeneratedLesson ? customLesson : fallbackLesson;

  const validationState = validGeneratedLesson ? "success" : "fail";

  const newCustomLessonMaterial = newCustomLesson.presentedMaterial
    .map((materialItem) => `${materialItem.phrase}	${materialItem.stroke}`)
    .join("\n");

  // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation.
  this.setState({
    lesson: newCustomLesson,
    currentPhraseID: 0,
    customLesson: newCustomLesson,
    customLessonMaterial: newCustomLessonMaterial,
    customLessonMaterialValidationState: validationState,
  });
}

export default generateCustomLesson;
