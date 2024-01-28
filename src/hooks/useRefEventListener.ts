import { useEffect, useRef } from "react";

/**
 * @description requestAnimationFrame을 이용해서 scroll, resize, change 이벤트에 스로틀링 적용
 * @param {HTMLElement} [options.target] - 이벤트를 연결할 대상 요소
 * @param {'scroll' | 'resize'} options.eventType - addEventListener에 전달할 이벤트 종류
 * @param {Function} options.listener - 이벤트 리스너에서 실행할 함수
 * @param {boolean} options.runCallbackOnce - 훅 실행 시 최초에 콜백을 실행할지 여부, true인 경우 콜백을 실행함
 */
const useRefEventListener = <T extends Event>(options: {
  target?: HTMLElement;
  eventType: Parameters<typeof HTMLElement.prototype.addEventListener>[0];
  listener: (event?: T) => void;
  runCallbackOnce: boolean;
}) => {
  const { target, eventType, listener, runCallbackOnce } = options;
  const rafRef = useRef(0);

  useEffect(() => {
    const element = target || window;

    if (!element || !eventType || !listener) return undefined;

    const handleEvent = (event: T) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        listener(event);
      });
    };

    if (runCallbackOnce) listener();
    element.addEventListener(eventType, handleEvent as EventListener);

    return () => element.removeEventListener(eventType, handleEvent as EventListener);
  }, [target, listener, eventType, runCallbackOnce]);
};

export default useRefEventListener;
