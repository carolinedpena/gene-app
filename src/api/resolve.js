// Helper function to resolve promises returned by axios - returns object with parsed key containing returned data if API call was sucessful or error key with error object if was unsuccessful

export default async function resolve(promise) {
    const resolved = {
      parsed: null,
      error: null
    };
  
    try {
      resolved.parsed = await promise;
    } catch(e) {
      resolved.error = e;
    }
  
    return resolved;
}