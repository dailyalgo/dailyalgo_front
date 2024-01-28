const LOGO = [] as const;
const PLATFORMS = [] as const;
const ARROW = [] as const;
const SYSTEM = [
  "chat",
  "eye",
  "like-off",
  "like-on",
  "close",
  "plus",
  "search",
  "solid-tag-off",
  "solid-tag-on",
  "eye-off",
  "eye-on",
  "send",
  "alert",
  "profile",
  "checkbox",
  "arrow-triangle",
  "star",
  "comment-list-item",
  "filter",
  "logout",
  "login",
  "heart-on",
  "heart-off",
] as const;
const GRAPHIC = [] as const;
const ICON_NAMES = [...LOGO, ...ARROW, ...PLATFORMS, ...SYSTEM, ...GRAPHIC] as const;

type SvgIconType = (typeof ICON_NAMES)[number];

const ICONS = ICON_NAMES.reduce((acc, product) => {
  acc[product] = product;
  return acc;
}, {} as { [key: string]: string });

export type { SvgIconType };
export { ICONS };
