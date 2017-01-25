"use strict";
import _ from 'ramda';
import Player from './player-sheet';

const {
        view, set, lens, lensPath, lensProp, assocPath, assocProp, map, compose
      } = _;

const assertion = console.assert.bind(console);
const log = console.log.bind(console);


const LENS       = {};

const brynos     = new Player({
  name:      'Brynos',
  charClass: 'Warrior',
  str:       16,
  con:       15,
  dex:       14,
  cha:       13,
  wis:       10,
  int:       8
});
const brynosCopy = new Player({
  name:      'Brynos',
  charClass: 'Warrior',
  str:       16,
  con:       15,
  dex:       14,
  cha:       13,
  wis:       10,
  int:       8
});

LENS.charName     = lensProp('name');  // same as lens(prop('name'), assoc('name'));
LENS.wisdom       = lensPath(['stats', 'wis']); // same as lens(path(['stats', 'wis'], assocPath(['stats', 'wis']));
LENS.intelligence = lensPath(['stats', 'int']);

log(`view(lenses.charName, brynosCopy)`, view(LENS.charName, brynosCopy));
log(`view(LENS.wisdom, brynosCopy)`, view(LENS.wisdom, brynosCopy));

const smartBrynos = set(LENS.intelligence, 16, brynos);

assertion(smartBrynos !== brynos, `We should make a new brynos`);
const strongBrynos = brynosCopy.adjustStat('str', 4);

console.log(`strongBrynos.str`, strongBrynos.str);
console.log(`brynos.str`, brynos.str);

const originalCharacter = brynos;
log(`brynos === originalCharacter`, brynos === originalCharacter);
assertion(brynos !== brynosCopy, "brynos not same as copy");

log(`brynos.wis`, brynos.wis);
log(`10 === brynos.wis`, 10 === brynos.wis);
assertion(true === true, "true es verdad");
brynos.wis = 11;
log(`10 === brynos.wis`, 10 === brynos.wis);


/*
 function createMessage({sender = 'Anoni Mouse', message = 'hi', time = new Date().getTime()}) {
 console.log(`sender`, sender);
 console.log(`time`, time);
 }


 const sum                           = (a, b) => {
 const createMsg = () => createMessage({message: `I just added ${a} + ${b}`});
 return [a + b, createMsg];
 };
 const mult                          = (n, m) => n * m;


 const five = sum(2, 3);
 const twenty = sum(2, 3)[0] + sum(2, 3)[0] + mult(2, sum(2, 3)[0] );

 [40, 100, 400].map(ms => {
 const fiveCreateMsg = sum(2, 3)[1];
 setTimeout(() => {
 console.log(`${ms}ms :: `, fiveCreateMsg());
 }, ms);
 });

 */


export default function refTrans() {
}
