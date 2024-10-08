import {createTheme} from 'thememirror';
import {tags as t} from '@lezer/highlight';

export const theme = createTheme({
	variant: 'dark',
	settings: {
		background: '#121212',
		foreground: '#ffffff',
		caret: '#ffffff',
		selection: '#4a0094',
		lineHighlight: '#8a91991a',
		gutterBackground: '#000000',
		gutterForeground: '#f0f0f0',
	},
	styles: [
		{
			tag: t.comment,
			color: '#787b8099',
		},
		{
			tag: t.variableName,
			color: '#8cc2f8',
		},
		{
			tag: [t.string, t.special(t.brace)],
			color: '#fb5607',
		},
		{
			tag: t.number,
			color: '#e78123',
		},
		{
			tag: t.bool,
			color: '#f02de0',
		},
		{
			tag: t.null,
			color: '#5c6166',
		},
		{
			tag: t.keyword,
			color: '#3a86ff',
		},
		{
			tag: t.operator,
			color: '#74c157',
		},
		{
			tag: t.className,
			color: '#ffae00',
		},
		{
			tag: t.definition(t.typeName),
			color: '#57cc99',
		},
		{
			tag: t.typeName,
			color: '#57cc99',
		},
		{
			tag: t.angleBracket,
			color: '#ffffff',
		},
		{
			tag: t.tagName,
			color: '#ff006e',
		},
		{
			tag: t.attributeName,
			color: '#ffb703',
		},
	],
});