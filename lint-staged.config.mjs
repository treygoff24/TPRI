const config = {
  "*.{ts,tsx,mdx}": ["eslint --max-warnings=0 --no-warn-ignored"],
  "*.{ts,tsx,mdx,js,jsx,json,css,scss,md,mdx,yml,yaml}": ["prettier --check --ignore-unknown"],
};

export default config;
