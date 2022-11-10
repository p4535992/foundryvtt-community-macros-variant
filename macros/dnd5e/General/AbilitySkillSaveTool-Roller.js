// Click on a token and fire away!
let me = canvas.tokens.controlled[0]?.actor;
if (!me) return ui.notifications.error(`No Token selected`);
let ability_short_name = Object.keys(CONFIG.DND5E.abilities);
let ability_full_name = Object.values(CONFIG.DND5E.abilities);
let skill_short_name = Object.keys(CONFIG.DND5E.skills);
let skill_full_name = Object.values(CONFIG.DND5E.skills);
let get_tools = await me.itemTypes.tool;
let abilityOptions = "";
let skillOptions = "";
let toolOptions = "";
for (let i = 0; i < ability_short_name.length; i++) {
	let sname = ability_short_name[i];
	let fname = ability_full_name[i];
	abilityOptions += `<option value="${sname}">${fname}</option>`;
}
for (let i = 0; i < skill_short_name.length; i++) {
	let sname = skill_short_name[i];
	let fname = skill_full_name[i];
	skillOptions += `<option value="${sname}">${fname}</option>`;
}
for (let i = 0; i < get_tools.length; i++) {
	let tool = get_tools[i];
	toolOptions += `<option value="${tool.name}">${tool.name}</option>`;
}

let btns = {
	ability: { label: "Ability", callback: () => ability_roller() },
	save: { label: "Save", callback: () => save_roller() },
	skill: { label: "Skill", callback: () => skill_roller() }
}

if (get_tools.length > 0) {
	btns["tool"] = { label: "Tool", callback: () => tool_roller() };
}

new Dialog({
	title: "Actor Roller",
	content: `<p>What would you like to roll?</p>`,
	buttons: btns
}).render(true);

async function ability_roller() {
	let the_content = `<form class="flexcol"><div class="form-group"><p>Pick a stat to roll.</p><select id="abilities">${abilityOptions}</select></div></form>`;
	new Dialog({
		title: "Ability Check",
		content: the_content,
		buttons: {
			adv: {
				label: "Advantage", callback: async (html) => {
					let testAbility = html.find('#abilities')[0].value;
					await me.rollAbilityTest(testAbility, { "fastForward": true, "advantage": true });
				}
			},
			normal: {
				label: "Normal", callback: async (html) => {
					let testAbility = html.find('#abilities')[0].value;
					await me.rollAbilityTest(testAbility, { "fastForward": true });
				}
			},
			dis: {
				label: "Disadvantage", callback: async (html) => {
					let testAbility = html.find('#abilities')[0].value;
					await me.rollAbilityTest(testAbility, { "fastForward": true, "disadvantage": true });
				}
			}
		}
	}).render(true);
}

async function save_roller() {
	let the_content = `<form class="flexcol"><div class="form-group"><p>Pick a stat to roll.</p><select id="abilities">${abilityOptions}</select></div></form>`;
	new Dialog({
		title: "Save Check",
		content: the_content,
		buttons: {
			adv: {
				label: "Advantage", callback: async (html) => {
					let testAbility = html.find('#abilities')[0].value;
					await me.rollAbilitySave(testAbility, { "fastForward": true, "advantage": true });
				}
			},
			normal: {
				label: "Normal", callback: async (html) => {
					let testAbility = html.find('#abilities')[0].value;
					await me.rollAbilitySave(testAbility, { "fastForward": true });
				}
			},
			dis: {
				label: "Disadvantage", callback: async (html) => {
					let testAbility = html.find('#abilities')[0].value;
					await me.rollAbilitySave(testAbility, { "fastForward": true, "disadvantage": true });
				}
			}
		}
	}).render(true);
}


async function skill_roller() {
	let the_content = `<form class="flexcol"><div class="form-group"><p>Pick a skill to roll.</p><select id="skills">${skillOptions}</select></div></form>`;
	new Dialog({
		title: "Skill Check",
		content: the_content,
		buttons: {
			adv: {
				label: "Advantage", callback: async (html) => {
					let testAbility = html.find('#skills')[0].value;
					await me.rollSkill(testAbility, { "fastForward": true, "advantage": true });
				}
			},
			normal: {
				label: "Normal", callback: async (html) => {
					let testAbility = html.find('#skills')[0].value;
					await me.rollSkill(testAbility, { "fastForward": true });
				}
			},
			dis: {
				label: "Disadvantage", callback: async (html) => {
					let testAbility = html.find('#skills')[0].value;
					await me.rollSkill(testAbility, { "fastForward": true, "disadvantage": true });
				}
			}
		}
	}).render(true);
}

async function tool_roller() {
	let the_content = `<form class="flexcol"><div class="form-group"><p>Pick a tool to roll.</p><select id="tools">${toolOptions}</select></div></form>`;
	new Dialog({
		title: "Tool Check",
		content: the_content,
		buttons: {
			roll: {
				label: "Roll", callback: async (html) => {
					let testTool = html.find('#tools')[0].value;
					await me.items.getName(testTool).rollToolCheck();
				}
			}
		}
	}).render(true);
}
