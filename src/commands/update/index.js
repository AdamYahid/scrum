const { readDb, updateCurrentRetro, addNewSprint } = require('../../db-proxy.js');
const { sprintRetroKeys } = require('../../models/sprint-retro.js');
const { Sprint } = require('../../models/sprint.js');

function argsParser(args = []) {
  const actions = {};
  args.map((arg) => {
    if (arg.indexOf('-') === 0) {
      const action = arg.substring(1);
      actions[action] = null;
      return;
    } else {
      // append to last action
      const knownActions = Object.keys(actions)
      const lastAction = knownActions[knownActions.length - 1];
      if (!actions[lastAction]) {
        actions[lastAction] = [];
      }
      actions[lastAction] = actions[lastAction].concat(arg);
      return;
    }
  });
  return actions;
}

function update(args, cb) {
  const actions = argsParser(args);
  const newData = readDb().then((newData) => {
    const currentSprint = newData[newData.length - 1];
    const currentRetro = currentSprint.retrospective;
    const newRetro = {};
    Object.keys(actions).map((action) => {
      if (sprintRetroKeys.indexOf(action) > -1) {
        newRetro[action] = currentRetro[action].concat(actions[action]);
      }
    });
    if (Object.keys(newRetro).length > 0) {
      updateCurrentRetro(Object.assign({}, currentRetro, newRetro), cb);
    }
    if(actions['start-sprint']) {
      const newSprint = Sprint({
        name: actions['start-sprint'].join(' ')
      });
      addNewSprint(newSprint, cb);
    }
  });
}

module.exports = update;