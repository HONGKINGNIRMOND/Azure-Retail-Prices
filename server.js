app.get('/api/retail-prices', async (req, res) => {
  const { serviceName, skuName, currencyCode } = req.query;

  let apiUrl = 'https://prices.azure.com/api/retail/prices?api-version=2023-01-01-preview';

  const filterParams = [];
  if (serviceName) filterParams.push(`serviceName eq '${serviceName}'`);
  if (skuName) filterParams.push(`skuName eq '${skuName}'`);
  if (currencyCode) filterParams.push(`currencyCode eq '${currencyCode}'`);

  if (filterParams.length > 0) {
    apiUrl += `&$filter=${encodeURIComponent(filterParams.join(' and '))}`;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data); // Returns all fields provided by Azure API
  } catch (error) {
    console.error('Error fetching data from Azure:', error);
    res.status(500).json({ error: 'Failed to fetch data from Azure API' });
  }
});
