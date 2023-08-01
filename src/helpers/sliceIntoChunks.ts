export function sliceIntoChunks(arr: any, chunkSize: any) {
  const res = [];
  let normalizedChumkSize = Number(chunkSize);
  for (let i = 0; i < arr.length; i += normalizedChumkSize) {
      const chunk = arr.slice(i, i + normalizedChumkSize);
      res.push(chunk);
  }
  return res;
}