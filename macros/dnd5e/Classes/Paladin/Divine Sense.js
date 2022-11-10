// Midi-qol "On Use", Item Macro. Remove all targeting details, this handles everything.
async function wait(ms) { return new Promise(resolve => { setTimeout(resolve, ms); }); }
let paladin = canvas.tokens.get(args[0].tokenId);
let itemD = args[0].item;
let distance = itemD.data.range.value =! null ? itemD.data.range.value : 60;
let targets = await MidiQOL.findNearby(null, paladin, distance, null);
let totalCount = [];
let is_good = [];
let is_evil = [];
let is_celestial = [];
let is_fiend = [];
let is_undead = [];
targets.reduce((list, target) => {
    if((["good", "evil"].some(i => (target.actor.data.data.details.alignment).toLowerCase().includes(i)) && ["celestial","fiend","undead"].some(i => (target.actor.data.type === "character" ? target.actor.data.data.details.race : target.actor.data.data.details.type.value).toLowerCase().includes(i))) || (["good", "evil"].some(i => (target.actor.data.data.details.alignment).toLowerCase().includes(i))) || (["celestial","fiend","undead"].some(i => (target.actor.data.type === "character" ? target.actor.data.data.details.race : target.actor.data.data.details.type.value).toLowerCase().includes(i)))) totalCount.push(target);    
    if(["good"].some(i => (target.actor.data.data.details.alignment).toLowerCase().includes(i))) is_good.push(target);
    if(["evil"].some(i => (target.actor.data.data.details.alignment).toLowerCase().includes(i))) is_evil.push(target);
    if((target.actor.data.type === "character" ? target.actor.data.data.details.race : target.actor.data.data.details.type.value).toLowerCase().includes("celestial")) is_celestial.push(target);
    if((target.actor.data.type === "character" ? target.actor.data.data.details.race : target.actor.data.data.details.type.value).toLowerCase().includes("fiend")) is_fiend.push(target);
    if((target.actor.data.type === "character" ? target.actor.data.data.details.race : target.actor.data.data.details.type.value).toLowerCase().includes("undead")) is_undead.push(target);
    return list;
}, []);

await wait(300);
let the_message = `<table border="1" style="text-align:center;"><thead><tr><th>Type</th><th>Found</th></tr></thead><tbody><tr><td>Undead</td><td>${is_undead.length}</td></tr><tr><td>Fiends</td><td>${is_fiend.length}</td></tr><tr><td>Celestials</td><td>${is_celestial.length}</td></tr><tr><td>Good Alignment</td><td>${is_good.length}</td></tr><tr><td>Evil Alignment</td><td>${is_evil.length}</td></tr></tbody><tbody style="background: rgba(0, 0, 0, 0.5);color: #f0f0e0;text-shadow: 1px 1px #000;border-bottom: 1px solid #000;"><tr><td>Total Sensed</td><td>${totalCount.length}</td></tr></tbody></table>`;
let chatMessage = game.messages.get(args[0].itemCardId);
let content = duplicate(chatMessage.data.content);
let searchString = /<div class="midi-qol-saves-display">[\s\S]*<div class="end-midi-qol-saves-display">/g;
let replaceString = `<div class="midi-qol-saves-display"><div class="end-midi-qol-saves-display">${the_message}`;
content = content.replace(searchString, replaceString);
chatMessage.update({ content: content });
await wait(300);
ui.chat.scrollBottom();
