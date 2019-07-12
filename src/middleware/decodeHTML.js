const HTMLDecoderEncoder = require("html-encoder-decoder");

function decodeHTML(text) {
  const decodedText = HTMLDecoderEncoder.decode(text);
  return decodedText;
}

export default decodeHTML;
