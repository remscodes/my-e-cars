export function addHeadScript(src: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = src;
    script.type = 'module';

    const abortCtrl: AbortController = new AbortController();
    const signal: AbortSignal = abortCtrl.signal;

    script.addEventListener('load', () => {
      abortCtrl.abort();
      resolve(true);
    }, { once: true, signal });

    script.addEventListener('error', ({ error }: ErrorEvent) => {
      abortCtrl.abort();
      reject(error);
    }, { once: true, signal });

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  });
}
