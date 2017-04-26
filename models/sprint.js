const { SprintRetro } = require('./sprint-retro');

function Sprint(params = {}){
  return {
    name: params.name || 'unnamed sprint',
    retrospective: new SprintRetro
  };
};

module.exports = {
  Sprint
};