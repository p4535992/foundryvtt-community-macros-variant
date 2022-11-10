import API from "./api.js";
import { registerSocket } from "./socket.js";
export const initHooks = () => {
    // registerSettings();
    //registerLibwrappers();
    //new HandlebarHelpers().registerHelpers();
    Hooks.once("socketlib.ready", registerSocket);
};

export const setupHooks = () => {
    setApi(API);
};

export const readyHooks = () => {
    //checkSystem();
    //registerHotkeys();
    //Hooks.callAll(HOOKS.READY);
};

//--------------------------------------
//----setting compendiums
//--------------------------------------
Hooks.on('renderSidebarTab', function () {
    //if (game.settings.get('srd-heros-et-dragons', 'HDcompendiumColor')) {
    compendiumColor();
    //}
    // if (game.settings.get(COMPENDIUM_MIX_DND5E_MODULE_NAME, 'HDhideDD5Compendium')) {
    //     hideDD5Compendium();
    // }
  });
  //---------------------compendium color---visibité des compendium H&D
  function compendiumColor() {
    var comps = document.getElementsByClassName('pack-title');
    for (let comp of comps) {
      let indexCmv = comp.innerText.indexOf('CMV');
      if (indexCmv !== -1) {
        comp.style.color = 'DarkBlue';
      }
    }
  }
  
  // function hideDD5Compendium() {
  
  //     var comps = document.getElementsByClassName("pack-title");
  //     for (let comp of comps) {
  //         let indexDND = comp.innerText.indexOf("SRD");
  
  //         if (indexDND !== -1) {
  //             comp.parentElement.style.display = "none";
  //         }
  //     }
  // }