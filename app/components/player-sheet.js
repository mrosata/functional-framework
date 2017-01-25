import R from 'ramda';

const {set, view, prop, path, lensProp, lensPath, assocPath} = R;

export default class Player {
  constructor({name, charClass, race = 'human', cha = 0, con = 0, dex = 0, int = 0, str = 0, wis = 0}) {
    if (!name || !charClass) {
      return
    }
    this.stats     = {cha, con, dex, int, str, wis};
    this.name      = name;
    this.charClass = charClass;
  }

  adjustStat(stat, modification) {
    if (typeof this.stats[stat] === "undefined") {
      throw `Unknown stat ${stat}`;
    }
    const statLens = lensPath(['stats', stat]);
    const statValue = view(statLens, this) || 0;
    const updatedStatValue = (statValue + modification);

    console.log(`${stat}`.toUpperCase(), statValue);

    return set(statLens, updatedStatValue, this);
  }

  get cha() {
    return this.stats.cha;
  }

  get con() {
    return this.stats.con;
  }

  get dex() {
    return this.stats.dex;
  }

  get int() {
    return this.stats.int;
  }

  get str() {
    return this.stats.str;
  }

  set str(val) {
    return set(lensPath(['stats', 'str']), val, this);
  }

  get wis() {
    return this.stats.wis;
  }

  set wis(val) {
    this.stats.wis = val;
  }
}
