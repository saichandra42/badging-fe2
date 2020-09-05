import axios from "axios";

const BASE_URL = "http://localhost:5000/";
const RECOMMENDATIONS = "recommendations";
const JOB_FAMILES = "jobfamilies";
const COMPETENCIES = "competencies";
const DOMAINS = "domains";
const DOMAIN_BADGES = "subdomainbadges";
const SUB_DOMAINS = "subDomains";
const FINISH_BADGE = "finishBadge";
const USERS = "getusers";
const MANAGER = "getManagersData";
const APPROVAL = "approvalFeedback";
const BADGE_COMPLETED = "isBadgeCompleted";

const recommendationsURL = () => `${BASE_URL}${RECOMMENDATIONS}`;
const jobFamiliesURL = () => `${BASE_URL}${JOB_FAMILES}`;
const competenciesURL = () => `${BASE_URL}${COMPETENCIES}`;
const domainsURL = () => `${BASE_URL}${DOMAINS}`;
const badgesURL = () => `${BASE_URL}${DOMAIN_BADGES}`;
const subDomainsURL = () => `${BASE_URL}${SUB_DOMAINS}`;
const finishBadgeURL = () => `${BASE_URL}${FINISH_BADGE}`;
const usersURL = () => `${BASE_URL}${USERS}`;
const managersURL = () => `${BASE_URL}${MANAGER}`;
const dataForApprovalURL = () => `${BASE_URL}${APPROVAL}`;
const badgeCompletedURL = () => `${BASE_URL}${BADGE_COMPLETED}`;

const get = (url) => axios.get(url);
const post = (url, payload) => axios.post(url, payload);

export const getRecommendations = (id) => {
  const url = recommendationsURL();
  return post(url, { userId: id });
};

export const getFamiles = () => {
  const url = jobFamiliesURL();
  return get(url);
};

export const getCompetencies = (payload) => {
  const url = competenciesURL();
  return post(url, payload);
};

export const getDomains = () => {
  const url = domainsURL();
  return get(url);
};

export const getBadges = (subdomain) => {
  const url = badgesURL();
  return post(url, { subdomain: subdomain });
};

export const getSubDomains = (domain) => {
  const url = subDomainsURL();
  return post(url, { domain: domain });
};

export const finishBadge = (
  userId,
  subDomain,
  badge,
  time,
  timeStamp,
  isCompleted = false
) => {
  const url = finishBadgeURL();
  return post(url, {
    userId,
    subdomain: subDomain,
    badge,
    time,
    timeStamp,
    isCompleted,
  });
};

export const getusers = () => {
  const url = usersURL();
  return get(url);
};

export const getManagerData = () => {
  const url = managersURL();
  return get(url);
};

export const getDataForApproval = () => {
  const url = dataForApprovalURL();
  return get(url);
};

export const isBadgeCompleted = (userId, subDomain, badge) => {
  const url = badgeCompletedURL();
  return post(url, { userId, subDomain, badge });
};
