const sprintRetroKeys = ['improve', 'keep'];

function SprintRetro(params = {}) {
  const sprintRetro = {};
  sprintRetroKeys.map((key) => {
    sprintRetro[key] = params[key] || [];
  });

  return sprintRetro;
};

module.exports = {
  SprintRetro,
  sprintRetroKeys
};