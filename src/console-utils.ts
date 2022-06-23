// Thanks to
// https://stackoverflow.com/a/41407246

export enum ConsoleColorCommon {
  Reset = "\x1b[0m",
  Bright = "\x1b[1m",
  Dim = "\x1b[2m",
  Underscore = "\x1b[4m",
  Blink = "\x1b[5m",
  Reverse = "\x1b[7m",
  Hidden = "\x1b[8m",
}

export enum ConsoleColorText {
  None = '',
  Black = "\x1b[30m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Blue = "\x1b[34m",
  Magenta = "\x1b[35m",
  Cyan = "\x1b[36m",
  White = "\x1b[37m",
}

export enum ConsoleColorBackground {
  None = '',
  Black = "\x1b[40m",
  Red = "\x1b[41m",
  Green = "\x1b[42m",
  Yellow = "\x1b[43m",
  Blue = "\x1b[44m",
  Magenta = "\x1b[45m",
  Cyan = "\x1b[46m",
  White = "\x1b[47m",
}

export const logColor = (
  message: string,
  text: ConsoleColorText | null = null,
  background: ConsoleColorBackground | null = null,
): void => {

  if (text === null && background === null) {
    console.log(message);
    return;
  }

  const textFmt = text ?? '';
  const backgroundFmt = background ?? '';
  const reset = ConsoleColorCommon.Reset;

  console.log(`${backgroundFmt}${textFmt}${message}${reset}`);
};
