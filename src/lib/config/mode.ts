export enum ModeType {
  TEST = 'test',
  LIVE = 'live',
}

export const app_mode = process.env.NEXT_PUBLIC_MODE;
