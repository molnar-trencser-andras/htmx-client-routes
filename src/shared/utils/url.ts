export const isUrlFromString = (pattern: string, url: string): boolean => {
  return isUrl(createUrlPattern(pattern), url);
};

export const isUrl = (pattern: RegExp, url: string): boolean => {
  return pattern.test(url);
};

export const createUrlPattern = (urlPat: string): RegExp => {
  let pat = urlPat;

  if (pat.includes("{")) {
    const replacements = [
      { from: /\//g, to: "\\/" },
      { from: /{string}/g, to: "[0-9a-zA-Z\\-]+" },
      { from: /{integer}/g, to: "[0-9]+" },
      { from: /{id}/g, to: "[0-9\\-]+" },
      { from: /{index}/g, to: "[0-9]+" },
      { from: /{url}/g, to: ".*" },
    ];

    replacements.forEach(({ from, to }) => {
      pat = pat.replace(from, to);
    });
  }

  return new RegExp(`^${pat}$`);
};
