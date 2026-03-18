const STORAGE_KEY = 'githunt:visited';

export function getVisitedIds() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function isVisited(id) {
  return getVisitedIds().includes(String(id));
}

export function markVisited(id) {
  const visited = getVisitedIds();
  const strId = String(id);
  if (!visited.includes(strId)) {
    visited.push(strId);
    // Keep last 2000 entries to avoid unbounded growth
    if (visited.length > 2000) {
      visited.splice(0, visited.length - 2000);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
  }
}
