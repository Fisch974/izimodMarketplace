import { postcss } from 'postcss-nested';
import autoprefixer from 'autoprefixer';


/** @type {import('postcss-load-config').Config} */
export const config = {
	plugins: [
		autoprefixer,
		postcss
	]
}
