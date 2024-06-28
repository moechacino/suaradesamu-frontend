export type Candidate = {
  id: number;
  name: string;
  age: number;
  noUrut: number;
  visi: string;
  photoProfileUrl: string;
  photoProfileAlt: string;
  workPlan?: WorkPlan[] | null;
  education?: Education[] | null;
  workExperience?: WorkExperience[] | null;
  organization?: Organization[] | null;
  voteCount?: number;
};

export type Organization = {
  id: number;
  title: string;
  periodStart: Date;
  periodEnd: Date;
};
export type WorkExperience = {
  id: number;
  title: string;
  periodStart: Date;
  periodEnd: Date;
};

export type Education = {
  id: number;
  degree: string;
  institution: string;
  periodStart: Date;
  periodEnd: Date;
};

export type WorkPlan = {
  id: number;
  title: string;
  detail: string;
};
