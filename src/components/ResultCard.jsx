export function ResultCard({ selection }) {
  if (!selection) return null;

  const { province, city, district, subdistrict, postalCode } = selection;

  return (
    <div className="result-card">
      <h4>✅ Lokasi Terpilih</h4>
      <div className="result-path">
        <span>{province?.prov_name}</span>
        <span className="arrow">→</span>
        <span>{city?.city_name}</span>
        <span className="arrow">→</span>
        <span>{district?.dis_name}</span>
        <span className="arrow">→</span>
        <span>{subdistrict?.subdis_name}</span>
        <span className="arrow">→</span>
        <span className="postal-code">{postalCode}</span>
      </div>
    </div>
  );
}

export function SearchResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="result-card">
      <h4>✅ Hasil Pencarian Terpilih</h4>
      <div className="result-path">
        <span>{result.prov_name}</span>
        <span className="arrow">→</span>
        <span>{result.city_name}</span>
        <span className="arrow">→</span>
        <span>{result.dis_name}</span>
        <span className="arrow">→</span>
        <span>{result.subdis_name}</span>
        <span className="arrow">→</span>
        <span className="postal-code">{result.postal_code}</span>
      </div>
    </div>
  );
}

export default ResultCard;
