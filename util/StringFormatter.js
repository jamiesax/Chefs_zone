export default function FormatStringArray(list){
  return list.map((item) => {
    if (typeof item === 'string') return item;

  if (typeof item === 'object' && item !== null) {
    const amount = item.amount ? `${item.amount} ` : '';
    const unit = item.unit ? `${item.unit} ` : '';
    const name = item.name || item.ingredient || item.title || '';

    const combined = `${amount}${unit}${name}`.trim();

    return combined || JSON.stringify(item);
  }});

}
