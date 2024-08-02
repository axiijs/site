import {createTheme} from 'thememirror';
import {tags as t} from '@lezer/highlight';
import {common} from "../theme";

export const theme = createTheme({
	variant: 'dark',
	settings: {
		background: common.colorScheme.blacks.dark,
		foreground: '#c7c7c7',
		caret: '#4126ed',
		selection: '#1f1f1f',
		lineHighlight: '#1a1a1a',
		gutterBackground: '#121212',
		gutterForeground: '#404040',
	},
	styles: [
		{
			tag: t.comment,
			color: '#545678',
		},
		{
			tag: t.variableName,
			color: '#7180f4',
		},
		{
			tag: [t.string, t.special(t.brace)],
			color: '#e1b437',
		},
		{
			tag: t.number,
			color: '#ffffff',
		},
		{
			tag: t.bool,
			color: '#3585d4',
		},
		{
			tag: t.null,
			color: '#62d0ba',
		},
		{
			tag: t.keyword,
			color: '#6d7378',
		},
		{
			tag: t.operator,
			color: '#565e67',
		},
		{
			tag: t.className,
			color: '#3cc6e2',
		},
		{
			tag: t.definition(t.typeName),
			color: '#5c6166',
		},
		{
			tag: t.typeName,
			color: '#8052ff',
		},
		{
			tag: t.angleBracket,
			color: '#5c6166',
		},
		{
			tag: t.tagName,
			color: '#5c6166',
		},
		{
			tag: t.attributeName,
			color: '#5c6166',
		},
	],
});