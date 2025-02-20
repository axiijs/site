
export function renderSandbox( code: string) {
    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Preview</title>
  <style>
    html{
        height:100%;
        overflow: hidden;
    }
    body{
        padding:10px !important;
        box-sizing: border-box;
        height:100%;
        outline: none;
        border: none;
        background: rgba(50,50,50);
        color: #fff;
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
    }
    * {
      padding: 0;
      margin: 0;
    }
  </style>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
</head>
<body>
<div id="root">
</div>
<script type="importmap">
  {
    "imports": {
        "data0": "https://esm.sh/data0@latest",
        "axii": "https://esm.sh/axii@latest",
        "action0": "https://esm.sh/action0@latest",
        "router0": "https://esm.sh/router0@latest"
    }
  }
</script>
<script type="module" >
${code}
</script>
</body>
</html>
    `
}
