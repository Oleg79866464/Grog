type ChallengeRecord = {
  token: string;
  createdAt: number;
  passed: boolean;
};

const challengeMap = new Map<string, ChallengeRecord>();

export function createChallengeToken(fingerprint: string) {
  const token = Buffer.from(`${fingerprint}:${Date.now()}`).toString('base64url');
  challengeMap.set(token, { token, createdAt: Date.now(), passed: false });
  return token;
}

export function verifyChallengeToken(token: string) {
  const record = challengeMap.get(token);
  if (!record) return false;
  record.passed = true;
  challengeMap.set(token, record);
  return true;
}

export function hasPassedChallenge(token: string) {
  const record = challengeMap.get(token);
  return Boolean(record?.passed);
}
