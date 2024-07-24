
export function renderSandbox( code: string) {
    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Preview</title>
  <style>
    body{
        outline: none;
        border: none;
        background: rgba(20,20,20);
        color: #fff;
        font-family: Arial, sans-serif;
    }
    * {
      padding: 0;
      margin: 0;
    }
  </style>
</head>
<body>
<div id="root">
</div>
<script type="importmap">
  {
    "imports": {
      "axii": "https://esm.sh/axii@latest"
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
