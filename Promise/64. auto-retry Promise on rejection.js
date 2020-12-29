/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  // your code here
  return fetcher().catch((error) => {
    if (maximumRetryCount === 0) throw error;
    return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
  });
}