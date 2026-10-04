/*
 * Brondata BonaireKerkkiezer
 * ---------------------------
 * Dit bestand bevat alle kerken en diensten. Pas het gerust aan; de website
 * leest het automatisch in. Velden:
 *
 *   id            unieke sleutel (kleine letters, geen spaties)
 *   name          naam van de kerk/gemeente
 *   denomination  sleutel uit DENOMINATIONS (zie onder)
 *   place         sleutel uit PLACES (zie onder)
 *   address       adres zoals lokaal gebruikt
 *   lat, lng      coördinaten (indicatief, voor de kaart)
 *   phone, website, facebook, email   contactgegevens (optioneel)
 *   translation   talen waarin op verzoek vertaald kan worden (optioneel)
 *   services      lijst met diensten:
 *       day       0=zondag, 1=maandag, ... 6=zaterdag
 *       time      "HH:MM" (24-uurs) of null als de tijd onbekend is
 *       langs     talen van de dienst: "pap", "nl", "en", "es"
 *       type      "service" (eredienst), "mass" (mis), "prayer" (gebed/bijbelstudie), "kids" (kinderen)
 *   note          extra opmerking: { nl, en, pap } (of alleen een tekst)
 *   sources       waar de gegevens vandaan komen
 *
 * Gegevens verzameld oktober 2026 uit openbare bronnen. Tijden kunnen wijzigen;
 * neem bij twijfel contact op met de kerk.
 */

window.LAST_CHECKED = "2026-10-04";

window.DENOMINATIONS = {
  catholic:    { color: "#b4232a" },
  protestant:  { color: "#1f5fa8" },
  evangelical: { color: "#2e8b57" },
  adventist:   { color: "#7b4ea3" },
  newapostolic:{ color: "#0f8a8a" }
};

window.PLACES = ["kralendijk", "antriol", "nikiboko", "noordsalina", "terakora", "hato", "rincon"];

window.CHURCHES = [
  {
    id: "san-bernardo",
    name: "Parokia San Bernardo (Sint-Bernarduskerk)",
    denomination: "catholic",
    place: "kralendijk",
    address: "Plasa Reina Juliana 2, Kralendijk",
    lat: 12.1528, lng: -68.2732,
    services: [
      { day: 0, time: "09:00", langs: ["pap"], type: "mass" },
      { day: 0, time: "19:00", langs: ["pap"], type: "mass" },
      { day: 1, time: "19:00", langs: ["pap"], type: "mass" },
      { day: 3, time: "19:00", langs: ["pap"], type: "mass" },
      { day: 5, time: "19:00", langs: ["pap"], type: "mass" },
      { day: 6, time: "19:00", langs: ["pap"], type: "mass" }
    ],
    note: {
      nl: "Monumentale hoofdkerk van Kralendijk.",
      en: "Historic main church of Kralendijk.",
      pap: "Misa prinsipal monumental di Kralendijk."
    },
    sources: [
      "https://infobonaire.com/moving-living-bonaire/religion-churches-bonaire/",
      "https://nl.wikipedia.org/wiki/Sint-Bernarduskerk_(Bonaire)"
    ]
  },
  {
    id: "coromoto",
    name: "Parokia La Birgen di Coromoto",
    denomination: "catholic",
    place: "antriol",
    address: "Kaya Korona 126, Antriol",
    lat: 12.1706, lng: -68.2707,
    phone: "+599 717-4211",
    services: [
      { day: 6, time: "18:00", langs: ["en"], type: "mass" },
      { day: 0, time: "09:00", langs: ["pap"], type: "mass" },
      { day: 0, time: "18:00", langs: ["pap"], type: "mass" }
    ],
    note: {
      nl: "Engelstalige mis op zaterdagavond.",
      en: "English Mass on Saturday evening.",
      pap: "Misa na ingles djasabra anochi."
    },
    sources: [
      "https://infobonaire.com/moving-living-bonaire/religion-churches-bonaire/",
      "https://gcatholic.org/churches/caribbean/15566.htm"
    ]
  },
  {
    id: "san-luis-beltran",
    name: "Parokia San Luis Beltran",
    denomination: "catholic",
    place: "rincon",
    address: "Kaya Rincon 48, Rincon",
    lat: 12.2385, lng: -68.3303,
    facebook: "https://www.facebook.com/p/Parokia-San-Luis-Beltran-100064544808949/",
    services: [
      { day: 0, time: "06:00", langs: ["pap"], type: "mass" },
      { day: 0, time: "09:00", langs: ["pap"], type: "mass" },
      { day: 0, time: "19:30", langs: ["pap"], type: "mass" },
      { day: 1, time: "19:30", langs: ["pap"], type: "mass" },
      { day: 3, time: "19:30", langs: ["pap"], type: "mass" }
    ],
    note: {
      nl: "Oudste kerk van Bonaire.",
      en: "Oldest church on Bonaire.",
      pap: "Misa mas bieu di Boneiru."
    },
    sources: [
      "https://www.facebook.com/p/Parokia-San-Luis-Beltran-100064544808949/",
      "https://gcatholic.org/churches/caribbean/15568"
    ]
  },
  {
    id: "vpg-kralendijk",
    name: "Verenigde Protestantse Gemeente – Kralendijk",
    denomination: "protestant",
    place: "kralendijk",
    address: "Plasa Reina Wilhelmina 1, Kralendijk",
    lat: 12.1498, lng: -68.2766,
    phone: "+599 717-8086",
    website: "https://protestantsegemeentebonaire.com/",
    translation: ["en", "pap"],
    services: [
      { day: 0, time: "10:00", langs: ["nl", "pap"], type: "service" }
    ],
    note: {
      nl: "Monumentaal 'kerkje van de koning' aan het Wilhelminaplein. Dienst grotendeels Nederlandstalig, meertalige elementen.",
      en: "Historic 'King's church' on Wilhelmina Square. Service mostly in Dutch, with multilingual elements.",
      pap: "'Misa di rei' monumental na Plasa Wilhelmina. Sirbishi mayoria na hulandes, ku elementonan den otro idioma."
    },
    sources: [
      "https://bonairevakantieland.nl/thema-artikelen-over-bonaire/kerkdiensten-op-bonaire/",
      "https://protestantsegemeentebonaire.com/"
    ]
  },
  {
    id: "vpg-rincon",
    name: "Verenigde Protestantse Gemeente – Rincon",
    denomination: "protestant",
    place: "rincon",
    address: "Rincon",
    lat: 12.2381, lng: -68.3322,
    phone: "+599 717-8086",
    website: "https://protestantsegemeentebonaire.com/",
    services: [
      { day: 0, time: "08:00", langs: ["pap"], type: "service" }
    ],
    note: {
      nl: "Sommige bronnen noemen 08:30 als aanvangstijd.",
      en: "Some sources give 08:30 as the start time.",
      pap: "Algun fuente ta duna 08:30 komo ora di kuminsá."
    },
    sources: [
      "https://bonairevakantieland.nl/thema-artikelen-over-bonaire/kerkdiensten-op-bonaire/",
      "https://protestantsegemeentebonaire.com/"
    ]
  },
  {
    id: "ibc",
    name: "International Bible Church of Bonaire",
    denomination: "evangelical",
    place: "hato",
    address: "Kaya Papago 104, Hato (zijweg van Kaya Gob. N. Debrot, tussen MCB en Bon Bida)",
    lat: 12.1696, lng: -68.2848,
    phone: "+599 717-8332",
    website: "https://bonaireibc.org/",
    facebook: "https://www.facebook.com/IBCBonaire/",
    services: [
      { day: 0, time: "09:00", langs: ["en"], type: "service" },
      { day: 0, time: "10:45", langs: ["en"], type: "kids" }
    ],
    note: {
      nl: "Internationale, Engelstalige gemeente.",
      en: "International, English-speaking congregation.",
      pap: "Komunidat internashonal na ingles."
    },
    sources: [
      "https://infobonaire.com/moving-living-bonaire/religion-churches-bonaire/",
      "https://bonaireibc.org/"
    ]
  },
  {
    id: "bcf",
    name: "Bonaire Christian Fellowship",
    denomination: "evangelical",
    place: "kralendijk",
    address: "Kaya Brida 30, Kaminda Lagun",
    lat: 12.1620, lng: -68.2615,
    facebook: "https://www.facebook.com/bonairechristianfellowship/",
    translation: ["nl"],
    services: [
      { day: 0, time: "10:00", langs: ["pap", "en"], type: "service" },
      { day: 3, time: "19:00", langs: ["pap", "en"], type: "prayer" },
      { day: 5, time: "19:30", langs: ["pap", "en"], type: "prayer" }
    ],
    note: {
      nl: "Opgericht in 1993. Nederlandse vertaling op verzoek.",
      en: "Founded in 1993. Dutch translation on request.",
      pap: "Fundá na 1993. Tradukshon na hulandes riba petishon."
    },
    sources: [
      "https://bonairevakantieland.nl/thema-artikelen-over-bonaire/kerkdiensten-op-bonaire/",
      "https://www.facebook.com/bonairechristianfellowship/"
    ]
  },
  {
    id: "activate",
    name: "Activate Church Bonaire",
    denomination: "evangelical",
    place: "terakora",
    address: "Sentro di Bario Tera Cora, Kralendijk",
    lat: 12.1382, lng: -68.2648,
    website: "https://www.activatebonaire.com/",
    services: [
      { day: 0, time: "10:00", langs: ["nl", "en"], type: "service" }
    ],
    note: {
      nl: "'Celebration'-dienst van 10:00 tot 12:00, tweetalig Nederlands/Engels.",
      en: "'Celebration' service from 10:00 to 12:00, bilingual Dutch/English.",
      pap: "Sirbishi 'Celebration' di 10:00 te 12:00, na hulandes i ingles."
    },
    sources: [
      "https://www.activatebonaire.com/agenda/298083/kerkdienst.html"
    ]
  },
  {
    id: "nak",
    name: "Nieuw-Apostolische Kerk Bonaire",
    denomination: "newapostolic",
    place: "noordsalina",
    address: "Kaminda Djabou (tijdelijk: Sentro di Bario Nort Saliña)",
    lat: 12.1647, lng: -68.2748,
    phone: "+599 700-0379",
    facebook: "https://www.facebook.com/kamindadjabou/",
    translation: ["pap", "en"],
    services: [
      { day: 0, time: "10:00", langs: ["nl"], type: "service" }
    ],
    note: {
      nl: "Nederlandstalig; vertaling in Papiamentu of Engels indien nodig.",
      en: "In Dutch; translation into Papiamentu or English if needed.",
      pap: "Na hulandes; tradukshon na papiamentu òf ingles si ta nesesario."
    },
    sources: [
      "https://bonairevakantieland.nl/thema-artikelen-over-bonaire/kerkdiensten-op-bonaire/",
      "https://www.nak-nl.org/antillen/bonaire"
    ]
  },
  {
    id: "sda-antriol",
    name: "Zevende-dags Adventisten – Antriol",
    denomination: "adventist",
    place: "antriol",
    address: "Kaya Maria 3, Antriol",
    lat: 12.1660, lng: -68.2698,
    phone: "+599 717-4126",
    services: [
      { day: 6, time: "09:30", langs: ["es", "pap"], type: "service" }
    ],
    note: {
      nl: "Sabbatdienst op zaterdag.",
      en: "Sabbath service on Saturday.",
      pap: "Sirbishi di sabat djasabra."
    },
    sources: [
      "https://infobonaire.com/moving-living-bonaire/religion-churches-bonaire/"
    ]
  },
  {
    id: "sda-nikiboko",
    name: "Zevende-dags Adventisten – Nikiboko",
    denomination: "adventist",
    place: "nikiboko",
    address: "Kaya Pos di Amor 1-A, Nikiboko",
    lat: 12.1489, lng: -68.2644,
    phone: "+599 717-4126",
    translation: ["en"],
    services: [
      { day: 6, time: null, langs: ["pap"], type: "service" }
    ],
    note: {
      nl: "Sabbatdienst op zaterdag in het Papiamentu met Engelse vertaler. Aanvangstijd navragen.",
      en: "Sabbath service on Saturday in Papiamentu with English interpreter. Ask for the start time.",
      pap: "Sirbishi di sabat djasabra na papiamentu ku tradukdó na ingles. Puntra pa ora di kuminsá."
    },
    sources: [
      "https://infobonaire.com/moving-living-bonaire/religion-churches-bonaire/"
    ]
  },
  {
    id: "sda-rincon",
    name: "Zevende-dags Adventisten – Rincon",
    denomination: "adventist",
    place: "rincon",
    address: "Kaya Hoba, Rincon",
    lat: 12.2346, lng: -68.3283,
    phone: "+599 717-4126",
    services: [
      { day: 6, time: null, langs: ["pap"], type: "service" }
    ],
    note: {
      nl: "Sabbatdienst op zaterdag. Aanvangstijd en taal navragen.",
      en: "Sabbath service on Saturday. Ask for start time and language.",
      pap: "Sirbishi di sabat djasabra. Puntra pa ora i idioma."
    },
    sources: [
      "https://infobonaire.com/moving-living-bonaire/religion-churches-bonaire/"
    ]
  }
];
