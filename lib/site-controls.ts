export type SiteControls = {
  antiCaptureEnabled: boolean;
};

const defaultControls: SiteControls = {
  antiCaptureEnabled: false,
};

export function getSiteControls(): SiteControls {
  return defaultControls;
}
