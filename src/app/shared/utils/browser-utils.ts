export function addHeadScript(src: string): Promise<boolean> {
  const script: HTMLScriptElement = document.createElement('script');
  script.src = src;
  script.type = 'module';

  const abortCtrl: AbortController = new AbortController();

  return new Promise((resolve, reject) => {
    script.addEventListener('load', () => {
      abortCtrl.abort();
      resolve(true);
    }, { once: true, signal: abortCtrl.signal });

    script.addEventListener('error', ({ error }: ErrorEvent) => {
      abortCtrl.abort();
      reject(error);
    }, { once: true, signal: abortCtrl.signal });

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  });
}
