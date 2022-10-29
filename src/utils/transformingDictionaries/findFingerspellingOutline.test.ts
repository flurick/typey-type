import findFingerspellingOutline from "./findFingerspellingOutline";
import { AffixList } from "../affixList";

describe("findFingerspellingOutline", () => {
  beforeEach(() => {
    const affixList = new AffixList(
      new Map([
        ["{^en}", [["*EPB", "typey:typey-type.json"]]],
        ["{^ment}", [["*PLT", "typey:typey-type.json"]]],
        ["{a^}", [["A", "typey:typey-type.json"]]],
        ["{in^}", [["EUPB", "typey:typey-type.json"]]],
        ["{^ly}", [["HREU", "typey:typey-type.json"]]],
        ["{con^}", [["KAUPB", "typey:typey-type.json"]]],
        ["{^ent}", [["EPBT", "typey:typey-type.json"]]],
        ["{^ed}", [["-D", "typey:typey-type.json"]]],
      ])
    );
    AffixList.setSharedInstance(affixList);
  });

  afterEach(() => {
    AffixList.setSharedInstance([]);
  });

  it('returns fingerspelled outline for phrase `houses?" It`', () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["{?}", [["H-F", "typey:typey-type.json"]]],
      ["it", [["EUT", "typey:typey-type.json"]]],
      ["houses", [["HOUSZ", "typey:typey-type.json"]]],
      ["{}{-|}", [["KPA", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline('"', lookupDict, "KR-GS", affixList, "?")
    ).toEqual("KR-GS");
  });

  it("returns fingerspelled outline from personal dict for glued B", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      [
        "{&B}",
        [
          ["-BZ", "my-personal-dict.json"],
          ["PW*FPLT", "my-personal-dict.json"],
        ],
      ],
      ["{&L}", ["-LZ", "my-personal-dict.json"]],
    ]);
    expect(
      findFingerspellingOutline("B", lookupDict, "PW*P", affixList, "")
    ).toEqual("-BZ");
  });

  it("returns fingerspelled outline from personal dict for C", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      [
        "{&B}",
        [
          ["-BZ", "my-personal-dict.json"],
          ["PW*FPLT", "my-personal-dict.json"],
        ],
      ],
      ["{&L}", ["-LZ", "my-personal-dict.json"]],
    ]);
    expect(
      findFingerspellingOutline("C", lookupDict, "KR*P", affixList, "")
    ).toEqual("KR*P");
  });

  it("returns fingerspelled outline for letter e in grinned, which has no available outline for phrase, and no orthography magic yet", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["grin", [["TKPWREUPB", "typey:typey-type.json"]]],
      ["{^ed}", [["-D", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("e", lookupDict, "*E", affixList, undefined)
    ).toEqual("*E");
  });

  it("returns on-the-fly fingerspelled outline for letter e in grinned with no personal dicts with available outline for phrase, and no orthography magic yet", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["grin", [["TKPWREUPB", "typey:typey-type.json"]]],
      ["{^ed}", [["-D", "typey:typey-type.json"]]],
      ["{>}{&e}", [["*E", "typey:typey-type.json"]]],
      ["{&e}", [["*E", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("e", lookupDict, "*E", affixList, undefined)
    ).toEqual("*E");
  });

  it("returns on-the-fly fingerspelled outline for letter e in grinned with personal dicts with no available outline for phrase, and with alternative letter fingerspelling outline", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["grin", [["TKPWREUPB", "typey:typey-type.json"]]],
      ["{^ed}", [["-D", "typey:typey-type.json"]]],
      ["{&e}", [["EFPLT", "user:fingerspelling-FPLT.json"]]],
      ["{>}{&e}", [["*E", "typey:typey-type.json"]]],
      // ["{&e}", [["*E", "typey:typey-type.json"]]],
    ]);
    expect(
      findFingerspellingOutline("e", lookupDict, "*E", affixList, undefined)
    ).toEqual("EFPLT");
  });

  it("returns hard-coded number format for on-the-fly fingerspelled outline for 0 in “20/20.” with no personal dicts with no available outline for phrase", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      // ["{&0}", [
      //   ["#O", "typey:typey-type.json"],
      // ]],
    ]);
    expect(
      findFingerspellingOutline("0", lookupDict, "0", affixList, undefined)
    ).toEqual("0");
  });

  it("returns on-the-fly fingerspelled outline for 0 in “20/20.” with personal dicts with no available outline for phrase, and with alternative number fingerspelling outline", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      [
        "{&0}",
        [
          ["#O", "typey:typey-type.json"],
          ["#O", "user:numbers.json"],
          ["#0", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findFingerspellingOutline("0", lookupDict, "0", affixList, undefined)
    ).toEqual("#O");
  });

  it("returns on-the-fly fingerspelled outline for symbol with no personal dicts with available outline for phrase, and no orthography magic yet", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([["&", [["SKP", "typey:typey-type.json"]]]]);
    expect(
      findFingerspellingOutline("&", lookupDict, "SKP*", affixList, "")
    ).toEqual("SKP*");
  });

  it("returns on-the-fly fingerspelled outline for symbol with personal dicts, specifically ampersand in phrase “&c.”", () => {
    const affixList = AffixList.getSharedInstance();
    const lookupDict = new Map([
      ["{&&}", [["SP-PBD", "user:punctuation.json"]]],
      [
        "&",
        [
          ["SP-PBD", "user:punctuation.json"],
          // ["SKP", "typey:typey-type.json"],
        ],
      ],
    ]);
    expect(
      findFingerspellingOutline("&", lookupDict, "SKP*", affixList, "")
    ).toEqual("SP-PBD");
  });
});
