document.getElementById('generateButton').addEventListener('click', function () {
    const schemaType = document.getElementById('schemaType').value;
    const primaryName = document.getElementById('primaryName').value;
    const alternateNames = document.getElementById('alternateNames').value.split(',');
    const url = document.getElementById('url').value;
  
    let schema = {
      "@context": "https://schema.org",
      "@type": schemaType
    };
  
    // Dynamically add properties based on schema type
    if (schemaType === "WebSite") {
      schema.name = primaryName;
      schema.alternateName = alternateNames;
      schema.url = url;
    } else if (schemaType === "BreadcrumbList") {
      schema.itemListElement = alternateNames.map((name, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": name,
        "item": url
      }));
    } else if (schemaType === "Organization") {
      schema.name = primaryName;
      schema.url = url;
      schema.alternateName = alternateNames;
    } else if (schemaType === "Store") {
      schema.name = primaryName;
      schema.url = url;
    }
  
    const schemaWithScriptTags = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
    document.getElementById('output').textContent = schemaWithScriptTags;
  });
  
  document.getElementById('copyButton').addEventListener('click', function () {
    const schemaText = document.getElementById('output').textContent;
  
    if (schemaText) {
      navigator.clipboard.writeText(schemaText)
        .then(() => alert('Schema copied to clipboard!'))
        .catch(err => alert('Failed to copy schema: ' + err));
    } else {
      alert('Please generate the schema before copying.');
    }
  });
  