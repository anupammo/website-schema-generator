document.getElementById('generateButton').addEventListener('click', function () {
    const websiteName = document.getElementById('websiteName').value;
    const alternateNames = document.getElementById('alternateNames').value.split(',');
    const websiteURL = document.getElementById('websiteURL').value;
  
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": websiteName,
      "alternateName": alternateNames,
      "url": websiteURL
    };
  
    // Wrap schema with <script> tags
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
  