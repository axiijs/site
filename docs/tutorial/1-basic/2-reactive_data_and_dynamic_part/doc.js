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
      children: "Axiiのリアクティブデータ構造には以下の種類があります："
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "atom：全体として扱われる原子データ。"
      }), "\n", _jsx(_components.li, {
        children: "RxList/RxMap/RxSet：コレクションが変更されると信号を発するリアクティブなコレクションデータ構造。ただし、コレクションオブジェクト内部の変更は深くリアクティブではありません。"
      }), "\n", _jsx(_components.li, {
        children: "RxTime：時間を扱うための特別なリアクティブデータ構造。"
      }), "\n"]
    }), "\n", _jsx(_components.p, {
      children: "atomは任意のDOM属性に渡すことができ、atomの値が変更されると、DOM属性は自動的に更新されます。\nまた、RxListをDOM配列にマップすることができ、RxListの値が変更されると、DOM配列は自動的に更新されます。"
    }), "\n", _jsx(_components.p, {
      children: "RxMap/RxSetを使用している場合でも、それらにはRxListに変換できるtoListメソッドがあり、DOM配列にマップすることができます。"
    }), "\n", _jsx(_components.p, {
      children: "より動的な要件に対しては、生成が必要なDOM構造を表す関数を直接渡すことができます。"
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
