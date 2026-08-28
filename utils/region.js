// EU member states + UK (GDPR / UK GDPR jurisdictions requiring cookie consent).
const EU_UK_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "GB",
]);

export function isEuOrUkCountry(countryCode) {
  return !!countryCode && EU_UK_COUNTRIES.has(countryCode.toUpperCase());
}
