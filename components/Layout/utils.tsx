// This file contains utility functions for handling redirects in a safe manner.
// Only allow internal redirects
function isSafeRedirect(url: string): boolean {
  try {
    // Only allow relative URLs (starting with "/")
    return url.startsWith('/') && !url.startsWith('//');
  } catch {
    return false;
  }
}

export const redirectTo = (callbackUrl: string | undefined, fallback = '/') => {
  // const router = useRouter();
  if (callbackUrl && isSafeRedirect(callbackUrl)) {
    window.location.href = callbackUrl;
  } else {
    window.location.href = fallback;
  }
};


export const lmacm_logo = '/api/media/url/E3lpfkmo5dimCyXfviEtA9nPGODWa6lM2FfoZKvpVcs7Brb1';
export const lms_main_logo = '/api/media/url/E3lpfkmo5dimAXlLvDrNyMWGbq89oY5IBOUFk6cJdvZgeSLp';
export const lms_logo = '/api/media/url/E3lpfkmo5dim85LkTFNVVfFmRQIZHUSP2GYXNjhiBO16cDu5';
export const super_admin_logo = '/api/media/url/E3lpfkmo5dim07Rlw5jYHcavMVDt7NoiYdlq1W3eQ6SJfxRA';
export const admin_logo = '/api/media/url/E3lpfkmo5dimCbmAO0gEtA9nPGODWa6lM2FfoZKvpVcs7Brb';
export const lm_tech_logo = '/api/media/url/E3lpfkmo5dimW8V5e9No9gteUcPYdvBk60EJNSGCiQF4sb8K';
export const avatar_img = '/api/media/url/E3lpfkmo5dimR243D4OBq2GCrUXasopgwPh4Iz5LjyOnbdmT';
export const FALLBACK_THUMBNAIL = lms_main_logo;


