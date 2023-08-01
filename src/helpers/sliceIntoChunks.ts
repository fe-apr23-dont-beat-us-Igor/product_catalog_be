export function sliceIntoChunks(arr: any, chunkSize: any) {
  const res = [];
  let a = Number(chunkSize);
  for (let i = 0; i < arr.length; i += a) {
      const chunk = arr.slice(i, i + a);
      res.push(chunk);
  }
  return res;
}