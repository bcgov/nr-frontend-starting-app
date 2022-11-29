import React, { useEffect } from 'react';

const SilentCheckSso = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = 'console.log(\'location.href=\',location.href);console.log(\'location.origin=\', location.origin);parent.postMessage(location.href, location.origin)';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    </>
  );
};

export default SilentCheckSso;
