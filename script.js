const CAT_COLORS = {
  shop:'#00d4e8', office:'#3d8bff', marketplace:'#ff6b35',
  electronics:'#c084fc', supermarket:'#00e096', clothes:'#f472b6',
  craft:'#ffd93d', company:'#60a5fa', amenity:'#fb923c',
  'Sin categoria':'#4a5578'
};
const CAT_ICONS = {
  shop:'🛍️', office:'🏢', marketplace:'🏪', electronics:'📱',
  supermarket:'🛒', clothes:'👗', craft:'⚙️', company:'💼',
  amenity:'🏬', 'Sin categoria':'📍'
};

// ── MATRIZ NORMATIVA + RIESGO REGULATORIO ─────────────────────────────
const NORMATIVAS_RUBRO = {
  gastronomia: {
    aliases: ["restaurant", "cafe", "bar", "fast_food", "bakery", "ice_cream", "food", "confectionery"],
    riesgo: "Medio",
    peso: 0.6,
    normativas: [
      "Habilitación comercial CABA",
      "Condiciones bromatológicas",
      "Manipulación segura de alimentos",
      "Seguridad e higiene",
      "Gestión de residuos"
    ],
    recomendacion: "Verificar habilitación, higiene, manipulación de alimentos, ventilación y disposición de residuos."
  },

  farmacia_salud: {
    aliases: ["pharmacy", "chemist", "medical", "clinic", "dentist", "doctors", "veterinary"],
    riesgo: "Alto",
    peso: 1.0,
    normativas: [
      "Habilitación comercial CABA",
      "Normativa sanitaria aplicable",
      "Condiciones de almacenamiento",
      "Gestión de residuos especiales o patogénicos si corresponde"
    ],
    recomendacion: "Validar autorización sanitaria, condiciones de expendio, almacenamiento y manejo de residuos especiales."
  },

  supermercado_alimentos: {
    aliases: ["supermarket", "convenience", "greengrocer", "butcher", "deli", "kiosk", "beverages", "alcohol"],
    riesgo: "Medio",
    peso: 0.6,
    normativas: [
      "Habilitación comercial CABA",
      "Manipulación de alimentos",
      "Condiciones bromatológicas",
      "Gestión de residuos",
      "Condiciones edilicias"
    ],
    recomendacion: "Controlar conservación de alimentos, limpieza, circulación interna y disposición de residuos."
  },

  indumentaria_minorista: {
    aliases: ["clothes", "shoes", "boutique", "jewelry", "fashion", "bags", "fabric"],
    riesgo: "Bajo",
    peso: 0.3,
    normativas: [
      "Habilitación comercial CABA",
      "Seguridad edilicia",
      "Condiciones de atención al público"
    ],
    recomendacion: "Verificar habilitación vigente, accesibilidad y condiciones generales del local."
  },

  tecnologia_electronica: {
    aliases: ["electronics", "computer", "mobile_phone", "telecommunication", "appliance"],
    riesgo: "Medio",
    peso: 0.6,
    normativas: [
      "Habilitación comercial CABA",
      "Seguridad eléctrica",
      "Condiciones edilicias",
      "Gestión de residuos electrónicos si corresponde"
    ],
    recomendacion: "Revisar habilitación, seguridad eléctrica y manejo de residuos electrónicos."
  },

  servicios_empresas: {
    aliases: ["company", "office", "administrative", "consulting", "insurance", "estate_agent", "lawyer", "accountant", "travel_agent"],
    riesgo: "Bajo",
    peso: 0.3,
    normativas: [
      "Habilitación comercial CABA",
      "Compatibilidad de uso según actividad económica",
      "Seguridad edilicia",
      "Condiciones de atención al público"
    ],
    recomendacion: "Validar actividad declarada, uso permitido del inmueble, habilitación vigente y condiciones generales de seguridad."
  },

  automotor_talleres: {
    aliases: ["car_repair", "car", "car_parts", "motorcycle", "fuel", "tyres", "vehicle_inspection"],
    riesgo: "Alto",
    peso: 1.0,
    normativas: [
      "Habilitación comercial CABA",
      "Seguridad e higiene",
      "Gestión de residuos peligrosos si corresponde",
      "Condiciones de almacenamiento",
      "Prevención contra incendios"
    ],
    recomendacion: "Revisar residuos, inflamables, ventilación, seguridad contra incendios y habilitación específica."
  },

  belleza_cuidado: {
    aliases: ["hairdresser", "beauty", "cosmetics", "massage", "spa", "tattoo"],
    riesgo: "Medio",
    peso: 0.6,
    normativas: [
      "Habilitación comercial CABA",
      "Condiciones higiénico-sanitarias",
      "Seguridad e higiene",
      "Gestión de residuos"
    ],
    recomendacion: "Controlar higiene, habilitación y condiciones sanitarias del servicio."
  },

  gimnasio_recreacion: {
    aliases: ["gym", "fitness_centre", "sports", "dance", "yoga"],
    riesgo: "Medio",
    peso: 0.6,
    normativas: [
      "Habilitación comercial CABA",
      "Seguridad edilicia",
      "Capacidad máxima",
      "Condiciones de emergencia"
    ],
    recomendacion: "Verificar salidas de emergencia, capacidad máxima, seguros y condiciones de seguridad edilicia."
  },

  educacion_cultura: {
    aliases: ["school", "kindergarten", "language_school", "music_school", "library", "training"],
    riesgo: "Medio",
    peso: 0.6,
    normativas: [
      "Habilitación o autorización correspondiente",
      "Seguridad edilicia",
      "Capacidad máxima",
      "Condiciones de emergencia"
    ],
    recomendacion: "Verificar autorización de funcionamiento, condiciones edilicias y plan de emergencia."
  },

  financiero: {
    aliases: ["bank", "atm", "money_transfer", "bureau_de_change", "finance"],
    riesgo: "Medio",
    peso: 0.6,
    normativas: [
      "Habilitación comercial CABA",
      "Seguridad edilicia",
      "Condiciones de atención al público",
      "Normativa específica de actividad financiera si corresponde"
    ],
    recomendacion: "Validar habilitación, seguridad del local y condiciones de atención al público."
  },

  default: {
    aliases: [],
    riesgo: "Sin clasificar",
    peso: 0.15,
    normativas: [
      "Habilitación comercial CABA",
      "Compatibilidad de uso según actividad económica"
    ],
    recomendacion: "Clasificar el rubro del comercio para asociar normativa específica."
  }
};

function normalizarRubroNormativo(valor) {
  return String(valor || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function obtenerInfoNormativa(props) {
  const valores = [
    props.rubro,
    props.categoria,
    props.tipo,
    props.shop,
    props.office,
    props.amenity,
    props.craft
  ].map(normalizarRubroNormativo).filter(Boolean);

  for (const key in NORMATIVAS_RUBRO) {
    const item = NORMATIVAS_RUBRO[key];
    if (!item.aliases || key === "default") continue;

    const aliasesNormalizados = item.aliases.map(normalizarRubroNormativo);

    if (valores.some(v => aliasesNormalizados.includes(v))) {
      return { grupo: key, ...item };
    }
  }

  return { grupo: "default", ...NORMATIVAS_RUBRO.default };
}

function claseRiesgo(riesgo) {
  const r = normalizarRubroNormativo(riesgo);
  if (r === "alto") return "riesgo-alto";
  if (r === "medio") return "riesgo-medio";
  if (r === "bajo") return "riesgo-bajo";
  return "riesgo-sin-clasificar";
}

function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let map, geojsonData=null, allMarkers=[], markerLayer, currentTile;
let barrioLayer = null;
let sidebarOpen = true;
let selectedNavApp = 'osm';
/* GOOGLE PLACES — activar cuando el backend tenga API Key configurada
let googlePlacesData = [];
let googlePlacesLayer = L.layerGroup();
let showGooglePlaces = false;
*/
let googlePlacesData = [];
let googlePlacesLayer = null;
let showGooglePlaces = false;
let heatmapLayer = null;
let heatmapLegend = null;
let top5Control = null;

const ATT = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://github.com/DenPlus007/ecoomercemap-parque-patricios" target="_blank">GitHub</a>';

const tiles = {
  stadia:  L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
             minZoom:0, maxZoom:16,
             attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, DeLorme, NAVTEQ | <a href="https://github.com/DenPlus007/ecoomercemap-parque-patricios" target="_blank">GitHub</a>'
           }),
  dark:    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
             { maxZoom:19, subdomains:'abcd', attribution: ATT + ' © CARTO' }),
  osm:     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
             { maxZoom:19, subdomains:'abc', attribution: ATT }),
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
             maxZoom:19,
             attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community | <a href="https://github.com/DenPlus007/ecoomercemap-parque-patricios" target="_blank">GitHub</a>'
           })
};

map = L.map('map', { layers:[tiles.stadia], zoomControl:false });
map.setView([-34.63756234066582, -58.40596551597899], 13);
currentTile = tiles.stadia;
L.control.zoom({ position:'topleft' }).addTo(map);
markerLayer = L.layerGroup().addTo(map);

// Load barrio boundary on startup
loadBarrio();

function changeBasemap(n) {
  map.removeLayer(currentTile);
  currentTile = tiles[n];
  map.addLayer(currentTile);
  currentTile.bringToBack();
}

map.on('mousemove', e => {
  document.getElementById('coordsDisplay').textContent =
    `Lat: ${e.latlng.lat.toFixed(6)}   Lng: ${e.latlng.lng.toFixed(6)}`;
});
map.on('mouseout', () => {
  document.getElementById('coordsDisplay').textContent = 'Mover cursor sobre el mapa';
});
map.on('zoomend', () => {
  document.getElementById('zoomDisplay').textContent = map.getZoom();
});
document.getElementById('sidebar').addEventListener('transitionend', () => map.invalidateSize());

// Endpoints alternativos de Overpass API — se prueban en orden
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://z.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
];

// Query simplificada: eliminados tags redundantes (shop=* ya incluye electronics/supermarket/clothes;
// office=* ya incluye company; así es más rápida y liviana)
const OVERPASS_QUERY = `
[out:json][timeout:60];
area["name"="Parque Patricios"]->.searchArea;
(
  node["shop"](area.searchArea);
  way["shop"](area.searchArea);
  node["office"](area.searchArea);
  way["office"](area.searchArea);
  node["amenity"="marketplace"](area.searchArea);
  node["craft"](area.searchArea);
);
out center tags;`.trim();

async function fetchOverpass(query, endpointIdx = 0) {
  if (endpointIdx >= OVERPASS_ENDPOINTS.length) {
    throw new Error('Todos los servidores Overpass fallaron. Intentá de nuevo en unos minutos.');
  }
  const url = OVERPASS_ENDPOINTS[endpointIdx];
  const attempt = endpointIdx + 1;
  const total   = OVERPASS_ENDPOINTS.length;

  document.querySelector('.load-sub').textContent =
    `Intento ${attempt}/${total} · ${url.replace('https://','').split('/')[0]}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 65000); // 65s client timeout
    const res = await fetch(url, {
      method: 'POST',
      body: query,
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    const isTimeout = err.name === 'AbortError' || String(err).includes('504') || String(err).includes('502');
    console.warn(`[EcoMap PP] Endpoint ${url} falló (${err.message}). ${isTimeout ? 'Reintentando…' : ''}`);
    // Espera breve antes de reintentar (backoff: 1s, 2s, 3s)
    await new Promise(r => setTimeout(r, 1000 * attempt));
    return fetchOverpass(query, endpointIdx + 1);
  }
}

async function loadData() {
  document.getElementById('loadingOverlay').classList.add('show');
  document.querySelector('.load-sub').textContent = 'Buscando comercios en Parque Patricios…';
  document.getElementById('btnLoad').disabled = true;
  setStatus('loading','CARGANDO…');

  try {
    const data = await fetchOverpass(OVERPASS_QUERY);
    processData(data.elements);
    setStatus('ok', `✓ ${data.elements.length} REGISTROS`);
  } catch(err) {
    setStatus('error','ERROR');
    alert('No se pudo consultar Overpass API.\n\n' + err.message);
  }

  document.getElementById('loadingOverlay').classList.remove('show');
  document.querySelector('.load-sub').textContent = 'Buscando comercios en Parque Patricios…';
  document.getElementById('btnLoad').disabled = false;
}

function setStatus(cls,txt){ const e=document.getElementById('statusBadge'); e.className=cls; e.textContent=txt; }

function setNavApp(app) {
  if (!app) return;
  selectedNavApp = app;
  document.querySelector('input[name="navapp"][value="' + app + '"]').checked = true;
  document.getElementById('navAppSelect').value = app;
  
  // Actualizar etiqueta de comercios
  const labels = {
    osm: { icon: '📌', text: 'OSM', color: '#3d8bff' },
    waze: { icon: '📌', text: 'Waze', color: '#ffd93d' },
    gmaps: { icon: '📌', text: 'Google Maps', color: '#00e096' }
  };
  
  document.getElementById('comerciosIcon').textContent = labels[app].icon;
  document.getElementById('comerciosIcon').style.color = labels[app].color;
  document.getElementById('comerciosSource').textContent = labels[app].text;
  
  // Regenerar marcadores con nuevos colores
  if (geojsonData && geojsonData.features.length > 0) {
    markerLayer.clearLayers();
    allMarkers = [];
    geojsonData.features.forEach(feature => {
      const props = feature.properties;
      const [lon, lat] = feature.geometry.coordinates;
      createAndAddMarker(props, lat, lon);
    });
    updateLegend();
  }
}

function processData(elements) {
  geojsonData = { type:'FeatureCollection', features:[] };
  markerLayer.clearLayers(); allMarkers=[];
  elements.forEach(el=>{
    let lat=el.lat, lon=el.lon;
    if(!lat&&el.center){ lat=el.center.lat; lon=el.center.lon; }
    if(!lat||!lon) return;
    const t=el.tags||{};
    const categoria = t.shop||t.office||t.amenity||t.craft||'Sin categoria';
    const props = {
      id: el.id,
      osm_type: el.type,
      nombre: t.name || 'Sin nombre',
      categoria,
      rubro: t.shop || t.office || t.amenity || t.craft || '',
      shop: t.shop || '',
      office: t.office || '',
      amenity: t.amenity || '',
      craft: t.craft || '',
      direccion: (`${t['addr:street'] || ''} ${t['addr:housenumber'] || ''}`).trim(),
      telefono: t.phone || '',
      website: t.website || '',
      email: t.email || '',
      horarios: t.opening_hours || '',
      fuente: 'OpenStreetMap',
      lat: +lat.toFixed(6),
      lon: +lon.toFixed(6)
    };
    geojsonData.features.push({ type:'Feature', properties:props, geometry:{ type:'Point', coordinates:[lon,lat] } });
    createAndAddMarker(props, lat, lon);
  });
  updateStats(); updateLegend();
  actualizarHeatmapSiEstaActivo();
  actualizarTop5SiEstaActivo();
  document.getElementById('filterInput').value='';
  document.getElementById('filterCount').textContent='';
}

function createAndAddMarker(props, lat, lon) {
  // Determinar el color según la app seleccionada y la categoría
  let col = CAT_COLORS[props.categoria] || CAT_COLORS['Sin categoria'];
  
  // Aplicar colores según app seleccionada
  if (selectedNavApp === 'waze') {
    col = '#ffd93d'; // Amarillo
  } else if (selectedNavApp === 'gmaps') {
    col = '#00e096'; // Verde
  }
  // Para osm, usar el color original de la categoría
  
  const ico = CAT_ICONS[props.categoria] || '📍';
  const customIcon = L.icon({
    iconUrl: 'img/comercios.png',
    iconSize:    [36, 36],
    iconAnchor:  [18, 36],
    popupAnchor: [0, -38]
  });
  const marker = L.marker([lat,lon],{ icon:customIcon });

  marker.bindTooltip(`
    <div style="font-family:'Space Mono',monospace;font-size:10px;
      background:#0a0c14;border:1px solid ${col}66;
      border-radius:8px;padding:8px 12px;
      box-shadow:0 4px 20px rgba(0,0,0,.8),0 0 0 1px ${col}22;">
      <div style="font-family:'Outfit',sans-serif;color:#e8eeff;font-size:12px;font-weight:600;margin-bottom:5px;">${props.nombre}</div>
      <div style="color:${col};">${ico} ${props.categoria.toUpperCase()}</div>
      ${props.direccion?`<div style="color:#6b7ba4;font-size:9px;margin-top:3px;">📍 ${props.direccion}</div>`:''}
      <div style="color:${col};margin-top:5px;font-size:9px;opacity:.9;">
        ${lat.toFixed(5)}, ${lon.toFixed(5)}
      </div>
    </div>
  `,{ className:'', sticky:false, direction:'top', offset:[0,-4] });

  marker.bindPopup(buildPopup(props, lat, lon), { maxWidth:300, className:'' });
  markerLayer.addLayer(marker);
  allMarkers.push({ marker, props });
}

function buildPopup(p, lat, lon) {
  const ico = CAT_ICONS[p.categoria] || '📍';
  const col = CAT_COLORS[p.categoria] || '#4a5578';

  const infoNormativa = obtenerInfoNormativa(p);
  const riesgoClass = claseRiesgo(infoNormativa.riesgo);

  const listaNormativas = infoNormativa.normativas
    .map(n => `<li>${escaparHTML(n)}</li>`)
    .join("");

  const row = (icon, val, link) => val ? `
    <div class="pop-row">
      <span class="pop-ico">${icon}</span>
      <span class="pop-val">
        ${link ? `<a href="${escaparHTML(val)}" target="_blank">${escaparHTML(String(val).length > 34 ? String(val).slice(0,34) + '…' : val)}</a>` : escaparHTML(val)}
      </span>
    </div>` : '';

  return `
  <div class="pop-wrap">
    <div class="pop-head" style="border-left:3px solid ${col}">
      <div class="pop-name">${escaparHTML(p.nombre)}</div>
      <div class="pop-cat">${ico} ${escaparHTML(p.categoria)}${p.rubro && p.rubro !== p.categoria ? ' · ' + escaparHTML(p.rubro) : ''}</div>
    </div>

    <div class="pop-body">
      ${row('📍', p.direccion, false)}
      ${row('📞', p.telefono, false)}
      ${row('🌐', p.website, true)}
      ${row('✉️', p.email, false)}
      ${row('🕐', p.horarios, false)}

      <hr class="pop-sep">

      <div class="norm-box">
        <div class="norm-title">⚖️ Información normativa</div>

        <div class="norm-row">
          <b>Grupo:</b> ${escaparHTML(infoNormativa.grupo)}
        </div>

        <div class="norm-row">
          <b>Riesgo regulatorio:</b>
          <span class="riesgo ${riesgoClass}">
            ${escaparHTML(infoNormativa.riesgo)}
          </span>
        </div>

        <div class="norm-subtitle">Normativa aplicable:</div>
        <ul class="norm-list">
          ${listaNormativas}
        </ul>

        <div class="norm-rec">
          <b>Recomendación:</b><br>
          ${escaparHTML(infoNormativa.recomendacion)}
        </div>
      </div>

      <div class="pop-row">
        <span class="pop-ico">🔗</span>
        <span class="pop-val">
          <a href="https://www.openstreetmap.org/${p.osm_type || 'node'}/${p.id}" target="_blank">Ver en OSM</a>
        </span>
      </div>
    </div>

    <div class="pop-nav">
      <a class="nav-btn gmaps"
        href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}"
        target="_blank">Google Maps</a>

      <a class="nav-btn waze"
        href="https://waze.com/ul?ll=${lat},${lon}&navigate=yes"
        target="_blank">Waze</a>

      <a class="nav-btn osm-dir"
        href="https://www.openstreetmap.org/directions?to=${lat},${lon}"
        target="_blank">OSM Dir</a>
    </div>

    <div class="pop-coords">WGS84 · Lat ${lat.toFixed(6)} · Lng ${lon.toFixed(6)}</div>
  </div>`;
}

function pct(a,b){ return b?Math.round(a/b*100):0; }
function updateStats(){
  const fs=geojsonData.features, n=fs.length;
  const named=fs.filter(f=>f.properties.nombre!=='Sin nombre').length;
  const web  =fs.filter(f=>f.properties.website).length;
  const hrs  =fs.filter(f=>f.properties.horarios).length;
  const cats =new Set(fs.map(f=>f.properties.categoria)).size;
  
  /* GOOGLE PLACES stats — descomentar con el backend activo
  let totalPoints = n;
  let sourceInfo = `OSM: ${n}`;
  if (showGooglePlaces && googlePlacesData.length > 0) {
    totalPoints = n + googlePlacesData.length;
    sourceInfo = `OSM: ${n} + Google: ${googlePlacesData.length}`;
  }
  document.getElementById('stTotal').textContent = totalPoints + (sourceInfo !== `OSM: ${n}` ? ` (${sourceInfo})` : '');
  */
  document.getElementById('stTotal').textContent = n;
  document.getElementById('stNamed').textContent = `${named} (${pct(named,n)}%)`;
  document.getElementById('stWeb').textContent   = `${web} (${pct(web,n)}%)`;
  document.getElementById('stHours').textContent = `${hrs} (${pct(hrs,n)}%)`;
  document.getElementById('stCats').textContent  = cats;
}

function updateLegend(){
  if (!geojsonData || !geojsonData.features) {
    document.getElementById('legendBox').innerHTML = '<div style="font-size:11px;color:var(--muted)">Sin datos cargados</div>';
    return;
  }
  const cats={};
  geojsonData.features.forEach(f=>{ const c=f.properties.categoria; cats[c]=(cats[c]||0)+1; });
  let legendHtml = Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([cat,n])=>`
    <div class="leg-item">
      <div class="leg-dot" style="background:${CAT_COLORS[cat]||'#4a5578'};box-shadow:0 0 6px ${CAT_COLORS[cat]||'#4a5578'}66;"></div>
      <span>${CAT_ICONS[cat]||'📍'} ${cat}</span>
      <span class="leg-count">${n}</span>
    </div>`).join('');
  
  /* GOOGLE PLACES leyenda — descomentar con el backend activo
  if (showGooglePlaces && googlePlacesData.length > 0) {
    legendHtml += `
      <div class="leg-item">
        <div class="leg-dot" style="background:#4285F4;box-shadow:0 0 6px #4285F466;"></div>
        <span>📍 Google Places</span>
        <span class="leg-count">${googlePlacesData.length}</span>
      </div>`;
  }
  */
  
  document.getElementById('legendBox').innerHTML = legendHtml;
}

function filterMarkers(q){
  q=q.toLowerCase().trim(); let vis=0;
  allMarkers.forEach(({marker,props})=>{
    const ok=!q||props.nombre.toLowerCase().includes(q)
              ||props.categoria.toLowerCase().includes(q)
              ||props.rubro.toLowerCase().includes(q)
              ||props.direccion.toLowerCase().includes(q);
    if(ok){ markerLayer.addLayer(marker); vis++; }
    else  { markerLayer.removeLayer(marker); }
  });
  document.getElementById('filterCount').textContent =
    q?`${vis} resultado${vis!==1?'s':''} de ${allMarkers.length}`:'';
}

function downloadGeoJSON(){
  if(!geojsonData){ alert('Primero cargá los datos'); return; }
  dl(new Blob([JSON.stringify(geojsonData,null,2)],{type:'application/json'}),'ecommerce_parque_patricios.geojson');
}
function downloadCSV(){
  if(!geojsonData){ alert('Primero cargá los datos'); return; }
  const cols=['id','nombre','categoria','rubro','direccion','telefono','website','email','horarios','lat','lon','fuente'];
  const rows=geojsonData.features.map(f=>cols.map(c=>`"${String(f.properties[c]||'').replace(/"/g,'""')}"`).join(','));
  dl(new Blob([[cols.join(','),...rows].join('\n')],{type:'text/csv;charset=utf-8;'}),'ecommerce_parque_patricios.csv');
}
function dl(blob,name){
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}


// ── GRÁFICO DE SANCIONES REGULATORIAS CABA ─────────────────────────
let sancionesControl = null;

/*
  Datos basados en Código de Habilitaciones CABA (Ley 2553),
  Código Contravencional y normativa de AGIP / DGFYC.
  Unidad: UF (Unidad Fija CABA — referencia ~$12.000 ARS c/u, sujeta a actualización).
*/
const SANCIONES_DATA = [
  {
    nivel:    'Bajo',
    color:    '#16a34a',
    colorBg:  '#16a34a22',
    ufMin:    10,
    ufMax:    100,
    ufLabel:  '10 – 100 UF',
    aproxARS: '~$120.000 – $1.200.000 ARS',
    tipos: [
      { icon:'⚠️', label:'Apercibimiento',          aplica: true  },
      { icon:'💰', label:'Multa leve',               aplica: true  },
      { icon:'🔒', label:'Clausura temporal',        aplica: false },
      { icon:'🚫', label:'Clausura definitiva',      aplica: false },
      { icon:'📋', label:'Inhabilitación',           aplica: false },
    ],
    nota: 'Incumplimientos menores: falta de cartel, vencimiento de habilitación leve, documentación incompleta.'
  },
  {
    nivel:    'Medio',
    color:    '#f59e0b',
    colorBg:  '#f59e0b22',
    ufMin:    100,
    ufMax:    1000,
    ufLabel:  '100 – 1.000 UF',
    aproxARS: '~$1.200.000 – $12.000.000 ARS',
    tipos: [
      { icon:'⚠️', label:'Apercibimiento',          aplica: true  },
      { icon:'💰', label:'Multa moderada',           aplica: true  },
      { icon:'🔒', label:'Clausura temporal 1-30d',  aplica: true  },
      { icon:'🚫', label:'Clausura definitiva',      aplica: false },
      { icon:'📋', label:'Inhabilitación',           aplica: false },
    ],
    nota: 'Bromatología, condiciones edilicias, falta de habilitación sanitaria, incumplimiento de normas de seguridad.'
  },
  {
    nivel:    'Alto',
    color:    '#dc2626',
    colorBg:  '#dc262622',
    ufMin:    1000,
    ufMax:    10000,
    ufLabel:  '1.000 – 10.000 UF',
    aproxARS: '~$12.000.000 – $120.000.000 ARS',
    tipos: [
      { icon:'⚠️', label:'Apercibimiento',          aplica: true  },
      { icon:'💰', label:'Multa grave',              aplica: true  },
      { icon:'🔒', label:'Clausura temporal 30-90d', aplica: true  },
      { icon:'🚫', label:'Clausura definitiva',      aplica: true  },
      { icon:'📋', label:'Inhabilitación',           aplica: true  },
    ],
    nota: 'Riesgos sanitarios, peligro de incendio, residuos peligrosos, farmacia sin autorización, talleres mecánicos sin habilitación.'
  }
];

function toggleSancionesLayer(on) {
  if (on) {
    crearSancionesControl();
  } else {
    if (sancionesControl) {
      map.removeControl(sancionesControl);
      sancionesControl = null;
    }
  }
}

function crearSancionesControl() {
  if (sancionesControl) {
    map.removeControl(sancionesControl);
    sancionesControl = null;
  }

  sancionesControl = L.control({ position: 'bottomright' });

  sancionesControl.onAdd = function () {
    const div = L.DomUtil.create('div', 'sanciones-panel');
    div.innerHTML = generarSancionesHTML();
    L.DomEvent.disableClickPropagation(div);
    L.DomEvent.disableScrollPropagation(div);
    return div;
  };

  sancionesControl.addTo(map);
}

function generarSancionesHTML() {
  const maxUF = 10000;

  const filas = SANCIONES_DATA.map(d => {
    const wMin = Math.round((Math.log10(d.ufMin) / Math.log10(maxUF)) * 100);
    const wMax = Math.round((Math.log10(d.ufMax) / Math.log10(maxUF)) * 100);

    // Solo pills que aplican
    const pills = d.tipos
      .filter(t => t.aplica)
      .map(t => `<span class="sanc-pill-on" style="border-color:${d.color}55;color:${d.color}">${t.icon} ${t.label}</span>`)
      .join('');

    return `
      <div class="sanc-row">
        <div class="sanc-header">
          <span class="sanc-nivel" style="color:${d.color}">${d.nivel}</span>
          <span class="sanc-uf" style="color:${d.color}">${d.ufLabel} UF</span>
        </div>
        <div class="sanc-bar-track">
          <div class="sanc-bar-range" style="left:${wMin}%;width:${wMax-wMin}%;background:linear-gradient(90deg,${d.color}44,${d.color});"></div>
          <div class="sanc-bar-dot" style="left:${wMin}%;background:${d.color}88;"></div>
          <div class="sanc-bar-dot" style="left:${wMax}%;background:${d.color};box-shadow:0 0 5px ${d.color};"></div>
        </div>
        <div class="sanc-pills">${pills}</div>
      </div>`;
  }).join('');

  return `
    <div class="sanc-title">⚖️ Sanciones · CABA</div>
    <div class="sanc-scale-labels">
      <span>10</span><span>100</span><span>1k</span><span>10k UF</span>
    </div>
    <div class="sanc-scale-track"><div class="sanc-scale-grad"></div></div>
    ${filas}
    <div class="sanc-footer">Ley 2553 · DGFYC · 1 UF ≈ $12.000 ARS</div>`;
}

// ── BARRIO BOUNDARY ─────────────────────────────────
async function loadBarrio() {
  const query = `[out:json][timeout:30];
relation["name"="Parque Patricios"]["boundary"="administrative"];
out geom;`.trim();
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', { method:'POST', body:query });
    const data = await res.json();
    if (!data.elements.length) { console.warn('Límite no encontrado'); return; }
    const rel = data.elements[0];
    const outerWays = rel.members
      .filter(m => m.type === 'way' && (m.role === 'outer' || m.role === ''))
      .filter(m => m.geometry && m.geometry.length > 0)
      .map(m => m.geometry.map(pt => [pt.lon, pt.lat]));
    if (!outerWays.length) return;
    const ring = connectRings(outerWays);
    const geojson = {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [ring] },
      properties: { nombre: 'Parque Patricios' }
    };
    barrioLayer = L.geoJSON(geojson, {
      style: {
        color: '#ff00ff', weight: 2.5, opacity: 0.9,
        fillColor: '#ff00ff', fillOpacity: 0,
        dashArray: '6 4', lineCap: 'round'
      }
    }).addTo(map);
    barrioLayer.bindTooltip(
      `<div style="font-family:'Space Mono',monospace;font-size:10px;background:#0a0c14;border:1px solid #ff00ff66;border-radius:6px;padding:6px 10px;color:#ff00ff;">🟣 Parque Patricios</div>`,
      { sticky:true, className:'', direction:'top' }
    );
    console.log('[EcoMap PP] Límite de barrio cargado OK');
  } catch(err) {
    console.error('[EcoMap PP] Error cargando límite:', err);
  }
}

function connectRings(ways) {
  if (ways.length === 1) return ways[0];
  const result = [...ways[0]];
  const remaining = ways.slice(1);
  while (remaining.length > 0) {
    const tail = result[result.length - 1];
    let bestIdx=0, reversed=false, bestD=Infinity;
    remaining.forEach((w,i) => {
      const d1 = Math.hypot(tail[0]-w[0][0], tail[1]-w[0][1]);
      const d2 = Math.hypot(tail[0]-w[w.length-1][0], tail[1]-w[w.length-1][1]);
      if (d1 < bestD) { bestD=d1; bestIdx=i; reversed=false; }
      if (d2 < bestD) { bestD=d2; bestIdx=i; reversed=true;  }
    });
    const seg = remaining.splice(bestIdx,1)[0];
    result.push(...(reversed ? [...seg].reverse() : seg));
  }
  return result;
}

function toggleBarrioLayer(on) {
  if (!barrioLayer) return;
  if (on) map.addLayer(barrioLayer);
  else    map.removeLayer(barrioLayer);
}

function toggleComercioLayer(on) {
  if (on) map.addLayer(markerLayer);
  else    map.removeLayer(markerLayer);
}

/* GOOGLE PLACES functions — descomentar cuando el backend esté configurado
function toggleGooglePlacesLayer(on) {
  showGooglePlaces = on;
  if (on) {
    if (googlePlacesData.length === 0) {
      loadGooglePlaces();
    } else {
      map.addLayer(googlePlacesLayer);
      updateLegend();
      updateStats();
    }
  } else {
    map.removeLayer(googlePlacesLayer);
    updateLegend();
    updateStats();
  }
}


async function loadGooglePlaces() { /* ACTIVAR CON BACKEND */
  alert("Google Places requiere configurar GOOGLE_PLACES_API_KEY en .env y correr node server.js"); }
/* CÓDIGO ORIGINAL loadGooglePlaces — {
  setStatus('loading', 'CONSULTANDO GOOGLE PLACES…');

  try {
    const lat = -34.63756234066582;
    const lon = -58.40596551597899;
    const radius = 2000;

    const response = await fetch(`/api/google-places?lat=${lat}&lon=${lon}&radius=${radius}`);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || 'Error consultando backend Google Places');
    }

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(data.error_message || 'Error Google Places: ' + data.status);
    }

    googlePlacesData = data.results || [];
    googlePlacesLayer.clearLayers();

    googlePlacesData.forEach(place => {
      const lat = place.geometry.location.lat;
      const lon = place.geometry.location.lng;

      const customIcon = L.icon({
        iconUrl: 'img/comercios.png',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -38]
      });

      const marker = L.marker([lat, lon], { icon: customIcon });

      marker.bindPopup(`
        <div class="pop-wrap">
          <div class="pop-head" style="border-left:3px solid #4285F4">
            <div class="pop-name">${escaparHTML(place.name || 'Google Place')}</div>
            <div class="pop-cat" style="color:#4285F4;">📍 Google Places</div>
          </div>
          <div class="pop-body">
            <div class="pop-row"><span class="pop-ico">📍</span><span class="pop-val">${escaparHTML(place.vicinity || 'N/A')}</span></div>
            ${place.rating ? `<div class="pop-row"><span class="pop-ico">⭐</span><span class="pop-val">${place.rating} (${place.user_ratings_total || 0} reviews)</span></div>` : ''}
            ${place.opening_hours ? `<div class="pop-row"><span class="pop-ico">🕐</span><span class="pop-val">${place.opening_hours.open_now ? '✅ ABIERTO' : '❌ CERRADO'}</span></div>` : ''}
          </div>
          <div class="pop-coords">WGS84 · Lat ${lat.toFixed(6)} · Lng ${lon.toFixed(6)}</div>
        </div>
      `, { maxWidth: 300, className: '' });

      googlePlacesLayer.addLayer(marker);
    });

    map.addLayer(googlePlacesLayer);
    setStatus('ok', `✓ ${googlePlacesData.length} desde Google Places`);
    updateLegend();
    updateStats();

  } catch(err) {
    setStatus('error', 'ERROR Google Places');
    alert('Error cargando Google Places:\n' + err.message);
    document.getElementById('toggleGooglePlaces').checked = false;
    showGooglePlaces = false;
  }
}

*/

// ── MAPA DE CALOR DE RIESGO REGULATORIO ─────────────────────────────
function generarHeatmapRiesgo() {
  if (!geojsonData || !geojsonData.features.length) return;

  const puntos = geojsonData.features.map(feature => {
    const props = feature.properties;
    const [lon, lat] = feature.geometry.coordinates;

    const info = obtenerInfoNormativa(props);
    const peso = info.peso || 0.15;

    return [lat, lon, peso];
  });

  if (heatmapLayer && map.hasLayer(heatmapLayer)) {
    map.removeLayer(heatmapLayer);
  }

  heatmapLayer = L.heatLayer(puntos, {
    radius: 35,
    blur: 28,
    maxZoom: 17,
    minOpacity: 0.35,
    max: 1.0
  });
}

function crearLeyendaRiesgoRegulatorio() {
  if (heatmapLegend) {
    map.removeControl(heatmapLegend);
  }

  heatmapLegend = L.control({ position: "bottomright" });

  heatmapLegend.onAdd = function () {
    const div = L.DomUtil.create("div", "heatmap-legend");

    div.innerHTML = `
      <div class="heatmap-title">🔥 Riesgo Regulatorio</div>
      <div class="heatmap-gradient"></div>

      <div class="heatmap-scale">
        <span>Bajo</span>
        <span>Medio</span>
        <span>Alto</span>
      </div>

      <div class="heatmap-values">
        <span>0.3</span>
        <span>0.6</span>
        <span>1.0</span>
      </div>
    `;

    return div;
  };

  heatmapLegend.addTo(map);
}

function quitarLeyendaRiesgoRegulatorio() {
  if (heatmapLegend) {
    map.removeControl(heatmapLegend);
    heatmapLegend = null;
  }
}

function toggleHeatmapLayer(on) {
  if (on) {
    if (!geojsonData || !geojsonData.features.length) {
      alert("Primero cargá los comercios con el botón CONSULTAR.");
      document.getElementById("toggleHeatmap").checked = false;
      quitarLeyendaRiesgoRegulatorio();
      return;
    }

    generarHeatmapRiesgo();
    if (heatmapLayer) heatmapLayer.addTo(map);
    crearLeyendaRiesgoRegulatorio();
  } else {
    if (heatmapLayer && map.hasLayer(heatmapLayer)) {
      map.removeLayer(heatmapLayer);
    }
    quitarLeyendaRiesgoRegulatorio();
  }
}

function actualizarHeatmapSiEstaActivo() {
  const toggle = document.getElementById("toggleHeatmap");
  if (!toggle || !toggle.checked) return;

  generarHeatmapRiesgo();
  if (heatmapLayer) heatmapLayer.addTo(map);
  crearLeyendaRiesgoRegulatorio();
}


// ── TOP 5 CATEGORÍAS CON MAYOR RIESGO REGULATORIO ──────────────────
const RIESGO_COLORS = {
  'Alto':           '#dc2626',
  'Medio':          '#f59e0b',
  'Bajo':           '#16a34a',
  'Sin clasificar': '#6b7280'
};

// Nombres legibles por grupo de normativa
const GRUPO_LABELS = {
  gastronomia:           'Gastronomía',
  farmacia_salud:        'Farmacia / Salud',
  supermercado_alimentos:'Supermercado / Alimentos',
  indumentaria_minorista:'Indumentaria / Moda',
  tecnologia_electronica:'Tecnología / Electrónica',
  servicios_empresas:    'Servicios / Oficinas',
  automotor_talleres:    'Automotor / Talleres',
  belleza_cuidado:       'Belleza / Cuidado',
  gimnasio_recreacion:   'Gimnasio / Recreación',
  educacion_cultura:     'Educación / Cultura',
  financiero:            'Financiero / Bancos',
  default:               'Sin clasificar'
};

function crearTop5RiesgoControl() {
  if (top5Control) {
    map.removeControl(top5Control);
    top5Control = null;
  }
  if (!geojsonData || !geojsonData.features.length) return;

  top5Control = L.control({ position: 'bottomleft' });
  top5Control.onAdd = function () {
    const div = L.DomUtil.create('div', 'top5-riesgo');
    div.innerHTML = generarTop5HTML();
    L.DomEvent.disableClickPropagation(div);
    L.DomEvent.disableScrollPropagation(div);
    return div;
  };
  top5Control.addTo(map);
}

function toggleTop5Layer(on) {
  if (on) {
    if (!geojsonData || !geojsonData.features.length) {
      alert('Primero cargá los comercios con el botón CONSULTAR.');
      document.getElementById('toggleTop5').checked = false;
      return;
    }
    crearTop5RiesgoControl();
  } else {
    if (top5Control) {
      map.removeControl(top5Control);
      top5Control = null;
    }
  }
}

function actualizarTop5SiEstaActivo() {
  const toggle = document.getElementById('toggleTop5');
  if (!toggle || !toggle.checked) return;
  crearTop5RiesgoControl();
}

function generarTop5HTML() {
  // Contar comercios por grupo normativo
  const grupoCounts = {};
  const grupoMeta   = {};

  geojsonData.features.forEach(feature => {
    const info  = obtenerInfoNormativa(feature.properties);
    const grupo = info.grupo;
    if (!grupoCounts[grupo]) {
      grupoCounts[grupo] = 0;
      grupoMeta[grupo]   = { riesgo: info.riesgo, peso: info.peso };
    }
    grupoCounts[grupo]++;
  });

  // Ordenar: primero por peso (riesgo) desc, luego por cantidad desc
  const sorted = Object.entries(grupoCounts)
    .map(([grupo, count]) => ({
      grupo,
      count,
      riesgo: grupoMeta[grupo].riesgo,
      peso:   grupoMeta[grupo].peso
    }))
    .sort((a, b) => b.peso - a.peso || b.count - a.count)
    .slice(0, 5);

  // Valor máximo para la barra proporcional
  const maxCount = Math.max(...sorted.map(i => i.count), 1);

  const medals = ['🥇','🥈','🥉','4','5'];

  const rows = sorted.map((item, i) => {
    const col   = RIESGO_COLORS[item.riesgo] || '#6b7280';
    const label = GRUPO_LABELS[item.grupo]   || item.grupo.replace(/_/g,' ');
    const barW  = Math.round((item.count / maxCount) * 100);

    return `
      <div class="top5-row">
        <div class="top5-rank">${medals[i]}</div>
        <div class="top5-info">
          <div class="top5-nombre" title="${label}">${label}</div>
          <div class="top5-meta">
            <span class="riesgo ${claseRiesgo(item.riesgo)}">${item.riesgo}</span>
            <span class="top5-count">${item.count} comercio${item.count !== 1 ? 's' : ''}</span>
          </div>
          <div class="top5-bar-wrap">
            <div class="top5-bar" style="width:${barW}%;background:${col};"></div>
          </div>
        </div>
        <div class="top5-peso" style="color:${col}">${item.peso.toFixed(1)}</div>
      </div>`;
  }).join('');

  return `
    <div class="top5-title">📊 Top 5 · Riesgo Regulatorio</div>
    ${rows}
  `;
}


// ── MOBILE MENU ──────────────────────────────────────
function isMobile() {
  return window.innerWidth <= 768;
}

function toggleMobileMenu() {
  const sb  = document.getElementById('sidebar');
  const ov  = document.getElementById('sidebarOverlay');
  const isOpen = sb.classList.contains('mobile-open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    sb.classList.add('mobile-open');
    ov.classList.add('show');
  }
}

function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

// En mobile, los paneles flotantes van todos abajo a la izquierda para no solaparse
function adjustPanelsMobile() {
  if (!isMobile()) return;
  if (top5Control)       top5Control.setPosition('bottomleft');
  if (sancionesControl)  sancionesControl.setPosition('bottomleft');
  if (heatmapLegend)     heatmapLegend.setPosition('bottomleft');
}

window.addEventListener('resize', () => {
  map.invalidateSize();
  adjustPanelsMobile();
});

function toggleSidebar(){
  if (isMobile()) {
    closeMobileMenu();
    return;
  }
  sidebarOpen=!sidebarOpen;
  document.getElementById('sidebar').classList.toggle('collapsed',!sidebarOpen);
  document.getElementById('sbIcon').textContent=sidebarOpen?'◀':'▶';
}
