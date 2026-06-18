import { createSupabaseServerClient } from './supabase-server';

export type SiteControls = {
  antiCaptureEnabled: boolean;
};

const defaultControls: SiteControls = {
  antiCaptureEnabled: false,
};

export async function getSiteControls(): Promise<SiteControls> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return defaultControls;
  }

  const { data } = await supabase.from('site_controls').select('anti_capture_enabled').maybeSingle();

  if (!data) {
    return defaultControls;
  }

  return {
    antiCaptureEnabled: Boolean(data.anti_capture_enabled),
  };
}
