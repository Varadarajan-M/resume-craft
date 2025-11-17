import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useInterceptBackNavigation = ({
  redirectTo: path,
}: {
  redirectTo: string;
}) => {
  const router = useRouter();

  // This effect intercepts the browser back button navigation
  // when the user is on the /builder page.
  // Instead of navigating back to the previous page, it redirects the user to the dashboard (/).

  useEffect(() => {
    // 1. Push a "blocker" state onto the history stack
    // We use a timeout to ensure this runs after the initial page load
    setTimeout(() => {
      history.pushState(null, '', location.href);
    }, 1000);

    const handleBackNavigation = () => {
      // This event fires when the user hits "back"
      // The browser pops the top path, but we're still on the same path

      // We've successfully "intercepted" the back action.
      // Now, we programmatically navigate to the given path.

      // We use `replace` instead of `push` to correctly handle the history stack.
      router.replace(path);

      // Note: We don't need to re-push the state because router.replace
      // handles the history for us.
    };

    // 2. Add the event listener for 'popstate'
    window.addEventListener('popstate', handleBackNavigation);

    // 3. Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };

    // We only want this effect to run once on mount and unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, path]);

  return null;
};

export default useInterceptBackNavigation;
