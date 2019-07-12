const HTMLDecoderEncoder = require("html-encoder-decoder");

function decodeHTML(text) {
  const decodedText = HTMLDecoderEncoder.encode(text);
  return decodedText;
}

export default decodeHTML;
