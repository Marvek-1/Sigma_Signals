
import { DiseaseInfo } from './types';

export const AFRO_ISO3_LIST = [
  "AGO","BEN","BWA","BFA","BDI","CPV","CMR","CAF","TCD","COM",
  "COG","CIV","COD","GNQ","ERI","ETH","GAB","GMB","GHA","GIN",
  "GNB","KEN","LSO","LBR","MDG","MWI","MLI","MRT","MUS","MOZ",
  "NAM","NER","NGA","RWA","STP","SEN","SYC","SLE","ZAF","SSD",
  "TZA","TGO","UGA","ZMB","ZWE","DZA","TUN","LBY","MAR","SWZ"
];

export const AFRO_DISEASES: DiseaseInfo[] = [
  { code: "A00", name: "Cholera", syndrome: "AWD" },
  { code: "A01", name: "Typhoid fever", syndrome: "Febrile" },
  { code: "A20", name: "Plague", syndrome: "Febrile" },
  { code: "A80", name: "Polio", syndrome: "AFP" },
  { code: "A90", name: "Dengue", syndrome: "Febrile" },
  { code: "A92", name: "Yellow fever", syndrome: "Febrile" },
  { code: "A95", name: "Yellow fever", syndrome: "Febrile" },
  { code: "B50", name: "Malaria", syndrome: "Febrile" },
  { code: "B05", name: "Measles", syndrome: "Rash" },
  { code: "B20", name: "HIV", syndrome: "Chronic" },
  { code: "A16", name: "Tuberculosis", syndrome: "Respiratory" },
  { code: "A98", name: "Viral hemorrhagic fevers", syndrome: "Hemorrhagic" },
  { code: "A99", name: "Ebola/Marburg", syndrome: "Hemorrhagic" },
  { code: "U07", name: "COVID-19", syndrome: "Respiratory" },
  { code: "A82", name: "Rabies", syndrome: "Neurological" },
  { code: "A37", name: "Pertussis", syndrome: "Respiratory" },
  { code: "A33", name: "Neonatal tetanus", syndrome: "Neurological" },
  { code: "A39", name: "Meningococcal disease", syndrome: "Neurological" },
  { code: "B55", name: "Leishmaniasis", syndrome: "Febrile" },
  { code: "A27", name: "Leptospirosis", syndrome: "Febrile" },
  { code: "A96", name: "Lassa fever", syndrome: "Hemorrhagic" },
  { code: "A78", name: "Q fever", syndrome: "Febrile" },
  { code: "A75", name: "Typhus", syndrome: "Febrile" }
];

export const DISEASE_KEYWORDS: Record<string, string[]> = {
  "A00": ["cholera","diarrhea","watery stool","AWD","acute watery"],
  "A01": ["typhoid","enteric fever"],
  "A20": ["plague","bubonic","pneumonic plague"],
  "A80": ["polio","paralysis","AFP","acute flaccid"],
  "A90": ["dengue","dengue fever","breakbone"],
  "A92": ["yellow fever","jaundice fever"],
  "B50": ["malaria","plasmodium","febrile illness"],
  "B05": ["measles","rubeola","rash fever"],
  "A99": ["ebola","marburg","EVD","filovirus"],
  "U07": ["covid","coronavirus","SARS-CoV-2"],
  "A39": ["meningitis","meningococcal","CSM"],
  "A82": ["rabies","hydrophobia","dog bite"]
};

export const SYNDROMES = [
  "AWD", "AFP", "ILI", "SARI", "Febrile",
  "Hemorrhagic", "Rash", "Neurological",
  "Chronic", "Respiratory"
];
