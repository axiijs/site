export default {
  "entryPoints": [
    "./data0/src/index.ts"
  ],
  "out": "../docs/api/data0",
  "exclude": [
    "node_modules/**/*"
  ],
  "excludeExternals": true,
  "excludeInternal": true,
  "excludeNotDocumented":true,
  "categoryOrder": [
    "Basic",
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
    "Axii API": "https://axii.dev/docs/api/axii"
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
  "plugin": [ "@emuanalytics/typedoc-plugin-no-inherit", "typedoc-plugin-extras","typedoc-material-theme"],
  "titleLink": "https://axii.dev",
  "customTitle": "data0 API"
}