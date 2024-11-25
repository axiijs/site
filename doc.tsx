// import {
//     createBlockTool,
//     createRangeTool,
//     createSuggestionTool,
//     defaultBlockWidgets,
//     defaultFormatWidgets,
//     defaultMarkdownPlugins,
//     defaultSuggestionWidgets,
//     Grid,
//     Heading,
//     InlineImageBlock,
//     InlineCode,
//     Link,
//     OLItem,
//     Paragraph,
//     scaffold,
//     Text,
//     Code,
//     ULItem, DocumentData,
//     createTOCTool
// } from "minditor";
//
// // parse query 中的 language，如果没有就是 en
// const searchObj = Object.fromEntries(
//     window.location.search.slice(1).split('&').map(pair => pair.split('='))
// )
// const language = searchObj.language || 'en'
//
// let fetchResult
//
// if (language === 'cn') {
//     // @ts-ignore
//     fetchResult = await fetch('readme_cn.json')
// } else {
//     // @ts-ignore
//     fetchResult = await fetch('readme_en.mdt.json')
// }
// const jsonData = await fetchResult.json() as DocumentData
//
// const root= document.getElementById('root')!
// const types = {
//     Paragraph,
//     Text,
//     Heading,
//     OLItem,
//     ULItem,
//     InlineCode,
//     Code,
//     Link,
//     Grid,
//     Image: InlineImageBlock
// }
//
// const plugins = [
//     ...defaultMarkdownPlugins,
//     createBlockTool(defaultBlockWidgets),
//     createRangeTool( defaultFormatWidgets ),
//     createSuggestionTool(defaultSuggestionWidgets),
//     createTOCTool()
// ]
// //@ts-ignore
// const result = scaffold(root, {data: jsonData, types, plugins}, {
//     styles: {
//         containerLeft: {
//             flexShrink: 0,
//             flexGrow: 0,
//             '@media (width < 800px)': {
//                 display: 'none'
//             }
//         }
//     }
// } )
// result.render()
//
