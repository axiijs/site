export default {
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": [
    "./axii/src/index.ts"
  ],
  "out": "../docs/api/axii",
  "exclude": [
    "node_modules/**/*"
  ],
  "excludeExternals": true,
  "excludeInternal": true,
  "categoryOrder": [
    "Basic",
    "Reactive State Utility",
    "Event Utility",
    "Common Utility",
    "Miscellaneous"
  ],
  "entryPointStrategy": "expand",
  "categorizeByGroup": false,
  "defaultCategory": "Miscellaneous",
  "navigation": {
    "includeCategories": true,
    "compactFolders": false,
    "includeFolders": false,
    "includeGroups": false
  },
  "sidebarLinks": {
    "data0 API": "https://axii.dev/docs/api/data0"
  },
  "navigationLinks": {
    "Homepage": "https://axii.dev"
  },
  "kindSortOrder": [
    "Function",
    "Reference",
    "Project",
    "Module",
    "Namespace",
    "Enum",
    "EnumMember",
    "Class",
    "Interface",
    "TypeAlias",
    "Constructor",
    "Property",
    "Variable",
    "Accessor",
    "Method",
    "Parameter",
    "TypeParameter",
    "TypeLiteral",
    "CallSignature",
    "ConstructorSignature",
    "IndexSignature",
    "GetSignature",
    "SetSignature"
  ],
  "sort": [
    "kind",
    "alphabetical"
  ],
  "plugin": ["typedoc-material-theme", "typedoc-plugin-extras"],
  "titleLink": "https://axii.dev",
  "customTitle": "Axii API"
}