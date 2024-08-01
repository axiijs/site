import {ColorSchema, createCommon, createRange, rem} from "axii-ui-theme-common";
import {StyleSize} from "axii";

const colorSchema: ColorSchema = {
    line: '#ffffff',
    lineInverted:'#111',
    error: '#FF4D4F',
    success: '#52C41A',
    warning: '#FAAD14',
    info: '#1890FF',
    process: '#1890FF',
    blacks: {
        dark:'rgba(18, 18, 18, 1)',
        light: 'rgba(20, 20, 20, 1)',
        lighter: 'rgba(32, 32, 32, .8)',
        outline: 'rgba(51, 51, 51, 1)'
    }
}


const radius = createRange(
    [
        // rem(0.3),
        rem(0.5),
        rem(0.5),
        rem(0.8),
        rem(1.2),
    ],
    0
)

const shadows = createRange<string>(
    [
        '0 1px 2px 0 rgba(0,0,0,.05)',
        '0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03)',
        '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        '-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)',
        '6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05), 12px 0 48px 16px rgba(0, 0, 0, 0.03)',
    ],
    0
)

const weights = createRange([100, 200, 300, 400, 500, 600, 700, 800, 900], 3)


// 外部也可以使用
export const common = createCommon(
    colorSchema,
    true,
    new StyleSize(1, 'px'),
    radius,
    shadows,
    weights
)

