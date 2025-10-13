

import FingerprintJS from '@fingerprintjs/fingerprintjs';
// lib/fingerprint.ts
export const getDeviceFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // This is the unique ID for the device
};
