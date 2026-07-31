function deriveVehicleFlowState({
  metadataReady,
  hasVehicle,
  photosReady,
  observationReady,
  usageReady,
  hasGateAnswer,
  abnormalDetailsReady,
  distanceReady,
}) {
  const showContext = hasVehicle && photosReady;
  const contextReady = showContext && observationReady && usageReady;
  const checkReady = contextReady && hasGateAnswer && abnormalDetailsReady && distanceReady;

  return {
    showPhotos: hasVehicle,
    showContext,
    showDistance: hasVehicle,
    contextReady,
    requiredReady: metadataReady && hasVehicle && photosReady && contextReady && checkReady,
    stepComplete: {
      vehicle: hasVehicle,
      photos: photosReady,
      context: contextReady,
      check: checkReady,
    },
    currentStep: !hasVehicle
      ? "vehicle"
      : !photosReady
        ? "photos"
        : !contextReady
          ? "context"
          : !checkReady
            ? "check"
            : "",
  };
}

function calculateDailyDistance(previousOdometer, currentOdometer) {
  const previous = Number(previousOdometer);
  const hasCurrent = currentOdometer !== "" && currentOdometer !== null && currentOdometer !== undefined;
  const current = hasCurrent ? Number(currentOdometer) : null;

  if (!Number.isFinite(previous)) {
    return { state: "missing-previous", previous: null, current, daily: null, valid: false };
  }
  if (!hasCurrent || !Number.isFinite(current)) {
    return { state: "empty", previous, current: null, daily: null, valid: false };
  }
  if (current < previous) {
    return { state: "below-previous", previous, current, daily: current - previous, valid: false };
  }
  return { state: "ready", previous, current, daily: current - previous, valid: true };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculateDailyDistance, deriveVehicleFlowState };
}
