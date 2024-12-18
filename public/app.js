document.getElementById('applyFilters').addEventListener('click', async () => {
  const serviceName = document.getElementById('serviceName').value.trim();
  const skuName = document.getElementById('skuName').value.trim();
  const currencyCode = document.getElementById('currencyCode').value.trim();

  let query = [];
  if (serviceName) query.push(`serviceName=${serviceName}`);
  if (skuName) query.push(`skuName=${skuName}`);
  if (currencyCode) query.push(`currencyCode=${currencyCode}`);

  const queryString = query.length ? `?${query.join('&')}` : '';

  try {
    const response = await fetch(`/api/retail-prices${queryString}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();

    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = ''; // Clear previous results

    data.Items.forEach(item => {
      const row = `
        <tr>
          <td>${item.serviceName || 'N/A'}</td>
          <td>${item.skuName || 'N/A'}</td>
          <td>${item.currencyCode || 'N/A'}</td>
          <td>${item.retailPrice || 'N/A'}</td>
          <td>${item.unitPrice || 'N/A'}</td>
          <td>${item.armRegionName || 'N/A'}</td>
          <td>${item.location || 'N/A'}</td>
          <td>${item.effectiveStartDate || 'N/A'}</td>
          <td>${item.meterName || 'N/A'}</td>
          <td>${item.productName || 'N/A'}</td>
        </tr>
      `;
      dataBody.insertAdjacentHTML('beforeend', row);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});


