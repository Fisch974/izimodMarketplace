import { useEffect, useState } from "react";

function SearchPageStore() {
  const [magasins, setMagasins] = useState([]);
  const [filteredMagasins, setFilteredMagasins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch tous les magasins
    fetch('/api/magasins')
      .then(res => res.json())
      .then(data => {
        setMagasins(data);
        setFilteredMagasins(data);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = magasins.filter(magasin => 
      magasin.nom.toLowerCase().includes(term.toLowerCase()) ||
      magasin.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMagasins(filtered);
  };

  return (
    <div className="boutiques-page">
      <div className="search-section">
        <input 
          type="text"
          placeholder="Rechercher une entreprise..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      
      <div className="magasins-grid">
        {filteredMagasins.map(magasin => (
          <MagasinCard key={magasin.id} magasin={magasin} />
        ))}
      </div>
    </div>
  );
}

export default SearchPageStore;