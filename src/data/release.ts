export type Release = {
  version: string;
  fileName: string;
  downloadPath: string;
};

export const currentRelease: Release = {
  version: "1.0.0",
  fileName: "Meecanico-1.0.0.dmg",
  downloadPath: "/releases/Meecanico-1.0.0.dmg",
};

export const latestReleaseDownloadUrl = currentRelease.downloadPath;
