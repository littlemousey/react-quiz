import decodeHTML from "../middleware/decodeHTML";

export function mergeTwoArraysToOneDecodedArray(array1, array2) {
  const mergedArray = array1.concat(array2);
  const decodedArray = mergedArray.map(item => {
    return decodeHTML(item);
  });
  return decodedArray;
}
