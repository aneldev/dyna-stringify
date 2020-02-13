export const dynaStringify = (
  value: any,
  options?: {
    spaces?: number;
    circularText?: string | ((value: any) => string);
  },
): string => {
  const {
    spaces = 0,
    circularText = '[CircularRef]',
  } = options || {};
  return JSON.stringify(value, getCircularReplacer(circularText), spaces);
};

const getCircularReplacer = (circularText: string | ((value: any) => string)) => {
  const scanned: any[] = [];
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (scanned.indexOf(value) > -1) {
        if (typeof circularText === "string") return circularText;
        return circularText(value);
      }
      scanned.push(value);
    }
    return value;
  };
};
