const availableRulePrettyNames = [
  { ruleName: "isOneSyllable", prettyName: "is one syllable" },
  { ruleName: "moreThanOneSyllable", prettyName: "has more than one syllable" },
  { ruleName: "hasOneKeyPerFinger", prettyName: "has one key per finger" },
  { ruleName: "moreThanTwoCharacters", prettyName: "has more than two characters" },
  { ruleName: "fewerThanFiveCharacters", prettyName: "has fewer than five characters" },
  { ruleName: "isSingleStroke", prettyName: "is single-stroke" },
  { ruleName: "isMultiStroke", prettyName: "is multi-stroke" },
  { ruleName: "hasSimpleStenoKeys", prettyName: "has simple steno keys" },
  { ruleName: "isBrief", prettyName: "is a brief" },
  { ruleName: "hasOnlyOneVowelKey", prettyName: "has only one vowel key" },
  { ruleName: "hasOnlyShortIVowel", prettyName: "has only short I vowel" },
  { ruleName: "hasAnyShortVowel", prettyName: "has any short vowel" },
  { ruleName: "hasAnyLongVowel", prettyName: "has any long vowel" },
  { ruleName: "hasAnyVowelKey", prettyName: "has any vowel key" },
  { ruleName: "hasApostrophes", prettyName: "has apostrophes" },
  { ruleName: "hasOneConsonantOnEachSide", prettyName: "has one consonant on each side" },
  { ruleName: "hasLhsConsonantWithMultipleKeys", prettyName: "has left-side, multi-key consonant" },
  { ruleName: "hasRhsConsonantWithMultipleKeys", prettyName: "has right-side, multi-key consonant" },
  { ruleName: "hasDiphthong", prettyName: "has a diphthong like AU, OU, or OEU" },
  { ruleName: "hasVowelDisambiguator", prettyName: "has a vowel disambiguator like AE or AO" },
  { ruleName: "hasDigraphs", prettyName: "has digraphs like “ch”, and “ng”" },
  { ruleName: "hasCompoundClusters", prettyName: "has components clusters like BGS" },
  { ruleName: "hasMoreThanOneConsonant", prettyName: "has more than one consonant" },
  { ruleName: "hasSomeConsonants", prettyName: "has some consonants" },
  { ruleName: "hasDoubleLetters", prettyName: "has double letters" },
  { ruleName: "hasDoubleConsonants", prettyName: "has double consonants" },
  { ruleName: "hasDoubleVowels", prettyName: "has double vowels" },
  { ruleName: "hasContractionsPluralsOrPossessives", prettyName: "has contractions or possessives" },
  { ruleName: "hasUnstressedVowels", prettyName: "has unstressed vowels" },
  { ruleName: "hasInversion", prettyName: "has inversion" },
  { ruleName: "hasEfAsVeeOrEss", prettyName: "has “F” as “V” or “S”" },
  { ruleName: "hasShortTranslations", prettyName: "has short translations" },
  { ruleName: "hasLongTranslations", prettyName: "has long translations" },
  { ruleName: "hasLongWords", prettyName: "has long words" },
  { ruleName: "startsWithPrefix", prettyName: "starts with a prefix" },
  { ruleName: "endsWithSuffix", prettyName: "ends with a suffix" },
  { ruleName: "outlineIsTranslation", prettyName: "outline is the same as translation" },
  { ruleName: "hasOneSpace", prettyName: "has one space" },
  { ruleName: "hasOneOrMoreSpaces", prettyName: "has one or more spaces" },
  { ruleName: "hasNumbers", prettyName: "has numbers" },
  { ruleName: "isRomanNumeral", prettyName: "is a Roman numeral" },
  { ruleName: "hasStretchKeys", prettyName: "has stretch keys like D and Z" },
  { ruleName: "hasStar", prettyName: "has star key" },
  { ruleName: "hasPunctuation", prettyName: "has punctuation" },
  { ruleName: "hasCapitalLetter", prettyName: "has a capital letter" },
  { ruleName: "isUppercase", prettyName: "is entirely uppercase" },
  { ruleName: "isFingerspelled", prettyName: "is fingerspelled" },
  { ruleName: "hasDisambiguatingBrief", prettyName: "has disambiguating brief like HEURD" },
  { ruleName: "hasSuppressedSpaceStroke", prettyName: "has suppressed space stroke, TK-LS" },
  { ruleName: "hasPhillyShift", prettyName: "has Philly shift like TDZ" },
  { ruleName: "hasCoding", prettyName: "has coding terms" },
  { ruleName: "hasMedical", prettyName: "has medical terms" },
  { ruleName: "hasForcedWordEnding", prettyName: "has /SP-S forced word ending" },
  { ruleName: "hasDictionaryFormatting", prettyName: "has dictionary formatting" },
];

export default availableRulePrettyNames;
