export const getLaunchStatus = (launch) => {
  const status = launch.success ? "success" : "failure";
  const hasFailure = !launch.success && launch.failures?.length > 0;
  const failureReason = hasFailure ? launch.failures[0].reason : null;

  return {
    status,
    hasFailure,
    failureReason
  };
};