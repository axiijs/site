import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "axii/jsx-runtime";
function _createMdxContent(props) {
  const _components = {
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.p, {
      children: "Axiiコンポーネントの特徴："
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "デフォルト値の作成をサポートします。リアクティビティが不要なシナリオでは通常の値を渡すことができ、フレームワークが自動的に変換します。"
      }), "\n", _jsx(_components.li, {
        children: "内部のDOM要素や子コンポーネントを明示的な命名によって公開することができ、不要なカプセル化を排除します。"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "これで、Axiiを楽しく使い始めることができます！"
    })]
  });
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
