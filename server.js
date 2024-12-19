import express from 'express';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed

const app = express();
const port = 3000;

// API route to handle the filtering
app.get('/api/retail-prices', async (req, res) => {
  const { serviceName, skuName, currencyCode } = req.query;

  // Build query parameters for the Azure Retail Prices API
  let azureQuery = [];
  if (serviceName) azureQuery.push(`$filter=serviceName eq '${serviceName}'`);
  if (skuName) azureQuery.push(`$filter=skuName eq '${skuName}'`);
  if (currencyCode) azureQuery.push(`$filter=currencyCode eq '${currencyCode}'`);

  const queryString = azureQuery.length ? `&${azureQuery.join('&')}` : '';

  try {
    // Fetch data from Azure Retail Prices API
    const response = await fetch(`https://prices.azure.com/api/retail/prices?api-version=2023-01-01-preview${queryString}`);
    if (!response.ok) throw new Error(`Azure API error! Status: ${response.status}`);
    
    const data = await response.json();

    // Return the filtered data as JSON to the client
    res.json({ Items: data.Items });
  } catch (error) {
    console.error('Error fetching data from Azure API:', error);
    res.status(500).send('Error fetching data from Azure API');
  }
});

// Serve static files (for HTML, CSS, JS)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
