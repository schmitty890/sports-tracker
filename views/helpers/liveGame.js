/**
 * addStatusClass returns a css class to be added to the current game status
 */
exports.addStatusClass = (status) => {
  console.log(status);
  switch (status) {
    case 'Scheduled':
      return 'card--game-status__scheduled';
    case 'Pre-Game':
      return 'card--game-status__pregame';
    case 'Final':
      return 'card--game-status__final';
    case 'In Progress':
      return 'card--game-status__in-progress';
    default:
  }
};

/**
 * compareStats returns a css class to be added to the current game stat
 */
exports.compareStats = (statOne, statTwo) => {
  if (statOne > statTwo) {
    return 'game-stats--bold game-stats--bold__green';
  }
};
