import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Star, MapPin, Navigation, SlidersHorizontal } from 'lucide-react';
import { businesses } from '@/data/businessData';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = defaultIcon;

const FlyToLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 17, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
};

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  const targetLat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : null;
  const targetLng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : null;

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesSearch = !search || b.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const allCategories = ['', ...new Set(businesses.map(b => b.category))];

  const centerMap = () => {
    if (mapRef.current) {
      mapRef.current.setView([29.9691, -95.6977], 14);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 5rem)' }}>
        {/* Map */}
        <div className="flex-1 relative">
          {/* Floating header */}
          <div className="absolute top-4 left-4 z-[1000]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl px-5 py-3 depth-shadow flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-navy-gradient flex items-center justify-center">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-foreground leading-tight">Community Map</h2>
                <p className="text-xs text-muted-foreground">{filtered.length} locations</p>
              </div>
            </motion.div>
          </div>

          <MapContainer
            center={[29.9691, -95.6977]}
            zoom={14}
            className="w-full h-full z-0"
            ref={mapRef}
          >
            {targetLat !== null && targetLng !== null && (
              <FlyToLocation lat={targetLat} lng={targetLng} />
            )}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map((biz) => (
              <Marker key={biz.id} position={[biz.lat, biz.lng]}>
                <Popup>
                  <div className="font-body">
                    <strong className="font-display">{biz.name}</strong>
                    <br />
                    <span className="text-xs">{biz.address}</span>
                    <br />
                    <span className="text-xs">⭐ {biz.rating} · {biz.category}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Floating controls */}
          <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={centerMap}
              className="glass text-foreground p-3 rounded-xl depth-shadow hover:bg-card transition-colors"
              title="Center map"
            >
              <Navigation className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[400px] bg-card border-l border-border overflow-y-auto"
        >
          <div className="p-5 border-b border-border">
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/30 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-3 flex flex-wrap gap-2"
              >
                {allCategories.map((cat) => (
                  <button
                    key={cat || 'all'}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat || 'All'}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <div className="divide-y divide-border">
            {filtered.map((biz, i) => (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.4) }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setView([biz.lat, biz.lng], 16);
                  }
                }}
              >
                <img
                  src={biz.image}
                  alt={biz.name}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 depth-shadow group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-gold transition-colors">{biz.name}</h4>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span className="font-medium">{biz.rating}</span>
                    <span>·</span>
                    <span className="truncate">{biz.category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground/70 truncate mt-0.5">{biz.address}</p>
                </div>
                <MapPin className="w-4 h-4 text-muted-foreground/40 group-hover:text-gold transition-colors flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MapPage;
