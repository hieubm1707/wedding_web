// Registry for the OurStoryVideo YouTube player so other services
// (e.g. audioService) can pause it without importing the component.

type YTPlayer = { pauseVideo?: () => void };

let _player: YTPlayer | null = null;

export function registerPlayer(player: YTPlayer): void {
  _player = player;
}

export function unregisterPlayer(player: YTPlayer): void {
  if (_player === player) _player = null;
}

export function pauseVideo(): void {
  try {
    _player?.pauseVideo?.();
  } catch {
    // player may already be torn down
  }
}
