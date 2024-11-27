import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "axii/jsx-runtime";
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return _jsxs(_Fragment, {
    children: [_jsx(_components.h1, {
      children: "はじめに"
    }), "\n", _jsx(_components.p, {
      children: "Axiiはリアクティブデータ構造に基づくフロントエンドフレームワークです。主な特徴は以下の通りです："
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "リアクティブデータ構造は、依存関係の変更を受け取った際に完全な再計算を行わず、より効率的な増分計算更新を自動的に使用します。これは特に配列の多くの計算において大きなパフォーマンス向上をもたらします。"
      }), "\n", _jsx(_components.li, {
        children: "リアクティブデータを識別することにより、DOM構造と属性の正確な更新を実現します。Virtual DOMは不要で、差分計算プロセスもありません。"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "Axiiは、ほとんどのシナリオにおいて、開発者が追加の労力を必要とせずに高いパフォーマンスを確保することを目指しています。"
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
