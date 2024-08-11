export const getCurrency = (product) => {
  let currency

  if (product === '1') {
    currency = 'USD'
  } else {
    currency = '$'
  }

  return currency
}
