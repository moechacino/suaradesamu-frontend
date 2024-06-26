export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

export const API_ADMIN_LOGIN = `${API_ORIGIN}/admin/login`;
export const API_CANDIDATE_GETALL = `${API_ORIGIN}/candidate/`;
export const API_VOTER_GETALL = `${API_ORIGIN}/voter`;
export const API_VOTES_GETALL = `${API_ORIGIN}/voting/real-count`;
export const API_VOTES_POST_START = `${API_ORIGIN}/voting/start`;
export const API_VOTES_POST_END = `${API_ORIGIN}/voting/end`;
export const API_CANDIDATE_POST_CREATE = `${API_ORIGIN}/candidate/create`;
export const API_ORGANIZATION_POST_CREATE = `${API_ORIGIN}/candidate/organization`;
export const API_WORKEXPERIENCE_POST_CREATE = `${API_ORIGIN}/candidate/work-experience`;
export const API_EDUCATION_POST_CREATE = `${API_ORIGIN}/candidate/education`;
export const API_WORKPLAN_POST_CREATE = `${API_ORIGIN}/candidate/work-plan`;
export const API_VOTER_POST_CREATE = `${API_ORIGIN}/voter`;
export const API_VOTER_POST_CREATE_BULK = `${API_ORIGIN}/voter/bulk`;
export const API_TRANSACTIONS = `${API_ORIGIN}/transactions`;
export const API_TRANSACTIONS_VOTED = `${API_ORIGIN}/transactions/voted`;
