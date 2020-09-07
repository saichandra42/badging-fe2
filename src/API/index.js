import axios from "axios";

const BASE_URL = "http://localhost:5000/";
const RECOMMENDATIONS = "recommendations";
const JOB_FAMILES = "jobfamilies";
const COMPETENCIES = "competencies";
const DOMAINS = "domains";
const DOMAIN_BADGES = "subdomainbadges";
const SUB_DOMAINS = "subdomains";
const FINISH_BADGE = "badgemetric";
const USER = "getuser";
const MANAGER = "getbadgemetrics";
const APPROVAL = "approvalFeedback";
const BADGE_COMPLETED = "isBadgeCompleted";
const MANAGER_FEEDBACK = "managerBadgeFeedback";
const NOTIFICATION = "notifications";

const recommendationsURL = () => `${BASE_URL}${RECOMMENDATIONS}`;
const jobFamiliesURL = () => `${BASE_URL}${JOB_FAMILES}`;
const competenciesURL = () => `${BASE_URL}${COMPETENCIES}`;
const domainsURL = () => `${BASE_URL}${DOMAINS}`;
const badgesURL = () => `${BASE_URL}${DOMAIN_BADGES}`;
const subDomainsURL = () => `${BASE_URL}${SUB_DOMAINS}`;
const finishBadgeURL = () => `${BASE_URL}${FINISH_BADGE}`;
const getUserURL = () => `${BASE_URL}${USER}`;
const managersURL = () => `${BASE_URL}${MANAGER}`;
const dataForApprovalURL = () => `${BASE_URL}${APPROVAL}`;
const badgeCompletedURL = () => `${BASE_URL}${BADGE_COMPLETED}`;
const managerFeedbackURL = () => `${BASE_URL}${MANAGER_FEEDBACK}`;
const getNotificationURL = () => `${BASE_URL}${NOTIFICATION}`;

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
    userid: userId,
    subdomain: subDomain,
    badge,
    time,
    time_stamp: timeStamp,
    isCompleted,
  });
};

export const getuser = (id) => {
  const url = getUserURL(id);
  return post(url, { userid: id });
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

export const submitManagerFeedback = (feedback) => {
  const url = managerFeedbackURL();
  return post(url, { ...feedback });
};

export const getNotification = (userId) => {
  const url = getNotificationURL();
  return post(url, { userId: userId });
};
