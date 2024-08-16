function truncateText(OriText, maxLength) {
  if (OriText.length > maxLength) {
    return OriText.slice(0, maxLength);
  }
  return OriText;
}

export default truncateText;
