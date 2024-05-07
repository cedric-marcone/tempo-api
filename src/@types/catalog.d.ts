import { RRuleSet, type RRule } from "rrule";

type Kind = "CC" | "CP" | "ENG" | "GARD" | "EPREUV";

type Discipline = {
  code: string;
  name: string;
};

type Level = {
  code: string;
  name: string;
};

type Diploma = {
  code: string;
  name: string;
  levels: Level[];
  disciplines: Discipline[];
};

type Organisation = {
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
};

type Instructor = {
  code: string;
  mainOrganisation: Organisation;
  organisations: Organisation[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  diploma: Diploma;
  disciplines: Discipline[];
};

type Participant = {
  firstName: string;
  lastName: string;
  birthDate: Date;
};

type Product = Service | Article | Pack;

// Exemple : Pack cours journée + insigne
type Pack = {
  type: "pack";
  title: string;
  mandatoryServices: Service[];
  optionalServices: Service[];
  optionalArticles: Article[];
  price: number;
};

// Exemple : Cours de ski alpin Matin 1ère étoile
type Service = {
  type: "service";
  title: string;
  kind: "CC" | "CP" | "ENG" | "GARD" | "EPREUV";
  diploma: Diploma;
  discipline: Discipline;
  levels: Level[];
  articles: Article[];
  start: RRuleSet;
  schedule: Omit<RRuleSet, "dtstart" | "until">;
  minParticipants: number; // 0 = pas de minimum
  maxParticipants: number; // 0 = pas de maximum
  ageMin: number; // en mois
  ageMax: number; // en mois
  instructor: Instructor;
  price: number;
};

// Exemple : Insigne
type Article = {
  type: "article";
  title: string;
  price: number;
};

type SoldService = {
  service: Service;
  participants: Participant[];
  instructor: Instructor;
  starts: Date[];
};
