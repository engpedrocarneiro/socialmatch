export interface User {
  id: string;
  name: string;
  email: string;
  type: 'ong' | 'empresa';
  profile: OngProfile | CompanyProfile;
}

export interface OngProfile {
  cnpj: string;
  area: string[];
  description: string;
  projects: Project[];
  certificates: Certificate[];
}

export interface CompanyProfile {
  cnpj: string;
  segment: string[];
  interests: string[];
  budget: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'em_andamento' | 'concluido' | 'pendente';
  budget: number;
  startDate: Date;
  endDate?: Date;
  partners: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: Date;
  validUntil: Date;
  verified: boolean;
}