import autoprefixer from 'autoprefixer';
import { postcss }from 'postcss-nested';


/** @type {import('postcss-load-config').Config} */
export const config = {
	plugins: [
	  autoprefixer,
	  postcss
	]
  }
