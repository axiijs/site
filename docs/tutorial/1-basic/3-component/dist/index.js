import { jsx, jsxs, Fragment } from "axii/jsx-runtime";
function _createMdxContent(props) {
  const _components = {
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return jsxs(Fragment, {
    children: [jsx(_components.p, {
      children: "Axiiコンポーネントの特徴："
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsx(_components.li, {
        children: "デフォルト値の作成をサポートします。リアクティビティが不要なシナリオでは通常の値を渡すことができ、フレームワークが自動的に変換します。"
      }), "\n", jsx(_components.li, {
        children: "内部のDOM要素や子コンポーネントを明示的な命名によって公開することができ、不要なカプセル化を排除します。"
      }), "\n"]
    }), "\n", jsx(_components.p, {
      children: "これで、Axiiを楽しく使い始めることができます！"
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsx(MDXLayout, {
    ...props,
    children: jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
export {
  MDXContent as default
};
