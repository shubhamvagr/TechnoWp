
let placeholdersPromise;

export async function fetchPlaceholders() {
  if (!placeholdersPromise) {
    placeholdersPromise = fetch('/placeholders.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch placeholders: ${response.status}`,
          );
        }
        return response.json();
      })
      .catch((error) => {
        placeholdersPromise = undefined;
        console.warn('Could not load placeholders:', error);
        return {};
      });
  }

  return placeholdersPromise;
}
