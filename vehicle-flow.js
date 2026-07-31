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

if (typeof module !== "undefined" && module.exports) {
  module.exports = { deriveVehicleFlowState };
}
